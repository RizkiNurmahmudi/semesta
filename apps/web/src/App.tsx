/** Placeholder M0 — diganti Katalog (FR-01) di M2. */
export default function App() {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-indigo-700">Semesta</h1>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Fondasi M0
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-md px-4 py-8">
        <h2 className="text-2xl font-bold">Belajar Fisika &amp; Matematika</h2>
        <p className="mt-2 text-slate-600">
          Dari nol sampai ahli, dalam satu tempat — untuk seluruh keluarga.
        </p>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Status fondasi</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>✅ PWA + offline app shell</li>
            <li>✅ Skema konten tervalidasi (Zod)</li>
            <li>✅ Engine simulasi &amp; progres teruji</li>
            <li>🔜 Vertical slice: Gerak Parabola (M1)</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
