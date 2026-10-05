# VISUAL_GUIDE.md — Panduan visual terkunci (2 Okt 2026)

> Seluruh aset visual aplikasi **wajib AI-generated** (PRD 6.9, V1–V10).
> Dokumen ini adalah acuan gaya yang dirujuk setiap prompt generate.

## 1. Gaya master: flat vector ceria

- Ilustrasi vektor flat ala **buku cerita anak Indonesia**: warna cerah & hangat,
  bentuk bulat sederhana, outline tegas, wajah ramah.
- Bahasa Indonesia, konteks lokal (batik, lapangan, rumah) bila relevan.

## 2. Tokoh tetap (jangan diubah tanpa keputusan baru)

| Tokoh | Ciri visual kunci |
|---|---|
| Kirana (8 th) | Rambut hitam ponytail + ikat rambut kuning, kaos kuning, celana pendek biru |
| Kakek | Rambut abu-abu pendek, kacamata bulat, kemeja batik cokelat |
| Dimas (remaja) | Rambut hitam pendek, hoodie hijau |
| Bu Ratna (40-an) | Rambut hitam disanggul, blus ungu |

Lembar karakter acuan: `assets/visual/character-sheet-v1.webp`
Contoh panel: `assets/visual/sample-panel-bola-basket-v1.webp`

## 3. Aturan "level dial" (variasi antar-jenjang, gaya tetap sama)

- **L0–L1**: lebih bulat, lebih cerah, latar minimal, teks sangat sedikit.
- **L2–L3**: gaya standar.
- **L4–L5**: tetap flat vector, tetapi lebih teknis — aksen isometrik/blueprint,
  palet sedikit lebih kalem, diagram lebih rapat.

## 4. Prompt master (tempel di setiap generate, lalu tambah detail adegan)

```
Flat vector illustration, cheerful Indonesian children's storybook style:
bright warm colors, simple rounded shapes, clean outlines, friendly faces.
Characters must match the reference sheet (Kirana: black ponytail with yellow
hair tie, yellow t-shirt, blue shorts; Kakek: short gray hair, round glasses,
brown batik shirt). No text, no words, no letters, no formulas.
```

Untuk konsistensi tokoh, selalu sertakan lembar karakter sebagai reference image.

## 5. Aturan teknis

- Panel cerita: WebP, sisi panjang maks 1600px, alt-text wajib per panel.
- AI **dilarang** menggambar teks, rumus, atau angka — selalu overlay dari UI/KaTeX.
- Avatar: tidak boleh menyerupai orang nyata.
- Video: ≤ 10 detik, lazy-load, tidak di-precache; sediakan versi diam (reduce motion).
- Setiap aset dicatat di `content/assets/ASSET_LOG.md` (prompt/seed, alat, tanggal,
  ketentuan lisensi, alt-text).

## 6. Quality gate per aset (sebelum masuk konten)

- [ ] Gaya sesuai panduan ini & konsisten dengan lembar karakter
- [ ] Resolusi & ukuran file sesuai batas PRD 6.9
- [ ] Tidak ada teks/rumus/angka yang digambar AI
- [ ] Alt-text ditulis
- [ ] Tercatat di ASSET_LOG.md
