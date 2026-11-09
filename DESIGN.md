# DESIGN.md - GymMulai (iOS Human Interface Guidelines Edition)

## 1. Design Read & Identity
Reading this as: Aplikasi web & mobile pendamping latihan gym pemula Indonesia, dalam gaya bahasa visual iOS 18 Human Interface Guidelines (Apple Fitness+ & Apple Health), dial ENERGY 2 / RHYTHM 2 / MOTION 2.

- **Product Identity**: Aplikasi panduan alat gym, gerakan latihan, program mingguan, pencatat set (Workout Tracker), dan kalkulator nutrisi untuk pemula.
- **Visual Language**: iOS 18 Native Design System (menggabungkan karakter studio gelap **Apple Fitness+** dan keterbacaan bersih **Apple Health**).
- **Liveliness Dials**:
  - **ENERGY: 2 (Balanced)** - Kontras tipografi *iOS Large Title* yang tegas dengan aksen hijau kebugaran (`#30D158` / `#15803D`) pada titik fokus utama.
  - **RHYTHM: 2 (Consistent with purposeful variation)** - Mengombinasikan *iOS Inset Grouped Lists* (`UITableView.Style.insetGrouped`), *Activity Ring Summary*, *Segmented Controls* (`UISegmentedControl`), dan *Card Grid* sesuai fungsi konten.
  - **MOTION: 2 (Purposeful transitions)** - Transisi *Bottom Sheet* (`cubic-bezier(0.32, 0.72, 0, 1)` khas pegas iOS), *Segmented Control pill*, dan simulator gerakan anatomi dengan tombol jeda (*Pause*).

## 2. Color System & WCAG AA Contrast Verification (R-25, R-29, R-34)
Palet dibatasi secara ketat pada warna permukaan sistem iOS (netral) ditambah maksimal 2 warna inti fungsional dan 1 warna aksen utama:

### A. Dark Mode (Default - Apple Fitness+ Studio)
- **Canvas Background (`--ios-bg`)**: `#000000` (Pure OLED Black)
- **Primary Grouped Surface (`--ios-card`)**: `#1C1C1E` (`secondarySystemGroupedBackground`)
- **Elevated Surface (`--ios-card-elevated`)**: `#2C2C2E` (`tertiarySystemGroupedBackground`)
- **Primary Text (`--ios-text`)**: `#FFFFFF` (Rasio kontras `21.00:1` di atas `#000000` dan `17.01:1` di atas `#1C1C1E` - **PASS AAA**)
- **Secondary Text (`--ios-text-secondary`)**: `#AEAEB2` (Rasio kontras `7.69:1` di atas `#1C1C1E` - **PASS AAA**)
- **Primary Accent (`--ios-green`)**: `#30D158` (Apple Fitness Green; teks `#000000` di atas tombol `#30D158` memiliki rasio `10.39:1` - **PASS AAA**; teks hijau `#30D158` di atas `#1C1C1E` memiliki rasio `8.42:1` - **PASS AAA**)
- **Secondary Navigation / Action (`--ios-blue`)**: `#0A84FF` (iOS System Blue; rasio `4.66:1` di atas `#1C1C1E` - **PASS AA**)

### B. Light Mode (Apple Health Daylight)
- **Canvas Background (`--ios-bg`)**: `#F2F2F7` (`systemGroupedBackground`)
- **Primary Grouped Surface (`--ios-card`)**: `#FFFFFF` (`secondarySystemGroupedBackground`)
- **Elevated Surface (`--ios-card-elevated`)**: `#E5E5EA` (`systemGray5`)
- **Primary Text (`--ios-text`)**: `#111111` (Rasio kontras `18.88:1` di atas `#FFFFFF` dan `16.92:1` di atas `#F2F2F7` - **PASS AAA**)
- **Secondary Text (`--ios-text-secondary`)**: `#52525B` (Rasio kontras `7.73:1` di atas `#FFFFFF` dan `6.93:1` di atas `#F2F2F7` - **PASS AA**)
- **Primary Accent Fill (`--ios-green`)**: `#248A3D` / Teks Aksen Hijau (`--ios-green-text`): `#15803D` (Rasio kontras `5.02:1` di atas `#FFFFFF` - **PASS AA**)
- **Secondary Navigation / Action (`--ios-blue`)**: `#0055B3` (Rasio kontras `7.12:1` di atas `#FFFFFF` - **PASS AAA**)

## 3. One-Line Justifications for Every Major Visual Decision (R-31)
- **Why this color palette?**: Mengadopsi permukaan sistem iOS (`#000000`/`#1C1C1E` pada Dark Mode dan `#F2F2F7`/`#FFFFFF` pada Light Mode) dengan aksen Apple Fitness Green (`#30D158`) untuk memberi kejelasan hierarki tindakan olahraga dan keterbacaan di berbagai pencahayaan ruang gym.
- **Why this layout?**: Menggabungkan *iOS Large Title Navigation*, *Segmented Control*, dan *Inset Grouped List* agar pengguna HP dapat menjangkau seluruh fitur utama dengan satu ibu jari (*Thumb Zone*) sekaligus tetap rapi dalam 3 kolom proporsional di layar PC.
- **Why this typography?**: Menggunakan tumpukan font sistem Apple (`-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Plus Jakarta Sans'`) dengan *tight tracking* pada judul besar dan ukuran minimal 16px pada input untuk mencegah *auto-zoom* di Safari iOS serta menjaga keterbacaan jarak lengan saat latihan.
- **Why this spacing & radius system?**: Menerapkan radius bertingkat (`20px` untuk *Inset Grouped Cards*, `12px` untuk tombol & input, `9999px` khusus indikator aktif/kapsul) agar perbedaan fungsi antara kontainer grup, tombol aksi, dan kontrol segmen terlihat jelas.
- **Why use Bottom Sheets & Inset Grouped Lists?**: Detail alat/gerakan ditampilkan sebagai *iOS Sheet* dengan *grabber bar* di bagian atas dan daftar langkah disusun dalam *Inset Grouped List* bergaris pemisah tipis (*hairline separator*) untuk mengurangi kebisingan kotak-kotak ber-border ganda.
- **Why use these icons & diagrams?**: Ikon fungsional (barbel, pengukur waktu, kalkulator, perisai) dan diagram SVG anatomi otot digunakan murni sebagai penanda lokasi otot serta fungsi mekanis alat, tanpa ikon dekoratif AI seperti *sparkle*.
- **Why apply backdrop-blur only on navigation chrome (R-10)?**: *Translucent blur* dibatasi hanya pada *Top Navigation Bar* dan *Mobile Tab Bar* (maksimal 2 elemen) untuk menjaga orientasi halaman saat *scrolling*, sementara seluruh kartu dan *modal sheet* menggunakan permukaan solid agar kontras teks tetap tajam.
