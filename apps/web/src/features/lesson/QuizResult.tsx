import { useEffect, useState } from 'react'
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react'
import type { QuizResultData } from './Quiz'
import { Trophy } from './Trophy'

interface QuizResultProps {
  result: QuizResultData
  total: number
  mastery: number
  onDone: () => void
  onRetry: () => void
}

/** Layar hasil kuis — skor, XP, dan penguasaan konsep (diport dari desain). */
export function QuizResult({ result, total, mastery, onDone, onRetry }: QuizResultProps) {
  const [barWidth, setBarWidth] = useState(0)
  const score = Math.round((result.points.reduce((a, b) => a + b, 0) / Math.max(1, total)) * 100)

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(Math.round(mastery * 100)), 180)
    return () => clearTimeout(t)
  }, [mastery])

  return (
    <div className="flex h-full min-h-dvh flex-col justify-between bg-semesta-bg px-5 py-6 text-semesta-ink">
      <div className="text-center">
        <span className="inline-block rounded-2xl bg-semesta-baby/25 px-3.5 py-1.5 text-xs font-extrabold text-semesta-deep">
          Latihan Selesai · Gerak Parabola L2
        </span>
      </div>

      <div className="my-auto flex flex-col items-center py-4 text-center">
        <div className="mb-4">
          <Trophy size={140} />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-semesta-ink">
          {score >= 80 ? 'Hebat!' : score >= 60 ? 'Bagus!' : 'Terus Berlatih!'} Skor {score}
        </h1>
        <p className="mt-1 max-w-[260px] text-xs leading-relaxed text-slate-600">
          Kamu menjawab {result.correctCount} dari {total} soal dengan benar.
        </p>

        <div className="font-mono-num mt-4 inline-flex items-center gap-2 rounded-2xl bg-semesta-amber px-4 py-2 text-sm font-extrabold tabular-nums text-semesta-ink shadow-sm">
          <Sparkles className="h-4 w-4 fill-semesta-ink" />
          <span>+{result.xpGained} XP</span>
        </div>

        <div className="mt-6 w-full rounded-3xl border border-semesta-baby/50 bg-white p-4 text-left shadow-sm">
          <div className="mb-2 flex items-center justify-between text-xs font-extrabold">
            <span className="text-semesta-ink">Penguasaan Gerak Parabola</span>
            <span className="font-mono-num tabular-nums text-[#22C55E]">{barWidth}%</span>
          </div>
          <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${barWidth}%`,
                background: 'linear-gradient(90deg, #89CFF0 0%, #1E6FB8 60%, #22C55E 100%)',
              }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Level 2 {mastery >= 0.6 ? 'Dikuasai' : 'Dalam Progres'}</span>
            <span className="font-bold text-semesta-deep">
              {mastery >= 0.6 ? 'Siap ke materi berikutnya!' : 'Ayo coba lagi!'}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <button
          type="button"
          onClick={onDone}
          className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-semesta-deep px-4 text-sm font-extrabold text-white shadow-lg shadow-semesta-deep/20 transition-all hover:bg-semesta-deep-dark active:scale-[0.98]"
        >
          <span>Selesai & Lihat Progres</span>
          <ArrowRight className="h-4 w-4 shrink-0 stroke-[2.5]" />
        </button>
        <button
          type="button"
          onClick={onRetry}
          className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Ulangi Kuis</span>
        </button>
      </div>
    </div>
  )
}
