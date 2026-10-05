#!/usr/bin/env node
/**
 * tools/build-content — validasi seluruh konten di folder content/.
 * Keluar dengan code 1 bila ada pelanggaran (dipakai CI & pre-publish).
 *
 * Aturan (PRD 10.6): id unik, prasyarat merujuk konsep yang ada,
 * graf prasyarat tanpa siklus, field wajib (alt-text, explanation) terisi,
 * referensi antar-konten (story/quiz) harus ada.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { parse as parseYaml } from 'yaml'
import {
  ConceptSchema,
  LessonFrontmatterSchema,
  QuizItemSchema,
  StorySchema,
} from '@semesta/content-schema'

const CONTENT_ROOT = join(import.meta.dirname, '..', '..', '..', 'content')

const errors: string[] = []
const warnings: string[] = []
const err = (msg: string) => errors.push(msg)
const warn = (msg: string) => warnings.push(msg)

function walk(dir: string, ext: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, ext, out)
    else if (p.endsWith(ext)) out.push(p)
  }
  return out
}

function extractFrontmatter(src: string): string | null {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return m ? m[1] : null
}

/** 1. skill-graph.yaml — konsep, duplikat, prasyarat, siklus. */
const conceptIds = new Set<string>()
{
  const raw = readFileSync(join(CONTENT_ROOT, 'skill-graph.yaml'), 'utf8')
  const parsed = parseYaml(raw) as { concepts?: unknown[] }
  const concepts = parsed.concepts ?? []
  const graph = new Map<string, string[]>()
  for (const c of concepts) {
    const r = ConceptSchema.safeParse(c)
    if (!r.success) {
      err(`skill-graph: konsep tidak valid: ${r.error.issues.map((i) => i.message).join('; ')}`)
      continue
    }
    if (conceptIds.has(r.data.id)) err(`skill-graph: id duplikat '${r.data.id}'`)
    conceptIds.add(r.data.id)
    graph.set(r.data.id, r.data.prerequisites)
  }
  for (const [id, pres] of graph) {
    for (const pre of pres) {
      if (!conceptIds.has(pre)) err(`skill-graph: '${id}' merujuk prasyarat tak dikenal '${pre}'`)
    }
  }
  // Deteksi siklus (DFS)
  const color = new Map<string, number>()
  const stack: string[] = []
  const visit = (id: string): string[] | null => {
    color.set(id, 1)
    stack.push(id)
    for (const pre of graph.get(id) ?? []) {
      const c = color.get(pre) ?? 0
      if (c === 1) return [...stack.slice(stack.indexOf(pre)), pre]
      if (c === 0) {
        const r = visit(pre)
        if (r) return r
      }
    }
    stack.pop()
    color.set(id, 2)
    return null
  }
  for (const id of graph.keys()) {
    if ((color.get(id) ?? 0) === 0) {
      const cycle = visit(id)
      if (cycle) {
        err(`skill-graph: siklus prasyarat: ${cycle.join(' → ')}`)
        break
      }
    }
  }
}

/** 2. stories/*.yaml */
const storyIds = new Set<string>()
for (const f of walk(join(CONTENT_ROOT, 'stories'), '.yaml')) {
  const rel = relative(CONTENT_ROOT, f)
  try {
    const r = StorySchema.safeParse(parseYaml(readFileSync(f, 'utf8')))
    if (!r.success) {
      err(`${rel}: ${r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`)
      continue
    }
    if (storyIds.has(r.data.id)) err(`${rel}: id cerita duplikat '${r.data.id}'`)
    storyIds.add(r.data.id)
    if (!conceptIds.has(r.data.concept))
      err(`${rel}: konsep tak dikenal '${r.data.concept}'`)
  } catch (e) {
    err(`${rel}: gagal parse YAML (${(e as Error).message})`)
  }
}

/** 3. quizzes/*.yaml */
const quizIds = new Set<string>()
for (const f of walk(join(CONTENT_ROOT, 'quizzes'), '.yaml')) {
  const rel = relative(CONTENT_ROOT, f)
  try {
    const arr = parseYaml(readFileSync(f, 'utf8')) as unknown[]
    if (!Array.isArray(arr)) {
      err(`${rel}: bank soal harus berupa array`)
      continue
    }
    const seen = new Set<string>()
    for (const q of arr) {
      const r = QuizItemSchema.safeParse(q)
      if (!r.success) {
        err(`${rel}: ${r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`)
        continue
      }
      if (seen.has(r.data.id)) err(`${rel}: id soal duplikat '${r.data.id}'`)
      seen.add(r.data.id)
      if (!conceptIds.has(r.data.concept)) warn(`${rel}: soal '${r.data.id}' merujuk konsep tak dikenal '${r.data.concept}'`)
    }
    const quizId = rel.replace(/\.yaml$/, '').split(/[\\/]/).pop()!
    if (quizIds.has(quizId)) err(`${rel}: id kuis duplikat '${quizId}'`)
    quizIds.add(quizId)
  } catch (e) {
    err(`${rel}: gagal parse YAML (${(e as Error).message})`)
  }
}

/** 4. ** /*.mdx — frontmatter pelajaran + referensi silang. */
const lessonIds = new Set<string>()
for (const f of walk(CONTENT_ROOT, '.mdx')) {
  const rel = relative(CONTENT_ROOT, f)
  const fm = extractFrontmatter(readFileSync(f, 'utf8'))
  if (!fm) {
    err(`${rel}: frontmatter --- tidak ditemukan`)
    continue
  }
  const r = LessonFrontmatterSchema.safeParse(parseYaml(fm))
  if (!r.success) {
    err(`${rel}: ${r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`)
    continue
  }
  if (lessonIds.has(r.data.id)) err(`${rel}: id pelajaran duplikat '${r.data.id}'`)
  lessonIds.add(r.data.id)
  for (const pre of r.data.prerequisites) {
    if (!conceptIds.has(pre)) err(`${rel}: prasyarat tak dikenal '${pre}'`)
  }
  if (r.data.story && !storyIds.has(r.data.story))
    err(`${rel}: story tak dikenal '${r.data.story}'`)
  if (r.data.quiz && !quizIds.has(r.data.quiz)) err(`${rel}: quiz tak dikenal '${r.data.quiz}'`)
  for (const sim of r.data.simulations) {
    if (!/^sim-[a-z0-9-]+$/.test(sim)) err(`${rel}: id simulasi tidak valid '${sim}'`)
  }
}

/** Ringkasan */
console.log(`Konsep: ${conceptIds.size}, Cerita: ${storyIds.size}, Kuis: ${quizIds.size}, Pelajaran: ${lessonIds.size}`)
for (const w of warnings) console.log(`WARN  ${w}`)
for (const e of errors) console.log(`ERROR ${e}`)
if (errors.length > 0) {
  console.log(`\nValidasi GAGAL: ${errors.length} error, ${warnings.length} warning.`)
  process.exit(1)
}
console.log(`\nValidasi OK (${warnings.length} warning).`)
