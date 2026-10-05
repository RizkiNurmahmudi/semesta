/**
 * @semesta/content-schema — skema Zod untuk seluruh konten.
 * Dipakai oleh tools/build-content untuk memvalidasi konten saat build.
 * Build GAGAL bila ada pelanggaran (lihat PRD 10.6).
 */
import { z } from 'zod'

export const LevelSchema = z.enum(['L0', 'L1', 'L2', 'L3', 'L4', 'L5'])
export type Level = z.infer<typeof LevelSchema>

export const DomainSchema = z.enum(['fisika', 'matematika', 'lintas'])
export type Domain = z.infer<typeof DomainSchema>

const idPattern = /^[a-z0-9-]+$/

/** Node konsep pada skill-graph.yaml. */
export const ConceptSchema = z.object({
  id: z.string().regex(idPattern),
  title: z.string().min(1),
  domain: DomainSchema,
  topic: z.string().min(1),
  keywords: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
})
export type Concept = z.infer<typeof ConceptSchema>

/** Frontmatter berkas pelajaran *.mdx — lihat PRD 10.6. */
export const LessonFrontmatterSchema = z.object({
  id: z.string().regex(idPattern),
  level: LevelSchema,
  domain: DomainSchema,
  topic: z.string().min(1),
  title: z.string().min(1),
  prerequisites: z.array(z.string()).default([]),
  estMinutes: z.number().int().positive(),
  story: z.string().optional(),
  simulations: z.array(z.string()).default([]),
  caseStudies: z.array(z.string()).default([]),
  quiz: z.string().optional(),
  version: z.number().int().positive(),
})
export type LessonFrontmatter = z.infer<typeof LessonFrontmatterSchema>

const QuizTypeSchema = z.enum(['mcq', 'numeric', 'ordering', 'matching', 'graph', 'sim-challenge'])

/** Satu soal di bank soal — `explanation` WAJIB (PRD FR-06). */
export const QuizItemSchema = z.object({
  id: z.string().min(1),
  type: QuizTypeSchema,
  prompt: z.string().min(1),
  explanation: z.string().min(1),
  difficulty: z.number().int().min(1).max(5),
  concept: z.string().min(1),
  answer: z.unknown().optional(),
  tolerance: z.number().nonnegative().optional(),
  unit: z.string().optional(),
  hints: z.array(z.string()).max(3).default([]),
  options: z.array(z.string()).optional(),
  misconception: z.string().optional(),
})
export type QuizItem = z.infer<typeof QuizItemSchema>

/** Satu panel cerita — `alt` WAJIB untuk aksesibilitas (PRD 6.7). */
export const StoryPanelSchema = z.object({
  id: z.string().min(1),
  image: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().min(1),
  dialogue: z
    .array(z.object({ who: z.string().min(1), text: z.string().min(1) }))
    .default([]),
})
export type StoryPanel = z.infer<typeof StoryPanelSchema>

/** Naskah cerita bergambar — 6–12 panel (PRD 6.7 & lampiran 17.2). */
export const StorySchema = z.object({
  id: z.string().regex(/^story-[a-z0-9-]+$/),
  title: z.string().min(1),
  concept: z.string().min(1),
  levels: z.array(LevelSchema).min(1),
  characters: z.array(z.string().min(1)).min(1),
  learningQuestion: z.string().min(1),
  panels: z.array(StoryPanelSchema).min(6).max(12),
})
export type Story = z.infer<typeof StorySchema>

/** Studi kasus industri — mengikuti template PRD 17.3. */
export const CaseStudySchema = z.object({
  id: z.string().regex(/^cs-[a-z0-9-]+$/),
  title: z.string().min(1),
  concept: z.string().min(1),
  context: z.string().min(1),
  problem: z.string().min(1),
  conceptUsed: z.string().min(1),
  numbers: z.string().min(1),
  engineerSim: z.string().optional(),
  impact: z.string().min(1),
  careers: z.string().min(1),
  sources: z.array(z.string().min(1)).min(1),
})
export type CaseStudy = z.infer<typeof CaseStudySchema>

/** Metadata simulasi yang dirujuk pelajaran. */
export const SimulationMetaSchema = z.object({
  id: z.string().regex(/^sim-[a-z0-9-]+$/),
  learningGoal: z.string().min(1),
})
export type SimulationMeta = z.infer<typeof SimulationMetaSchema>
