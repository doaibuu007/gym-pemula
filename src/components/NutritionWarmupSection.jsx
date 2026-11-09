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
      {/* Sub-navigation */}
      <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1.5 gap-1.5 overflow-x-auto">
        <button
          onClick={() => setSubTab('calculator')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition whitespace-nowrap ${
            subTab === 'calculator'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4" /> Kalkulator Kalori & Protein
        </button>
        <button
          onClick={() => setSubTab('warmup')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition whitespace-nowrap ${
            subTab === 'warmup'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4" /> Pemanasan & Beban Awal
        </button>
        <button
          onClick={() => setSubTab('safety')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition whitespace-nowrap ${
            subTab === 'safety'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <HeartPulse className="w-4 h-4" /> Pegal Wajar vs Cedera
        </button>
      </div>

      {/* TAB 1: KALKULATOR NUTRISI */}
      {subTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="font-black text-lg text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-400" /> Data Tubuh & Target
            </h3>

            {/* Gender */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">Jenis Kelamin</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                    gender === 'male'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  👨 Pria
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                    gender === 'female'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  👩 Wanita
                </button>
              </div>
            </div>

            {/* Weight, Height, Age */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="calc-weight" className="text-xs font-semibold text-slate-400 block mb-1">Berat (kg)</label>
                <input
                  id="calc-weight"
                  type="number"
                  min="30"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="calc-height" className="text-xs font-semibold text-slate-400 block mb-1">Tinggi (cm)</label>
                <input
                  id="calc-height"
                  type="number"
                  min="120"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="calc-age" className="text-xs font-semibold text-slate-400 block mb-1">Usia (thn)</label>
                <input
                  id="calc-age"
                  type="number"
                  min="14"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label htmlFor="calc-activity" className="text-xs font-semibold text-slate-400 block mb-1">Frekuensi Olahraga</label>
              <select
                id="calc-activity"
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
              >
                <option value={1.2}>Jarang Olahraga (Baru mau mulai)</option>
                <option value={1.375}>Gym Pemula 2–3x Seminggu</option>
                <option value={1.55}>Gym Aktif 4–5x Seminggu</option>
                <option value={1.725}>Sangat Aktif / Kerja Fisik Berat</option>
              </select>
            </div>

            {/* Goal */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">Target Tujuan</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'muscle', label: 'Bentuk Otot' },
                  { id: 'fatloss', label: 'Bakar Lemak' },
                  { id: 'maintain', label: 'Jaga Berat' }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoal(g.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                      goal === g.id
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Results */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
                <span className="text-xs text-slate-400 block">Target Kalori</span>
                <strong className="text-xl sm:text-2xl font-black text-emerald-400">{stats.targetCalories}</strong>
                <span className="text-[11px] text-slate-400 block">kkal / hari</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40">
                <span className="text-xs text-slate-400 block">Target Protein</span>
                <strong className="text-xl sm:text-2xl font-black text-amber-400">
                  {stats.proteinMin}–{stats.proteinMax}g
                </strong>
                <span className="text-[11px] text-slate-400 block">gram / hari</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40">
                <span className="text-xs text-slate-400 block">Air Putih</span>
                <strong className="text-xl sm:text-2xl font-black text-cyan-400">{stats.waterLiters} L</strong>
                <span className="text-[11px] text-slate-400 block">liter / hari</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block">Skor BMI</span>
                <strong className="text-xl sm:text-2xl font-black text-white">{stats.bmi}</strong>
                <span className="text-[11px] text-emerald-400 block truncate">{stats.bmiCategory}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <strong className="text-emerald-400 block mb-0.5">📊 Penjelasan Kebutuhanmu (TDEE Normal: {stats.tdee} kkal):</strong>
              {stats.goalExplanation}
            </div>

            {/* Real Indonesian Food Protein Reference */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-emerald-400" />
                Contekan Sumber Protein Murah & Mudah di Indonesia:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span>🍗 100g Dada Ayam Tanpa Kulit</span>
                  <strong className="text-emerald-400">± 30g Protein</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span>🥚 2 Butir Telur Ayam Utuh</span>
                  <strong className="text-emerald-400">± 12g Protein</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span>🫘 100g Tempe (3–4 Potong Sedang)</span>
                  <strong className="text-emerald-400">± 19g Protein</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span>🐟 100g Ikan Tongkol / Tuna / Lele</span>
                  <strong className="text-emerald-400">± 24g Protein</strong>
                </div>
              </div>
            </div>

            {/* Pre & Post Workout Meal Guide */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <strong className="text-amber-400 block mb-1">🍌 Sebelum Gym (60–90 Menit Sebelum):</strong>
                <p className="text-slate-300 leading-relaxed">
                  Konsumsi karbohidrat mudah cerna agar bertenaga saat angkat beban: 1–2 buah pisang, roti gandum, atau nasi porsi sedang + lauk rendah minyak. Jangan latihan dengan perut kosong melompong!
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <strong className="text-emerald-400 block mb-1">🍛 Sesudah Gym (1–2 Jam Setelah):</strong>
                <p className="text-slate-300 leading-relaxed">
                  Waktunya memulihkan serat otot: makan makanan tinggi protein (dada ayam/ikan/telur/tempe) + karbohidrat (nasi/kentang) dan minum air putih yang cukup.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PEMANASAN, PENDINGINAN & MEMILIH BEBAN */}
      {subTab === 'warmup' && (
        <div className="space-y-6">
          {/* Dynamic Warmup & Cooldown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-black text-base">
                <Flame className="w-5 h-5" />
                <h3>Urutan Pemanasan Wajib (5–8 Menit Sebelum Mulai)</h3>
              </div>
              <p className="text-xs text-slate-300">
                JANGAN melakukan peregangan statis (menahan tarikan otot diam lama) sebelum angkat beban karena bisa menurunkan tenaga otot. Lakukan <strong>Pemanasan Dinamis</strong> ini:
              </p>
              <ol className="space-y-2 text-xs text-slate-200">
                <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong>1. Jalan Cepat di Treadmill / Sepeda Statis (3–5 Menit):</strong> Menaikkan detak jantung dan melumasi cairan sendi.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong>2. Arm Circles & Shoulder Rolls (15x Putaran):</strong> Putar bahu dan lengan ke depan dan belakang untuk membuka sendi bahu.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong>3. Bodyweight Squat Tanpa Beban (10x Repetisi):</strong> Mengaktifkan sendi pinggul, lutut, dan pergelangan kaki.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong>4. Satu Set Pemanasan di Alat Pertama (12 Reps Beban 50%):</strong> Sebelum masuk ke beban utama, lakukan 1 set ringan untuk merasakan jalur mesin.
                </li>
              </ol>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-base">
                <TrendingUp className="w-5 h-5" />
                <h3>Cara Menentukan Beban Pertama & Kapan Harus Naik Beban</h3>
              </div>
              <p className="text-xs text-slate-300">
                Bingung harus pasang pin di angka berapa saat hari pertama? Gunakan panduan <strong>Aturan 2-for-2 (Progressive Overload)</strong>:
              </p>
              <div className="space-y-2 text-xs text-slate-200">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-emerald-400 block mb-0.5">Langkah 1: Tes di Beban Paling Ringan</strong>
                  Pasang pin di plat ke-2 dari atas. Coba lakukan 10 repetisi. Jika terasa sangat enteng seperti tidak mengangkat apa-apa, naikkan 1 tingkat plat pada set berikutnya.
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-emerald-400 block mb-0.5">Langkah 2: Beban yang Tepat (Target 10–12 Reps)</strong>
                  Beban yang pas adalah beban yang membuat repetisi ke-10, 11, dan 12 terasa mulai berat dan menantang, tetapi postur tubuhmu masih rapi dan tidak goyang.
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-amber-400 block mb-0.5">Langkah 3: Aturan Kapan Naik Beban Mingguan</strong>
                  Jika minggu ini kamu sudah kuat melakukan <strong>12 repetisi penuh di semua 3 set</strong> dengan teknik rapi, maka minggu depan kamu berhak menaikkan beban 1 tingkat (2.5–5 kg)!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PEGAL WAJAR (DOMS) VS CEDERA + DISCLAIMER MEDIS */}
      {subTab === 'safety' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-950/20 border border-emerald-800/60 rounded-3xl p-5 space-y-3">
              <h3 className="font-black text-base text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Pegal Otot Wajar (DOMS) — Aman!
              </h3>
              <ul className="space-y-2 text-xs text-slate-200 leading-relaxed">
                <li>• <strong>Kapan muncul:</strong> Baru terasa 12–24 jam setelah latihan selesai (biasanya besok paginya).</li>
                <li>• <strong>Rasanya:</strong> Pegal tumpul, kaku, dan kencang di bagian perut otot (misal di tengah dada atau paha) saat otot ditekan atau diregangkan.</li>
                <li>• <strong>Simetris:</strong> Terasa seimbang di otot kanan dan kiri.</li>
                <li>• <strong>Solusi:</strong> Tetap bergerak ringan, jalan kaki, tidur 7–8 jam, makan cukup protein. Akan hilang sendiri dalam 2–4 hari.</li>
              </ul>
            </div>

            <div className="bg-rose-950/20 border border-rose-800/60 rounded-3xl p-5 space-y-3">
              <h3 className="font-black text-base text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Nyeri Cedera Sendi — Wajib Berhenti!
              </h3>
              <ul className="space-y-2 text-xs text-slate-200 leading-relaxed">
                <li>• <strong>Kapan muncul:</strong> Muncul mendadak secara tajam saat sedang melakukan gerakan.</li>
                <li>• <strong>Rasanya:</strong> Nyeri menusuk, ngilu tajam, panas, atau bunyi letupan di dalam titik persendian (lutut, ujung bahu, pergelangan, tulang belakang).</li>
                <li>• <strong>Tidak Simetris:</strong> Biasanya hanya sakit tajam di satu sisi sendi saja.</li>
                <li>• <strong>Solusi:</strong> Hentikan gerakan seketika! Jangan dipaksakan lanjut, kompres dingin jika bengkak, dan konsultasikan ke dokter/fisioterapis.</li>
              </ul>
            </div>
          </div>

          {/* Medical & Safety Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 text-xs text-slate-300 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-400 block mb-1">Disclaimer Kesehatan & Keselamatan Medis:</strong>
              Seluruh panduan di aplikasi GymMulai bersifat edukasi kebugaran umum bagi pemula dan bukan pengganti saran medis profesional. Jika Anda memiliki riwayat penyakit jantung, tekanan darah tinggi tidak terkontrol, hernia, atau cedera tulang/sendi, wajib berkonsultasi dengan dokter atau pelatih fisik tersertifikasi sebelum memulai program latihan beban.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
