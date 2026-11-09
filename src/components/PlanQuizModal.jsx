import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Dumbbell, Calendar, Target, ShieldAlert } from 'lucide-react';

export function PlanQuizModal({ isOpen, onClose, onPlanGenerated }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: 'muscle', // 'muscle', 'fatloss', 'stamina'
    days: 3, // 2, 3, 4, 5
    injury: 'none', // 'none', 'lowerback', 'knee', 'shoulder'
    equipmentPref: 'machine_safe' // 'machine_safe', 'mixed'
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFinish = () => {
    const isFatLoss = answers.goal === 'fatloss';
    const isStamina = answers.goal === 'stamina';
    const defaultReps = isFatLoss || isStamina ? '12-15' : '10-12';
    const compoundRest = isFatLoss || isStamina ? 60 : 90;
    const isolationRest = 60;

    // 1. Select Chest Exercise (respecting shoulder & equipmentPref)
    const chestPrimary =
      answers.injury === 'shoulder'
        ? { name: 'Chest Press Machine', sets: 3, reps: defaultReps, rest: `${compoundRest}s`, restSeconds: compoundRest, muscle: 'Dada (Siku 45° Aman Bahu)' }
        : answers.equipmentPref === 'mixed'
        ? { name: 'Incline Dumbbell Bench Press', sets: 3, reps: defaultReps, rest: `${compoundRest}s`, restSeconds: compoundRest, muscle: 'Dada Atas' }
        : { name: 'Chest Press Machine', sets: 3, reps: defaultReps, rest: `${compoundRest}s`, restSeconds: compoundRest, muscle: 'Dada' };

    // 2. Select Back Exercise (respecting lowerback injury & equipmentPref)
    const backPrimary = {
      name: 'Lat Pulldown Machine',
      sets: 3,
      reps: defaultReps,
      rest: `${compoundRest}s`,
      restSeconds: compoundRest,
      muscle: 'Punggung Sayap'
    };

    const backSecondary =
      answers.injury === 'lowerback'
        ? { name: 'Chest-Supported Dumbbell Row', sets: 3, reps: defaultReps, rest: '75s', restSeconds: 75, muscle: 'Punggung (Aman Pinggang)' }
        : { name: 'Seated Cable Row', sets: 3, reps: defaultReps, rest: `${compoundRest}s`, restSeconds: compoundRest, muscle: 'Punggung Tengah' };

    // 3. Select Leg Exercises (respecting knee & lowerback injury)
    const legPrimary =
      answers.injury === 'knee'
        ? { name: 'Leg Curl Machine', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Paha Belakang (Ramah Lutut)' }
        : { name: '45-Degree Leg Press', sets: 3, reps: defaultReps, rest: `${compoundRest}s`, restSeconds: compoundRest, muscle: 'Kaki & Bokong' };

    const legSecondary =
      answers.injury === 'knee'
        ? { name: '45-Degree Leg Press', sets: 3, reps: '12 (Sudut Dangkal Aman)', rest: '75s', restSeconds: 75, muscle: 'Kaki (Kaki Agak Tinggi)' }
        : answers.injury === 'lowerback'
        ? { name: 'Seated Leg Extension', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Paha Depan' }
        : answers.equipmentPref === 'mixed'
        ? { name: 'Dumbbell Romanian Deadlift', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Paha Belakang & Glutes' }
        : { name: 'Seated Leg Extension', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Paha Depan' };

    // 4. Select Shoulder Exercise (respecting shoulder injury)
    const shoulderEx =
      answers.injury === 'shoulder'
        ? { name: 'Cable Face Pull (Penguat Postur & Bahu)', sets: 3, reps: '15', rest: '60s', restSeconds: 60, muscle: 'Bahu Belakang & Rotator Cuff' }
        : answers.equipmentPref === 'mixed'
        ? { name: 'Seated Dumbbell Shoulder Press', sets: 3, reps: defaultReps, rest: `${compoundRest}s`, restSeconds: compoundRest, muscle: 'Bahu' }
        : { name: 'Dumbbell / Cable Lateral Raise', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Bahu Samping' };

    // 5. Arms & Core
    const tricepEx = {
      name: 'Cable Rope Tricep Pushdown',
      sets: 3,
      reps: '12-15',
      rest: `${isolationRest}s`,
      restSeconds: isolationRest,
      muscle: 'Trisep'
    };

    const bicepEx = {
      name: 'Seated Incline Dumbbell Bicep Curl',
      sets: 3,
      reps: '10-12',
      rest: `${isolationRest}s`,
      restSeconds: isolationRest,
      muscle: 'Bisep'
    };

    const coreEx = {
      name: 'Forearm Plank',
      sets: 3,
      reps: '30-45 detik',
      rest: '60s',
      restSeconds: 60,
      muscle: 'Perut & Core'
    };

    // Build schedule & routine based on frequency (2, 3, 4, 5 days)
    let title = '';
    let subtitle = '';
    let schedulePattern = '';
    let routine = [];

    if (answers.days === 2) {
      title = 'Full Body Padat 2 Hari / Minggu';
      subtitle = 'Dirancang khusus untuk jadwal sibuk (maksimal hasil dalam 2 kunjungan/minggu)';
      schedulePattern = 'Rekomendasi Hari: Rabu & Sabtu (atau Selasa & Jumat)';
      routine = [chestPrimary, backPrimary, legPrimary, backSecondary, shoulderEx, coreEx];
    } else if (answers.days === 3) {
      title =
        answers.equipmentPref === 'machine_safe'
          ? 'Full Body 3 Hari (Prioritas Mesin Aman)'
          : 'Full Body 3 Hari (Kombinasi Mesin & Dumbbell)';
      subtitle = 'Frekuensi paling ideal untuk pemula: latihan selang-seling dengan 1 hari pemulihan';
      schedulePattern = 'Rekomendasi Hari: Senin, Rabu, dan Jumat';
      routine = [chestPrimary, backPrimary, legPrimary, shoulderEx, tricepEx, coreEx];
    } else if (answers.days === 4) {
      title = 'Upper / Lower Split 4 Hari / Minggu';
      subtitle = 'Pembagian fokus Tubuh Atas & Tubuh Bawah untuk pemulihan dan progres optimal';
      schedulePattern = 'Rekomendasi Hari: Senin (Upper), Selasa (Lower), Kamis (Upper), Jumat (Lower)';
      routine = [chestPrimary, backPrimary, backSecondary, shoulderEx, bicepEx, tricepEx];
    } else {
      title = 'Hybrid PPL + Upper/Lower (5 Hari / Minggu)';
      subtitle = 'Sesi harian singkat (40–45 menit) dengan distribusi volume merata 5 hari';
      schedulePattern = 'Rekomendasi Hari: Senin s/d Jumat (Sabtu & Minggu Istirahat)';
      routine = [chestPrimary, backPrimary, legPrimary, legSecondary, shoulderEx, bicepEx, tricepEx];
    }

    if (isFatLoss || isStamina) {
      routine.push({
        name: 'Treadmill Incline Walk',
        sets: 1,
        reps: isFatLoss ? '15-20 menit' : '12-15 menit',
        rest: '30s',
        restSeconds: 30,
        muscle: 'Kardio Pembakar Kalori'
      });
    }

    const injuryLabels = {
      none: 'Sendi Sehat (Tanpa pembatasan gerak)',
      knee: 'Lutut Sensitif (Fokus Hamstring & Leg Press sudut aman 90°)',
      lowerback: 'Pinggang Bawah Sensitif (100% gerakan dengan sandaran punggung/dada)',
      shoulder: 'Bahu Kaku (Sudut siku 45° + penguatan Rotator Cuff Face Pull)'
    };

    const goalNotes = {
      muscle: 'Fokus naikkan beban atau tambah 1 repetisi setiap minggu + konsumsi surplus protein (1.6–2g/kg BB).',
      fatloss: 'Jeda istirahat dipersingkat (60 detik) agar detak jantung tetap aktif membakar kalori + akhiri dengan Incline Walk.',
      stamina: 'Fokus pada kontrol pernapasan, postur tegap, dan daya tahan otot inti (core).'
    };

    const planResult = {
      title,
      subtitle,
      schedulePattern,
      goal: answers.goal,
      goalNote: goalNotes[answers.goal],
      daysPerWeek: answers.days,
      injuryNotes: injuryLabels[answers.injury],
      routine
    };

    setGeneratedPlan(planResult);

    // Lazy load confetti
    import('canvas-confetti')
      .then((module) => {
        const confetti = module.default;
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      })
      .catch(() => {});
  };

  const applyPlanToApp = () => {
    if (onPlanGenerated && generatedPlan) {
      onPlanGenerated(generatedPlan);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Kuis Pembuat Jadwal Gym Pemula"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl my-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">Kuis Pembuat Jadwal Gym Personal</h2>
              <p className="text-xs text-slate-400">Menyesuaikan tujuan, jumlah hari, dan keamanan sendimu</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup kuis"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quiz Steps */}
        {!generatedPlan ? (
          <div className="p-5 sm:p-6 space-y-6">
            {/* Step Progress Bar */}
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx <= step ? 'bg-emerald-400' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>

            {/* Step 1: Goals */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Target className="w-4 h-4" /> Langkah 1 dari 4: Apa Tujuan Utamamu?
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { id: 'muscle', label: 'Bentuk Otot & Naikkan Massa Tubuh', desc: 'Fokus repetisi 8–12 dengan istirahat 90 detik untuk hipertrofi otot optimal.' },
                    { id: 'fatloss', label: 'Bakar Lemak & Turunkan Berat Badan', desc: 'Repetisi 12–15 dengan jeda aktif 60 detik + sesi Incline Treadmill Walk.' },
                    { id: 'stamina', label: 'Kebugaran, Stamina & Perbaiki Postur Bungkuk', desc: 'Kombinasi penguatan otot punggung/bahu belakang, core, dan kardio.' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, goal: opt.id })}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        answers.goal === opt.id
                          ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>{opt.label}</span>
                        {answers.goal === opt.id && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Frequency */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Calendar className="w-4 h-4" /> Langkah 2 dari 4: Berapa Hari Seminggu Bisa ke Gym?
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { days: 2, label: '2 Hari / Minggu', note: 'Full Body A/B Padat (Misal: Rabu & Sabtu)' },
                    { days: 3, label: '3 Hari / Minggu', note: 'Full Body 3x (Senin, Rabu, Jumat) — Paling Ideal!' },
                    { days: 4, label: '4 Hari / Minggu', note: 'Upper / Lower Split 4 Hari Terstruktur' },
                    { days: 5, label: '5 Hari / Minggu', note: 'Hybrid PPL + Upper/Lower (Durasi singkat/hari)' }
                  ].map((opt) => (
                    <button
                      key={opt.days}
                      type="button"
                      onClick={() => setAnswers({ ...answers, days: opt.days })}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        answers.days === opt.days
                          ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-white mb-1">{opt.label}</div>
                      <p className="text-xs text-slate-400">{opt.note}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Injury History */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Langkah 3 dari 4: Apakah Ada Keluhan Sendi Saat Ini?
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { id: 'none', label: 'Tidak Ada Keluhan (Sendi Sehat)', desc: 'Bebas melakukan semua gerakan dasar pemula.' },
                    { id: 'knee', label: 'Lutut Sensitif / Mudah Ngilu', desc: 'Otomatis mengganti ekstensi berat ke Leg Curl & Leg Press sudut aman.' },
                    { id: 'lowerback', label: 'Pinggang Bawah Mudah Pegal (Low Back)', desc: 'Otomatis memilih gerakan dengan sandaran punggung/dada penuh (Chest-Supported).' },
                    { id: 'shoulder', label: 'Bahu Kaku / Tidak Nyaman Dorong ke Atas', desc: 'Otomatis mengganti Overhead Press dengan Cable Face Pull & sudut siku 45°.' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, injury: opt.id })}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        answers.injury === opt.id
                          ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>{opt.label}</span>
                        {answers.injury === opt.id && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Equipment Comfort */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Dumbbell className="w-4 h-4" /> Langkah 4 dari 4: Kenyamanan Alat di Gym
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      id: 'machine_safe',
                      title: 'Prioritaskan Mesin Pin Terlebih Dahulu (Anti Cemas)',
                      desc: 'Sangat cocok untuk hari-hari pertama. Jalur beban sudah dikunci oleh mesin sehingga kamu fokus belajar kontraksi otot.'
                    },
                    {
                      id: 'mixed',
                      title: 'Campuran Mesin + Dumbbell (Free Weights)',
                      desc: 'Menggabungkan keamanan mesin dengan latihan dumbbell (Incline Press, Shoulder Press, RDL) untuk melatih otot penyeimbang.'
                    }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, equipmentPref: opt.id })}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        answers.equipmentPref === opt.id
                          ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>{opt.title}</span>
                        {answers.equipmentPref === opt.id && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  ← Kembali
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition"
                >
                  Lanjut <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition"
                >
                  <Sparkles className="w-4 h-4" /> Buat Rencana Latihan Saya!
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Result Plan Display */
          <div className="p-5 sm:p-6 space-y-4 max-h-[82vh] overflow-y-auto animate-fadeIn">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500 text-slate-950 inline-block mb-2">
                Jadwal Personal Siap!
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">{generatedPlan.title}</h3>
              <p className="text-xs text-emerald-300 mt-1">{generatedPlan.schedulePattern}</p>
              <div className="text-xs text-slate-300 mt-2 pt-2 border-t border-emerald-800/40">
                🛡️ <strong>Penyesuaian Sendi:</strong> {generatedPlan.injuryNotes}
              </div>
            </div>

            {/* List of recommended exercises */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Daftar Gerakan yang Disesuaikan ({generatedPlan.routine.length} Gerakan):
              </h4>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {generatedPlan.routine.map((ex, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <strong className="text-slate-100 block">{ex.name}</strong>
                        <span className="text-xs text-emerald-400">{ex.muscle}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-200 block">{ex.sets} Set × {ex.reps}</span>
                      <span className="text-xs text-slate-400">Istirahat: {ex.rest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goal Specific Strategy */}
            <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200">
              <strong className="text-amber-400 block mb-0.5">🎯 Strategi Targetmu:</strong>
              {generatedPlan.goalNote}
            </div>

            {/* Medical Disclaimer */}
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Catatan Keselamatan: Mulailah dari beban ringan untuk mempelajari postur. Hentikan gerakan jika terasa nyeri tajam pada persendian.
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-3">
              <button
                type="button"
                onClick={() => setGeneratedPlan(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Ulangi Kuis
              </button>
              <button
                type="button"
                onClick={applyPlanToApp}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Dumbbell className="w-4 h-4" /> Gunakan & Catat di Tracker Sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
