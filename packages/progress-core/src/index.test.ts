import { describe, expect, it } from 'vitest'
import {
  decayMastery,
  questionPoints,
  updateLeitnerBox,
  updateMastery,
  updateStreak,
  xpForActivity,
} from './index'

describe('questionPoints', () => {
  it('1.0 tanpa petunjuk, berkurang per petunjuk, 0 bila salah', () => {
    expect(questionPoints(true, 0)).toBe(1.0)
    expect(questionPoints(true, 1)).toBe(0.8)
    expect(questionPoints(true, 2)).toBe(0.6)
    expect(questionPoints(true, 3)).toBe(0.4)
    expect(questionPoints(false, 0)).toBe(0)
  })
})

describe('updateMastery', () => {
  it('EMA dengan alpha 0.4', () => {
    // 0 + 0.4 * (1 - 0) = 0.4
    expect(updateMastery(0, 1)).toBeCloseTo(0.4)
    // 0.4 + 0.4 * (0.5 - 0.4) = 0.44
    expect(updateMastery(0.4, 0.5)).toBeCloseTo(0.44)
  })

  it('terjepit di 0..1', () => {
    expect(updateMastery(0.9, 2)).toBeLessThanOrEqual(1)
    expect(updateMastery(0.1, -1)).toBeGreaterThanOrEqual(0)
  })
})

describe('updateStreak', () => {
  it('hari berurutan menambah streak', () => {
    expect(updateStreak(5, 1, true)).toEqual({ streak: 6, broke: false, usedFreeDay: false })
  })
  it('satu hari libur gratis tidak memutus streak', () => {
    expect(updateStreak(5, 2, true)).toEqual({ streak: 6, broke: false, usedFreeDay: true })
  })
  it('hari libur kedua memutus streak', () => {
    expect(updateStreak(5, 2, false)).toEqual({ streak: 1, broke: true, usedFreeDay: false })
    expect(updateStreak(5, 3, true)).toEqual({ streak: 1, broke: true, usedFreeDay: false })
  })
})

describe('updateLeitnerBox', () => {
  it('naik bila skor >= 80%, turun ke 1 bila < 60%, tetap di antaranya', () => {
    expect(updateLeitnerBox(2, 0.9)).toBe(3)
    expect(updateLeitnerBox(5, 1)).toBe(5)
    expect(updateLeitnerBox(4, 0.3)).toBe(1)
    expect(updateLeitnerBox(3, 0.7)).toBe(3)
  })
})

describe('decayMastery', () => {
  it('tidak luruh dalam 3 hari toleransi, lalu -2%/hari min 50% peak', () => {
    expect(decayMastery(0.9, 0.9, 3)).toBe(0.9)
    expect(decayMastery(0.9, 0.9, 8)).toBeCloseTo(0.8)
    expect(decayMastery(0.9, 0.9, 100)).toBeCloseTo(0.45)
  })
})

describe('xpForActivity', () => {
  it('sesuai tabel PRD 10.8', () => {
    expect(xpForActivity('lesson')).toBe(20)
    expect(xpForActivity('quiz', 1)).toBe(30)
    expect(xpForActivity('quiz', 0.5)).toBe(20)
    expect(xpForActivity('challenge')).toBe(15)
    expect(xpForActivity('review')).toBe(10)
  })
})
