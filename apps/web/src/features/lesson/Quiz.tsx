import { useState } from 'react'
import { ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react'
import { TopBar } from '@semesta/ui'
import { xpForActivity } from '@semesta/progress-core'
import type { QuizItem } from '../../lib/content'
import { CONCEPT_ID, recordQuizAnswer } from '../../lib/db'

export interface QuizResultData {
  points: number[]
  xpGained: number
  correctCount: number
}

interface QuizProps {
  items: QuizItem[]
  onDone: (r: QuizResultData) => void
  onBack: () => void
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

function checkNumeric(item: QuizItem, raw: string): boolean {
  const answer = Number(item.answer)
  const tolerance = item.tolerance ?? 0
  const value = Number(raw.replace(',', '.'))
  if (!Number.isFinite(value)) return false
  return Math.abs(value - answer) <= tolerance
}

/** Latihan kuis — pilihan ganda & numerik, skor via progress-core, tersimpan di Dexie. */
export function Quiz({ items, onDone, onBack }: QuizProps) {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [numeric, setNumeric] = useState('')
  const [hintsUsed, setHintsUsed] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [checked, setChecked] = useState<boolean | null>(null)
  const [points, setPoints] = useState<number[]>([])
  const [xpGained, setXpGained] = useState(0)

  const item = items[idx]
  const total = items.length
  const isMcq = item.type === 'mcq'
  const canCheck = isMcq ? selected !== null : numeric.trim() !== ''
  const isLast = idx === total - 1

  const resetQuestion = (next: number) => {
    setIdx(next)
    setSelected(null)
    setNumeric('')
    setHintsUsed(0)
    setShowHint(false)
    setChecked(null)
  }

  const handleCheck = async () => {
    if (checked !== null) return
    const correct = isMcq ? selected === Number(item.answer) : checkNumeric(item, numeric)
    setChecked(correct)
    const { points: p } = await recordQuizAnswer(item.id, correct, hintsUsed)
    setPoints((prev) => [...prev, p])
    setXpGained((prev) => prev + xpForActivity('quiz', p))
  }

  const handleNext = () => {
    if (isLast) {
      const correctCount = points.filter((p) => p > 0).length
      onDone({ points, xpGained, correctCount })
    } else {
      resetQuestion(idx + 1)
    }
  }

  const progressPercent = ((idx + 1) / total) * 100

  return (
    <div className="flex h-full min-h-dvh flex-col justify-between bg-semesta-bg text-semesta-ink">
      <div className="space-y-2.5 border-b border-slate-200/70 bg-white px-4 pb-3 pt-4">
        <TopBar
          kicker={`Latihan Kuis · ${CONCEPT_ID === 'fis-gerak-parabola' ? 'Gerak Parabola' : CONCEPT_ID}`}
          title={`Soal ${idx + 1} dari ${total}`}
          onBack={onBack}
          backLabel="Kembali ke Simulasi"
          action={
            <div className="flex items-center gap-1">
              {items.map((q, i) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => checked === null && resetQuestion(i)}
                  aria-label={`Ke soal ${i + 1}`}
                  className={`h-6 w-6 rounded-lg text-[11px] font-bold tabular-nums ${
                    i === idx ? 'bg-semesta-deep text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          }
        />
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-semesta-deep transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex-1 space-y-3.5 px-4 py-4">
        <div className="rounded-3xl border border-semesta-baby/60 bg-white p-4 shadow-sm">
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-semesta-deep">
            {isMcq ? 'Pilihan ganda' : `Isian angka${item.unit ? ` · ${item.unit}` : ''}`}
          </span>
          <h2 className="text-sm font-extrabold leading-relaxed text-semesta-ink">{item.prompt}</h2>
        </div>

        {isMcq ? (
          <div className="space-y-2.5" role="radiogroup" aria-label="Pilihan jawaban">
            {(item.options ?? []).map((opt, i) => {
              const isSelected = selected === i
              const isCorrect = i === Number(item.answer)
              let card = 'border-slate-200/90 bg-white text-semesta-ink hover:border-semesta-baby'
              if (checked !== null) {
                if (isCorrect) card = 'border-[#22C55E] bg-emerald-50 text-emerald-950 ring-2 ring-[#22C55E]/30'
                else if (isSelected) card = 'border-[#F59E0B] bg-amber-50 text-amber-950'
              } else if (isSelected) {
                card = 'border-semesta-deep bg-semesta-baby/20 text-semesta-ink ring-2 ring-semesta-deep/20'
              }
              return (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={checked !== null}
                  onClick={() => setSelected(i)}
                  className={`flex min-h-[54px] w-full items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition-all active:scale-[0.99] ${card}`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold ${
                      isSelected ? 'bg-semesta-deep text-white' : 'border border-semesta-baby/40 bg-semesta-bg text-semesta-deep'
                    }`}
                  >
                    {OPTION_LABELS[i] ?? i + 1}
                  </span>
                  <span className="flex-1 text-xs font-bold leading-snug">{opt}</span>
                  {checked !== null && isCorrect && <CheckCircle2 className="h-5 w-5 shrink-0 text-[#22C55E]" />}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-slate-200/90 bg-white p-4">
            <label htmlFor="quiz-numeric" className="mb-2 block text-xs font-bold text-slate-600">
              Jawabanmu{item.unit ? ` (dalam ${item.unit})` : ''}
            </label>
            <div className="flex items-center gap-2">
              <input
                id="quiz-numeric"
                type="text"
                inputMode="decimal"
                value={numeric}
                disabled={checked !== null}
                onChange={(e) => setNumeric(e.target.value)}
                placeholder="mis. 35,3"
                className={`font-mono-num min-h-[54px] w-full rounded-2xl border-2 px-4 text-lg font-bold tabular-nums outline-none transition-colors ${
                  checked === null
                    ? 'border-semesta-baby/60 focus:border-semesta-deep'
                    : checked
                      ? 'border-[#22C55E] bg-emerald-50'
                      : 'border-[#F59E0B] bg-amber-50'
                }`}
              />
              {item.unit && <span className="shrink-0 text-sm font-bold text-slate-500">{item.unit}</span>}
            </div>
            {checked !== null && !checked && (
              <p className="mt-2 text-xs font-semibold text-slate-600">
                Jawaban benar: <span className="font-mono-num font-bold text-semesta-deep">{String(item.answer).replace('.', ',')}</span>
                {item.unit ? ` ${item.unit}` : ''}
              </p>
            )}
          </div>
        )}

        {showHint && item.hints.length > 0 && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-semesta-amber bg-semesta-amber/25 p-3.5 text-xs text-semesta-ink">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <span className="block font-extrabold">Petunjuk {hintsUsed}:</span>
              <span>{item.hints[Math.min(hintsUsed - 1, item.hints.length - 1)]}</span>
            </div>
          </div>
        )}

        {checked !== null && (
          <div className="rounded-2xl border border-[#22C55E] bg-emerald-50 p-3.5 text-xs text-emerald-950">
            <span className="mb-0.5 block font-extrabold text-[#22C55E]">Pembahasan:</span>
            <span>{item.explanation}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-slate-200/70 bg-white p-4">
        {item.hints.length > 0 && checked === null && (
          <button
            type="button"
            onClick={() => {
              setHintsUsed((h) => Math.min(h + 1, item.hints.length))
              setShowHint(true)
            }}
            className="flex min-h-[50px] items-center justify-center gap-1.5 rounded-2xl bg-semesta-amber/30 px-4 text-xs font-extrabold text-semesta-ink transition-all hover:bg-semesta-amber/45 active:scale-95"
          >
            <Lightbulb className="h-4 w-4 text-amber-700" />
            <span>Petunjuk{hintsUsed > 0 ? ` (${hintsUsed})` : ''}</span>
          </button>
        )}
        {checked === null ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={!canCheck}
            className="flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl bg-semesta-deep text-sm font-extrabold text-white shadow-md shadow-semesta-deep/20 transition-all hover:bg-semesta-deep-dark active:scale-[0.98] disabled:opacity-40"
          >
            <span>Periksa</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl bg-semesta-deep text-sm font-extrabold text-white shadow-md shadow-semesta-deep/20 transition-all hover:bg-semesta-deep-dark active:scale-[0.98]"
          >
            <span>{isLast ? 'Lihat Hasil Kuis' : 'Soal Berikutnya'}</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  )
}
