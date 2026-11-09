# GymMulai — Aplikasi Panduan Gym Pemula (Web PC & Mobile PWA)

Aplikasi web interaktif untuk membantu pemula memulai latihan di gym tanpa rasa bingung atau cemas. Dirancang responsif untuk layar **Komputer (PC)** maupun **Smartphone (Android/iOS)** dengan dukungan penyimpanan lokal (*Offline-First*).

## Fitur Utama

1. **Ensiklopedia Alat Gym & Mesin (11 Kategori Alat Utama)**
   - Panduan cara mengatur pin beban, tinggi jok kursi, bantalan paha, dan poros mesin sebelum duduk.
   - Rekomendasi beban awal hari pertama untuk pria & wanita.
   - **Simulasi Gerakan Interaktif (SVG Animasi 2 Fase: Eksentris & Konsentris)** yang bekerja 100% tanpa kuota internet, ditambah video referensi YouTube.
   - Daftar *Do's & Don'ts* dan rekomendasi alat alternatif saat gym sedang penuh.
2. **Katalog Gerakan Latihan Lengkap (16 Gerakan Terkurasi)**
   - Mencakup Dada, Punggung, Kaki, Bahu, Lengan (Bisep/Trisep), Perut/Core, dan Kardio.
   - Dilengkapi diagram anatomi otot utama & pendukung, aturan pernapasan (*Inhale/Exhale*), dan *pro tips*.
3. **Program Latihan Terstruktur**
   - *Full Body 3 Hari/Minggu*, *Mesin Saja (Bebas Cemas)*, dan *Upper / Lower 4 Hari*.
   - Setiap gerakan di dalam jadwal dapat diklik langsung untuk melihat panduan visualnya.
4. **Kuis Pembuat Rencana Latihan Otomatis**
   - Menyesuaikan rekomendasi berdasarkan **Tujuan** (Bentuk Otot, Bakar Lemak, Stamina), **Frekuensi** (2, 3, 4, atau 5 hari/minggu), **Kondisi Sendi** (Sehat, Lutut, Pinggang Bawah, atau Bahu), dan **Kenyamanan Alat**.
5. **Workout Tracker, Rest Timer & Backup Data**
   - Progres sesi latihan yang sedang berjalan tersimpan otomatis di `localStorage` (tidak hilang saat *refresh*).
   - *Rest Timer* otomatis menyesuaikan durasi istirahat per gerakan (60d / 75d / 90d) dengan indikator suara *Web Audio API*.
   - Fitur **Ekspor & Impor Backup JSON** agar riwayat latihan dapat disimpan atau dipindahkan ke perangkat lain.
6. **Kalkulator Kalori, Protein, BMI & Panduan Pemanasan**
   - Menghitung kebutuhan kalori harian (*Mifflin-St Jeor TDEE*), target gram protein harian beserta contoh takaran makanan Indonesia, serta panduan membedakan pegal otot wajar (*DOMS*) vs nyeri cedera sendi.
7. **Etika Gym, Kamus Istilah & Checklist Tas Gym**

## Cara Menjalankan di Komputer Lokal

```bash
# 1. Masuk ke direktori proyek
cd C:\Users\ahmad.alfian\.gemini\antigravity\scratch\gym-pemula

# 2. Instal dependensi
npm install

# 3. Jalankan server pengembangan (bisa diakses di PC & HP via Wi-Fi)
npm run dev -- --host

# 4. Build untuk produksi (Vercel / Netlify / Cloudflare Pages)
npm run build
```
