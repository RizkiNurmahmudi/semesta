/**
 * Loader konten M1 — membaca YAML dari folder content/ sebagai `?raw`,
 * mem-parse dengan `yaml`, dan memvalidasi dengan skema Zod
 * (@semesta/content-schema). Gagal loudly bila konten tidak valid.
 */
import { parse as parseYaml } from 'yaml'
import {
  QuizItemSchema,
  StorySchema,
  type QuizItem,
  type Story,
} from '@semesta/content-schema'

import storyRaw from '../../../../content/stories/story-bola-basket-kirana.yaml?raw'
import quizRaw from '../../../../content/quizzes/quiz-fis-gerak-parabola-l2.yaml?raw'

const QuizListSchema = QuizItemSchema.array()

type ParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: { issues: { message: string }[] } }

interface SchemaLike<T> {
  safeParse: (data: unknown) => ParseResult<T>
}

function load<T>(raw: string, schema: SchemaLike<T>, name: string): T {
  const parsed: unknown = parseYaml(raw)
  const result = schema.safeParse(parsed)
  if (!result.success) {
    throw new Error(
      `Konten tidak valid (${name}): ${result.error.issues.map((i) => i.message).join('; ')}`,
    )
  }
  return result.data
}

/** Naskah "Bola Basket Kirana" — 6 panel. */
export const story: Story = load(storyRaw, StorySchema, 'story-bola-basket-kirana')

/** Bank soal Gerak Parabola L2. */
export const quizItems: QuizItem[] = load(quizRaw, QuizListSchema, 'quiz-fis-gerak-parabola-l2')

export type { QuizItem, Story }
