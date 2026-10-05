/**
 * Penyimpanan progres lokal (IndexedDB via Dexie).
 * Logika skor/mastery/XP tetap di @semesta/progress-core (murni & teruji);
 * modul ini hanya persistensi.
 */
import Dexie, { type Table } from 'dexie'
import {
  questionPoints,
  updateMastery,
  updateStreak,
  xpForActivity,
} from '@semesta/progress-core'

export interface QuizAttempt {
  id?: number
  itemId: string
  conceptId: string
  correct: boolean
  hintsUsed: number
  points: number
  ts: number
}

export interface ConceptProgress {
  conceptId: string
  mastery: number
  xp: number
  updatedAt: number
}

export interface LessonProgress {
  id: string
  storyDone: boolean
  simDone: boolean
  quizDone: boolean
  quizScore?: number
}

export interface MetaRow {
  key: string
  value: string
}

class SemestaDB extends Dexie {
  attempts!: Table<QuizAttempt, number>
  concepts!: Table<ConceptProgress, string>
  lessons!: Table<LessonProgress, string>
  meta!: Table<MetaRow, string>

  constructor() {
    super('semesta')
    this.version(1).stores({
      attempts: '++id, itemId, conceptId, ts',
      concepts: 'conceptId',
      lessons: 'id',
      meta: 'key',
    })
  }
}

export const db = new SemestaDB()

const LESSON_ID = 'lesson-bola-basket-kirana'
const CONCEPT_ID = 'fis-gerak-parabola'

/** Tandai satu tahap lesson selesai (story | sim | quiz). */
export async function markLessonStep(
  step: 'storyDone' | 'simDone' | 'quizDone',
  quizScore?: number,
): Promise<void> {
  const prev = await db.lessons.get(LESSON_ID)
  await db.lessons.put({
    id: LESSON_ID,
    storyDone: prev?.storyDone ?? false,
    simDone: prev?.simDone ?? false,
    quizDone: prev?.quizDone ?? false,
    quizScore: quizScore ?? prev?.quizScore,
    [step]: true,
  })
}

export async function getLessonProgress(): Promise<LessonProgress | undefined> {
  return db.lessons.get(LESSON_ID)
}

/** Simpan hasil satu soal; kembalikan poin, mastery, dan XP terbaru. */
export async function recordQuizAnswer(
  itemId: string,
  correct: boolean,
  hintsUsed: number,
): Promise<{ points: number; mastery: number; xp: number }> {
  const points = questionPoints(correct, hintsUsed)
  await db.attempts.add({
    itemId,
    conceptId: CONCEPT_ID,
    correct,
    hintsUsed,
    points,
    ts: Date.now(),
  })

  const prev = await db.concepts.get(CONCEPT_ID)
  const mastery = updateMastery(prev?.mastery ?? 0, points)
  const xp = (prev?.xp ?? 0) + xpForActivity('quiz', points)
  await db.concepts.put({ conceptId: CONCEPT_ID, mastery, xp, updatedAt: Date.now() })

  await touchStreak()
  return { points, mastery, xp }
}

export async function getConceptProgress(): Promise<ConceptProgress | undefined> {
  return db.concepts.get(CONCEPT_ID)
}

/** Streak harian: 1 hari libur gratis per minggu. */
export async function touchStreak(): Promise<{ streak: number }> {
  const today = new Date().toISOString().slice(0, 10)
  const row = await db.meta.get('streak')
  const saved = row ? (JSON.parse(row.value) as { streak: number; lastDay: string; freeDay: boolean }) : null

  let streak = 1
  let freeDay = true
  if (saved) {
    const daysSince = Math.round(
      (new Date(today).getTime() - new Date(saved.lastDay).getTime()) / 86400000,
    )
    const r = updateStreak(saved.streak, daysSince, saved.freeDay)
    streak = r.streak
    freeDay = r.usedFreeDay ? false : saved.freeDay
    // Reset jatah libur tiap Senin.
    if (new Date(today).getDay() === 1 && saved.lastDay !== today) freeDay = true
  }
  await db.meta.put({
    key: 'streak',
    value: JSON.stringify({ streak, lastDay: today, freeDay }),
  })
  return { streak }
}

export async function getStreak(): Promise<number> {
  const row = await db.meta.get('streak')
  if (!row) return 0
  return (JSON.parse(row.value) as { streak: number }).streak
}

export { LESSON_ID, CONCEPT_ID }
