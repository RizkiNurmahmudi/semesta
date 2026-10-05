import { describe, expect, it } from 'vitest'
import { ConceptSchema, QuizItemSchema, StorySchema } from './index'

describe('ConceptSchema', () => {
  it('menerima konsep valid', () => {
    const r = ConceptSchema.safeParse({
      id: 'fis-gerak-parabola',
      title: 'Gerak Parabola',
      domain: 'fisika',
      topic: 'mekanika',
      prerequisites: ['fis-gerak-lurus'],
    })
    expect(r.success).toBe(true)
  })

  it('menolak id berhuruf besar/spasi', () => {
    expect(ConceptSchema.safeParse({ id: 'Fisika Parabola', title: 'x', domain: 'fisika', topic: 'mekanika' }).success).toBe(false)
  })
})

describe('QuizItemSchema', () => {
  const base = {
    id: 'q1',
    type: 'numeric',
    prompt: 'Berapa jangkauan?',
    difficulty: 2,
    concept: 'fis-gerak-parabola',
    answer: 35.3,
    unit: 'm',
  }
  it('menolak soal tanpa explanation (wajib PRD FR-06)', () => {
    expect(QuizItemSchema.safeParse(base).success).toBe(false)
  })
  it('menerima soal lengkap', () => {
    expect(QuizItemSchema.safeParse({ ...base, explanation: 'R = v0^2 sin(2θ)/g' }).success).toBe(true)
  })
  it('menolak hints lebih dari 3', () => {
    expect(
      QuizItemSchema.safeParse({ ...base, explanation: 'x', hints: ['a', 'b', 'c', 'd'] }).success,
    ).toBe(false)
  })
})

describe('StorySchema', () => {
  const panel = (id: string) => ({
    id,
    image: `/img/stories/x/${id}.webp`,
    alt: `Panel ${id}: deskripsi visual`,
    caption: 'Narasi singkat.',
  })
  const base = {
    id: 'story-bola-basket-kirana',
    title: 'Bola Basket Kirana',
    concept: 'fis-gerak-parabola',
    levels: ['L0', 'L1'],
    characters: ['kirana', 'kakek'],
    learningQuestion: 'Kenapa lintasannya melengkung?',
    panels: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].map(panel),
  }
  it('menerima cerita 6 panel valid', () => {
    expect(StorySchema.safeParse(base).success).toBe(true)
  })
  it('menolak panel tanpa alt-text (wajib PRD 6.7)', () => {
    const bad = { ...base, panels: base.panels.map((p) => ({ ...p, alt: '' })) }
    expect(StorySchema.safeParse(bad).success).toBe(false)
  })
  it('menolak cerita dengan < 6 panel', () => {
    expect(StorySchema.safeParse({ ...base, panels: base.panels.slice(0, 5) }).success).toBe(false)
  })
})
