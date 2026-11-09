# GymMulai: Aplikasi Panduan Gym Pemula (iOS 18 Fitness Edition)

> **Akses Langsung Tanpa Download (Live Web & PWA):**  
> **[https://doaibuu007.github.io/gym-pemula/](https://doaibuu007.github.io/gym-pemula/)**  
> *(Buka tautan di atas langsung dari browser HP iOS/Android atau PC Anda. Bisa juga ditambahkan ke Home Screen sebagai aplikasi mandiri).*

Aplikasi web interaktif bergaya **iOS 18 Human Interface Guidelines (Apple Fitness+ & Apple Health)** untuk membantu pemula memulai latihan di gym tanpa rasa bingung atau cemas. Mendukung **iOS Dark Mode** dan **iOS Light Mode** serta penyimpanan lokal otomatis (*Offline-First*).

## Fitur Utama

1. **Ensiklopedia Alat Gym & Mesin (11 Kategori Alat Utama)**
   - Panduan cara mengatur pin beban, tinggi jok kursi, bantalan paha, dan poros mesin sebelum duduk.
   - Rekomendasi beban awal hari pertama untuk pria & wanita.
   - **Simulasi Gerakan Interaktif (SVG Animasi 2 Fase: Eksentrik & Konsentrik)** dengan tombol kontrol Jeda/Putar yang bekerja 100% tanpa kuota internet, ditambah video referensi YouTube.
   - Daftar *Do's & Don'ts* dan rekomendasi alat alternatif saat gym sedang penuh.
2. **Katalog Gerakan Latihan Lengkap (16 Gerakan Terkurasi)**
   - Mencakup Dada, Punggung, Kaki, Bahu, Lengan (Bisep/Trisep), Perut/Core, dan Kardio.
   - Dilengkapi diagram anatomi otot utama & pendukung, aturan pernapasan (*Inhale/Exhale*), dan *pro tips*.
3. **Program Latihan Terstruktur**
   - *Full Body 3 Hari/Minggu*, *Mesin Saja (Bebas Cemas)*, dan *Upper / Lower 4 Hari*.
   - Setiap gerakan di dalam jadwal dapat diklik langsung untuk melihat panduan visualnya.
4. **Kuis Pembuat Rencana Latihan Otomatis**
   - Menyesuaikan rekomendasi berdasarkan **Tujuan** (Bentuk Otot, Bakar Lemak, Stamina), **Frekuensi** (2, 3, 4, atau 5 hari/minggu), **Kondisi Sendi** (Sehat, Lutut, Pinggang Bawah, atau Bahu), dan **Kenyamanan Alat**.
5. **Workout Tracker (Apple Fitness Activity Ring), Rest Timer & Backup Data**
   - Dilengkapi indikator cincin progres latihan (*Activity Ring*) dan pencatatan beban/repetisi per set yang tersimpan otomatis di `localStorage`.
   - *Rest Timer* otomatis menyesuaikan durasi istirahat per gerakan (60d / 75d / 90d) dengan indikator suara *Web Audio API*.
   - Fitur **Ekspor & Impor Backup JSON** agar riwayat latihan dapat disimpan atau dipindahkan ke perangkat lain.
6. **Kalkulator Kalori, Protein, BMI & Panduan Pemanasan**
   - Menghitung kebutuhan kalori harian (*Mifflin-St Jeor TDEE*), target gram protein harian beserta contoh takaran makanan Indonesia, serta panduan membedakan pegal otot wajar (*DOMS*) vs nyeri cedera sendi.
7. **Etika Gym, Kamus Istilah & Checklist Tas Gym Interaktif**

## Cara Menjalankan di Komputer Lokal (Opsional)

Jika ingin memodifikasi kode sumber secara lokal:

```bash
# 1. Clone repositori
git clone https://github.com/doaibuu007/gym-pemula.git
cd gym-pemula

# 2. Instal dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev -- --host

# 4. Build untuk produksi
npm run build
```
