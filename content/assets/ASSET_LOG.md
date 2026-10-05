# ASSET_LOG.md — Log aset visual AI-generated

Setiap aset visual dicatat di sini (PRD 6.9): prompt/seed, alat, tanggal,
ketentuan lisensi alat, dan alt-text.

| Aset | File | Alat & tanggal | Prompt/seed | Lisensi | Alt-text |
|---|---|---|---|---|---|
| Lembar karakter v1 (Kirana, Kakek, Dimas, Bu Ratna + ekspresi) | `assets/visual/character-sheet-v1.webp` | Muse media pipeline, 2026-10-02 | Character reference sheet, flat vector, cheerful Indonesian children's storybook style… (lihat docs/VISUAL_GUIDE.md §4) | Dibuat via Muse untuk proyek ini | Ilustrasi empat tokoh: anak perempuan, kakek, remaja laki-laki, dan ibu, masing-masing dengan variasi ekspresi senang dan berpikir, gaya vektor flat ceria. |
| Contoh panel "Bola Basket Kirana" v1 | `assets/visual/sample-panel-bola-basket-v1.webp` | Muse media pipeline, 2026-10-02 | Storybook panel, flat vector, cheerful Indonesian children's storybook style… (lihat docs/VISUAL_GUIDE.md §4) | Dibuat via Muse untuk proyek ini | Kirana memegang bola basket memandang ring dengan bingung, kakek tersenyum menyemangati di sampingnya, lapangan basket sore hari. |
| Ikon aplikasi 512/192 + maskable | `apps/web/public/icons/icon-*.png` | Muse media pipeline, 2026-10-02 | Atom with two elliptical orbits, flat vector, indigo & amber | Dibuat via Muse untuk proyek ini | Ikon atom dengan dua orbit elips, latar indigo, orbit kuning amber. |
| Logo kanonis (SVG vektor, dari logo splash pilihan user) | `apps/web/public/logo.svg` | Diekstrak dari `SemestaAtomLogo` desain Uizard (2026-10-05) | Buatan sendiri dari desain terpilih | Logo atom Semesta: emblem biru tua, orbit biru muda, inti amber. |
| Ikon PWA 512/192 + maskable (regenerasi) | `apps/web/public/icons/icon-*.png` | Render cairosvg dari `logo.svg` (2026-10-05) | Buatan sendiri dari desain terpilih | Ikon atom dengan dua orbit elips, latar biru tua, orbit biru muda, inti kuning amber. |
| 6 panel cerita "Bola Basket Kirana" (p1–p6) | `apps/web/public/img/stories/story-bola-basket-kirana/p{N}.webp` | Muse media pipeline, 2026-10-05 | Flat vector, cheerful Indonesian children's storybook style; referensi character-sheet-v1 (konsistensi Kirana & Kakek); tanpa teks di dalam gambar | Dibuat via Muse untuk proyek ini | Panel 1: Kirana memegang bola basket bertanya pada kakek; panel 2: bola melengkung turun sebelum sampai ring; panel 3: kakek memperagakan lemparan miring; panel 4: dua garis lintasan (datar vs parabola); panel 5: ajakan mencoba simulator; panel 6: bola masuk ring, Kirana melompat gembira. |
