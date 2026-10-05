import { useState } from 'react'
import { ArrowRight, BookOpen } from 'lucide-react'
import { PrimaryButton, TopBar } from '@semesta/ui'
import type { Story } from '../../lib/content'

interface StoryViewerProps {
  story: Story
  onDone: () => void
  onSkip: () => void
}

const SPEAKER_STYLE: Record<string, string> = {
  kirana: 'bg-semesta-baby/40 text-semesta-deep',
  kakek: 'bg-semesta-amber/40 text-amber-800',
}

function speakerLabel(who: string): string {
  return who === 'kirana' ? 'Kirana' : who === 'kakek' ? 'Kakek' : who
}

/** Layar cerita bergambar — diport dari desain, data dari content/stories YAML. */
export function StoryViewer({ story, onDone, onSkip }: StoryViewerProps) {
  const [panelIdx, setPanelIdx] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const panel = story.panels[panelIdx]
  const total = story.panels.length
  const isLast = panelIdx === total - 1

  return (
    <div className="flex h-full min-h-dvh flex-col justify-between bg-semesta-bg text-semesta-ink">
      <TopBar
        kicker={`Cerita Bergambar · ${story.levels.join(', ')}`}
        title={`Panel ${panelIdx + 1} dari ${total}`}
        action={
          <button
            type="button"
            onClick={() => setShowNotes(!showNotes)}
            className="flex min-h-[40px] items-center gap-1 rounded-xl bg-semesta-baby/20 px-2.5 text-[11px] font-bold text-semesta-deep"
            title="Lihat catatan naskah"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Naskah</span>
          </button>
        }
      />

      {/* Panel ilustrasi AI */}
      <div className="relative w-full overflow-hidden border-b border-semesta-baby/40 bg-semesta-panel">
        <img
          src={panel.image}
          alt={panel.alt}
          className="aspect-video w-full object-cover"
          loading={panelIdx === 0 ? 'eager' : 'lazy'}
        />
        <div className="absolute left-3 top-3 rounded-xl bg-white/90 px-3 py-1 text-[11px] font-extrabold text-semesta-deep shadow-sm backdrop-blur-sm">
          {panelIdx + 1}. {story.title}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-3.5 px-4 py-4">
        <div className="space-y-3">
          {panel.dialogue.length > 0 && (
            <div className="relative rounded-3xl border-2 border-semesta-baby bg-white p-3.5 shadow-sm">
              {panel.dialogue.map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full text-lg font-extrabold ${SPEAKER_STYLE[d.who] ?? 'bg-slate-100 text-slate-600'}`}
                    aria-hidden
                  >
                    {speakerLabel(d.who).charAt(0)}
                  </div>
                  <div className="flex-1">
                    <span className="mb-0.5 block text-xs font-extrabold text-semesta-deep">
                      {speakerLabel(d.who)} berkata:
                    </span>
                    <p className="text-xs font-semibold italic leading-relaxed text-semesta-ink">
                      &ldquo;{d.text}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-3.5">
            <p className="text-xs leading-relaxed text-slate-700">{panel.caption}</p>
          </div>

          {showNotes && (
            <div className="space-y-1.5 rounded-2xl border border-semesta-amber bg-[#FFFBEB] p-3 text-[11px] text-slate-700">
              <div>
                <strong className="text-semesta-ink">Judul:</strong> {story.title}
              </div>
              <div>
                <strong className="text-semesta-ink">Pertanyaan belajar:</strong>{' '}
                {story.learningQuestion}
              </div>
              <div>
                <strong className="text-semesta-ink">Tokoh:</strong>{' '}
                {story.characters.map(speakerLabel).join(', ')}
              </div>
              <div className="italic text-slate-600">
                <strong>(Deskripsi visual:</strong> {panel.alt}
                <strong>)</strong>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Pilih panel cerita">
            {story.panels.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPanelIdx(idx)}
                aria-label={`Panel ${idx + 1} dari ${total}`}
                aria-selected={idx === panelIdx}
                className={`h-2.5 rounded-full transition-all ${
                  idx === panelIdx ? 'w-7 bg-semesta-deep' : 'w-2.5 bg-semesta-baby/60 hover:bg-semesta-baby'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            {panelIdx > 0 && (
              <button
                type="button"
                onClick={() => setPanelIdx(panelIdx - 1)}
                className="min-h-[50px] rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
              >
                Sebelumnya
              </button>
            )}
            <PrimaryButton onClick={() => (isLast ? onDone() : setPanelIdx(panelIdx + 1))}>
              <span>{isLast ? 'Mulai Simulasi' : 'Lanjut'}</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </PrimaryButton>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onSkip}
              className="py-1 text-xs font-semibold text-slate-500 underline underline-offset-4 hover:text-semesta-deep"
            >
              Lewati ke simulasi
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
