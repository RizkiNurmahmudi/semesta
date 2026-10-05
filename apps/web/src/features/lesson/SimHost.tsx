import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  RotateCcw,
  Target,
} from 'lucide-react'
import { TopBar } from '@semesta/ui'
import {
  TARGET_DISTANCE,
  analyticFlightTime,
  analyticMaxHeight,
  analyticRange,
  createStepper,
  projectileSim,
  type ProjectileParams,
  type ProjectileState,
} from '@semesta/sim-engine'

interface SimHostProps {
  onDone: () => void
  onBack: () => void
}

const formatComma = (n: number) => n.toFixed(1).replace('.', ',')

const DEFAULTS: ProjectileParams = { angleDeg: 45, velocity: 20 }

/** Laboratorium virtual Gerak Parabola — fisika dari @semesta/sim-engine. */
export function SimHost({ onDone, onBack }: SimHostProps) {
  const [params, setParams] = useState<ProjectileParams>(DEFAULTS)
  const [isPlaying, setIsPlaying] = useState(false)
  const [landed, setLanded] = useState(false)
  const [showFormula, setShowFormula] = useState(false)
  const [, setFrame] = useState(0)

  const stateRef = useRef<ProjectileState>(projectileSim.init(DEFAULTS))
  const paramsRef = useRef(params)
  const stepperRef = useRef(createStepper(1 / 60))
  paramsRef.current = params

  const resetSim = (p: ProjectileParams) => {
    stateRef.current = projectileSim.init(p)
    stepperRef.current.reset()
    setLanded(false)
    setIsPlaying(false)
    setFrame((f) => f + 1)
  }

  const setParam = (patch: Partial<ProjectileParams>) => {
    const next = { ...paramsRef.current, ...patch }
    setParams(next)
    resetSim(next)
  }

  useEffect(() => {
    if (!isPlaying) return
    let raf = 0
    let last = performance.now()
    const loop = (now: number) => {
      const frameDt = (now - last) / 1000
      last = now
      stepperRef.current.update(frameDt, () => {
        const next = projectileSim.step(stateRef.current, 1 / 60, paramsRef.current)
        stateRef.current = next
        if (next.t > 0 && next.y === 0 && next.vy === 0) {
          setIsPlaying(false)
          setLanded(true)
        }
      })
      setFrame((f) => f + 1)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [isPlaying])

  const s = stateRef.current
  const m = projectileSim.metrics(s, params)
  const challenge = projectileSim.challenges![0]
  const challengeDone = landed && challenge.check(s)

  // --- Pemetaan koordinat fisika (meter) ke kanvas SVG ---
  const startX = 34
  const groundY = 166
  const scale = 3.2
  const toPx = (xM: number, yM: number): [number, number] => [
    startX + xM * scale,
    groundY - Math.max(0, yM) * scale,
  ]

  const rad = (params.angleDeg * Math.PI) / 180
  const totalTime = analyticFlightTime(params.velocity, params.angleDeg)
  const points: string[] = []
  for (let i = 0; i <= 40; i++) {
    const t = (i / 40) * totalTime
    const xM = params.velocity * Math.cos(rad) * t
    const yM = params.velocity * Math.sin(rad) * t - 0.5 * 9.8 * t * t
    const [px, py] = toPx(xM, yM)
    points.push(`${px.toFixed(1)},${py.toFixed(1)}`)
  }
  const [ballPx, ballPy] = toPx(s.x, s.y)
  const [landingPx] = toPx(m.range, 0)
  const [targetPx] = toPx(TARGET_DISTANCE, 0)

  return (
    <div className="flex h-full min-h-dvh flex-col justify-between bg-semesta-bg text-semesta-ink">
      <TopBar
        kicker="Laboratorium Virtual · L2"
        title="Simulasi Gerak Parabola"
        onBack={onBack}
        backLabel="Kembali"
      />

      <div className="flex-1 space-y-3.5 px-4 py-3.5">
        {/* Kanvas */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-semesta-baby bg-semesta-panel shadow-sm">
          <div className="pointer-events-none absolute left-3 right-3 top-3 z-10 flex items-center justify-between gap-2">
            <div className="rounded-2xl bg-semesta-deep px-3 py-1.5 text-xs font-extrabold tabular-nums text-white shadow-sm">
              Jangkauan: {formatComma(m.range)} m
            </div>
            <div className="rounded-xl border border-semesta-baby bg-white/90 px-2.5 py-1 text-[11px] font-bold tabular-nums text-semesta-ink backdrop-blur-sm">
              Tinggi maks: {formatComma(m.maxHeight)} m
            </div>
          </div>

          {challengeDone && (
            <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/95 px-3 py-2 text-xs font-extrabold text-white shadow-md">
              <Target className="h-4 w-4" />
              Tantangan selesai: tepat mengenai target!
            </div>
          )}

          <svg
            viewBox="0 0 340 195"
            className="block h-auto w-full select-none"
            role="img"
            aria-label="Kanvas simulasi lintasan gerak parabola"
          >
            <g stroke="#89CFF0" strokeOpacity="0.45" strokeWidth="1">
              <line x1="34" y1="40" x2="34" y2="166" />
              <line x1="98" y1="40" x2="98" y2="166" />
              <line x1="162" y1="40" x2="162" y2="166" />
              <line x1="226" y1="40" x2="226" y2="166" />
              <line x1="290" y1="40" x2="290" y2="166" />
              <line x1="20" y1="134" x2="325" y2="134" />
              <line x1="20" y1="102" x2="325" y2="102" />
              <line x1="20" y1="70" x2="325" y2="70" />
            </g>
            <rect x="0" y="166" width="340" height="29" fill="#4ADE80" />
            <line x1="0" y1="166" x2="340" y2="166" stroke="#16A34A" strokeWidth="2" />
            <g fill="#1E293B" fontSize="9" fontWeight="700">
              <text x="34" y="182" textAnchor="middle">0 m</text>
              <text x="98" y="182" textAnchor="middle">20 m</text>
              <text x="164" y="182" textAnchor="middle">40,8 m</text>
              <text x="230" y="182" textAnchor="middle">60 m</text>
            </g>
            <g transform={`translate(${targetPx}, ${groundY})`}>
              <ellipse cx="0" cy="0" rx="14" ry="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="7" ry="2.5" fill="#FFC53D" />
              <line x1="0" y1="0" x2="0" y2="-22" stroke="#1E293B" strokeWidth="1.8" />
              <polygon points="0,-22 14,-17 0,-12" fill="#22C55E" />
            </g>
            <polyline
              fill="none"
              stroke="#1E6FB8"
              strokeWidth="3"
              strokeDasharray="5 5"
              strokeLinecap="round"
              points={points.join(' ')}
            />
            <line
              x1={startX}
              y1={groundY}
              x2={startX + 28 * Math.cos(rad)}
              y2={groundY - 28 * Math.sin(rad)}
              stroke="#1E6FB8"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx={startX} cy={groundY} r="7" fill="#1E6FB8" />
            <circle cx={landingPx} cy={groundY} r="4.5" fill="#1E6FB8" />
            <g transform={`translate(${ballPx}, ${ballPy})`}>
              <circle r="11" fill="#FFC53D" fillOpacity="0.35" />
              <circle r="7.5" fill="#FFC53D" stroke="#1E6FB8" strokeWidth="2.2" />
            </g>
          </svg>
        </div>

        {/* Slider */}
        <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="slider-sudut" className="text-xs font-extrabold text-semesta-ink">
                Sudut {params.angleDeg}°
              </label>
              <span className="text-[11px] font-semibold tabular-nums text-semesta-deep">
                {params.angleDeg === 45 ? '★ Sudut Optimal (45°)' : 'Rentang: 15° – 80°'}
              </span>
            </div>
            <input
              id="slider-sudut"
              type="range"
              min={15}
              max={80}
              step={1}
              value={params.angleDeg}
              onChange={(e) => setParam({ angleDeg: Number(e.target.value) })}
              className="semesta-slider w-full bg-semesta-baby/45"
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="slider-kecepatan" className="text-xs font-extrabold text-semesta-ink">
                Kecepatan {params.velocity} m/s
              </label>
              <span className="text-[11px] font-semibold tabular-nums text-slate-500">
                Waktu melayang: {formatComma(m.flightTime)} dtk
              </span>
            </div>
            <input
              id="slider-kecepatan"
              type="range"
              min={10}
              max={30}
              step={1}
              value={params.velocity}
              onChange={(e) => setParam({ velocity: Number(e.target.value) })}
              className="semesta-slider w-full bg-semesta-amber/45"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                if (landed) resetSim(paramsRef.current)
                setIsPlaying(true)
              }}
              className={`flex min-h-[46px] items-center justify-center gap-1.5 rounded-2xl text-xs font-extrabold transition-all active:scale-95 ${
                isPlaying ? 'bg-slate-200 text-slate-700' : 'bg-semesta-deep text-white shadow-sm shadow-semesta-deep/20'
              }`}
            >
              <Play className="h-4 w-4 fill-current" />
              <span>{landed ? 'Ulangi' : 'Mulai'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              className="flex min-h-[46px] items-center justify-center gap-1.5 rounded-2xl bg-semesta-baby/25 text-xs font-extrabold text-semesta-deep transition-all hover:bg-semesta-baby/40 active:scale-95"
            >
              <Pause className="h-4 w-4" />
              <span>Jeda</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setParams(DEFAULTS)
                resetSim(DEFAULTS)
              }}
              className="flex min-h-[46px] items-center justify-center gap-1.5 rounded-2xl bg-slate-100 text-xs font-extrabold text-slate-700 transition-all hover:bg-slate-200 active:scale-95"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Rumus */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white">
          <button
            type="button"
            onClick={() => setShowFormula(!showFormula)}
            aria-expanded={showFormula}
            className="flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-50"
          >
            <span className="flex items-center gap-2 text-xs font-extrabold text-semesta-deep">
              <span>Lihat rumus</span>
              <span className="text-[11px] font-medium text-slate-500">(Jangkauan & Tinggi Maksimum)</span>
            </span>
            {showFormula ? <ChevronUp className="h-4 w-4 text-semesta-deep" /> : <ChevronDown className="h-4 w-4 text-semesta-deep" />}
          </button>
          {showFormula && (
            <div className="space-y-2.5 border-t border-slate-100 px-4 pb-4 pt-1 text-xs">
              <div className="font-mono-num space-y-1 rounded-2xl bg-semesta-bg p-3 text-semesta-ink">
                <div className="font-bold text-semesta-deep">Jangkauan (R) = (v₀² · sin(2θ)) / g</div>
                <div className="text-[11px] text-slate-600">
                  R = ({params.velocity}² · sin({2 * params.angleDeg}°)) / 9,8 ={' '}
                  <strong className="text-semesta-ink">{formatComma(analyticRange(params.velocity, params.angleDeg))} m</strong>
                </div>
                <div className="font-bold text-semesta-deep">Tinggi maks (H) = (v₀² · sin²θ) / 2g</div>
                <div className="text-[11px] text-slate-600">
                  H = <strong className="text-semesta-ink">{formatComma(analyticMaxHeight(params.velocity, params.angleDeg))} m</strong>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Karena nilai maksimum <span className="font-mono-num">sin(2θ)</span> adalah 1 (saat{' '}
                <span className="font-mono-num">2θ = 90°</span>), sudut{' '}
                <strong className="text-semesta-deep">θ = 45°</strong> selalu memberikan jangkauan terjauh!
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200/70 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onDone}
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-semesta-deep text-xs font-extrabold text-white shadow-sm transition-all hover:bg-semesta-deep-dark active:scale-[0.99]"
        >
          <span>Lanjut ke Latihan Kuis</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
