import React, { useState, useMemo } from 'react';
import { Calculator, Flame, HeartPulse, ShieldAlert, TrendingUp, Utensils, CheckCircle2, AlertTriangle } from 'lucide-react';

export function NutritionWarmupSection() {
  const [subTab, setSubTab] = useState('calculator'); // 'calculator', 'warmup', 'safety'
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(24);
  const [activity, setActivity] = useState(1.375); // 1.2, 1.375, 1.55, 1.725
  const [goal, setGoal] = useState('muscle'); // 'muscle', 'fatloss', 'maintain'

  const stats = useMemo(() => {
    const w = Math.max(30, Math.min(200, Number(weight) || 65));
    const h = Math.max(120, Math.min(220, Number(height) || 170));
    const a = Math.max(14, Math.min(90, Number(age) || 24));

    // Mifflin-St Jeor Equation
    const bmr =
      gender === 'male'
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = Math.round(bmr * activity);

    let targetCalories = tdee;
    let goalExplanation = 'Kalori pemeliharaan (Maintenance) untuk menjaga berat badan dan kebugaran.';
    if (goal === 'muscle') {
      targetCalories = tdee + 300;
      goalExplanation = 'Surplus +300 kkal/hari (Lean Bulking) untuk membangun massa otot baru tanpa menimbun banyak lemak.';
    } else if (goal === 'fatloss') {
      targetCalories = Math.max(1200, tdee - 400);
      goalExplanation = 'Defisit -400 kkal/hari (Cutting Sehat) untuk membakar cadangan lemak sambil mempertahankan otot.';
    }

    // Protein target: 1.6g - 2.0g per kg of bodyweight
    const proteinMin = Math.round(w * 1.6);
    const proteinMax = Math.round(w * 2.0);
    const waterLiters = (w * 0.038).toFixed(1);

    // BMI
    const heightM = h / 100;
    const bmi = (w / (heightM * heightM)).toFixed(1);
    let bmiCategory = 'Ideal / Normal';
    if (bmi < 18.5) bmiCategory = 'Kurus (Underweight)';
    else if (bmi >= 25 && bmi < 29.9) bmiCategory = 'Berlebih (Overweight)';
    else if (bmi >= 30) bmiCategory = 'Obesitas';

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      goalExplanation,
      proteinMin,
      proteinMax,
      waterLiters,
      bmi,
      bmiCategory
    };
  }, [gender, weight, height, age, activity, goal]);

  return (
    <div className="space-y-6">
      {/* iOS Segmented Sub-navigation */}
      <div className="ios-segmented w-full flex overflow-x-auto" role="tablist" aria-label="Menu Nutrisi dan Keamanan">
        <button
          type="button"
          role="tab"
          aria-selected={subTab === 'calculator'}
          onClick={() => setSubTab('calculator')}
          className={`ios-segment-btn flex-1 min-h-[40px] px-4 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap ${
            subTab === 'calculator' ? 'ios-segment-btn-active' : ''
          }`}
        >
          <Calculator className="w-4 h-4" /> Kalkulator Kalori & Protein
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subTab === 'warmup'}
          onClick={() => setSubTab('warmup')}
          className={`ios-segment-btn flex-1 min-h-[40px] px-4 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap ${
            subTab === 'warmup' ? 'ios-segment-btn-active' : ''
          }`}
        >
          <Flame className="w-4 h-4" /> Pemanasan & Beban Awal
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subTab === 'safety'}
          onClick={() => setSubTab('safety')}
          className={`ios-segment-btn flex-1 min-h-[40px] px-4 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap ${
            subTab === 'safety' ? 'ios-segment-btn-active' : ''
          }`}
        >
          <HeartPulse className="w-4 h-4" /> Pegal Wajar vs Cedera
        </button>
      </div>

      {/* TAB 1: KALKULATOR NUTRISI */}
      {subTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Input Panel */}
          <div className="lg:col-span-5 ios-card p-5 space-y-4">
            <h3 className="font-bold text-lg text-[var(--ios-label)] flex items-center gap-2 tracking-tight">
              <Calculator className="w-5 h-5 text-[var(--ios-tint)]" /> Data Tubuh & Target
            </h3>

            {/* Gender */}
            <div>
              <span className="text-xs font-semibold text-[var(--ios-label-secondary)] block mb-1.5">Jenis Kelamin</span>
              <div className="ios-segmented w-full grid grid-cols-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`ios-segment-btn min-h-[40px] text-xs font-semibold ${
                    gender === 'male' ? 'ios-segment-btn-active' : ''
                  }`}
                >
                  Pria
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`ios-segment-btn min-h-[40px] text-xs font-semibold ${
                    gender === 'female' ? 'ios-segment-btn-active' : ''
                  }`}
                >
                  Wanita
                </button>
              </div>
            </div>

            {/* Weight, Height, Age */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="calc-weight" className="text-xs font-semibold text-[var(--ios-label-secondary)] block mb-1">
                  Berat (kg)
                </label>
                <input
                  id="calc-weight"
                  type="number"
                  min="30"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="ios-input w-full min-h-[44px] py-2 px-3 font-mono tabular-nums text-sm"
                />
              </div>
              <div>
                <label htmlFor="calc-height" className="text-xs font-semibold text-[var(--ios-label-secondary)] block mb-1">
                  Tinggi (cm)
                </label>
                <input
                  id="calc-height"
                  type="number"
                  min="120"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="ios-input w-full min-h-[44px] py-2 px-3 font-mono tabular-nums text-sm"
                />
              </div>
              <div>
                <label htmlFor="calc-age" className="text-xs font-semibold text-[var(--ios-label-secondary)] block mb-1">
                  Usia (thn)
                </label>
                <input
                  id="calc-age"
                  type="number"
                  min="14"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="ios-input w-full min-h-[44px] py-2 px-3 font-mono tabular-nums text-sm"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label htmlFor="calc-activity" className="text-xs font-semibold text-[var(--ios-label-secondary)] block mb-1">
                Frekuensi Olahraga
              </label>
              <select
                id="calc-activity"
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="ios-input w-full min-h-[44px] py-2.5 px-3 text-xs font-medium"
              >
                <option value={1.2}>Jarang Olahraga (Baru mau mulai)</option>
                <option value={1.375}>Gym Pemula 2 sampai 3x Seminggu</option>
                <option value={1.55}>Gym Aktif 4 sampai 5x Seminggu</option>
                <option value={1.725}>Sangat Aktif / Kerja Fisik Berat</option>
              </select>
            </div>

            {/* Goal */}
            <div>
              <span className="text-xs font-semibold text-[var(--ios-label-secondary)] block mb-1.5">Target Tujuan</span>
              <div className="ios-segmented w-full grid grid-cols-3">
                {[
                  { id: 'muscle', label: 'Bentuk Otot' },
                  { id: 'fatloss', label: 'Bakar Lemak' },
                  { id: 'maintain', label: 'Jaga Berat' }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoal(g.id)}
                    className={`ios-segment-btn min-h-[40px] px-2 text-xs font-semibold ${
                      goal === g.id ? 'ios-segment-btn-active' : ''
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Results (Apple Health Style Summary Cards) */}
          <div className="lg:col-span-7 ios-card p-5 space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-[14px] bg-[var(--ios-tint-soft)] border border-[var(--ios-separator)]">
                <span className="text-xs font-medium text-[var(--ios-label-secondary)] block">Target Kalori</span>
                <strong className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[var(--ios-tint)]">
                  {stats.targetCalories}
                </strong>
                <span className="text-[11px] text-[var(--ios-label-secondary)] block">kkal / hari</span>
              </div>
              <div className="p-3.5 rounded-[14px] bg-[var(--ios-amber-soft)] border border-[var(--ios-separator)]">
                <span className="text-xs font-medium text-[var(--ios-label-secondary)] block">Target Protein</span>
                <strong className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[var(--ios-amber)]">
                  {stats.proteinMin}-{stats.proteinMax}g
                </strong>
                <span className="text-[11px] text-[var(--ios-label-secondary)] block">gram / hari</span>
              </div>
              <div className="p-3.5 rounded-[14px] bg-[var(--ios-blue-soft)] border border-[var(--ios-separator)]">
                <span className="text-xs font-medium text-[var(--ios-label-secondary)] block">Air Putih</span>
                <strong className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[var(--ios-blue)]">
                  {stats.waterLiters} L
                </strong>
                <span className="text-[11px] text-[var(--ios-label-secondary)] block">liter / hari</span>
              </div>
              <div className="p-3.5 rounded-[14px] bg-[var(--ios-card-elevated)] border border-[var(--ios-separator)]">
                <span className="text-xs font-medium text-[var(--ios-label-secondary)] block">Skor BMI</span>
                <strong className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[var(--ios-label)]">
                  {stats.bmi}
                </strong>
                <span className="text-[11px] font-semibold text-[var(--ios-tint)] block truncate">{stats.bmiCategory}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-[14px] bg-[var(--ios-card-elevated)] border border-[var(--ios-separator)] text-xs text-[var(--ios-label-secondary)]">
              <strong className="text-[var(--ios-tint)] block mb-0.5">
                Penjelasan Kebutuhanmu (TDEE Normal: <span className="font-mono tabular-nums">{stats.tdee}</span> kkal):
              </strong>
              {stats.goalExplanation}
            </div>

            {/* Real Indonesian Food Protein Reference */}
            <div className="space-y-2">
              <h4 className="ios-section-header px-1 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[var(--ios-tint)]" />
                Sumber Protein Harian Mudah di Indonesia
              </h4>
              <div className="ios-grouped-list bg-[var(--ios-card-elevated)]">
                <div className="ios-list-row flex items-center justify-between text-xs">
                  <span className="text-[var(--ios-label)] font-medium">100g Dada Ayam Tanpa Kulit</span>
                  <strong className="font-mono tabular-nums text-[var(--ios-tint)]">30g Protein</strong>
                </div>
                <div className="ios-list-row flex items-center justify-between text-xs">
                  <span className="text-[var(--ios-label)] font-medium">100g Ikan Tongkol / Tuna / Lele</span>
                  <strong className="font-mono tabular-nums text-[var(--ios-tint)]">24g Protein</strong>
                </div>
                <div className="ios-list-row flex items-center justify-between text-xs">
                  <span className="text-[var(--ios-label)] font-medium">100g Tempe (3 sampai 4 Potong Sedang)</span>
                  <strong className="font-mono tabular-nums text-[var(--ios-tint)]">19g Protein</strong>
                </div>
                <div className="ios-list-row flex items-center justify-between text-xs">
                  <span className="text-[var(--ios-label)] font-medium">2 Butir Telur Ayam Utuh</span>
                  <strong className="font-mono tabular-nums text-[var(--ios-tint)]">12g Protein</strong>
                </div>
              </div>
            </div>

            {/* Pre & Post Workout Meal Guide */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-[14px] bg-[var(--ios-card-elevated)] border border-[var(--ios-separator)]">
                <strong className="text-[var(--ios-amber)] block mb-1">Sebelum Gym (60 sampai 90 Menit Sebelum):</strong>
                <p className="text-[var(--ios-label-secondary)] leading-relaxed">
                  Konsumsi karbohidrat mudah cerna agar bertenaga saat angkat beban: 1 sampai 2 buah pisang, roti gandum, atau nasi porsi sedang dengan lauk rendah minyak. Jangan latihan dengan perut kosong.
                </p>
              </div>
              <div className="p-3.5 rounded-[14px] bg-[var(--ios-card-elevated)] border border-[var(--ios-separator)]">
                <strong className="text-[var(--ios-tint)] block mb-1">Sesudah Gym (1 sampai 2 Jam Setelah):</strong>
                <p className="text-[var(--ios-label-secondary)] leading-relaxed">
                  Waktunya memulihkan serat otot: makan makanan tinggi protein (dada ayam, ikan, telur, atau tempe) ditambah karbohidrat (nasi atau kentang) dan minum air putih yang cukup.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PEMANASAN, PENDINGINAN & MEMILIH BEBAN */}
      {subTab === 'warmup' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="ios-card p-5 space-y-3">
            <div className="flex items-center gap-2 text-[var(--ios-amber)] font-bold text-base">
              <Flame className="w-5 h-5" />
              <h3>Urutan Pemanasan Wajib (5 sampai 8 Menit)</h3>
            </div>
            <p className="text-xs text-[var(--ios-label-secondary)] leading-relaxed">
              Hindari peregangan statis (menahan tarikan otot diam lama) sebelum angkat beban karena dapat menurunkan tenaga otot. Lakukan <strong className="text-[var(--ios-label)]">Pemanasan Dinamis</strong> berikut:
            </p>
            <div className="ios-grouped-list bg-[var(--ios-card-elevated)] text-xs">
              <div className="ios-list-row">
                <strong className="text-[var(--ios-label)] block mb-0.5">1. Jalan Cepat di Treadmill / Sepeda Statis (3-5 Menit)</strong>
                <span className="text-[var(--ios-label-secondary)]">Menaikkan suhu tubuh dan melumasi cairan sendi.</span>
              </div>
              <div className="ios-list-row">
                <strong className="text-[var(--ios-label)] block mb-0.5">2. Arm Circles & Shoulder Rolls (15x Putaran)</strong>
                <span className="text-[var(--ios-label-secondary)]">Putar bahu dan lengan ke depan serta belakang untuk membuka sendi bahu.</span>
              </div>
              <div className="ios-list-row">
                <strong className="text-[var(--ios-label)] block mb-0.5">3. Bodyweight Squat Tanpa Beban (10x Repetisi)</strong>
                <span className="text-[var(--ios-label-secondary)]">Mengaktifkan sendi pinggul, lutut, dan pergelangan kaki.</span>
              </div>
              <div className="ios-list-row">
                <strong className="text-[var(--ios-label)] block mb-0.5">4. Satu Set Pemanasan di Alat Pertama (12 Reps Beban 50%)</strong>
                <span className="text-[var(--ios-label-secondary)]">Sebelum masuk ke beban utama, lakukan 1 set ringan untuk merasakan jalur mesin.</span>
              </div>
            </div>
          </div>

          <div className="ios-card p-5 space-y-3">
            <div className="flex items-center gap-2 text-[var(--ios-tint)] font-bold text-base">
              <TrendingUp className="w-5 h-5" />
              <h3>Cara Menentukan Beban Pertama & Naik Beban</h3>
            </div>
            <p className="text-xs text-[var(--ios-label-secondary)] leading-relaxed">
              Bingung harus pasang pin di angka berapa saat hari pertama? Gunakan panduan <strong className="text-[var(--ios-label)]">Aturan 2-for-2 (Progressive Overload)</strong>:
            </p>
            <div className="ios-grouped-list bg-[var(--ios-card-elevated)] text-xs">
              <div className="ios-list-row">
                <strong className="text-[var(--ios-tint)] block mb-0.5">Langkah 1: Tes di Beban Paling Ringan</strong>
                <span className="text-[var(--ios-label-secondary)]">
                  Pasang pin di plat ke-2 dari atas. Coba lakukan 10 repetisi. Jika terasa terlalu ringan, naikkan 1 tingkat plat pada set berikutnya.
                </span>
              </div>
              <div className="ios-list-row">
                <strong className="text-[var(--ios-tint)] block mb-0.5">Langkah 2: Beban yang Tepat (Target 10-12 Reps)</strong>
                <span className="text-[var(--ios-label-secondary)]">
                  Beban yang pas membuat repetisi ke-10, 11, dan 12 terasa mulai berat dan menantang, tetapi postur tubuh masih rapi dan stabil.
                </span>
              </div>
              <div className="ios-list-row">
                <strong className="text-[var(--ios-amber)] block mb-0.5">Langkah 3: Aturan Kapan Naik Beban Mingguan</strong>
                <span className="text-[var(--ios-label-secondary)]">
                  Jika minggu ini kamu mampu menyelesaikan 12 repetisi penuh di semua 3 set dengan teknik rapi, minggu depan naikkan beban 1 tingkat (2.5 sampai 5 kg).
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PEGAL WAJAR (DOMS) VS CEDERA + DISCLAIMER MEDIS */}
      {subTab === 'safety' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="ios-card p-5 space-y-3 border-[var(--ios-tint)]">
              <h3 className="font-bold text-base text-[var(--ios-tint)] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Pegal Otot Wajar (DOMS): Aman
              </h3>
              <ul className="space-y-2 text-xs text-[var(--ios-label-secondary)] leading-relaxed">
                <li>• <strong className="text-[var(--ios-label)]">Kapan muncul:</strong> Baru terasa 12 sampai 24 jam setelah latihan selesai (biasanya besok paginya).</li>
                <li>• <strong className="text-[var(--ios-label)]">Rasanya:</strong> Pegal tumpul, kaku, dan kencang di bagian perut otot (misal di tengah dada atau paha) saat otot ditekan atau diregangkan.</li>
                <li>• <strong className="text-[var(--ios-label)]">Simetris:</strong> Terasa seimbang di otot kanan dan kiri.</li>
                <li>• <strong className="text-[var(--ios-label)]">Solusi:</strong> Tetap bergerak ringan, jalan kaki, tidur 7 sampai 8 jam, dan makan cukup protein. Akan reda dalam 2 sampai 4 hari.</li>
              </ul>
            </div>

            <div className="ios-card p-5 space-y-3 border-[var(--ios-danger)]">
              <h3 className="font-bold text-base text-[var(--ios-danger)] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Nyeri Cedera Sendi: Wajib Berhenti
              </h3>
              <ul className="space-y-2 text-xs text-[var(--ios-label-secondary)] leading-relaxed">
                <li>• <strong className="text-[var(--ios-label)]">Kapan muncul:</strong> Muncul mendadak secara tajam saat sedang melakukan gerakan.</li>
                <li>• <strong className="text-[var(--ios-label)]">Rasanya:</strong> Nyeri menusuk, ngilu tajam, panas, atau bunyi letupan di dalam titik persendian (lutut, ujung bahu, pergelangan, tulang belakang).</li>
                <li>• <strong className="text-[var(--ios-label)]">Tidak Simetris:</strong> Biasanya hanya sakit tajam di satu sisi sendi saja.</li>
                <li>• <strong className="text-[var(--ios-label)]">Solusi:</strong> Hentikan gerakan seketika. Jangan dipaksakan lanjut, kompres dingin jika bengkak, dan konsultasikan ke dokter atau fisioterapis.</li>
              </ul>
            </div>
          </div>

          {/* Medical & Safety Disclaimer */}
          <div className="ios-card p-4 text-xs text-[var(--ios-label-secondary)] flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[var(--ios-amber)] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--ios-amber)] block mb-1">Disclaimer Kesehatan & Keselamatan Medis:</strong>
              Seluruh panduan di aplikasi GymMulai bersifat edukasi kebugaran umum bagi pemula dan bukan pengganti saran medis profesional. Jika Anda memiliki riwayat penyakit jantung, tekanan darah tinggi tidak terkontrol, hernia, atau cedera tulang dan sendi, wajib berkonsultasi dengan dokter atau pelatih fisik tersertifikasi sebelum memulai program latihan beban.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
