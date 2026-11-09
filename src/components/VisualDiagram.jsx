import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCw, Info } from 'lucide-react';

function getMuscleRole(regionKeys, primaryGroup = '', secondaryList = [], targetMuscles = []) {
  const allPrimaryText = `${primaryGroup} ${(targetMuscles[0] || '')}`.toLowerCase();
  const allSecondaryText = [...secondaryList, ...targetMuscles.slice(1)].join(' ').toLowerCase();

  for (const key of regionKeys) {
    if (allPrimaryText.includes(key)) return 'primary';
  }
  for (const key of regionKeys) {
    if (allSecondaryText.includes(key)) return 'secondary';
  }
  return 'inactive';
}

export function MuscleHighlightDiagram({
  activeMuscle = 'Dada',
  secondaryMuscles = [],
  targetMuscles = [],
  className = ''
}) {
  const roleClass = (role) => {
    if (role === 'primary') return 'fill-emerald-400 stroke-emerald-200';
    if (role === 'secondary') return 'fill-amber-400 stroke-amber-200';
    return 'fill-slate-700 stroke-slate-500';
  };

  const chestRole = getMuscleRole(['dada', 'pectoral'], activeMuscle, secondaryMuscles, targetMuscles);
  const shoulderRole = getMuscleRole(['bahu', 'deltoid'], activeMuscle, secondaryMuscles, targetMuscles);
  const bicepRole = getMuscleRole(['bisep', 'bicep', 'lengan depan'], activeMuscle, secondaryMuscles, targetMuscles);
  const tricepRole = getMuscleRole(['trisep', 'tricep', 'lengan'], activeMuscle, secondaryMuscles, targetMuscles);
  const coreRole = getMuscleRole(['perut', 'core', 'abs'], activeMuscle, secondaryMuscles, targetMuscles);
  const latsRole = getMuscleRole(['punggung', 'lat', 'sayap', 'rhomboid'], activeMuscle, secondaryMuscles, targetMuscles);
  const lowerBackRole = getMuscleRole(['punggung bawah', 'lower back', 'erector', 'core'], activeMuscle, secondaryMuscles, targetMuscles);
  const quadsRole = getMuscleRole(['kaki', 'paha depan', 'quad'], activeMuscle, secondaryMuscles, targetMuscles);
  const hamGluteRole = getMuscleRole(['paha belakang', 'hamstring', 'pantat', 'glute', 'kaki'], activeMuscle, secondaryMuscles, targetMuscles);
  const calvesRole = getMuscleRole(['betis', 'calf', 'calves'], activeMuscle, secondaryMuscles, targetMuscles);

  return (
    <div className={`ios-inset-surface p-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
        <span className="font-bold">Anatomi Otot yang Bekerja:</span>
        <div className="flex items-center gap-3">
          <span
            className="flex items-center gap-1.5 font-bold"
            style={{ color: 'var(--ios-green-text)' }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: 'var(--ios-green)' }}
            />
            Otot Utama ({activeMuscle})
          </span>
          {(secondaryMuscles.length > 0 || targetMuscles.length > 1) && (
            <span
              className="flex items-center gap-1.5 font-bold"
              style={{ color: 'var(--ios-amber-text)' }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: 'var(--ios-amber)' }}
              />
              Otot Pendukung
            </span>
          )}
        </div>
      </div>

      {/* Dark Studio Anatomical Canvas for High Contrast Muscle Highlights */}
      <div
        className="grid grid-cols-2 gap-4 items-center justify-items-center rounded-2xl p-4 border"
        style={{
          backgroundColor: '#141416',
          borderColor: 'var(--ios-separator)'
        }}
      >
        {/* FRONT ANATOMY */}
        <div className="flex flex-col items-center">
          <span className="text-xs mb-2 font-semibold" style={{ color: '#AEAEB2' }}>
            Tampak Depan
          </span>
          <svg viewBox="0 0 120 200" className="w-28 h-44" role="img" aria-label="Diagram otot tampak depan">
            <circle cx="60" cy="18" r="11" className="fill-slate-700 stroke-slate-500" strokeWidth="1.2" />
            <rect x="55" y="28" width="10" height="7" rx="2" className="fill-slate-700" />
            <path d="M 38 35 Q 28 38 26 50 Q 32 53 39 46 Z" className={roleClass(shoulderRole)} strokeWidth="1" />
            <path d="M 82 35 Q 92 38 94 50 Q 88 53 81 46 Z" className={roleClass(shoulderRole)} strokeWidth="1" />
            <path d="M 40 35 L 59 35 L 59 58 Q 46 59 39 48 Z" className={roleClass(chestRole)} strokeWidth="1.2" />
            <path d="M 80 35 L 61 35 L 61 58 Q 74 59 81 48 Z" className={roleClass(chestRole)} strokeWidth="1.2" />
            <path d="M 26 52 Q 22 66 24 78 L 32 78 Q 35 65 37 50 Z" className={roleClass(bicepRole)} strokeWidth="1" />
            <path d="M 94 52 Q 98 66 96 78 L 88 78 Q 85 65 83 50 Z" className={roleClass(bicepRole)} strokeWidth="1" />
            <path d="M 23 80 L 31 80 L 28 104 L 20 102 Z" className="fill-slate-700 stroke-slate-500" strokeWidth="0.8" />
            <path d="M 97 80 L 89 80 L 92 104 L 100 102 Z" className="fill-slate-700 stroke-slate-500" strokeWidth="0.8" />
            <rect x="44" y="60" width="14" height="10" rx="2" className={roleClass(coreRole)} strokeWidth="1" />
            <rect x="62" y="60" width="14" height="10" rx="2" className={roleClass(coreRole)} strokeWidth="1" />
            <rect x="45" y="72" width="13" height="10" rx="2" className={roleClass(coreRole)} strokeWidth="1" />
            <rect x="62" y="72" width="13" height="10" rx="2" className={roleClass(coreRole)} strokeWidth="1" />
            <rect x="46" y="84" width="12" height="12" rx="2" className={roleClass(coreRole)} strokeWidth="1" />
            <rect x="62" y="84" width="12" height="12" rx="2" className={roleClass(coreRole)} strokeWidth="1" />
            <path d="M 41 99 L 58 99 L 55 142 Q 44 142 39 135 Z" className={roleClass(quadsRole)} strokeWidth="1.2" />
            <path d="M 79 99 L 62 99 L 65 142 Q 76 142 81 135 Z" className={roleClass(quadsRole)} strokeWidth="1.2" />
            <rect x="42" y="144" width="12" height="7" rx="3" className="fill-slate-700" />
            <rect x="66" y="144" width="12" height="7" rx="3" className="fill-slate-700" />
            <path d="M 41 153 L 54 153 L 51 188 L 43 188 Z" className={roleClass(calvesRole)} strokeWidth="1" />
            <path d="M 79 153 L 66 153 L 69 188 L 77 188 Z" className={roleClass(calvesRole)} strokeWidth="1" />
          </svg>
        </div>

        {/* BACK ANATOMY */}
        <div className="flex flex-col items-center">
          <span className="text-xs mb-2 font-semibold" style={{ color: '#AEAEB2' }}>
            Tampak Belakang
          </span>
          <svg viewBox="0 0 120 200" className="w-28 h-44" role="img" aria-label="Diagram otot tampak belakang">
            <circle cx="60" cy="18" r="11" className="fill-slate-700 stroke-slate-500" strokeWidth="1.2" />
            <path d="M 44 30 L 60 27 L 76 30 L 68 48 L 52 48 Z" className={roleClass(latsRole)} strokeWidth="1" />
            <path d="M 38 35 Q 28 38 26 50 L 38 48 Z" className={roleClass(shoulderRole)} strokeWidth="1" />
            <path d="M 82 35 Q 92 38 94 50 L 82 48 Z" className={roleClass(shoulderRole)} strokeWidth="1" />
            <path d="M 39 48 L 58 49 L 57 78 L 43 74 Q 36 62 39 48 Z" className={roleClass(latsRole)} strokeWidth="1.2" />
            <path d="M 81 48 L 62 49 L 63 78 L 77 74 Q 84 62 81 48 Z" className={roleClass(latsRole)} strokeWidth="1.2" />
            <path d="M 26 52 L 37 50 L 33 78 L 24 78 Z" className={roleClass(tricepRole)} strokeWidth="1" />
            <path d="M 94 52 L 83 50 L 87 78 L 96 78 Z" className={roleClass(tricepRole)} strokeWidth="1" />
            <rect x="46" y="79" width="28" height="16" rx="3" className={roleClass(lowerBackRole)} strokeWidth="1" />
            <path d="M 41 96 L 59 96 L 59 115 Q 42 116 40 105 Z" className={roleClass(hamGluteRole)} strokeWidth="1.2" />
            <path d="M 79 96 L 61 96 L 61 115 Q 78 116 80 105 Z" className={roleClass(hamGluteRole)} strokeWidth="1.2" />
            <path d="M 41 117 L 57 117 L 55 145 L 42 145 Z" className={roleClass(hamGluteRole)} strokeWidth="1.2" />
            <path d="M 79 117 L 63 117 L 65 145 L 78 145 Z" className={roleClass(hamGluteRole)} strokeWidth="1.2" />
            <path d="M 41 151 Q 48 149 55 151 L 52 188 L 43 188 Z" className={roleClass(calvesRole)} strokeWidth="1.2" />
            <path d="M 79 151 Q 72 149 65 151 L 68 188 L 77 188 Z" className={roleClass(calvesRole)} strokeWidth="1.2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function InteractiveMotionSimulator({ id = '', name = '', category = 'machine', muscleGroup = 'Dada' }) {
  const [phase, setPhase] = useState(0); // 0 = Posisi Awal (Eccentric), 1 = Kontraksi Puncak (Concentric)
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setPhase((p) => (p === 0 ? 1 : 0));
    }, 1800);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const lowerId = `${id} ${name} ${muscleGroup}`.toLowerCase();
  let pattern = 'push-horizontal';
  if (lowerId.includes('pulldown') || lowerId.includes('pull')) pattern = 'pull-vertical';
  else if (lowerId.includes('row') || lowerId.includes('dayung')) pattern = 'pull-horizontal';
  else if (lowerId.includes('leg press')) pattern = 'leg-press';
  else if (lowerId.includes('extension')) pattern = 'leg-extension';
  else if (lowerId.includes('curl') && lowerId.includes('leg')) pattern = 'leg-curl';
  else if (lowerId.includes('squat') || lowerId.includes('deadlift') || lowerId.includes('calf')) pattern = 'squat';
  else if (lowerId.includes('shoulder') || lowerId.includes('lateral')) pattern = 'overhead-press';
  else if (lowerId.includes('tricep') || lowerId.includes('pushdown')) pattern = 'tricep-pushdown';
  else if (lowerId.includes('bicep') || lowerId.includes('curl')) pattern = 'bicep-curl';
  else if (lowerId.includes('plank') || lowerId.includes('core')) pattern = 'plank';
  else if (lowerId.includes('treadmill') || lowerId.includes('kardio')) pattern = 'cardio';

  return (
    <div className="ios-inset-surface p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span
            className="text-xs font-bold uppercase tracking-wider block"
            style={{ color: 'var(--ios-green-text)' }}
          >
            Simulasi Gerakan Interaktif (100% Offline)
          </span>
          <p
            className="text-xs"
            style={{ color: 'var(--ios-text-secondary)' }}
          >
            Perhatikan jalur gerak sendi dan pengaturan napas:
          </p>
        </div>

        {/* R-39: Pause & Manual Phase Controls with min 44px height */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoPlay(!autoPlay)}
            aria-label={autoPlay ? 'Jeda animasi simulasi' : 'Putar animasi simulasi'}
            className="ios-btn-secondary text-xs px-3"
          >
            {autoPlay ? (
              <>
                <Pause className="w-3.5 h-3.5" style={{ color: 'var(--ios-amber-text)' }} aria-hidden="true" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
                <span>Putar</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setAutoPlay(false);
              setPhase(phase === 0 ? 1 : 0);
            }}
            className="ios-btn-blue text-xs px-3"
          >
            <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Ganti Fase</span>
          </button>
        </div>
      </div>

      {/* Canvas Box */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
        <div
          className="sm:col-span-3 flex flex-col items-center justify-center rounded-2xl p-4 border"
          style={{
            backgroundColor: '#141416',
            borderColor: 'var(--ios-separator)'
          }}
        >
          <svg viewBox="0 0 260 160" className="w-full max-w-[280px] h-40" role="img" aria-label={`Simulasi gerakan ${name}`}>
            <line x1="20" y1="145" x2="240" y2="145" className="stroke-slate-700" strokeWidth="3" strokeLinecap="round" />
            <rect x="30" y="25" width="26" height="120" rx="3" className="fill-slate-900 stroke-slate-600" strokeWidth="1.5" />
            <rect
              x="34"
              y={phase === 1 ? '48' : '95'}
              width="18"
              height="24"
              rx="2"
              className="fill-emerald-500 stroke-emerald-300 transition-all duration-700"
            />
            <circle
              cx="54"
              cy={phase === 1 ? '60' : '107'}
              r="3.5"
              className="fill-amber-400 transition-all duration-700"
            />

            {pattern === 'pull-vertical' && (
              <g className="transition-all duration-700">
                <line x1="43" y1="25" x2="155" y2="25" className="stroke-slate-500" strokeWidth="2" />
                <line x1="155" y1="25" x2="155" y2={phase === 1 ? '72' : '42'} className="stroke-emerald-400 transition-all duration-700" strokeWidth="2" />
                <line x1="130" y1={phase === 1 ? '72' : '42'} x2="180" y2={phase === 1 ? '72' : '42'} className="stroke-emerald-300 transition-all duration-700" strokeWidth="4" strokeLinecap="round" />
                <rect x="135" y="112" width="35" height="6" rx="2" className="fill-slate-600" />
                <circle cx="142" cy="103" r="5" className="fill-amber-400" />
                <circle cx="158" cy="65" r="9" className="fill-slate-300" />
                <line x1="158" y1="74" x2="155" y2="112" className="stroke-emerald-400" strokeWidth="6" strokeLinecap="round" />
                <polyline
                  points={phase === 1 ? '156,80 135,92 135,72' : '156,80 142,58 135,42'}
                  fill="none"
                  className="stroke-slate-200 transition-all duration-700"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <polyline
                  points={phase === 1 ? '158,80 178,92 175,72' : '158,80 170,58 175,42'}
                  fill="none"
                  className="stroke-slate-200 transition-all duration-700"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <polyline points="155,112 132,112 132,143" fill="none" className="stroke-slate-400" strokeWidth="5" strokeLinecap="round" />
              </g>
            )}

            {pattern === 'push-horizontal' && (
              <g>
                <line x1="125" y1="55" x2="125" y2="118" className="stroke-slate-600" strokeWidth="6" strokeLinecap="round" />
                <line x1="125" y1="118" x2="155" y2="118" className="stroke-slate-600" strokeWidth="6" strokeLinecap="round" />
                <circle cx="138" cy="64" r="9" className="fill-slate-300" />
                <line x1="136" y1="74" x2="136" y2="114" className="stroke-emerald-400" strokeWidth="7" strokeLinecap="round" />
                <polyline
                  points={phase === 1 ? '138,82 168,84 198,82' : '138,82 122,90 148,82'}
                  fill="none"
                  className="stroke-slate-100 transition-all duration-700"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <line
                  x1="130"
                  y1="30"
                  x2={phase === 1 ? '200' : '150'}
                  y2="82"
                  className="stroke-amber-400 transition-all duration-700"
                  strokeWidth="3.5"
                />
                <polyline points="136,114 162,114 165,143" fill="none" className="stroke-slate-400" strokeWidth="5" strokeLinecap="round" />
              </g>
            )}

            {pattern === 'leg-press' && (
              <g>
                <line x1="105" y1="95" x2="135" y2="128" className="stroke-slate-600" strokeWidth="6" strokeLinecap="round" />
                <line x1="135" y1="128" x2="158" y2="118" className="stroke-slate-600" strokeWidth="6" strokeLinecap="round" />
                <circle cx="114" cy="84" r="8" className="fill-slate-300" />
                <line x1="118" y1="92" x2="140" y2="122" className="stroke-slate-300" strokeWidth="6" strokeLinecap="round" />
                <polyline
                  points={phase === 1 ? '140,122 168,96 196,74' : '140,122 142,88 166,94'}
                  fill="none"
                  className="stroke-emerald-400 transition-all duration-700"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <line
                  x1={phase === 1 ? '184' : '154'}
                  y1={phase === 1 ? '60' : '80'}
                  x2={phase === 1 ? '210' : '180'}
                  y2={phase === 1 ? '90' : '110'}
                  className="stroke-amber-400 transition-all duration-700"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </g>
            )}

            {pattern !== 'pull-vertical' && pattern !== 'push-horizontal' && pattern !== 'leg-press' && (
              <g>
                <circle cx="155" cy={pattern === 'squat' && phase === 0 ? '72' : '54'} r="9" className="fill-slate-300 transition-all duration-700" />
                <line
                  x1="155"
                  y1={pattern === 'squat' && phase === 0 ? '82' : '64'}
                  x2={pattern === 'squat' && phase === 0 ? '145' : '155'}
                  y2={pattern === 'squat' && phase === 0 ? '115' : '104'}
                  className="stroke-emerald-400 transition-all duration-700"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <polyline
                  points={
                    phase === 1
                      ? '155,72 175,78 192,62'
                      : '155,72 172,92 188,96'
                  }
                  fill="none"
                  className="stroke-amber-400 transition-all duration-700"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <polyline
                  points={
                    pattern === 'squat' && phase === 0
                      ? '145,115 170,118 158,143'
                      : '155,104 158,124 158,143'
                  }
                  fill="none"
                  className="stroke-slate-300 transition-all duration-700"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Phase Indicator Buttons (R-39 Native Buttons) */}
        <div className="sm:col-span-2 space-y-2.5 text-xs">
          <button
            type="button"
            onClick={() => {
              setAutoPlay(false);
              setPhase(0);
            }}
            className={`w-full text-left p-3.5 rounded-2xl border transition ${
              phase === 0 ? 'ios-callout-blue' : 'ios-card'
            }`}
          >
            <div className="font-bold flex items-center justify-between" style={{ color: 'var(--ios-blue-text)' }}>
              <span>1. Fase Awal / Turun (Eksentris)</span>
              {phase === 0 && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-extrabold"
                  style={{
                    backgroundColor: 'var(--ios-blue-soft)',
                    color: 'var(--ios-blue-text)'
                  }}
                >
                  AKTIF
                </span>
              )}
            </div>
            <p className="mt-1 leading-relaxed" style={{ color: 'var(--ios-text-secondary)' }}>
              <strong>Tarik Napas (Inhale):</strong> Tahan beban kembali secara perlahan (2-3 detik). Jangan biarkan beban jatuh bebas.
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              setAutoPlay(false);
              setPhase(1);
            }}
            className={`w-full text-left p-3.5 rounded-2xl border transition ${
              phase === 1 ? 'ios-callout-green' : 'ios-card'
            }`}
          >
            <div className="font-bold flex items-center justify-between" style={{ color: 'var(--ios-green-text)' }}>
              <span>2. Fase Dorong / Tarik (Konsentris)</span>
              {phase === 1 && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-extrabold"
                  style={{
                    backgroundColor: 'var(--ios-green-soft)',
                    color: 'var(--ios-green-text)'
                  }}
                >
                  AKTIF
                </span>
              )}
            </div>
            <p className="mt-1 leading-relaxed" style={{ color: 'var(--ios-text-secondary)' }}>
              <strong>Buang Napas (Exhale):</strong> Gerakkan beban dengan kekuatan otot sasaran dan tahan 1 detik di puncak kontraksi.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export function MachineMechanismDiagram() {
  return (
    <div className="ios-inset-surface p-4 text-xs space-y-3">
      <div className="flex items-center gap-2 font-bold" style={{ color: 'var(--ios-amber-text)' }}>
        <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Anatomi Pengaturan Alat (Pahami 3 Titik Ini):</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="ios-card p-3">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: 'var(--ios-green)' }}
            />
            <span>1. Pin Beban (Weight Stack)</span>
          </div>
          <p className="leading-relaxed" style={{ color: 'var(--ios-text-secondary)' }}>
            Cabut dan tancapkan pin besi horizontal sampai masuk penuh ke lubang plat beban. Mulai dari 2-3 plat teratas untuk tes gerakan.
          </p>
        </div>
        <div className="ios-card p-3">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: 'var(--ios-amber)' }}
            />
            <span>2. Tuas Kursi (Kuning/Merah)</span>
          </div>
          <p className="leading-relaxed" style={{ color: 'var(--ios-text-secondary)' }}>
            Di gym, tuas yang bisa diatur hampir selalu diberi warna mencolok (kuning atau merah). Tarik tuas untuk menaik-turunkan jok.
          </p>
        </div>
        <div className="ios-card p-3">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: 'var(--ios-blue)' }}
            />
            <span>3. Titik Poros (Pivot Point)</span>
          </div>
          <p className="leading-relaxed" style={{ color: 'var(--ios-text-secondary)' }}>
            Sejajarkan sendi tubuhmu (misal lutut di Leg Extension atau bahu di Press) dengan baut poros putaran mesin.
          </p>
        </div>
      </div>
    </div>
  );
}
