# Panduan Implementasi — AI, Environment, Roadmap & Monetisasi
## Pendamping PRD Aplikasi Belajar Fisika & Matematika

| | |
|---|---|
| **Versi** | 0.1 |
| **Tanggal** | 2 Oktober 2026 |
| **Mengacu pada** | `PRD-Aplikasi-Belajar-Fisika-Matematika.md` v0.1 |

> Dokumen ini praktis dan dapat berubah cepat — nama produk AI, harga, dan kebijakan toko aplikasi disebut di sini berdasarkan kondisi awal Oktober 2026 dan **perlu dicek ulang** sebelum dieksekusi, terutama bagian harga dan kebijakan Play Store.

## Daftar Isi

1. Ringkasan Rekomendasi
2. AI untuk Pengembangan (Coding)
3. Setup Environment & MCP
4. AI untuk Kebutuhan Visual
5. Roadmap Eksekusi + Perintah/Prompt Siap Pakai
6. Rencana Ekspansi Mata Pelajaran Lain
7. Strategi Monetisasi yang Adil
8. Checklist Cepat & Anggaran

---

## 1. Ringkasan Rekomendasi

| Kebutuhan | Rekomendasi utama | Alasan singkat |
|---|---|---|
| Asisten coding agentic (arsitektur, fitur besar, refactor) | **Claude Code** (CLI) | Penalaran kuat untuk tugas multi-file, bisa memakai MCP, cocok untuk proyek dengan banyak domain (konten, simulasi, progres) |
| Editor sehari-hari / autocomplete cepat | **VS Code + ekstensi Claude Code**, atau **Windsurf (tier gratis)** | Tidak menambah biaya; gunakan Claude Code untuk pekerjaan berat, editor untuk penyuntingan cepat |
| Tugas ringan, dokumentasi, brainstorming, draf konten teks | **Gemini Pro (langganan yang sudah Anda punya)** | Sudah dibayar 18 bulan — manfaatkan untuk hal yang tidak butuh agen coding penuh, termasuk Gemini CLI jika ingin dari terminal |
| Gambar (ilustrasi cerita, ikon, aset UI) | **Gemini (Nano Banana 2)** dari langganan yang sudah ada → **Ideogram** (gratis/murah, kuat untuk teks/logo) sebagai pelengkap | Hemat biaya; baru pertimbangkan Midjourney bila butuh gaya artistik khusus |
| Video (promosi, intro aplikasi, mungkin konten edukasi) | **Google Veo** lewat Gemini Pro/Flow, atau **Canva/CapCut** untuk edit | Veo kuat untuk klip pendek dengan audio; untuk video penjelasan panjang, edit manual tetap diperlukan |
| Desain UI/UX (wireframe → komponen) | **Figma** (gratis untuk 1 orang) + MCP Figma (opsional, versi dev butuh seat berbayar) | Figma tetap standar industri; MCP mempercepat "desain ke kode" bila nanti budget tersedia |
| Backend (Fase 2) | **FastAPI + PostgreSQL** (sesuai PRD) atau **Supabase** sebagai jalan pintas | Supabase mempercepat MVP backend bila Anda ingin menunda menulis API sendiri |

**Prinsip anggaran:** karena Anda mahasiswa dan proyek ini dimulai untuk keluarga, **jangan berlangganan alat baru sebelum benar-benar mentok**. Urutan pemakaian uang yang disarankan:

1. Pakai yang gratis/sudah dimiliki (Gemini Pro, Figma gratis, VS Code, Windsurf gratis).
2. Baru pertimbangkan **Claude Code** dengan paket termurah yang cukup (Pro) ketika proyek mulai kompleks dan Anda terasa dibatasi.
3. Alat visual berbayar (Midjourney/Ideogram Plus) hanya kalau versi gratis benar-benar tidak cukup untuk konsistensi gaya.

### Keputusan produk yang sudah dikunci (2 Oktober 2026)

- **Platform:** Android dulu (PWA + APK Capacitor bila perlu); iPhone via PWA opsional, bukan jalur utama.
- **Target usia:** segala usia, termasuk anak di bawah 13 tahun → kebijakan **Families** Play Store berlaku; parental gate dan data minimal wajib sejak MVP.
- **Video:** hanya klip pendek non-materi (hook cerita 5–15 detik, promosi, empty-state); aplikasi tetap bukan video-course.
- **Aset visual:** seluruhnya AI-generated sesuai inventaris PRD 6.9 (V1–V10); ikon fungsional kecil boleh pakai set vektor siap pakai (Heroicons/Phosphor).
- **Monetisasi:** sesuai §7 panduan ini (L0–L3 gratis selamanya; Family Pass sekali bayar untuk L4–L5/sandbox; opsi lisensi sekolah).

---

## 2. AI untuk Pengembangan (Coding)

### 2.1 Mengapa Claude Code sebagai agen utama

Proyek ini punya ciri yang cocok untuk agen coding agentic: **banyak domain yang saling terhubung** (engine simulasi, skema konten, progres, PWA/offline, nanti backend) yang perlu konsisten satu sama lain. Claude Code bekerja dari terminal, bisa membaca seluruh repo, menjalankan perintah, dan — yang penting untuk proyek ini — bisa disambungkan ke MCP server (Bagian 3) agar punya akses ke dokumentasi library, browser untuk menguji UI, dan repositori GitHub.

**Alternatif yang masuk akal, tergantung preferensi Anda:**

| Alat | Kapan cocok dipakai |
|---|---|
| **Cursor** | Bila Anda ingin pengalaman IDE penuh dengan AI terintegrasi (autocomplete + chat di satu tempat), menggantikan VS Code |
| **Windsurf** | Alternatif gratis/murah ke Cursor; cocok bila anggaran sangat ketat |
| **Gemini CLI** | Gratis dan Anda sudah punya Gemini Pro — bisa jadi agen cadangan untuk tugas yang tidak butuh kedalaman penalaran tinggi (mis. menulis boilerplate, draf dokumentasi) |
| **GitHub Copilot** | Autocomplete ringan di editor; pelengkap, bukan pengganti agen |

**Rekomendasi pola kerja:** pakai **Claude Code sebagai "arsitek & pembangun fitur"** (membuat struktur, menulis engine simulasi, menyambungkan progres, menulis uji), dan **VS Code biasa** (gratis) untuk menelusuri/menyunting kode kecil-kecil setelahnya. Manfaatkan Gemini Pro yang sudah dibayar untuk pekerjaan pendukung: menulis draf naskah cerita, draf soal kuis, dokumentasi, atau brainstorming studi kasus industri — ini mengurangi beban pada kuota alat coding berbayar.

### 2.2 Model & paket (cek harga terbaru sebelum membeli)

Sebelum berlangganan paket berbayar apa pun, cek halaman resmi:
- Claude: https://claude.com/pricing dan https://docs.claude.com (untuk Claude Code)
- Harga dan kuota berubah; jangan jadikan angka di artikel pihak ketiga sebagai acuan final.

Untuk mulai, **paket gratis/termurah biasanya cukup** untuk vertical slice (M0–M1 di roadmap). Naikkan paket hanya saat Anda benar-benar kehabisan kuota secara rutin.

---

## 3. Setup Environment & MCP

### 3.1 Tools inti yang perlu terpasang (Windows)

| Tools | Fungsi | Catatan |
|---|---|---|
| **Node.js (LTS)** | Menjalankan Claude Code, build tool (Vite), tooling JS | Instal dari nodejs.org atau lewat `winget install OpenJS.NodeJS.LTS` |
| **pnpm** | Package manager monorepo | `npm install -g pnpm` |
| **Git + akun GitHub** | Version control, kolaborasi dengan AI lewat GitHub MCP | Pasang Git for Windows |
| **Python 3.11** | Backend Fase 2 (FastAPI), skrip bantu | Anda sudah memakai 3.11.9 — cukup |
| **VS Code** | Editor utama | Ekstensi: ESLint, Prettier, Tailwind CSS IntelliSense, Python |
| **Docker Desktop (WSL2)** | Menjalankan PostgreSQL lokal untuk Fase 2 | Opsional sampai backend mulai dikerjakan |
| **Android Studio** | Build APK/AAB via Capacitor | Baru dibutuhkan mendekati Fase Play Store |
| **Figma (akun gratis)** | Wireframe & desain visual | 1 editor gratis sudah cukup untuk solo |

### 3.2 Memasang Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Jalankan `claude` di folder proyek untuk memulai sesi. Saat pertama kali, Claude Code akan meminta Anda masuk (login) dengan akun Claude.

**Berkas `CLAUDE.md` di root repo** — ini "briefing" permanen yang otomatis dibaca Claude Code setiap sesi. Isi awal yang disarankan:

```markdown
# Konteks Proyek — Aplikasi Belajar Fisika & Matematika

Lihat PRD lengkap di `/docs/PRD.md`. Ringkasan untuk Claude Code:

- Monorepo: apps/web (PWA React+Vite+TS), packages/sim-engine,
  packages/progress-core, packages/content-schema, content/ (MDX+YAML).
- sim-engine dan progress-core TIDAK BOLEH bergantung pada React/DOM.
- Semua teks UI harus lewat sistem i18n (default: Bahasa Indonesia),
  jangan hardcode string ke komponen.
- Satuan SI selalu ditampilkan pada simulasi.
- Setiap simulasi WAJIB: init/step/draw/metrics murni (tanpa efek
  samping), diuji terhadap solusi analitik (lihat PRD 10.5).
- Sebelum submit fitur: jalankan `pnpm test` dan `pnpm lint`, pastikan hijau.
- Gaya commit: Conventional Commits (feat:, fix:, chore:, docs:).
- Jangan menambah dependency baru tanpa menyebutkan alasannya di PR.
```

Perbarui berkas ini setiap kali ada keputusan arsitektur baru — ini mencegah Claude Code "lupa" konteks di sesi baru.

### 3.3 MCP server yang relevan untuk proyek ini

MCP (Model Context Protocol) memberi Claude Code akses ke alat/data di luar perannya sebagai model bahasa biasa. Tidak semua MCP perlu dipasang sekaligus — pasang sesuai kebutuhan fase.

| MCP Server | Fungsi untuk proyek ini | Perlu dipasang sejak |
|---|---|---|
| **GitHub MCP** | Claude bisa baca/buat issue, PR, telusuri riwayat commit | M0 (sejak repo dibuat) |
| **Context7** | Menarik dokumentasi terbaru library (React, Dexie, Zod, dll.) agar Claude tidak memakai API versi lama | M0 |
| **Playwright MCP** | Menjalankan browser sungguhan untuk menguji alur UI (mis. memverifikasi pelajaran → simulasi → kuis berjalan) | M1 (setelah ada UI untuk diuji) |
| **Figma MCP** *(opsional)* | Mengambil struktur desain dari Figma untuk dikonversi ke komponen | Hanya jika Anda mendesain dulu di Figma dan punya akses Figma Dev Mode |
| **Supabase MCP** *(opsional, Fase 2)* | Bila memilih Supabase sebagai jalan pintas backend: Claude bisa baca skema, tulis migrasi | Fase 2, jika Supabase dipakai |
| **Filesystem (bawaan)** | Claude Code sudah otomatis punya akses ke file proyek — tidak perlu dipasang terpisah | Selalu aktif |

**Perintah memasang (dijalankan di terminal, di dalam folder proyek):**

```bash
# GitHub MCP
claude mcp add github -- npx -y @modelcontextprotocol/server-github

# Context7 (dokumentasi library terkini)
claude mcp add context7 -- npx -y @upstash/context7-mcp

# Playwright (otomasi browser untuk pengujian UI)
claude mcp add playwright -- npx -y @playwright/mcp
```

Cek server yang aktif:

```bash
claude mcp list
```

Hapus bila tidak dipakai lagi:

```bash
claude mcp remove <nama>
```

> **Catatan keamanan:** MCP pihak ketiga (di luar yang resmi dari Anthropic/Microsoft/GitHub/Figma) sebaiknya diperiksa dulu sumbernya sebelum dipasang — sejumlah MCP komunitas pernah ditemukan punya celah keamanan. Untuk proyek ini, tiga di atas (GitHub, Context7, Playwright) adalah titik awal yang aman dan paling sering direkomendasikan komunitas developer.

### 3.4 Struktur repo awal (ringkas dari PRD Bagian 10.4)

```bash
mkdir semesta && cd semesta
git init
pnpm init
mkdir -p apps/web packages/sim-engine packages/progress-core packages/content-schema packages/ui content tools docs
cp /path/ke/PRD-Aplikasi-Belajar-Fisika-Matematika.md docs/PRD.md
```

Simpan PRD di `docs/PRD.md` agar Claude Code bisa membacanya langsung saat dibutuhkan (rujuk di `CLAUDE.md`).

---

## 4. AI untuk Kebutuhan Visual

### 4.1 Peta kebutuhan visual → alat

| Kebutuhan | Alat disarankan (urutan coba) | Catatan |
|---|---|---|
| Ilustrasi panel cerita bergambar (gaya konsisten, tokoh berulang) | 1) **Gemini/Nano Banana** (sudah termasuk Gemini Pro) 2) **Ideogram** (tier gratis 100 gambar/hari) 3) **Leonardo AI** (kuat untuk karakter konsisten lewat model kustom) | Buat "lembar karakter" (character sheet) sekali di awal, lalu pakai gambar itu sebagai referensi di setiap prompt panel berikutnya agar wajah/pakaian tokoh tidak berubah-ubah |
| Ikon & aset UI (ikon konsep, lencana, ilustrasi kosong/empty-state) | **Ideogram** (teks dalam gambar lebih rapi, cocok untuk lencana berteks) atau Figma + plugin ikon gratis (Heroicons, Phosphor) | Untuk ikon fungsional, ikon vektor siap pakai (Heroicons/Phosphor, gratis & lisensi terbuka) sering lebih konsisten daripada hasil AI |
| Gambar untuk studi kasus industri (ilustrasi pabrik, jembatan, dll.) | **Gemini/Nano Banana** atau **Ideogram** | Hindari foto asli berhak cipta; ilustrasi AI lebih aman secara lisensi, tetap cek ketentuan penggunaan komersial masing-masing alat |
| Video pendek (intro aplikasi, promosi media sosial, cuplikan "kenapa aplikasi ini dibuat") | **Google Veo** (lewat Gemini App/Flow, termasuk kuota di Gemini Pro) | Klip pendek (5-10 detik) dengan audio; gabungkan beberapa klip di CapCut/Canva untuk video lebih panjang |
| Video penjelasan konsep (opsional, bila ingin tambahan selain simulasi interaktif) | **Veo** untuk b-roll + narasi direkam sendiri, disunting di **CapCut** (gratis) | Prioritas aplikasi tetap simulasi interaktif, bukan video — video hanya pelengkap promosi |
| Desain UI/UX (mockup sebelum dikodekan) | **Figma** (gratis) | Pakai token desain dari PRD (Bagian 9.4 — mode Penjelajah/Pelajar/Ahli) sebagai basis style guide di Figma |
| Logo & identitas aplikasi | **Ideogram** (khusus teks/tipografi dalam logo) dilengkapi retouch manual di **Photopea** (gratis, mirip Photoshop di browser) | Logo sebaiknya disederhanakan manual setelah draf AI; AI sering menghasilkan logo terlalu detail untuk ukuran ikon aplikasi |

### 4.2 Alur kerja konsistensi karakter (cerita bergambar)

1. Buat prompt "lembar karakter" untuk tiap tokoh tetap (Kirana, Kakek, Dimas, Bu Ratna) — minta tampilan depan, samping, beberapa ekspresi, dalam satu gambar.
2. Simpan gambar itu sebagai **referensi** (reference image) untuk setiap generate panel baru (hampir semua alat gambar 2026 mendukung ini: unggah gambar referensi + prompt teks).
3. Tulis gaya visual sekali di awal (mis. "ilustrasi flat, warna cerah, garis tebal, gaya buku cerita anak Indonesia") dan pakai ulang kalimat itu di setiap prompt agar gaya tidak berubah antar pelajaran.
4. Rapikan hasil akhir (crop, teks balon dialog) di Figma atau Photopea sebelum dimasukkan ke aplikasi sebagai SVG/WebP (sesuai spesifikasi PRD 6.7).

### 4.3 Anggaran visual minimal

| Tahap | Kebutuhan | Biaya |
|---|---|---|
| M1 (vertical slice) | 6–12 ilustrasi panel, 1 studi kasus | Rp 0 — cukup dari kuota Gemini Pro + Ideogram gratis |
| M2 (MVP, ±15 konsep) | ±60–90 ilustrasi panel, ikon konsep | Rp 0, dengan asumsi kuota harian Ideogram cukup bila dicicil |
| M4 (Play Store) | Aset toko (ikon 512×512, feature graphic, tangkapan layar) | Rp 0–150rb bila perlu Ideogram Plus/Leonardo berbayar untuk polish akhir |

---

## 5. Roadmap Eksekusi + Perintah/Prompt Siap Pakai

Roadmap ini mengikuti milestone PRD (Bagian 14), dengan **contoh perintah konkret** yang bisa Anda kirim ke Claude Code (ditandai 🤖) di tiap tahap. Sesuaikan detail (nama folder, nama konsep) dengan kondisi nyata proyek Anda saat itu.

### M0 — Fondasi (±2 minggu)

**Tujuan:** repo, CI, skema konten siap; halaman kosong bisa dipasang sebagai PWA.

🤖 Prompt 1 — inisialisasi proyek:
```
Baca docs/PRD.md bagian 10.4 (Struktur Repositori). Buat struktur monorepo
pnpm workspace sesuai itu: apps/web (React + Vite + TypeScript + Tailwind),
packages/sim-engine, packages/progress-core, packages/content-schema,
packages/ui, dan konfigurasi dasar ESLint + Prettier + Vitest. Jangan isi
logika bisnis dulu — fokus pada kerangka yang bisa langsung `pnpm dev`
dan `pnpm test` tanpa error.
```

🤖 Prompt 2 — PWA & offline dasar:
```
Tambahkan dukungan PWA ke apps/web memakai vite-plugin-pwa (strategi
precache untuk app shell). Pastikan manifest.json punya nama, ikon
placeholder, dan theme color. Setelah ini, app harus bisa di-"Add to
Home Screen" di Chrome Android meski kontennya masih kosong.
```

🤖 Prompt 3 — skema konten:
```
Buat packages/content-schema berisi skema Zod untuk: Concept, Lesson,
QuizItem, Story, CaseStudy, Simulation — sesuai definisi di docs/PRD.md
bagian 10.6. Tambahkan skrip tools/build-content yang memvalidasi semua
berkas di folder content/ terhadap skema ini, dan gagal (exit code 1)
jika ada id duplikat, prasyarat yang membentuk siklus, atau field wajib
(seperti alt-text dan explanation) kosong.
```

🤖 Prompt 4 — CI:
```
Buat GitHub Actions workflow yang menjalankan: install dependencies,
lint, test (vitest), dan validasi konten (tools/build-content) setiap
push dan pull request ke branch main.
```

**Kriteria selesai M0:** `claude mcp list` menampilkan github, context7, playwright aktif; CI hijau di GitHub; `pnpm dev` menampilkan halaman kosong yang bisa dipasang sebagai PWA.

### M1 — Vertical Slice: "Gerak Parabola" (±2 minggu)

**Tujuan:** satu konsep lengkap end-to-end (cerita → simulasi → studi kasus → kuis → progres) berjalan di HP.

🤖 Prompt 5 — engine simulasi:
```
Di packages/sim-engine, buat kontrak Simulation<P,S> sesuai docs/PRD.md
bagian 10.5 (interface TypeScript, fixed timestep, RK4 untuk sistem
dinamis). Implementasikan sim-projectile (gerak parabola) di
packages/simulations/sim-projectile dengan parameter sudut, kecepatan
awal, ketinggian awal. Tulis uji unit yang membandingkan hasil jangkauan
terhadap rumus analitik R = v0^2 sin(2*theta)/g dengan toleransi galat
relatif < 1e-6 (lihat tabel validasi di PRD 10.5).
```

🤖 Prompt 6 — komponen UI simulasi:
```
Buat komponen React <SimHost> di apps/web yang me-render sim-projectile
di <canvas>, dengan slider untuk tiap parameter (dengan satuan), tombol
Mulai/Jeda/Reset, HUD menampilkan jangkauan saat ini, dan grafik lintasan
sederhana. Jalankan step() di requestAnimationFrame dengan akumulator
fixed-timestep. Pastikan responsif di layar 360px lebar.
```

🤖 Prompt 7 — cerita bergambar:
```
Buat komponen <StoryViewer> yang menampilkan panel cerita (gambar + teks
+ dialog) satu per satu dengan tombol lanjut/geser, membaca data dari
berkas content/stories/story-bola-basket-kirana.yaml (format sesuai
PRD lampiran 17.2). Saya akan menyediakan gambar panel secara terpisah
di content/stories/story-bola-basket-kirana/ — untuk sekarang pakai
placeholder abu-abu dengan nomor panel.
```

🤖 Prompt 8 — kuis & progres:
```
Buat packages/progress-core (murni TypeScript, tanpa dependency React)
berisi fungsi hitung mastery (EMA, alpha=0.4) dan update streak sesuai
rumus di docs/PRD.md bagian 10.8. Sambungkan ke penyimpanan IndexedDB
lewat Dexie di apps/web/src/db. Buat komponen <Quiz> yang menampilkan
soal dari content/quizzes/quiz-fis-gerak-parabola-l2.yaml, memberi
petunjuk bertahap, dan setelah selesai memanggil progress-core untuk
menyimpan hasil dan memperbarui status konsep.
```

🤖 Prompt 9 — rangkai jadi satu alur:
```
Rangkai StoryViewer → SimHost → (placeholder studi kasus teks biasa
dulu) → Quiz → halaman hasil, menjadi satu alur "pelajaran" yang bisa
dibuka dari satu tombol di halaman utama. Pastikan progres tersimpan
dan terlihat lagi saat aplikasi dibuka ulang (reload).
```

**Kriteria selesai M1:** satu anggota keluarga bisa membuka aplikasi di HP, menyelesaikan satu pelajaran penuh, dan melihat progresnya tersimpan.

### M2 — MVP Keluarga (±8–12 minggu, tergantung kapasitas konten)

🤖 Prompt 10 — katalog:
```
Bangun halaman Katalog (FR-01 di PRD) menampilkan kartu konsep dari
seluruh berkas content/**/*.mdx, dengan filter domain/level/tipe
konten, pencarian teks, dan bagian "Lanjutkan belajar" berdasarkan data
progres di IndexedDB. Pastikan berfungsi dalam mode offline (matikan
jaringan di DevTools untuk menguji).
```

🤖 Prompt 11 — peta keterampilan:
```
Buat halaman Peta Keterampilan (FR-02) yang menggambar graf konsep dan
prasyaratnya dari content/skill-graph.yaml, dengan warna berbeda sesuai
status (Tersedia/Sedang/Dikuasai/PerluDiulang — lihat state machine di
PRD 10.8). Graf harus bisa di-zoom dan di-geser di layar HP.
```

🤖 Prompt 12 — profil keluarga:
```
Implementasikan FR-08: profil multi-pengguna lokal (nama, avatar,
mode UI default) tanpa login, disimpan di IndexedDB, dengan pemilih
profil saat aplikasi dibuka jika ada lebih dari satu profil. Tambahkan
fitur ekspor/impor seluruh data satu profil ke berkas JSON.
```

> Untuk setiap konsep baru setelahnya, pola prompt-nya berulang: "Buat berkas MDX untuk konsep X level Y mengikuti template di PRD 6.3, lalu buat/pakai ulang simulasi Z, lalu validasi dengan tools/build-content." Produksi **naskah cerita dan soal** sebaiknya Anda tulis draf kasarnya sendiri (atau dengan bantuan Gemini Pro), lalu minta Claude Code merapikannya ke format YAML/MDX yang valid — ini menghemat kuota Claude Code untuk pekerjaan teknis.

### M3 — Beta Keluarga

🤖 Prompt 13 — placement test:
```
Implementasikan FR-10 (placement test): 8-12 soal adaptif per domain
yang disimpan di content/placement/, menghasilkan rekomendasi level
awal per domain, dan menuliskannya ke profil pengguna di IndexedDB
sebagai starting point (bukan pembatas akses).
```

🤖 Prompt 14 — pengingat & ringkasan mingguan:
```
Tambahkan FR-12 (pengingat belajar via Notification API browser, hanya
untuk app yang sudah terpasang sebagai PWA) dan FR-07 bagian ringkasan
mingguan (hitung total waktu belajar, konsep baru, konsep dikuasai dari
data IndexedDB minggu berjalan, tampilkan di halaman Progres).
```

### M4 — Siap Play Store

🤖 Prompt 15 — bungkus Capacitor:
```
Siapkan apps/web agar bisa dibungkus Capacitor menjadi proyek Android.
Buat dokumentasi langkah build AAB di docs/BUILD_ANDROID.md, termasuk
cara mengatur ikon, splash screen, dan permission minimal yang
dibutuhkan (notifikasi lokal saja, tanpa izin berlebihan).
```

🤖 Prompt 16 — akun & sinkronisasi (jika sudah diputuskan arsitekturnya):
```
Buat apps/api dengan FastAPI sesuai docs/PRD.md bagian 10.10 (endpoint
auth, profiles, sync/push, sync/pull, progress/summary, account
deletion). Gunakan SQLAlchemy + Alembic untuk migrasi, dan tulis uji
pytest untuk setiap endpoint, termasuk kasus isolasi data antar-akun.
```

**Kriteria selesai M4:** checklist 13.2 di PRD terpenuhi, closed testing 14 hari siap dimulai.

---

## 6. Rencana Ekspansi Mata Pelajaran Lain

Kabar baiknya: arsitektur di PRD (konten sebagai data terpisah dari kode — Bagian 10.6) memang dirancang agar menambah mata pelajaran **tidak perlu membongkar ulang kode inti**. Yang perlu ditambah hanyalah:

1. Folder `content/<domain-baru>/...` dengan konsep, pelajaran, cerita, studi kasus, soal mengikuti template yang sama.
2. Simulasi baru (jika relevan) sebagai modul baru di `packages/simulations/`, mengikuti kontrak `Simulation<P,S>` yang sudah ada.
3. Entri baru di `content/skill-graph.yaml` untuk prasyarat lintas-domain (mis. Kimia butuh Matematika dasar).

**Urutan ekspansi yang masuk akal** (berdasarkan kedekatan dengan fisika/matematika dan ketersediaan simulasi yang bisa dipakai ulang):

| Urutan | Domain | Alasan |
|---|---|---|
| 1 | **Kimia** | Berbagi banyak alat (grafik, satuan, model partikel sederhana); stoikiometri memakai matematika yang sama |
| 2 | **Biologi** | Cerita bergambar & studi kasus industri sangat relevan (bioteknologi, kedokteran); simulasi sistem (populasi, genetika) bisa pakai engine numerik yang sama |
| 3 | **Informatika/Logika Komputasi** | Relevan dengan latar belakang Anda; bisa memakai sandbox Python (FR-16) yang memang sudah direncanakan untuk level ilmuwan |
| 4 | **Mata pelajaran non-STEM** (Bahasa, Sejarah, dll.) | Lebih jauh dari arsitektur saat ini (cerita bergambar & simulasi kurang relevan untuk sebagian topik ini) — pertimbangkan lebih matang, mungkin perlu jenis blok konten baru |

**Saran:** jangan mulai domain baru sebelum MVP Fisika & Matematika (M2) benar-benar stabil dan dipakai nyaman oleh keluarga. Validasi dulu bahwa *model* (L0–L5, cerita, simulasi, studi kasus) benar-benar efektif sebelum direplikasi ke domain lain — mengulang pola yang belum terbukti ke lebih banyak konten hanya memperbesar risiko R1 dan R2 di PRD (lingkup terlalu luas, produksi konten lambat).

---

## 7. Strategi Monetisasi yang Adil

> Saya bukan konsultan bisnis atau penasihat keuangan — bagian ini memaparkan opsi umum dan trade-off-nya, bukan rekomendasi finansial pasti. Keputusan akhir (termasuk kepatuhan pajak/hukum usaha) sebaiknya dicek lebih lanjut saat sudah mendekati peluncuran publik.

### 7.1 Prinsip yang sejalan dengan niat Anda

Anda menyebutkan ingin menghasilkan uang **tanpa memberatkan pengguna** dan **tidak seperti aplikasi belajar mahal** yang biasa ada. Beberapa prinsip yang bisa jadi pegangan:

- **Inti pembelajaran (materi bertingkat L0–L3, simulasi dasar, kuis) tetap gratis selamanya** — ini konsisten dengan asal mula proyek (untuk keluarga sendiri) dan menjaga janji "dari nol sampai ahli untuk siapa saja".
- **Bayar itu pilihan, bukan penghalang belajar.** Fitur berbayar sebaiknya "pemanis" (kenyamanan, kedalaman ekstra), bukan kunci untuk materi dasar.
- **Harga sewajarnya untuk daya beli lokal.** Google Play Billing mendukung harga dalam Rupiah per negara — harga mikro (jauh di bawah rata-rata aplikasi belajar berbayar) mungkin lebih realistis untuk pasar Indonesia.

### 7.2 Opsi model monetisasi (bisa dikombinasikan)

| Model | Cara kerja | Kelebihan | Risiko/kekurangan |
|---|---|---|---|
| **A. Freemium bertingkat** | L0–L3 gratis penuh; L4–L5 ("jalur ilmuwan", sandbox Python, simulasi 3D) sebagai pembelian sekali bayar | Materi dasar tetap gratis untuk siapa pun (sesuai niat awal); hanya pengguna lanjut yang mau bayar untuk fitur ekstra membayar | Perlu basis pengguna aktif dulu sebelum fitur lanjut "layak jual" |
| **B. Family Pass sekali bayar** | Satu pembayaran sekali untuk membuka seluruh keluarga (bukan per-akun), bukan langganan bulanan | Terasa adil untuk keluarga; tidak ada tagihan berulang yang memberatkan | Pendapatan tidak berkelanjutan — hanya sekali per keluarga |
| **C. "Dukung pengembang" sukarela** | Tombol donasi/tip opsional, tanpa membuka fitur apa pun (murni dukungan) | Paling tidak memberatkan; cocok untuk fase awal membangun kepercayaan | Pendapatan biasanya kecil dan tidak terprediksi |
| **D. Lisensi ke sekolah/dinas pendidikan (B2B/B2G)** | Sekolah/lembaga membayar lisensi untuk banyak siswa sekaligus, bukan orang tua yang membayar langsung | Individu/keluarga tetap pakai gratis; uang datang dari institusi yang punya anggaran | Butuh usaha pemasaran/relasi institusi; siklus penjualan lebih lambat |
| **E. Iklan ramah-keluarga, sangat terbatas** | Iklan non-intrusif hanya di tempat yang tidak mengganggu pembelajaran (mis. layar setelah selesai, bukan di tengah pelajaran/kuis) | Tanpa membebani siapa pun secara langsung | Kebijakan Google Play *Families* sangat ketat soal iklan untuk aplikasi yang menyasar anak — perlu jaringan iklan yang disertifikasi sesuai kebijakan Families, dan pengalaman belajar bisa terasa terganggu bila tidak hati-hati |
| **F. Pay-what-you-can / harga fleksibel** | Pengguna memilih sendiri jumlah pembayaran dalam rentang yang disediakan (termasuk Rp 0) untuk membuka fitur premium | Sangat adil secara prinsip; tidak ada yang "dipaksa" bayar harga tetap | Kompleksitas implementasi penagihan; perlu transparansi agar tidak disalahgunakan |

### 7.3 Kombinasi yang relatif sejalan dengan niat Anda

Mengingat tujuan "tidak memberatkan" dan proyek lahir dari kebutuhan keluarga, kombinasi yang relatif masuk akal untuk dipertimbangkan:

> **Gratis selamanya:** seluruh materi L0–L3, simulasi dasar, kuis, progres, offline.
> **Family Pass sekali bayar (harga mikro, misalnya di kisaran harga satu atau dua kali makan di warung, bukan subscription):** membuka L4–L5, sandbox ilmuwan, tema/avatar tambahan — berlaku untuk seluruh profil dalam satu perangkat/keluarga.
> **Opsional, jangka panjang:** lisensi ke sekolah sebagai sumber pendapatan tambahan yang tidak membebani keluarga individu sama sekali.

Ini sejalan dengan Model A + B + D, menghindari C sendirian (terlalu kecil untuk diandalkan) dan E (berisiko kebijakan serta mengganggu pengalaman belajar anak).

### 7.4 Hal teknis & kebijakan yang perlu dicek lebih lanjut saat mendekati implementasi

- **Google Play Billing**: mendukung produk sekali-bayar (in-app purchase non-consumable) dan harga per-negara dalam Rupiah — cek dokumentasi resmi Play Console saat mengatur harga.
- **Kebijakan Google Play Families**: jika target audiens mencakup anak di bawah 13 tahun, ada aturan ketat soal iklan, SDK pihak ketiga, dan data anak — ini perlu dibaca langsung dari Play Console Help sebelum memutuskan model E atau SDK analitik apa pun.
- **Pajak & badan usaha**: menghasilkan uang dari aplikasi biasanya punya implikasi pajak penghasilan/usaha — ini di luar cakupan saya; pertimbangkan konsultasi dengan yang lebih paham perpajakan UMKM/individu saat pendapatan mulai signifikan.
- **Validasi dengan pengguna dulu**: sebelum membangun sistem pembayaran apa pun, lebih murah dan lebih aman untuk **bertanya langsung** ke beberapa keluarga/sekolah target ("apakah Anda akan membayar fitur X, dan berapa yang terasa wajar?") daripada menebak.

---

## 8. Checklist Cepat & Anggaran

### 8.1 Yang perlu disiapkan minggu ini

- [ ] Pasang Node.js LTS, pnpm, Git, VS Code
- [ ] Pasang Claude Code (`npm install -g @anthropic-ai/claude-code`) dan login
- [ ] Buat repo GitHub (privat dulu tidak masalah)
- [ ] Pasang MCP: GitHub, Context7, Playwright (Bagian 3.3)
- [ ] Buat `CLAUDE.md` awal (Bagian 3.2) dan salin PRD ke `docs/PRD.md`
- [ ] Coba Prompt 1 (M0) untuk melihat bagaimana Claude Code bekerja di proyek Anda

### 8.2 Estimasi biaya bulan-bulan awal (perkiraan kasar, cek harga terbaru)

| Pos | Status | Estimasi |
|---|---|---|
| Gemini Pro | Sudah dimiliki (18 bulan) | Rp 0 tambahan |
| Claude Code | Mulai dari tier gratis/termurah | Rp 0 → naik hanya jika kebutuhan nyata |
| Figma | Tier gratis (1 editor) | Rp 0 |
| Ideogram | Tier gratis harian | Rp 0 |
| Hosting PWA (Cloudflare Pages/Netlify) | Tier gratis cukup untuk MVP | Rp 0 |
| Akun developer Google Play (sekali bayar, nanti di M4) | Ditunda sampai siap rilis | ±US$25 sekali bayar (cek harga terkini) |
| **Total realistis sampai M3 (Beta Keluarga)** | | **Rp 0 — murni waktu, bukan uang** |

Pendekatan ini sengaja dibuat "mulai dari nol biaya" karena proyek masih tahap validasi untuk keluarga sendiri — uang baru mulai relevan dikeluarkan mendekati M4 (Play Store).

---

*Akhir dokumen — Panduan Implementasi v0.1*
