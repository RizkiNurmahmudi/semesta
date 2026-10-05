/**
 * @semesta/progress-core — logika progres murni (tanpa React/DOM).
 * Rumus mengikuti PRD 10.8. Semua fungsi murni & teruji unit.
 */

/** Skor satu soal: 1.0 tanpa petunjuk, berkurang per petunjuk, 0 bila salah. */
export function questionPoints(correct: boolean, hintsUsed: number): number {
  if (!correct) return 0
  const table = [1.0, 0.8, 0.6, 0.4]
  return table[Math.min(hintsUsed, 3)]
}

/** Mastery baru via EMA: mastery_lama + α × (skor_kuis − mastery_lama). */
export function updateMastery(prev: number, quizScore: number, alpha = 0.4): number {
  const next = prev + alpha * (quizScore - prev)
  return Math.min(1, Math.max(0, next))
}

export interface StreakResult {
  streak: number
  broke: boolean
  usedFreeDay: boolean
}

/**
 * daysSinceActive: selisih hari kalender sejak hari aktif terakhir.
 * 1 hari libur gratis per minggu (freeDayAvailable).
 */
export function updateStreak(
  prevStreak: number,
  daysSinceActive: number,
  freeDayAvailable: boolean,
): StreakResult {
  if (daysSinceActive <= 0) return { streak: prevStreak, broke: false, usedFreeDay: false }
  if (daysSinceActive === 1) return { streak: prevStreak + 1, broke: false, usedFreeDay: false }
  if (daysSinceActive === 2 && freeDayAvailable)
    return { streak: prevStreak + 1, broke: false, usedFreeDay: true }
  return { streak: 1, broke: true, usedFreeDay: false }
}

/** Interval ulang (hari) untuk kotak Leitner 1–5. */
export const LEITNER_INTERVALS = [1, 3, 7, 14, 30] as const

export function updateLeitnerBox(box: number, score: number): number {
  if (score >= 0.8) return Math.min(5, box + 1)
  if (score < 0.6) return 1
  return box
}

/** Peluruhan mastery bila melewati jadwal ulang (dipanggil per hari keterlambatan). */
export function decayMastery(mastery: number, peak: number, daysOverdue: number): number {
  if (daysOverdue <= 3) return mastery
  const decayed = mastery - 0.02 * (daysOverdue - 3)
  return Math.max(0.5 * peak, decayed)
}

export type ActivityKind = 'lesson' | 'quiz' | 'challenge' | 'review'

export function xpForActivity(kind: ActivityKind, score = 0): number {
  switch (kind) {
    case 'lesson':
      return 20
    case 'quiz':
      return 10 + Math.round(score * 20)
    case 'challenge':
      return 15
    case 'review':
      return 10
  }
}
