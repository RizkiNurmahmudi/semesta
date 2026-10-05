import { useEffect, useState } from 'react'
import { ArrowRight, BookOpen, FlaskConical, ListChecks, RotateCcw } from 'lucide-react'
import AnimatedSplashBackground from './components/AnimatedSplashBackground'
import { Quiz, type QuizResultData } from './features/lesson/Quiz'
import { QuizResult } from './features/lesson/QuizResult'
import { SimHost } from './features/lesson/SimHost'
import { StoryViewer } from './features/lesson/StoryViewer'
import { quizItems, story } from './lib/content'
import {
  getConceptProgress,
  getLessonProgress,
  getStreak,
  markLessonStep,
  type ConceptProgress,
  type LessonProgress,
} from './lib/db'

type Phase = 'splash' | 'story' | 'sim' | 'quiz' | 'result' | 'summary'

/** M1 vertical slice: Cerita → Simulasi → Kuis → Hasil → Ringkasan. */
export default function App() {
  const [phase, setPhase] = useState<Phase>('splash')
  const [quizRunId, setQuizRunId] = useState(0)
  const [quizResult, setQuizResult] = useState<QuizResultData | null>(null)
  const [mastery, setMastery] = useState(0)
  const [concept, setConcept] = useState<ConceptProgress | undefined>()
  const [lesson, setLesson] = useState<LessonProgress | undefined>()
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setPhase('story'), 1600)
    return () => clearTimeout(t)
  }, [])

  const loadSummary = async () => {
    const [c, l, s] = await Promise.all([getConceptProgress(), getLessonProgress(), getStreak()])
    setConcept(c)
    setLesson(l)
    setStreak(s)
    setMastery(c?.mastery ?? 0)
  }

  if (phase === 'splash') {
    return (
      <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-semesta-bg">
        <AnimatedSplashBackground />
        <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
          <img src="/logo.svg" alt="Logo Semesta" className="h-20 w-20 rounded-3xl shadow-lg" />
          <h1 className="text-3xl font-extrabold tracking-tight text-semesta-ink">Semesta</h1>
          <p className="text-sm font-semibold text-slate-600">Belajar Fisika & Matematika</p>
        </div>
      </div>
    )
  }

  if (phase === 'story') {
    return (
      <StoryViewer
        story={story}
        onSkip={async () => {
          await markLessonStep('storyDone')
          setPhase('sim')
        }}
        onDone={async () => {
          await markLessonStep('storyDone')
          setPhase('sim')
        }}
      />
    )
  }

  if (phase === 'sim') {
    return (
      <SimHost
        onBack={() => setPhase('story')}
        onDone={async () => {
          await markLessonStep('simDone')
          setPhase('quiz')
        }}
      />
    )
  }

  if (phase === 'quiz') {
    return (
      <Quiz
        key={quizRunId}
        items={quizItems}
        onBack={() => setPhase('sim')}
        onDone={async (r) => {
          const avg = r.points.reduce((a, b) => a + b, 0) / Math.max(1, r.points.length)
          await markLessonStep('quizDone', avg)
          const c = await getConceptProgress()
          setQuizResult(r)
          setMastery(c?.mastery ?? 0)
          setPhase('result')
        }}
      />
    )
  }

  if (phase === 'result' && quizResult) {
    return (
      <QuizResult
        result={quizResult}
        total={quizItems.length}
        mastery={mastery}
        onRetry={() => {
          setQuizRunId((id) => id + 1)
          setPhase('quiz')
        }}
        onDone={async () => {
          await loadSummary()
          setPhase('summary')
        }}
      />
    )
  }

  return <SummaryScreen concept={concept} lesson={lesson} streak={streak} onReplay={() => setPhase('story')} />
}

function SummaryScreen({
  concept,
  lesson,
  streak,
  onReplay,
}: {
  concept: ConceptProgress | undefined
  lesson: LessonProgress | undefined
  streak: number
  onReplay: () => void
}) {
  const steps = [
    { label: 'Cerita bergambar', done: lesson?.storyDone ?? false, icon: BookOpen },
    { label: 'Simulasi interaktif', done: lesson?.simDone ?? false, icon: FlaskConical },
    { label: 'Latihan kuis', done: lesson?.quizDone ?? false, icon: ListChecks },
  ]
  return (
    <div className="flex min-h-dvh flex-col bg-semesta-bg px-5 py-8 text-semesta-ink">
      <div className="mx-auto w-full max-w-md space-y-5">
        <div className="text-center">
          <span className="inline-block rounded-2xl bg-semesta-baby/25 px-3.5 py-1.5 text-xs font-extrabold text-semesta-deep">
            Lesson Selesai
          </span>
          <h1 className="mt-2 text-2xl font-extrabold">Bola Basket Kirana</h1>
          <p className="text-sm text-slate-600">Gerak Parabola · L0–L1</p>
        </div>

        <div className="space-y-2.5 rounded-3xl border border-slate-200/80 bg-white p-4">
          {steps.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  s.done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <s.icon className="h-4 w-4" />
              </span>
              <span className="flex-1 text-sm font-bold">{s.label}</span>
              <span className={`text-xs font-extrabold ${s.done ? 'text-emerald-600' : 'text-slate-400'}`}>
                {s.done ? 'Selesai' : 'Belum'}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="rounded-2xl border border-semesta-baby/50 bg-white p-3 text-center">
            <div className="font-mono-num text-xl font-extrabold tabular-nums text-semesta-deep">
              {Math.round((concept?.mastery ?? 0) * 100)}%
            </div>
            <div className="text-[11px] font-bold text-slate-500">Penguasaan</div>
          </div>
          <div className="rounded-2xl border border-semesta-amber/60 bg-white p-3 text-center">
            <div className="font-mono-num text-xl font-extrabold tabular-nums text-amber-600">
              {concept?.xp ?? 0}
            </div>
            <div className="text-[11px] font-bold text-slate-500">Total XP</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
            <div className="font-mono-num text-xl font-extrabold tabular-nums text-semesta-ink">
              {streak}
            </div>
            <div className="text-[11px] font-bold text-slate-500">Streak hari</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onReplay}
          className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-semesta-deep text-sm font-extrabold text-white shadow-md shadow-semesta-deep/20 transition-all hover:bg-semesta-deep-dark active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Ulangi Lesson</span>
        </button>
        <button
          type="button"
          onClick={onReplay}
          className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl text-xs font-bold text-slate-500 underline underline-offset-4 hover:text-semesta-deep"
        >
          <span>Lanjut eksplorasi</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
