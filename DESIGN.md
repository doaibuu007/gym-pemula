# Design Direction: GymMulai

## Identity & Purpose
- **Product:** GymMulai — Panduan Praktis & Ramah untuk Pemula Gym di Indonesia.
- **Audience:** Orang yang baru pertama kali ingin melangkah ke gym, sering merasa gugup/cemas (*gym anxiety*), bingung cara mengatur beban atau posisi duduk, dan belum paham etika gym.
- **Tone & Voice:** Hangat, bersahabat, tanpa jargon intimidatif, praktis, dan membumi (Bahasa Indonesia santai terstruktur).

## Visual Palette
- **Backgrounds:** Slate-950 (`#020617`), Slate-900 (`#0f172a`), Slate-800 (`#1e293b`).
- **Primary Accent:** Emerald-400 / Emerald-500 (`#10b981` / `#34d399`) — melambangkan energi, progres hidup sehat, dan rasa aman.
- **Secondary Accents:**
  - Amber-400 / Amber-500 (`#fbbf24`) — peringatan teknik gerakan dan tips keselamatan.
  - Cyan-400 / Teal-400 (`#22d3ee`) — panduan pernapasan dan kardio.
  - Rose-400 / Rose-500 (`#f43f5e`) — kesalahan fatal yang harus dihindari (*don'ts*).
- **Text:** Slate-100 (headings), Slate-200 / Slate-300 (body), Slate-400 (subtitles/labels).

## Typography
- **Font Family:** Plus Jakarta Sans, system sans-serif fallback.
- **Hierarchy:**
  - Headings: Bold / Black (900/800), tight tracking.
  - Body: Regular / Medium, high legibility, comfortable line height (1.6).
  - Numbers / Timers: Font mono untuk angka repetisi, detik timer, dan kilogram.

## Layout & Accessibility Rules
- **Mobile First:** Bottom Navigation bar di HP untuk kemudahan jangkauan jempol; navbar horizontal di desktop.
- **Tap Targets:** Minimal 44×44px untuk semua tombol di layar sentuh.
- **Contrast:** Memenuhi standar rasio kontras WCAG AA (teks terang di atas latar gelap tanpa warna abu-abu pudar tak terbaca).
- **Movement Cues:** Animasi interaktif visual 2 fase (eksentris & konsentris) untuk memvisualisasikan mekanika mesin dan ritme napas tanpa bergantung pada koneksi internet.
