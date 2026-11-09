import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Trash2,
  CheckCircle2,
  Trophy,
  History,
  Timer as TimerIcon,
  Download,
  Upload,
  HelpCircle,
  Flame,
  X,
  RotateCcw,
  Award,
  AlertCircle,
  Dumbbell
} from 'lucide-react';
import { RestTimer } from './RestTimer';
import { exerciseList } from '../data/exercisesData';

const DEFAULT_STARTER_EXERCISES = [
  {
    id: 'def-1',
    name: 'Chest Press Machine',
    muscle: 'Dada',
    restSeconds: 90,
    sets: [
      { setNum: 1, weight: '15', reps: '12', completed: false },
      { setNum: 2, weight: '15', reps: '10', completed: false },
      { setNum: 3, weight: '15', reps: '10', completed: false }
    ]
  },
  {
    id: 'def-2',
    name: 'Lat Pulldown Machine',
    muscle: 'Punggung',
    restSeconds: 90,
    sets: [
      { setNum: 1, weight: '20', reps: '12', completed: false },
      { setNum: 2, weight: '20', reps: '10', completed: false },
      { setNum: 3, weight: '20', reps: '10', completed: false }
    ]
  },
  {
    id: 'def-3',
    name: '45-Degree Leg Press',
    muscle: 'Kaki',
    restSeconds: 90,
    sets: [
      { setNum: 1, weight: '30', reps: '12', completed: false },
      { setNum: 2, weight: '30', reps: '10', completed: false },
      { setNum: 3, weight: '30', reps: '10', completed: false }
    ]
  },
  {
    id: 'def-4',
    name: 'Cable Rope Tricep Pushdown',
    muscle: 'Lengan',
    restSeconds: 60,
    sets: [
      { setNum: 1, weight: '10', reps: '12', completed: false },
      { setNum: 2, weight: '10', reps: '12', completed: false },
      { setNum: 3, weight: '10', reps: '12', completed: false }
    ]
  }
];

export function WorkoutTracker({ activePlan, onInspectExercise }) {
  const [sessionTitle, setSessionTitle] = useState(() => {
    try {
      const saved = localStorage.getItem('gym_active_session_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sessionTitle) return parsed.sessionTitle;
      }
    } catch (e) {}
    return 'Full Body Pemula - Sesi Aktif';
  });

  const [exercises, setExercises] = useState(() => {
    try {
      const saved = localStorage.getItem('gym_active_session_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.exercises) && parsed.exercises.length > 0) {
          return parsed.exercises;
        }
      }
    } catch (e) {}
    return DEFAULT_STARTER_EXERCISES;
  });

  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem('gym_workout_history');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (e) {
      return [];
    }
  });

  const [showHistory, setShowHistory] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [activeRestSeconds, setActiveRestSeconds] = useState(90);
  const [activeTimerExName, setActiveTimerExName] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [customExName, setCustomExName] = useState('');
  const [customExMuscle, setCustomExMuscle] = useState('Dada');
  const [celebrationSummary, setCelebrationSummary] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [errorBanner, setErrorBanner] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  useEffect(() => {
    try {
      localStorage.setItem(
        'gym_active_session_v2',
        JSON.stringify({ sessionTitle, exercises })
      );
    } catch (e) {}
  }, [sessionTitle, exercises]);

  useEffect(() => {
    if (!activePlan) return;

    if (activePlan.mode === 'append' && activePlan.exercise) {
      const ex = activePlan.exercise;
      setExercises((prev) => [
        ...prev,
        {
          id: `ex-append-${Date.now()}`,
          name: ex.name,
          muscle: ex.muscleGroup || ex.muscle || 'Otot Utama',
          restSeconds: ex.restSeconds || 90,
          sets: [
            { setNum: 1, weight: '10', reps: '12', completed: false },
            { setNum: 2, weight: '10', reps: '10', completed: false },
            { setNum: 3, weight: '10', reps: '10', completed: false }
          ]
        }
      ]);
      showToast(`"${ex.name}" ditambahkan ke sesi latihan aktif.`);
      return;
    }

    if (activePlan.routine && Array.isArray(activePlan.routine)) {
      setSessionTitle(activePlan.title || 'Latihan Personal Pemula');
      const mapped = activePlan.routine.map((ex, idx) => {
        const numSets = Number(ex.sets) || 3;
        const parsedRest =
          ex.restSeconds || (typeof ex.rest === 'string' ? parseInt(ex.rest, 10) : 90) || 90;
        const setArray = Array.from({ length: numSets }, (_, sIdx) => ({
          setNum: sIdx + 1,
          weight: '10',
          reps: String(ex.reps || '10').split('-')[0].replace(/\D/g, '') || '10',
          completed: false
        }));
        return {
          id: `ex-${idx}-${Date.now()}`,
          name: ex.name,
          muscle: ex.muscle || 'Otot Target',
          restSeconds: parsedRest,
          sets: setArray
        };
      });
      setExercises(mapped);
      showToast(`Program "${activePlan.title}" berhasil dimuat.`);
    }
  }, [activePlan]);

  const handleSetChange = (exerciseId, setIndex, field, value) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const newSets = [...ex.sets];
        newSets[setIndex] = { ...newSets[setIndex], [field]: value };
        return { ...ex, sets: newSets };
      })
    );
  };

  const toggleSetComplete = (exercise, setIndex) => {
    setErrorBanner('');
    const currentlyCompleted = exercise.sets[setIndex]?.completed;
    const nextCompleted = !currentlyCompleted;

    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exercise.id) return ex;
        const newSets = [...ex.sets];
        newSets[setIndex] = { ...newSets[setIndex], completed: nextCompleted };
        return { ...ex, sets: newSets };
      })
    );

    if (nextCompleted) {
      setActiveRestSeconds(exercise.restSeconds || 90);
      setActiveTimerExName(exercise.name);
      setShowTimerModal(true);
    }
  };

  const addSetToExercise = (exerciseId) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSetNum = ex.sets.length + 1;
        return {
          ...ex,
          sets: [
            ...ex.sets,
            {
              setNum: newSetNum,
              weight: lastSet ? lastSet.weight : '10',
              reps: lastSet ? lastSet.reps : '10',
              completed: false
            }
          ]
        };
      })
    );
  };

  const removeSet = (exerciseId, setIndex) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId || ex.sets.length <= 1) return ex;
        const newSets = ex.sets
          .filter((_, idx) => idx !== setIndex)
          .map((s, idx) => ({ ...s, setNum: idx + 1 }));
        return { ...ex, sets: newSets };
      })
    );
  };

  const handleAddFromModal = (presetEx = null) => {
    setErrorBanner('');
    if (presetEx) {
      setExercises((prev) => [
        ...prev,
        {
          id: `lib-${Date.now()}`,
          name: presetEx.name,
          muscle: presetEx.muscleGroup,
          restSeconds: presetEx.restSeconds || 90,
          sets: [
            { setNum: 1, weight: '10', reps: '12', completed: false },
            { setNum: 2, weight: '10', reps: '10', completed: false },
            { setNum: 3, weight: '10', reps: '10', completed: false }
          ]
        }
      ]);
      setShowAddModal(false);
      showToast(`"${presetEx.name}" berhasil ditambahkan.`);
      return;
    }

    if (!customExName.trim()) {
      setErrorBanner('Masukkan nama gerakan terlebih dahulu sebelum menambahkan.');
      return;
    }
    setExercises((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name: customExName.trim(),
        muscle: customExMuscle,
        restSeconds: 90,
        sets: [
          { setNum: 1, weight: '10', reps: '10', completed: false },
          { setNum: 2, weight: '10', reps: '10', completed: false },
          { setNum: 3, weight: '10', reps: '10', completed: false }
        ]
      }
    ]);
    setCustomExName('');
    setShowAddModal(false);
    showToast('Gerakan kustom berhasil ditambahkan.');
  };

  const deleteExercise = (exerciseId) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
    showToast('Gerakan dihapus dari sesi ini.');
  };

  const restoreDefaultSession = () => {
    setExercises(DEFAULT_STARTER_EXERCISES);
    setSessionTitle('Full Body Pemula - Sesi Aktif');
    setErrorBanner('');
    showToast('Sesi latihan default berhasil dimuat kembali.');
  };

  const resetCurrentCheckmarks = () => {
    setExercises((prev) =>
      prev.map((ex) => ({
        ...ex,
        sets: ex.sets.map((s) => ({ ...s, completed: false }))
      }))
    );
    showToast('Tanda centang direset untuk sesi baru.');
  };

  const finishWorkout = () => {
    let completedSetsCount = 0;
    let totalVolumeKg = 0;

    exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) {
          completedSetsCount++;
          const w = parseFloat(s.weight) || 0;
          const r = parseFloat(s.reps) || 0;
          totalVolumeKg += w * r;
        }
      });
    });

    if (completedSetsCount === 0) {
      setErrorBanner('Centang minimal 1 set yang sudah kamu selesaikan sebelum menyimpan sesi latihan.');
      return;
    }

    setErrorBanner('');
    const sessionRecord = {
      id: `session-${Date.now()}`,
      title: sessionTitle,
      date: new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      completedSets: completedSetsCount,
      totalVolumeKg: Math.round(totalVolumeKg),
      exercisesCount: exercises.length
    };

    const newHistory = [sessionRecord, ...history];
    setHistory(newHistory);
    try {
      localStorage.setItem('gym_workout_history', JSON.stringify(newHistory));
    } catch (e) {}

    import('canvas-confetti')
      .then((module) => {
        const confetti = module.default;
        confetti({ particleCount: 100, spread: 75, origin: { y: 0.5 } });
      })
      .catch(() => {});

    setCelebrationSummary(sessionRecord);
  };

  const handleExportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      sessionTitle,
      exercises,
      history
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gymmulai-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('File backup latihan berhasil diunduh.');
  };

  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    setErrorBanner('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data.history)) {
          setHistory(data.history);
          localStorage.setItem('gym_workout_history', JSON.stringify(data.history));
        }
        if (Array.isArray(data.exercises) && data.exercises.length > 0) {
          setExercises(data.exercises);
        }
        if (data.sessionTitle) setSessionTitle(data.sessionTitle);
        showToast('Data cadangan berhasil dipulihkan.');
      } catch (err) {
        setErrorBanner('File cadangan JSON tidak valid atau rusak. Pastikan memilih file ekspor GymMulai.');
      } finally {
        setIsImporting(false);
      }
    };
    reader.readAsText(file);
  };

  const totalSessions = history.length;
  const lifetimeVolume = history.reduce((acc, item) => acc + (item.totalVolumeKg || 0), 0);

  // Live Activity Ring calculation for current workout session
  let currentTotalSets = 0;
  let currentCompletedSets = 0;
  exercises.forEach((ex) => {
    ex.sets.forEach((s) => {
      currentTotalSets++;
      if (s.completed) currentCompletedSets++;
    });
  });
  const completionPct = currentTotalSets > 0 ? Math.round((currentCompletedSets / currentTotalSets) * 100) : 0;
  const ringCircumference = 2 * Math.PI * 24;
  const ringOffset = ringCircumference - (completionPct / 100) * ringCircumference;

  return (
    <div className="space-y-6">
      {/* iOS Toast Notification */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 lg:bottom-6 right-4 z-50 ios-card px-4 py-3 text-xs sm:text-sm font-bold animate-fadeIn flex items-center gap-2"
          style={{ borderColor: 'var(--ios-green-border)' }}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Error State Banner (R-27) */}
      {errorBanner && (
        <div
          role="alert"
          className="ios-callout-red p-4 flex items-center justify-between gap-3 text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0" style={{ color: 'var(--ios-red-text)' }} aria-hidden="true" />
            <span className="font-semibold">{errorBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorBanner('')}
            aria-label="Tutup pesan peringatan"
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Apple Fitness Activity Ring & Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Apple Fitness Activity Ring */}
        <div className="ios-card p-4 flex items-center gap-3.5">
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 60 60" className="w-14 h-14 -rotate-90" role="img" aria-label={`Progres sesi ${completionPct}%`}>
              <circle
                cx="30"
                cy="30"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                style={{ color: 'var(--ios-fill)' }}
              />
              <circle
                cx="30"
                cy="30"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                className="transition-all duration-500"
                style={{ color: 'var(--ios-green)' }}
              />
            </svg>
            <span className="absolute text-xs font-extrabold tabular-nums">
              {completionPct}%
            </span>
          </div>
          <div>
            <span className="text-xs font-medium block" style={{ color: 'var(--ios-text-secondary)' }}>
              Cincin Sesi Ini
            </span>
            <strong className="text-lg font-extrabold tabular-nums">
              {currentCompletedSets}/{currentTotalSets} Set
            </strong>
          </div>
        </div>

        {/* Card 2: Total Sessions */}
        <div className="ios-card p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium block" style={{ color: 'var(--ios-text-secondary)' }}>
              Total Latihan Tuntas
            </span>
            <strong
              className="text-2xl font-extrabold tabular-nums"
              style={{ color: 'var(--ios-green-text)' }}
            >
              {totalSessions} Sesi
            </strong>
          </div>
          <div
            className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--ios-green-soft)',
              color: 'var(--ios-green-text)'
            }}
          >
            <Trophy className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>

        {/* Card 3: Total Volume */}
        <div className="ios-card p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium block" style={{ color: 'var(--ios-text-secondary)' }}>
              Total Beban Diangkat
            </span>
            <strong
              className="text-2xl font-extrabold tabular-nums"
              style={{ color: 'var(--ios-amber-text)' }}
            >
              {lifetimeVolume.toLocaleString('id-ID')} kg
            </strong>
          </div>
          <div
            className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--ios-amber-soft)',
              color: 'var(--ios-amber-text)'
            }}
          >
            <Flame className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>

        {/* Card 4: Beginner Status */}
        <div className="ios-card p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium block" style={{ color: 'var(--ios-text-secondary)' }}>
              Status Konsistensi
            </span>
            <strong className="text-base font-extrabold block mt-0.5">
              {totalSessions === 0
                ? 'Siap Hari Pertama'
                : totalSessions < 3
                ? 'Langkah Pertama'
                : totalSessions < 10
                ? 'Konsisten Mingguan'
                : 'Gym Regular'}
            </strong>
          </div>
          <div
            className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--ios-blue-soft)',
              color: 'var(--ios-blue-text)'
            }}
          >
            <Award className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Session Header & Quick Tools */}
      <div className="ios-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{
                backgroundColor: 'var(--ios-green-soft)',
                color: 'var(--ios-green-text)'
              }}
            >
              Tersimpan Otomatis
            </span>
            <span className="text-xs font-medium" style={{ color: 'var(--ios-text-secondary)' }}>
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </span>
          </div>

          <label htmlFor="session-title-input" className="sr-only">
            Judul Sesi Latihan Aktif
          </label>
          <input
            id="session-title-input"
            type="text"
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
            className="text-xl sm:text-2xl font-extrabold bg-transparent border-b border-transparent focus:outline-none w-full py-0.5"
            style={{ color: 'var(--ios-text)' }}
          />
          <p className="text-xs mt-1" style={{ color: 'var(--ios-text-secondary)' }}>
            Centang tombol selesai di setiap set untuk menyalakan Rest Timer secara otomatis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              setActiveRestSeconds(90);
              setActiveTimerExName('Timer Manual');
              setShowTimerModal(true);
            }}
            className="flex-1 sm:flex-initial ios-btn-secondary text-xs"
          >
            <TimerIcon className="w-4 h-4" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
            <span>Rest Timer</span>
          </button>
          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            aria-expanded={showHistory}
            className="flex-1 sm:flex-initial ios-btn-secondary text-xs"
          >
            <History className="w-4 h-4" style={{ color: 'var(--ios-amber-text)' }} aria-hidden="true" />
            <span>Riwayat & Backup ({history.length})</span>
          </button>
        </div>
      </div>

      {/* History & Backup Drawer */}
      {showHistory && (
        <div className="ios-card p-5 animate-fadeIn space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <History className="w-4 h-4" style={{ color: 'var(--ios-amber-text)' }} aria-hidden="true" />
              <span>Riwayat Sesi & Backup Data Lokal</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportData}
                className="ios-btn-secondary text-xs px-3"
              >
                <Download className="w-3.5 h-3.5" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
                <span>Ekspor (.json)</span>
              </button>
              <button
                type="button"
                disabled={isImporting}
                onClick={() => fileInputRef.current?.click()}
                className="ios-btn-blue text-xs px-3"
              >
                <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isImporting ? 'Memuat...' : 'Impor Backup'}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                aria-label="Pilih file backup JSON"
                onChange={handleImportData}
                className="hidden"
              />
            </div>
          </div>

          {history.length === 0 ? (
            <div className="ios-inset-surface p-6 text-center">
              <p className="text-xs font-medium" style={{ color: 'var(--ios-text-secondary)' }}>
                Belum ada riwayat sesi selesai. Centang set latihanmu hari ini lalu tekan tombol "Selesaikan Latihan Hari Ini".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {history.map((rec) => (
                <div key={rec.id} className="ios-inset-surface p-3.5 text-xs">
                  <div className="font-bold text-sm mb-0.5">{rec.title}</div>
                  <div className="mb-2" style={{ color: 'var(--ios-text-secondary)' }}>
                    {rec.date}
                  </div>
                  <div
                    className="flex items-center justify-between pt-2 border-t"
                    style={{ borderColor: 'var(--ios-separator)' }}
                  >
                    <span>{rec.completedSets} Set Selesai</span>
                    <span className="font-bold" style={{ color: 'var(--ios-green-text)' }}>
                      {rec.totalVolumeKg} kg Volume
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Exercises List or Empty State (R-27) */}
      {exercises.length === 0 ? (
        <div className="ios-card p-10 text-center space-y-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto"
            style={{
              backgroundColor: 'var(--ios-green-soft)',
              color: 'var(--ios-green-text)'
            }}
          >
            <Dumbbell className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold">Belum Ada Gerakan di Sesi Ini</h3>
            <p className="text-xs max-w-md mx-auto" style={{ color: 'var(--ios-text-secondary)' }}>
              Tambahkan gerakan dari katalog pemula atau pulihkan daftar latihan Full Body hari pertama.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="ios-btn-primary text-xs"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Tambah Gerakan</span>
            </button>
            <button
              type="button"
              onClick={restoreDefaultSession}
              className="ios-btn-secondary text-xs"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Muat Sesi Default Pemula</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {exercises.map((exercise, exIndex) => {
            const matchedCatalogEx = exerciseList.find(
              (item) => item.name.toLowerCase() === exercise.name.toLowerCase()
            );

            return (
              <div key={exercise.id} className="ios-card p-4 sm:p-5 space-y-3.5">
                {/* Exercise Header */}
                <div className="flex items-start sm:items-center justify-between gap-2">
                  <div className="flex items-start sm:items-center gap-3">
                    <span
                      className="w-7 h-7 rounded-[9px] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 sm:mt-0"
                      style={{
                        backgroundColor: 'var(--ios-green-soft)',
                        color: 'var(--ios-green-text)'
                      }}
                    >
                      {exIndex + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base">
                          {exercise.name}
                        </h3>
                        {matchedCatalogEx && onInspectExercise && (
                          <button
                            type="button"
                            onClick={() => onInspectExercise(matchedCatalogEx)}
                            className="min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                            style={{
                              backgroundColor: 'var(--ios-blue-soft)',
                              color: 'var(--ios-blue-text)'
                            }}
                          >
                            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Panduan & Video</span>
                          </button>
                        )}
                      </div>
                      <span
                        className="text-xs font-medium block mt-0.5"
                        style={{ color: 'var(--ios-text-secondary)' }}
                      >
                        {exercise.muscle} • Istirahat {exercise.restSeconds || 90} detik
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteExercise(exercise.id)}
                    aria-label={`Hapus ${exercise.name}`}
                    title="Hapus gerakan dari sesi ini"
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition"
                    style={{
                      backgroundColor: 'var(--ios-fill)',
                      color: 'var(--ios-red-text)'
                    }}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Sets Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr
                        className="border-b"
                        style={{
                          borderColor: 'var(--ios-separator)',
                          color: 'var(--ios-text-secondary)'
                        }}
                      >
                        <th className="py-2 px-2 font-bold w-12">SET</th>
                        <th className="py-2 px-2 font-bold">BEBAN (KG)</th>
                        <th className="py-2 px-2 font-bold">REPETISI</th>
                        <th className="py-2 px-2 font-bold text-center w-24">SELESAI</th>
                        <th className="py-2 px-1 w-11"><span className="sr-only">Hapus Set</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {exercise.sets.map((set, setIndex) => (
                        <tr
                          key={setIndex}
                          className="border-b last:border-b-0 transition"
                          style={{
                            borderColor: 'var(--ios-separator)',
                            backgroundColor: set.completed ? 'var(--ios-green-soft)' : 'transparent'
                          }}
                        >
                          <td className="py-2.5 px-2 font-extrabold tabular-nums text-sm">
                            {set.setNum}
                          </td>
                          <td className="py-2.5 px-2">
                            <input
                              type="number"
                              aria-label={`Beban kg set ${set.setNum} ${exercise.name}`}
                              placeholder="15"
                              value={set.weight}
                              onChange={(e) =>
                                handleSetChange(exercise.id, setIndex, 'weight', e.target.value)
                              }
                              className="ios-input w-20 font-mono text-sm text-center"
                            />
                          </td>
                          <td className="py-2.5 px-2">
                            <input
                              type="number"
                              aria-label={`Repetisi set ${set.setNum} ${exercise.name}`}
                              placeholder="10"
                              value={set.reps}
                              onChange={(e) =>
                                handleSetChange(exercise.id, setIndex, 'reps', e.target.value)
                              }
                              className="ios-input w-20 font-mono text-sm text-center"
                            />
                          </td>
                          <td className="py-2.5 px-2 text-center">
                            <button
                              type="button"
                              onClick={() => toggleSetComplete(exercise, setIndex)}
                              aria-label={`Tandai set ${set.setNum} selesai`}
                              aria-pressed={set.completed}
                              className="w-11 h-11 rounded-xl inline-flex items-center justify-center border transition"
                              style={
                                set.completed
                                  ? {
                                      backgroundColor: 'var(--ios-green)',
                                      color: 'var(--ios-green-on-fill)',
                                      borderColor: 'transparent'
                                    }
                                  : {
                                      backgroundColor: 'var(--ios-fill)',
                                      color: 'var(--ios-text-secondary)',
                                      borderColor: 'var(--ios-separator)'
                                    }
                              }
                            >
                              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                            </button>
                          </td>
                          <td className="py-2.5 px-1 text-right">
                            {exercise.sets.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeSet(exercise.id, setIndex)}
                                aria-label={`Hapus set ${set.setNum}`}
                                className="w-11 h-11 rounded-xl inline-flex items-center justify-center text-base font-bold transition"
                                style={{ color: 'var(--ios-text-secondary)' }}
                              >
                                ×
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Set Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => addSetToExercise(exercise.id)}
                    className="min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                    style={{
                      backgroundColor: 'var(--ios-fill)',
                      color: 'var(--ios-green-text)'
                    }}
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    <span>Tambah Baris Set</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-initial ios-btn-secondary text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
            <span>Tambah Gerakan</span>
          </button>
          <button
            type="button"
            onClick={resetCurrentCheckmarks}
            className="ios-btn-secondary text-xs sm:text-sm"
            title="Reset tanda centang untuk mengulang sesi"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reset Centang</span>
          </button>
        </div>

        <button
          type="button"
          onClick={finishWorkout}
          className="w-full sm:w-auto ios-btn-primary text-sm px-6"
        >
          <Trophy className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Selesaikan Latihan Hari Ini</span>
        </button>
      </div>

      {/* iOS Sheet: Add Exercise Modal */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tambah Gerakan ke Sesi Ini"
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 ios-sheet-backdrop animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md ios-sheet p-5 space-y-4"
          >
            <div className="ios-grabber sm:hidden" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base">Tambah Gerakan ke Sesi Ini</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                aria-label="Tutup modal tambah gerakan"
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--ios-fill)',
                  color: 'var(--ios-text-secondary)'
                }}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Option 1: Pick from catalog */}
            <div>
              <span
                className="text-xs font-bold uppercase tracking-wider block mb-2"
                style={{ color: 'var(--ios-green-text)' }}
              >
                Pilih Cepat dari Katalog Pemula
              </span>
              <div className="max-h-48 overflow-y-auto ios-grouped-list">
                {exerciseList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleAddFromModal(item)}
                    className="ios-grouped-row w-full p-3 text-left text-xs flex items-center justify-between transition"
                  >
                    <div>
                      <strong className="block text-sm">{item.name}</strong>
                      <span style={{ color: 'var(--ios-text-secondary)' }}>{item.muscleGroup}</span>
                    </div>
                    <span className="font-bold" style={{ color: 'var(--ios-green-text)' }}>
                      + Pilih
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Option 2: Custom name */}
            <div
              className="pt-3 border-t space-y-2.5"
              style={{ borderColor: 'var(--ios-separator)' }}
            >
              <label
                htmlFor="custom-exercise-name"
                className="text-xs font-bold uppercase tracking-wider block"
                style={{ color: 'var(--ios-text-secondary)' }}
              >
                Atau Ketik Nama Alat / Gerakan Sendiri
              </label>
              <div className="flex gap-2">
                <input
                  id="custom-exercise-name"
                  type="text"
                  placeholder="Contoh: Dumbbell Goblet Squat"
                  value={customExName}
                  onChange={(e) => setCustomExName(e.target.value)}
                  className="ios-input flex-1 text-sm"
                />
                <label htmlFor="custom-exercise-muscle" className="sr-only">
                  Pilih Otot Target
                </label>
                <select
                  id="custom-exercise-muscle"
                  value={customExMuscle}
                  onChange={(e) => setCustomExMuscle(e.target.value)}
                  className="ios-input text-sm"
                >
                  <option>Dada</option>
                  <option>Punggung</option>
                  <option>Kaki</option>
                  <option>Bahu</option>
                  <option>Lengan</option>
                  <option>Core</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => handleAddFromModal(null)}
                className="ios-btn-primary w-full text-xs sm:text-sm"
              >
                <span>Tambahkan Gerakan Kustom</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Sheet: Celebration Summary Modal */}
      {celebrationSummary && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ringkasan Latihan Tuntas"
          onClick={() => setCelebrationSummary(null)}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 ios-sheet-backdrop animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md ios-sheet p-6 text-center space-y-4"
          >
            <div className="ios-grabber sm:hidden" aria-hidden="true" />
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto"
              style={{
                backgroundColor: 'var(--ios-green-soft)',
                color: 'var(--ios-green-text)'
              }}
            >
              <Trophy className="w-8 h-8" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-extrabold">Latihan Hari Ini Tuntas!</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--ios-text-secondary)' }}>
              Catatan latihanmu hari ini sudah tersimpan di riwayat lokal. Pastikan minum air putih yang cukup dan konsumsi makanan berprotein.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs ios-inset-surface p-3.5">
              <div>
                <span className="block" style={{ color: 'var(--ios-text-secondary)' }}>
                  Set Diselesaikan
                </span>
                <strong
                  className="text-lg font-extrabold tabular-nums"
                  style={{ color: 'var(--ios-green-text)' }}
                >
                  {celebrationSummary.completedSets} Set
                </strong>
              </div>
              <div>
                <span className="block" style={{ color: 'var(--ios-text-secondary)' }}>
                  Total Volume Angkatan
                </span>
                <strong
                  className="text-lg font-extrabold tabular-nums"
                  style={{ color: 'var(--ios-amber-text)' }}
                >
                  {celebrationSummary.totalVolumeKg} kg
                </strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCelebrationSummary(null)}
              className="ios-btn-primary w-full text-sm"
            >
              <span>Tutup Ringkasan</span>
            </button>
          </div>
        </div>
      )}

      {/* iOS Sheet: Floating Rest Timer Modal */}
      {showTimerModal && (
        <div
          onClick={() => setShowTimerModal(false)}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 ios-sheet-backdrop animate-fadeIn"
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm">
            <RestTimer
              initialSeconds={activeRestSeconds}
              exerciseName={activeTimerExName}
              autoStart={true}
              onClose={() => setShowTimerModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
