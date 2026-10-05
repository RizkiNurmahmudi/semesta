import * as React from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from './index'

export interface TopBarProps {
  /** Label kecil di atas judul, mis. "Cerita Bergambar · L2". */
  kicker: string
  /** Judul utama. */
  title: string
  /** Aksi tombol kembali; bila tidak ada, tombol kembali disembunyikan. */
  onBack?: () => void
  backLabel?: string
  /** Slot kanan, mis. tombol "Naskah" / "Kuis". */
  action?: React.ReactNode
}

/** Bilah atas layar — dipakai semua layar lesson M1 (port dari desain Uizard). */
export function TopBar({ kicker, title, onBack, backLabel = 'Kembali', action }: TopBarProps) {
  return (
    <div className="grid grid-cols-[44px_1fr_auto] items-center gap-2 bg-white px-4 pb-3 pt-4">
      <div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-2xl text-semesta-ink transition-colors hover:bg-slate-100 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
          </button>
        )}
      </div>
      <div className="text-center">
        <span className="block text-[11px] font-bold text-semesta-deep">{kicker}</span>
        <h1 className="text-sm font-extrabold text-semesta-ink">{title}</h1>
      </div>
      <div className="flex min-w-[44px] justify-end">{action}</div>
    </div>
  )
}

export interface PrimaryButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

/** CTA primer besar sesuai bahasa visual desain (Deep Blue, rounded-2xl). */
export function PrimaryButton({ children, onClick, disabled, className }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl',
        'bg-semesta-deep font-extrabold text-sm text-white',
        'shadow-md shadow-semesta-deep/20 transition-all',
        'hover:bg-semesta-deep-dark active:scale-[0.98]',
        'disabled:opacity-50 disabled:active:scale-100',
        className,
      )}
    >
      {children}
    </button>
  )
}
