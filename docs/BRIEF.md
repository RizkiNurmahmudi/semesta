# BRIEF.md — Briefing tetap untuk setiap sesi kerja (manusia & AI)

> Dokumen ini dibaca di awal setiap sesi kerja agar keputusan tidak "lupa".
> PRD lengkap: `docs/PRD.md`. Panduan visual: `docs/VISUAL_GUIDE.md`.

## Konteks proyek

**Semesta** — aplikasi belajar fisika & matematika, "dari nol sampai ahli, dalam satu tempat"
untuk seluruh keluarga. Keputusan terkunci (2 Okt 2026):

- Platform: **Android dulu** (PWA + APK Capacitor bila perlu); iPhone via PWA opsional.
- Target: **segala usia** termasuk anak <13 → kebijakan Families Play Store berlaku.
- **Bukan video-course**; video AI hanya klip pendek non-materi.
- **Seluruh aset visual AI-generated** (inventaris PRD 6.9, V1–V10).
- Gaya visual master: **flat vector ceria** + aturan "level dial" (lihat VISUAL_GUIDE.md).

## Struktur monorepo

```
apps/web            PWA React + Vite + TS + Tailwind
packages/sim-engine Engine numerik (RK4, fixed timestep) — TANPA React/DOM
packages/progress-core Mastery/streak/Leitner/XP — TANPA React/DOM
packages/content-schema Skema Zod: Concept, Lesson, QuizItem, Story, CaseStudy
packages/ui         Komponen desain bersama
content/            Konten sebagai kode (MDX + YAML), divalidasi saat build
tools/build-content Validasi konten (gagal bila ada pelanggaran)
docs/               PRD, BRIEF, VISUAL_GUIDE
```

## Aturan kerja (tidak boleh dilanggar)

1. `sim-engine` dan `progress-core` **TIDAK BOLEH** bergantung pada React/DOM.
2. Semua teks UI lewat sistem i18n (default Bahasa Indonesia) — jangan hardcode.
3. Semua besaran simulasi memakai **SI** dan satuan selalu ditampilkan.
4. Setiap simulasi: `init/step/draw/metrics` murni & deterministik; diuji vs solusi analitik.
5. Setiap soal **wajib** punya `explanation`; setiap gambar **wajib** punya `alt-text`.
6. AI **dilarang menggambar teks/rumus/angka** pada aset pelajaran (rawan salah).
7. Sebelum selesai: `pnpm test`, `pnpm lint`, `pnpm validate-content` harus hijau.
8. Jangan tambah dependency baru tanpa alasan tertulis.
9. Gaya commit: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
10. Tanpa pelacak/iklan pihak ketiga; data minimal (Families policy).

## Perintah penting

| Perintah | Fungsi |
|---|---|
| `pnpm dev` | Jalankan web (Vite) |
| `pnpm test` | Seluruh unit test (vitest) |
| `pnpm lint` | ESLint |
| `pnpm validate-content` | Validasi konten di `content/` |
| `pnpm build` | Build PWA produksi |
