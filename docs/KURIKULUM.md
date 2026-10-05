# Kurikulum Semesta — Fisika & Matematika, L0–L5

> Dokumen perencanaan kurikulum (dibuat 2026-10-05). Satu file ini memuat
> seluruh pelajaran dari nol sampai mahir: cerita, materi, simulasi,
> praktikum, dan keterkaitan antar-konsep.
>
> - Kurikulum dirancang sendiri (jalur L0–L5), bukan mengikuti kurikulum
>   sekolah secara ketat — tetapi dapat dipetakan bila perlu (PRD §6).
> - Setiap konsep pada akhirnya menjadi satu **lesson** lengkap
>   (anatomi di §3) dan satu node di `content/skill-graph.yaml`.
> - **L4–L5 adalah tahap lanjut** (ditunda hingga M2+ stabil, sesuai
>   risiko R1 di PRD) — tercantum di sini agar peta lengkap, bukan
>   untuk diproduksi sekarang.
> - **§9** memuat roadmap referensi lengkap dari pengguna (SD sampai
>   pascasarjana) sebagai arah jangka panjang — di luar cakupan produksi
>   aplikasi.

## 1. Cara membaca dokumen

Setiap konsep ditulis dengan format ringkas:

```md
#### [L2] Judul Konsep `id-konsep`
- **Cerita**: judul & premis satu baris (tokoh: Kirana/Kakek/Dimas/Bu Ratna)
- **Materi**: poin-poin inti yang diajarkan
- **Simulasi** `sim-id`: apa yang bisa diubah & diamati anak
- **Praktikum**: kegiatan tangan dengan bahan rumah (aman, dampingi orang dewasa)
- **Prasyarat**: id konsep yang harus dikuasai dulu (— = tanpa prasyarat)
```

## 2. Deskripsi level

| Level | Usia kira-kira | Ciri |
|---|---|---|
| L0 | 4–6 thn | Bermain & intuisi. Tanpa rumus, tanpa angka sulit. Bahasa sangat sederhana, banyak gambar. |
| L1 | 7–9 thn | Konkret. Benda nyata, operasi dasar, pengukuran sederhana. |
| L2 | 10–14 thn | Konsep + rumus sederhana. Mulai abstrak, ada simulasi & studi kasus ringan. |
| L3 | 15–17 thn | Formal. Multi-langkah, pemodelan, grafik, pembuktian sederhana. |
| L4 | pra-kuliah / olimpiade | Pendalaman. Menurunkan rumus, proyek terstruktur. |
| L5 | mahir | Kalkulus & proyek terbuka. Menjelaskan "mengapa" sampai ke fondasi. |

Aturan "level dial" visual tetap berlaku: gaya master flat vector ceria di
semua level; L0–L1 lebih bulat/cerah/sederhana, L4–L5 lebih teknis/isometrik.

## 3. Anatomi satu lesson

Urutan baku setiap lesson (PRD §6):

1. **Cerita bergambar** (6–12 panel AI) — mengaitkan konsep ke kehidupan tokoh.
2. **Materi** — intuisi → konsep → rumus (mulai L2) → contoh → kesalahpahaman umum.
3. **Simulasi interaktif** — ubah parameter, amati akibat (engine deterministik).
4. **Praktikum** — coba di dunia nyata dengan bahan rumah.
5. **Studi kasus** (mulai L2) — masalah kontekstual Indonesia.
6. **Kuis** — pilihan ganda + isian angka, petunjuk berjenjang.
7. **Refleksi & progres** — skor, XP, penguasaan konsep, streak.

## 4. Matematika

### 4.1 Bilangan & Operasi

#### [L0] Membilang & Membandingkan `mat-membilang`
- **Cerita**: "Sepuluh Kelereng Dimas" — Dimas menghitung kelerengnya yang tercecer.
- **Materi**: membilang 1–20, lebih banyak/sedikit/sama dengan, urutan.
- **Simulasi** `sim-membilang`: ketuk benda untuk menghitung, bandingkan dua kelompok.
- **Praktikum**: hitung sendok, kancing, atau daun di halaman; susun dari sedikit ke banyak.
- **Prasyarat**: —

#### [L1] Penjumlahan & Pengurangan `mat-tambah-kurang`
- **Cerita**: "Warung Bu Ratna" — menghitung kembalian dan stok jajanan.
- **Materi**: tambah/kurang sampai 100, susun panjang sederhana, soal cerita.
- **Simulasi** `sim-tambah-kurang`: garis bilangan interaktif & balok susun.
- **Praktikum**: jadi kasir warung mainan; hitung kembalian uang mainan.
- **Prasyarat**: `mat-membilang`

#### [L1] Perkalian & Pembagian `mat-kali-bagi`
- **Cerita**: "Panen Mangga Kakek" — mangga dibagi rata ke tetangga.
- **Materi**: perkalian sebagai penjumlahan berulang, pembagian sebagai berbagi, tabel sampai 10×10.
- **Simulasi** `sim-kali-bagi`: susunan petak (array) yang bisa dipecah/gabung.
- **Praktikum**: bagi kue/snack sama rata untuk keluarga; susun telur dalam peti.
- **Prasyarat**: `mat-tambah-kurang`

#### [L2] Pecahan & Rasio `mat-pecahan-rasio` ✅ terdaftar di skill-graph
- **Cerita**: "Kue Ulang Tahun Kirana" — memotong kue untuk tamu yang datang.
- **Materi**: pecahan senilai, menyederhanakan, perbandingan, pecahan campuran.
- **Simulasi** `sim-pecahan`: batang pecahan & lingkaran yang bisa dipotong; bandingkan dua pecahan.
- **Praktikum**: potong kertas/kue menjadi 1/2, 1/4, 1/8; campur sirup dengan rasio.
- **Prasyarat**: `mat-kali-bagi`

#### [L2] Desimal & Persen `mat-desimal-persen`
- **Cerita**: "Diskon di Pasar" — Bu Ratna berburu diskon 25%.
- **Materi**: pecahan ↔ desimal ↔ persen, diskon & untung-rugi sederhana.
- **Simulasi** `sim-persen`: petak 10×10 persen; geser diskon lihat harga akhir.
- **Praktikum**: hitung diskon brosur belanja; ukur tinggi dengan meteran desimal.
- **Prasyarat**: `mat-pecahan-rasio`

#### [L3] Pangkat & Akar `mat-pangkat-akar`
- **Cerita**: "Bakteri dalam Semangkuk Susu" — Dimas heran susu basi cepat sekali.
- **Materi**: pangkat bulat, akar kuadrat, notasi ilmiah, pertumbuhan eksponensial (intuitif).
- **Simulasi** `sim-pangkat`: penggandaan bakteri per jam; geser pangkat lihat ledakan angka.
- **Praktikum**: lipat kertas (berapa lipatan sampai tebal 1 cm?); biakkan ragi.
- **Prasyarat**: `mat-desimal-persen`

#### [L4] Barisan & Deret `mat-barisan-deret` 🔜 tahap lanjut
- **Cerita**: "Tangga Candi Kakek" — pola anak tangga yang misterius.
- **Materi**: barisan aritmetika & geometri, jumlah n suku, deret tak hingga (intuisi).
- **Simulasi** `sim-deret`: bangun pola batang; lihat jumlah bertumbuh.
- **Praktikum**: susun pola ubin/kancing; tebak suku berikutnya dari pola di rumah.
- **Prasyarat**: `mat-pangkat-akar`

### 4.2 Aljabar

#### [L1] Pola & Simbol `mat-pola-simbol`
- **Cerita**: "Kode Rahasia Kirana" — pesan sandi dengan simbol.
- **Materi**: pola berulang & bertumbuh, simbol sebagai "kotak misteri".
- **Simulasi** `sim-pola`: lanjutkan pola warna/bentuk; tebak simbol.
- **Praktikum**: buat gelang pola manik; pola langkah di lantai.
- **Prasyarat**: `mat-tambah-kurang`

#### [L2] Persamaan Linear `mat-persamaan-linear`
- **Cerita**: "Timbangan Warung" — Bu Ratna menimbang gula yang tak diketahui beratnya.
- **Materi**: variabel, menyelesaikan ax + b = c, soal cerita.
- **Simulasi** `sim-linear`: timbangan seimbang interaktif; tambah/kurang kedua sisi.
- **Praktikum**: timbangan dapur + kantong beras misterius; tebak berat.
- **Prasyarat**: `mat-pecahan-rasio`, `mat-pola-simbol`

#### [L3] Persamaan Kuadrat `mat-persamaan-kuadrat`
- **Cerita**: "Lemparan Dimas" — bola melambung, kapan jatuh ke tanah?
- **Materi**: bentuk umum, pemfaktoran, rumus abc, grafik parabola, diskriminan.
- **Simulasi** `sim-kuadrat`: geser a, b, c; lihat parabola & titik potong bergerak.
- **Praktikum**: lempar bola, catat waktu; hubungkan ke kurva (bekerja sama dengan fis-gerak-parabola).
- **Prasyarat**: `mat-persamaan-linear`, `mat-pangkat-akar`

#### [L3] Sistem Persamaan `mat-sistem-persamaan`
- **Cerita**: "Dua Warung Bersaing" — kapan harga dua warung sama?
- **Materi**: SPLDV: substitusi, eliminasi, tafsir grafik (titik temu dua garis).
- **Simulasi** `sim-spldv`: dua garis bisa digeser; titik potong bergerak.
- **Praktikum**: bandingkan dua paket internet/pulsa; cari titik impas.
- **Prasyarat**: `mat-persamaan-linear`

#### [L4] Fungsi & Grafik `mat-fungsi-grafik` 🔜 tahap lanjut
- **Cerita**: "Mesin Ajaib Kakek" — masukkan angka, keluar angka lain.
- **Materi**: definisi fungsi, domain/kodomain, grafik, fungsi linear & kuadrat, komposisi (intuitif).
- **Simulasi** `sim-fungsi`: mesin fungsi; ubah rumus lihat grafik berubah.
- **Praktikum**: catat suhu tiap jam → buat grafik; fungsi "resep" (2× bahan).
- **Prasyarat**: `mat-persamaan-kuadrat`

### 4.3 Geometri & Pengukuran

#### [L0] Bentuk & Ruang `mat-bentuk`
- **Cerita**: "Rumah Bentuk Kirana" — membangun rumah dari bentuk-bentuk.
- **Materi**: lingkaran, segitiga, segiempat; besar-kecil; posisi (atas/bawah/samping).
- **Simulasi** `sim-bentuk`: susun bentuk jadi gambar; putar & cerminkan.
- **Praktikum**: cari 5 benda lingkaran di rumah; bentuk dari plastisin.
- **Prasyarat**: —

#### [L1] Keliling & Luas `mat-luas-keliling`
- **Cerita**: "Pagar Kebun Kakek" — berapa bambu untuk pagar? berapa bibit untuk isi kebun?
- **Materi**: keliling & luas persegi/persegipanjang/segitiga; satuan.
- **Simulasi** `sim-luas`: petak satuan; gambar bangun lihat luas & keliling live.
- **Praktikum**: ukur keliling meja dengan jengkal lalu meteran; ubin lantai.
- **Prasyarat**: `mat-kali-bagi`, `mat-bentuk`

#### [L2] Teorema Pythagoras `mat-pythagoras`
- **Cerita**: "Tangga Dimas yang Goyang" — tangga terlalu pendek untuk tembok.
- **Materi**: a² + b² = c², tripel Pythagoras, jarak dua titik.
- **Simulasi** `sim-pythagoras`: segitiga siku-siku; persegi di tiap sisi bertumbuh/menyusut.
- **Praktikum**: ukur diagonal lapangan dengan tali (3-4-5); cek siku pintu.
- **Prasyarat**: `mat-luas-keliling`, `mat-pangkat-akar`

#### [L2] Trigonometri Dasar `mat-trigonometri-dasar` ✅ terdaftar di skill-graph
- **Cerita**: "Bayangan Menara" — mengukur tinggi menara tanpa memanjat.
- **Materi**: sin/cos/tan pada segitiga siku-siku, sudut istimewa.
- **Simulasi** `sim-trigonometri`: segitiga bisa ditarik; rasio sisi vs sudut live.
- **Praktikum**: ukur tinggi pohon/tiang dengan klinometer kardus + bayangan.
- **Prasyarat**: `mat-pecahan-rasio`

#### [L3] Bangun Ruang `mat-bangun-ruang`
- **Cerita**: "Kardus Misterius Bu Ratna" — kardus apa yang muat paling banyak?
- **Materi**: volume & luas permukaan kubus, balok, prisma, tabung, kerucut, bola.
- **Simulasi** `sim-bangun-ruang`: jaring-jaring (nets) dilipat jadi 3D; isi dengan satuan kubik.
- **Praktikum**: buat jaring kubus dari kardus; ukur volume gelas vs botol dengan air.
- **Prasyarat**: `mat-luas-keliling`, `mat-pangkat-akar`

#### [L4] Geometri Analitik `mat-geometri-analitik` 🔜 tahap lanjut
- **Cerita**: "Peta Harta Karun" — koordinat menuju harta.
- **Materi**: koordinat kartesius, jarak, gradien, persamaan garis & lingkaran.
- **Simulasi** `sim-koordinat`: plot titik; garis dari dua titik; lingkaran.
- **Praktikum**: peta lingkungan rumah dengan koordinat; permainan "battleship" kertas.
- **Prasyarat**: `mat-fungsi-grafik`, `mat-trigonometri-dasar`

### 4.4 Data, Statistika & Peluang

#### [L1] Membaca Grafik `mat-baca-grafik`
- **Cerita**: "Grafik Tinggi Kirana" — garis tumbuh di dinding kamar.
- **Materi**: diagram batang & garis sederhana; membaca nilai.
- **Simulasi** `sim-grafik`: masukkan data → diagram jadi otomatis.
- **Praktikum**: catat tinggi badan keluarga di dinding; grafik curah ide.
- **Prasyarat**: `mat-membilang`

#### [L2] Rata-rata & Diagram `mat-rata-rata`
- **Cerita**: "Nilai Ulangan Kelas" — berapa rata-rata kelas Dimas?
- **Materi**: mean, median, modus (intuitif); diagram lingkaran.
- **Simulasi** `sim-rata-rata`: tumpuk balok data; "ratakan" untuk lihat mean.
- **Praktikum**: rata-rata tinggi keluarga; survei rasa es krim favorit.
- **Prasyarat**: `mat-baca-grafik`, `mat-pecahan-rasio`

#### [L3] Peluang Dasar `mat-peluang`
- **Cerita**: "Arisan Bu Ratna" — siapa yang namanya keluar?
- **Materi**: peluang 0–1, kejadian majemuk sederhana, frekuensi harapan.
- **Simulasi** `sim-peluang`: lab dadu & koin virtual 1000x; frekuensi → peluang teori.
- **Praktikum**: lempar koin 50x catat; kocok arisan mini.
- **Prasyarat**: `mat-rata-rata`, `mat-pecahan-rasio`

#### [L4] Statistika `mat-statistika` 🔜 tahap lanjut
- **Cerita**: "Survei Jajanan Sekolah" — jajanan apa yang paling laris?
- **Materi**: distribusi, kuartil, diagram kotak-garis, korelasi (intuitif).
- **Simulasi** `sim-statistika`: histogram interaktif; geser data lihat bentuk.
- **Praktikum**: survei kecil di lingkungan; sajikan hasilnya.
- **Prasyarat**: `mat-peluang`

### 4.5 Kalkulus (L4–L5, tahap lanjut)

#### [L4] Limit Intuitif `mat-limit` 🔜 tahap lanjut
- **Cerita**: "Mendekati Tanpa Sampai" — Kirana berjalan setengah sisa tiap langkah.
- **Materi**: ide mendekati, limit fungsi & barisan (intuitif, minim epsilon-delta).
- **Simulasi** `sim-limit`: zoom grafik ke satu titik; barisan menuju nilai.
- **Praktikum**: paradoks "setengah jarak" dengan tali.
- **Prasyarat**: `mat-fungsi-grafik`, `mat-barisan-deret`

#### [L5] Turunan `mat-turunan` 🔜 tahap lanjut
- **Cerita**: "Speedometer Dimas" — seberapa cepat tepat saat ini?
- **Materi**: turunan sebagai laju sesaat & kemiringan; aturan dasar; aplikasi maks/min.
- **Simulasi** `sim-turunan`: garis singgung bergerak di kurva; kecepatan dari posisi.
- **Praktikum**: rekam posisi vs waktu (video HP) → hitung laju rata-rata vs sesaat.
- **Prasyarat**: `mat-limit`

#### [L5] Integral `mat-integral` 🔜 tahap lanjut
- **Cerita**: "Kolam Kakek" — berapa air untuk mengisi kolam tak beraturan?
- **Materi**: integral sebagai luas & akumulasi; hubungan dengan turunan.
- **Simulasi** `sim-integral`: jumlahkan persegi kecil di bawah kurva; makin halus.
- **Praktikum**: ukur luas daun dengan kertas milimeter.
- **Prasyarat**: `mat-turunan`

## 5. Fisika

### 5.1 Mekanika

#### [L0] Dorong & Tarik `fis-dorong-tarik`
- **Cerita**: "Balapan Mobil-mobilan" — Kirana & Dimas balapan di lantai.
- **Materi**: dorongan membuat benda bergerak/berhenti/berbelok; dorongan kuat vs lemah (intuitif).
- **Simulasi** `sim-dorong-tarik`: dorong bola dengan kekuatan berbeda; lihat jauhnya.
- **Praktikum**: balap kelereng dengan tiupan/sentilan; dorong kardus berisi vs kosong.
- **Prasyarat**: —

#### [L1] Jarak, Waktu & Kecepatan `fis-jarak-waktu`
- **Cerita**: "Siapa Paling Cepat ke Warung?" — lomba lari ke warung Bu Ratna.
- **Materi**: kecepatan = jarak ÷ waktu; satuan m/s & km/jam (pengenalan).
- **Simulasi** `sim-jarak-waktu`: atur kecepatan dua pelari; siapa menang?
- **Praktikum**: lari 20 m dengan stopwatch HP; jalan vs lari vs sepeda.
- **Prasyarat**: `mat-tambah-kurang`

#### [L2] Gerak Lurus `fis-gerak-lurus` ✅ terdaftar di skill-graph
- **Cerita**: "Kereta Mainan Dimas" — kereta melaju konstan lalu mengerem.
- **Materi**: GLB & GLBB, grafik posisi-waktu & kecepatan-waktu.
- **Simulasi** `sim-gerak-lurus`: atur kecepatan & percepatan; lihat grafik live.
- **Praktikum**: mobil mainan di lintasan; catat posisi tiap detik.
- **Prasyarat**: `mat-pecahan-rasio`

#### [L2] Gerak Parabola `fis-gerak-parabola` ✅ terdaftar · ✅ M1 selesai
- **Cerita**: "Bola Basket Kirana" — kenapa lemparan melengkung? (6 panel, sudah produksi)
- **Materi**: gabungan GLB horizontal + jatuh bebas vertikal; sudut 45° terjauh.
- **Simulasi** `sim-projectile`: ✅ sudah jadi — slider sudut/kecepatan, target 40,8 m.
- **Praktikum**: lempar bola ke keranjang dari berbagai sudut; catat yang paling jauh.
- **Prasyarat**: `fis-gerak-lurus`, `mat-trigonometri-dasar`

#### [L3] Gaya & Hukum Newton `fis-newton`
- **Cerita**: "Gerobak Bu Ratna Mogok" — kenapa gerobak berat susah didorong?
- **Materi**: Hukum I/II/III Newton, F = m·a, gaya gesek, gaya normal.
- **Simulasi** `sim-newton`: lab F = m·a; ubah massa & gaya lihat percepatan.
- **Praktikum**: tarik kardus dengan timbangan pegas (neraca); rasakan inersia (rem mendadak — aman, di kursi).
- **Prasyarat**: `fis-gerak-lurus`

#### [L3] Usaha & Energi `fis-usaha-energi`
- **Cerita**: "Ayunan Tertinggi Kirana" — dari mana energi ayunan berasal?
- **Materi**: usaha, energi kinetik & potensial, kekekalan energi, daya.
- **Simulasi** `sim-energi`: roller coaster; energi berubah bentuk tapi total tetap.
- **Praktikum**: ayunkan bandul; jatuhkan bola dari berbagai tinggi ke plastisin.
- **Prasyarat**: `fis-newton`

#### [L3] Momentum & Tumbukan `fis-momentum`
- **Cerita**: "Tabrakan Kelereng Dimas" — kelereng besar vs kecil.
- **Materi**: momentum p = m·v, impuls, kekekalan momentum, tumbukan lenting.
- **Simulasi** `sim-momentum`: lab tumbukan; atur massa & kecepatan.
- **Praktikum**: tumbukkan kelereng/koin; amati siapa yang "menang".
- **Prasyarat**: `fis-newton`

#### [L4] Gerak Melingkar `fis-gerak-melingkar` 🔜 tahap lanjut
- **Cerita**: "Komidi Putar Pasar Malam" — kenapa terasa terlempar keluar?
- **Materi**: kecepatan sudut, percepatan & gaya sentripetal.
- **Simulasi** `sim-melingkar`: putar benda; ubah jari-jari & kecepatan.
- **Praktikum**: ayunkan ember air berputar (luar ruangan!); yoyo.
- **Prasyarat**: `fis-newton`, `mat-trigonometri-dasar`

#### [L4] Gravitasi `fis-gravitasi` 🔜 tahap lanjut
- **Cerita**: "Apel & Bulan" — kisah Newton versi Kakek.
- **Materi**: hukum gravitasi umum, gerak planet/orbit (kualitatif-kuantitatif ringan).
- **Simulasi** `sim-gravitasi`: tata surya mini; ubah massa/jarak.
- **Praktikum**: bandul & jam; amati bulan beberapa malam (fase).
- **Prasyarat**: `fis-gerak-melingkar`

### 5.2 Getaran, Gelombang & Bunyi

#### [L1] Bunyi di Sekitar Kita `fis-bunyi`
- **Cerita**: "Orkestra Dapur" — Kirana membuat musik dari panci.
- **Materi**: bunyi dari getaran; keras-lemah, tinggi-rendah (intuitif).
- **Simulasi** `sim-bunyi`: petik senar virtual; ubah tebal/panjang dengar bedanya.
- **Praktikum**: gitar karet gelang; tiup botol berisi air beda tinggi.
- **Prasyarat**: —

#### [L2] Getaran & Periode `fis-getaran`
- **Cerita**: "Ayunan Kakek" — ayunan panjang vs pendek, mana lebih cepat?
- **Materi**: periode & frekuensi, bandul & pegas (kualitatif + rumus sederhana T bandul).
- **Simulasi** `sim-getaran`: bandul & pegas; ubah panjang/massa.
- **Praktikum**: bandul tali + mur; hitung ayunan per 10 detik.
- **Prasyarat**: `fis-bunyi`, `mat-pecahan-rasio`

#### [L3] Gelombang `fis-gelombang`
- **Cerita**: "Riak Kolam Dimas" — lempar dua batu, riaknya bertemu.
- **Materi**: panjang gelombang, cepat rambat v = λ·f, interferensi (intuitif).
- **Simulasi** `sim-gelombang`: tangki riak; ubah frekuensi lihat pola.
- **Praktikum**: riak di ember/bak; tali skipping digetarkan.
- **Prasyarat**: `fis-getaran`

### 5.3 Cahaya & Optik

#### [L1] Bayangan & Cahaya `fis-bayangan`
- **Cerita**: "Wayang Jari Kirana" — pertunjukan bayangan di dinding.
- **Materi**: cahaya merambat lurus; bayangan umbra; terang-gelap.
- **Simulasi** `sim-bayangan`: senter virtual; dekat-jauhkan boneka, bayangan membesar.
- **Praktikum**: wayang jari dengan senter HP (redupkan lampu); bayangan di siang hari.
- **Prasyarat**: —

#### [L2] Cahaya & Warna `fis-warna`
- **Cerita**: "Pelangi Setelah Hujan" — dari mana warna pelangi?
- **Materi**: spektrum, pencampuran warna cahaya (aditif) vs cat (subtraktif).
- **Simulasi** `sim-warna`: campur lampu merah-hijau-biru; prisma virtual.
- **Praktikum**: prisma/CD bekas di sinar matahari; cat air campur warna.
- **Prasyarat**: `fis-bayangan`

#### [L3] Cermin & Lensa `fis-optik`
- **Cerita**: "Kacamata Kakek" — kenapa lensanya tebal di tengah?
- **Materi**: pemantulan & pembiasan, cermin datar/cembung/cekung, lensa (kualitatif + rumus ringan).
- **Simulasi** `sim-optik`: lab sinar; geser benda di depan cermin/lensa.
- **Praktikum**: sendok sebagai cermin cembung/cekung; kaca pembesar & tetes air.
- **Prasyarat**: `fis-warna`

### 5.4 Listrik & Magnet

#### [L2] Listrik Statis `fis-listrik-statis`
- **Cerita**: "Rambut Kirana Berdiri" — sisir plastik setelah disisirkan.
- **Materi**: muatan, gosokan, tarik-menarik/tolak-menolak.
- **Simulasi** `sim-statis`: gosok balon virtual; tempelkan ke dinding/rambut.
- **Praktikum**: sisir + potongan kertas; balon + rambut (aman, jauhkan dari elektronik sensitif).
- **Prasyarat**: —

#### [L3] Arus & Rangkaian `fis-rangkaian`
- **Cerita**: "Lampu Belajar Dimas Mati" — di mana yang putus?
- **Materi**: arus, tegangan, hambatan; seri vs paralel; hukum Ohm.
- **Simulasi** `sim-rangkaian`: rangkai baterai-lampu-saklar; ukur arus.
- **Praktikum**: rangkaian baterai AA + lampu senter + kabel (tegangan rendah, aman); bedakan seri/paralel.
- **Prasyarat**: `fis-listrik-statis`, `mat-persamaan-linear`

#### [L4] Magnet & Elektromagnet `fis-magnet` 🔜 tahap lanjut
- **Cerita**: "Kompas Kakek" — kenapa jarum selalu ke utara?
- **Materi**: kutub magnet, medan magnet, elektromagnet, induksi (intuitif).
- **Simulasi** `sim-magnet`: lihat medan magnet; lilitan + arus jadi magnet.
- **Praktikum**: magnet kulkas + serbuk besi di kertas; belitan kawat + baterai + paku.
- **Prasyarat**: `fis-rangkaian`

### 5.5 Zat, Suhu & Kalor

#### [L1] Wujud Zat `fis-wujud-zat`
- **Cerita**: "Es Lilin Kirana" — es mencair di siang hari.
- **Materi**: padat-cair-gas; mencair-membeku-menguap (pengamatan).
- **Simulasi** `sim-wujud-zat`: model partikel; panaskan/dinginkan lihat partikel.
- **Praktikum**: es batu mencair (catat waktu); air mendidih (dengan orang dewasa).
- **Prasyarat**: —

#### [L2] Suhu & Termometer `fis-suhu`
- **Cerita**: "Demam Dimas" — termometer menunjukkan 38,5°C.
- **Materi**: suhu vs panas (intuitif), membaca termometer, skala °C.
- **Simulasi** `sim-suhu`: campur air panas-dingin; tebak suhu akhir.
- **Praktikum**: ukur suhu air/udara dengan termometer; bandingkan pagi-siang.
- **Prasyarat**: `fis-wujud-zat`

#### [L3] Kalor & Perpindahan `fis-kalor`
- **Cerita**: "Sendok Panas Bu Ratna" — gagang sendok ikut panas.
- **Materi**: konduksi, konveksi, radiasi; kalor jenis (pengenalan rumus Q = m·c·ΔT).
- **Simulasi** `sim-kalor`: tiga cara perpindahan divisualkan; bahan konduktor vs isolator.
- **Praktikum**: sendok logam vs kayu di air panas; es di kain vs di piring.
- **Prasyarat**: `fis-suhu`, `fis-usaha-energi`

## 6. Praktikum — prinsip & keamanan

Praktikum adalah pembeda Semesta dari video course: anak **melakukan**,
bukan hanya menonton. Aturan untuk semua praktikum:

1. **Bahan rumah**: bahan mudah didapat (kardus, air, karet gelang, baterai AA).
2. **Aman untuk anak**: tanpa api/bahan kimia berbahaya tanpa pendamping;
   setiap praktikum berlabel `mandiri` atau `dampingi orang dewasa`.
3. **Tercatat**: anak mencatat hasil (foto/angka) — menjadi bagian progres.
4. **Terhubung**: praktikum selalu merujuk ke simulasi ("coba di sim, lalu buktikan nyata").

## 7. Status produksi

| Status | Konsep |
|---|---|
| ✅ Lesson lengkap (M1) | `fis-gerak-parabola` |
| ✅ Terdaftar di skill-graph | `mat-pecahan-rasio`, `mat-trigonometri-dasar`, `fis-gerak-lurus`, `fis-gerak-parabola` |
| 📝 Konsep + cerita + kuis awal | `fis-gerak-parabola` (l2.mdx, story YAML, quiz YAML) |
| ⬜ Belum diproduksi | semua konsep lain di dokumen ini |

Urutan produksi yang disarankan (setelah M1): lengkapi rantai prasyarat
`fis-gerak-parabola` → `fis-gerak-lurus` → `mat-trigonometri-dasar` →
`mat-pecahan-rasio` (M2: katalog membaca dari konten nyata), lalu kembangkan
per topik. L4–L5 menyusul setelah fondasi L0–L3 stabil.

## 8. Peta prasyarat (ringkas)

```
MATEMATIKA
mat-membilang → mat-tambah-kurang → mat-kali-bagi → mat-pecahan-rasio → mat-desimal-persen → mat-pangkat-akar → mat-barisan-deret ─┐
mat-membilang → mat-baca-grafik ──→ mat-rata-rata ──→ mat-peluang ──→ mat-statistika                                          │
mat-tambah-kurang → mat-pola-simbol ─┐                                                                                         │
mat-pecahan-rasio ─┬─→ mat-persamaan-linear ──→ mat-sistem-persamaan                                                           │
                   ├─→ mat-trigonometri-dasar ──────────────────────────────────────────────┐                                   │
                   └─→ (prasyarat fisika, lihat bawah)                                      │                                   │
mat-persamaan-linear + mat-pangkat-akar → mat-persamaan-kuadrat → mat-fungsi-grafik → mat-geometri-analitik                   │
mat-kali-bagi + mat-bentuk → mat-luas-keliling → mat-pythagoras / mat-bangun-ruang                                             │
                                                                                                                              ▼
FISIKA                                                                    mat-fungsi-grafik + mat-barisan-deret → mat-limit → mat-turunan → mat-integral
fis-dorong-tarik (L0, mandiri)
fis-bunyi (L1) → fis-getaran → fis-gelombang
fis-bayangan (L1) → fis-warna → fis-optik
fis-wujud-zat (L1) → fis-suhu → fis-kalor ──┐
mat-tambah-kurang → fis-jarak-waktu ─────────┤
mat-pecahan-rasio → fis-gerak-lurus → fis-gerak-parabola ✅ → fis-newton → fis-usaha-energi ─┬─→ fis-kalor
                                            │                                                └─→ fis-momentum
                                            └─→ (fis-gerak-melingkar → fis-gravitasi) [L4]
fis-listrik-statis (L2) → fis-rangkaian → fis-magnet [L4]
```

> Legenda: ✅ = lesson lengkap · 🔜 = tahap lanjut (L4–L5) · tanpa tanda = antrean produksi M2+.

## 9. Roadmap referensi lengkap — SD sampai pascasarjana

> Bagian ini memuat roadmap materi dari pengguna (2026-10-05) **apa adanya**,
> sebagai referensi arah jangka panjang. Cakupan produksi aplikasi tetap
> L0–L5 (§4–§5). Semua materi yang melampaui L5 adalah referensi kurikulum,
> **bukan** target produksi.

### 9.1 Pemetaan level roadmap → level Semesta

| Roadmap | Jenjang | Setara Semesta | Status di dokumen ini |
|---|---|---|---|
| Matematika Level 1 | SD | L0–L1 | Rinci di §4.1, §4.3, §4.4 |
| Matematika Level 2 | SMP | L2 | Rinci di §4.1–§4.4 |
| Matematika Level 3 | SMA | L3 | Rinci di §4.1–§4.4 |
| Matematika Level 4 | Awal kuliah | L4–L5 | Rinci di §4.5 |
| Matematika Level 5–8 | Sarjana–mahir | Di luar L5 | Referensi (§9.2) |
| Fisika Level 1 | SD–SMP awal | L0–L1 | Rinci di §5 |
| Fisika Level 2 | SMP | L2 | Rinci di §5 |
| Fisika Level 3 | SMA | L3 | Rinci di §5 |
| Fisika Level 4 | PT dasar | L4–L5 | Sebagian (§5.1, §5.4) |
| Fisika Level 5–7 | Sarjana–mahir | Di luar L5 | Referensi (§9.3) |

### 9.2 Roadmap Materi Matematika: Dari Nol sampai Mahir

#### Level 1: Dasar (SD)

- Bilangan cacah, bilangan bulat, dan operasi hitung (+, −, ×, ÷)
- Faktor, kelipatan, FPB, KPK
- Pecahan, desimal, persen
- Perbandingan dan skala
- Satuan ukuran (panjang, berat, waktu, volume)
- Bangun datar dan bangun ruang sederhana (keliling, luas, volume)
- Statistika dasar (tabel, diagram, rata-rata)

#### Level 2: Pra-Aljabar (SMP)

- Bilangan negatif, pangkat, akar
- Aljabar dasar: variabel, ekspresi, persamaan linear
- Pertidaksamaan linear
- Sistem persamaan linear dua variabel
- Fungsi dan grafik dasar, koordinat Kartesius
- Teorema Pythagoras
- Kesebangunan dan kongruensi
- Transformasi geometri (translasi, refleksi, rotasi, dilatasi)
- Peluang dasar

#### Level 3: Matematika Menengah (SMA)

- Persamaan dan fungsi kuadrat
- Eksponen dan logaritma
- Barisan dan deret (aritmetika, geometri)
- Trigonometri (sin, cos, tan, identitas, persamaan)
- Polinomial dan teorema sisa
- Matriks dan determinan
- Vektor
- Geometri analitik (garis, lingkaran, elips, parabola, hiperbola)
- Fungsi komposisi dan invers
- Limit fungsi
- Turunan dan integral dasar
- Statistika dan peluang (permutasi, kombinasi, distribusi)

#### Level 4: Kalkulus (Awal Kuliah)

- Limit dan kekontinuan
- Turunan: aturan rantai, turunan implisit, aplikasi (maks/min, laju perubahan)
- Integral: tak tentu, tentu, teknik integrasi, aplikasi (luas, volume)
- Barisan dan deret tak hingga, deret Taylor dan Maclaurin
- Kalkulus multivariabel: turunan parsial, gradien, integral lipat dua dan tiga
- Kalkulus vektor: integral garis, teorema Green, Stokes, Gauss

#### Level 5: Aljabar Linear dan Matematika Diskrit

- Sistem persamaan linear, eliminasi Gauss
- Ruang vektor, basis, dimensi
- Transformasi linear
- Nilai eigen dan vektor eigen
- Diagonalisasi, dekomposisi (LU, QR, SVD)
- Logika proposisi dan predikat
- Himpunan, relasi, fungsi
- Induksi matematika
- Kombinatorika
- Teori graf
- Teori bilangan dasar

#### Level 6: Matematika Terapan

- Persamaan diferensial biasa (ODE) orde 1 dan 2
- Transformasi Laplace
- Deret dan transformasi Fourier
- Persamaan diferensial parsial (PDE)
- Probabilitas dan statistika lanjut (distribusi, inferensi, regresi, uji hipotesis)
- Komputasi/metode numerik (akar persamaan, interpolasi, integrasi numerik, solusi ODE numerik)
- Optimasi dan pemrograman linear

#### Level 7: Matematika Lanjut (Tingkat Sarjana Matematika)

- Analisis real: kelengkapan bilangan real, konvergensi, kekontinuan seragam, integral Riemann
- Aljabar abstrak: grup, ring, field
- Topologi dasar
- Analisis kompleks: fungsi analitik, integral kontur, residu
- Teori peluang berbasis ukuran (measure theory)
- Geometri diferensial dasar

#### Level 8: Spesialisasi (Mahir)

- Analisis fungsional
- Teori Galois
- Topologi aljabar
- Persamaan diferensial lanjut
- Teori kontrol dan sistem dinamik
- Proses stokastik
- Matematika untuk AI/ML (optimasi konveks, teori informasi, statistika Bayesian)
- Kriptografi dan teori bilangan lanjut

### 9.3 Roadmap Materi Fisika: Dari Nol sampai Mahir

#### Level 1: Pengenalan Sains dan Fisika Dasar (SD–SMP Awal)

- Besaran dan satuan (SI), pengukuran, angka penting
- Sifat dan wujud zat
- Suhu dan kalor dasar
- Gaya, gerak sederhana, dan energi dalam kehidupan sehari-hari
- Cahaya dan bunyi (pengenalan)
- Listrik dan magnet sederhana

#### Level 2: Fisika SMP

- Gerak lurus (GLB, GLBB)
- Hukum Newton dan jenis-jenis gaya
- Usaha, energi, dan daya
- Pesawat sederhana
- Tekanan (zat padat, cair, gas), hukum Pascal, Archimedes
- Getaran, gelombang, dan bunyi
- Cahaya, pemantulan, pembiasan, lensa, dan cermin
- Listrik statis dan dinamis, rangkaian sederhana, hukum Ohm
- Kemagnetan dan induksi elektromagnetik dasar
- Tata surya dan bumi

#### Level 3: Fisika SMA

- Besaran vektor dan analisis dimensi
- Kinematika: gerak parabola, gerak melingkar
- Dinamika: hukum Newton lanjut, gesekan, gaya sentripetal
- Usaha, energi, momentum, impuls, dan tumbukan
- Gravitasi Newton dan hukum Kepler
- Elastisitas dan hukum Hooke
- Dinamika rotasi: momen gaya, momen inersia, kesetimbangan benda tegar
- Fluida statis dan dinamis (Bernoulli)
- Suhu, kalor, teori kinetik gas, termodinamika
- Gelombang mekanik, bunyi (efek Doppler), gelombang cahaya (interferensi, difraksi)
- Listrik statis (hukum Coulomb, medan, potensial, kapasitor)
- Listrik dinamis, hukum Kirchhoff, rangkaian arus searah
- Medan magnet, gaya Lorentz, induksi elektromagnetik, arus bolak-balik
- Fisika modern: relativitas khusus, efek fotoelektrik, model atom, radioaktivitas

#### Level 4: Fisika Dasar Perguruan Tinggi (prasyarat: kalkulus)

- Mekanika klasik dengan kalkulus: kinematika dan dinamika vektor
- Kerja, energi, dan kekekalan energi
- Sistem partikel, pusat massa, momentum sudut
- Osilasi harmonik sederhana, teredam, dan paksa
- Gelombang: persamaan gelombang, superposisi, gelombang berdiri
- Termodinamika: hukum I–III, entropi, mesin kalor
- Listrik dan magnet: hukum Gauss, hukum Ampere, hukum Faraday
- Persamaan Maxwell (pengenalan)
- Optik geometri dan optik fisis
- Pengantar fisika modern

#### Level 5: Fisika Menengah — Tingkat Sarjana (prasyarat: ODE, aljabar linear, kalkulus vektor)

- Mekanika klasik: formulasi Lagrange dan Hamilton, gaya sentral, kerangka non-inersia
- Elektrodinamika: persamaan Maxwell lengkap, gelombang elektromagnetik, radiasi
- Mekanika kuantum: persamaan Schrödinger, sumur potensial, osilator harmonik, atom hidrogen, spin
- Fisika statistik dan termodinamika: ensemble, distribusi Boltzmann, Fermi-Dirac, Bose-Einstein
- Metode matematika fisika: deret Fourier, fungsi khusus, PDE, fungsi kompleks
- Fisika komputasi dan simulasi numerik
- Optik lanjut dan fisika gelombang

#### Level 6: Fisika Lanjut (Akhir Sarjana ke Pascasarjana)

- Mekanika kuantum lanjut: teori perturbasi, hamburan, simetri, momentum sudut
- Relativitas khusus dalam formulasi tensor, pengantar relativitas umum
- Fisika zat padat: struktur kristal, pita energi, semikonduktor, superkonduktivitas
- Fisika atom dan molekul
- Fisika inti dan partikel: model standar, interaksi fundamental
- Astrofisika dan kosmologi
- Fisika plasma

#### Level 7: Spesialisasi (Mahir)

- Teori medan kuantum (QFT)
- Relativitas umum dan kosmologi lanjut
- Fisika materi terkondensasi lanjut
- Teori string dan gravitasi kuantum
- Informasi kuantum dan komputasi kuantum
- Fisika partikel energi tinggi
- Fisika statistik non-ekuilibrium dan sistem kompleks
- Fisika biologi dan biofisika
- Fisika eksperimental: instrumentasi, analisis data, dan fisika detektor

### 9.4 Kandidat penambahan (dari roadmap, dalam cakupan L0–L3, belum rinci di §4–§5)

Topik-topik berikut muncul di roadmap §9.2–§9.3 pada jenjang SD–SMA tetapi
belum dijabarkan sebagai konsep di §4–§5. Kandidat untuk ditambahkan
bertahap (keputusan produksi terpisah — belum masuk skill-graph maupun
materi):

**Matematika** — FPB & KPK; skala; satuan ukuran; pertidaksamaan linear;
kesebangunan & kongruensi; transformasi geometri; logaritma; polinomial &
teorema sisa; matriks & determinan; vektor; fungsi invers; permutasi &
kombinasi.

**Fisika** — besaran & satuan SI + angka penting; pesawat sederhana; tekanan
(zat padat/cair/gas), hukum Pascal & Archimedes; tata surya & bumi;
elastisitas & hukum Hooke; dinamika rotasi; fluida dinamis (Bernoulli); teori
kinetik gas & termodinamika; efek Doppler; interferensi & difraksi; hukum
Coulomb & kapasitor; hukum Kirchhoff; gaya Lorentz & arus bolak-balik; fisika
modern (relativitas khusus, efek fotoelektrik, model atom, radioaktivitas).
