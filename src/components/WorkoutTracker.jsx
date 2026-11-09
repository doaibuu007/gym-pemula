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
  Sparkles,
  X,
  RotateCcw,
  Award
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
  // Load saved in-progress session from localStorage
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

  // Custom modal states (replacing native alert/prompt/confirm)
  const [showAddModal, setShowAddModal] = useState(false);
  const [customExName, setCustomExName] = useState('');
  const [customExMuscle, setCustomExMuscle] = useState('Dada');
  const [celebrationSummary, setCelebrationSummary] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  // Persist active workout session automatically on every change
  useEffect(() => {
    try {
      localStorage.setItem(
        'gym_active_session_v2',
        JSON.stringify({ sessionTitle, exercises })
      );
    } catch (e) {}
  }, [sessionTitle, exercises]);

  // Apply incoming activePlan when user selects a program or quiz result
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
      showToast(`✅ "${ex.name}" ditambahkan ke sesi latihan aktif!`);
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
      showToast(`📋 Program "${activePlan.title}" berhasil dimuat!`);
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
      showToast(`✅ "${presetEx.name}" berhasil ditambahkan!`);
      return;
    }

    if (!customExName.trim()) return;
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
    showToast('✅ Gerakan kustom berhasil ditambahkan!');
  };

  const deleteExercise = (exerciseId) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
    showToast('🗑️ Gerakan dihapus dari sesi ini.');
  };

  const resetCurrentCheckmarks = () => {
    setExercises((prev) =>
      prev.map((ex) => ({
        ...ex,
        sets: ex.sets.map((s) => ({ ...s, completed: false }))
      }))
    );
    showToast('🔄 Centang set direset untuk sesi baru.');
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
      showToast('⚠️ Centang minimal 1 set yang sudah kamu selesaikan terlebih dahulu!');
      return;
    }

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
        confetti({ particleCount: 110, spread: 80, origin: { y: 0.5 } });
      })
      .catch(() => {});

    setCelebrationSummary(sessionRecord);
  };

  // Backup Export & Import JSON
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
    showToast('💾 File backup latihan berhasil diunduh!');
  };

  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
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
        showToast('✅ Data cadangan berhasil dipulihkan!');
      } catch (err) {
        showToast('⚠️ File JSON tidak valid.');
      }
    };
    reader.readAsText(file);
  };

  // Calculate lifetime stats & badges
  const totalSessions = history.length;
  const lifetimeVolume = history.reduce((acc, item) => acc + (item.totalVolumeKg || 0), 0);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 bg-slate-900 border border-emerald-500 text-white px-4 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-bold animate-fadeIn">
          {toastMsg}
        </div>
      )}

      {/* Gamification & Progress Overview Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Total Latihan Tuntas</span>
            <strong className="text-2xl font-black text-emerald-400">{totalSessions} Sesi</strong>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Total Beban Diangkat</span>
            <strong className="text-2xl font-black text-amber-400">
              {lifetimeVolume.toLocaleString('id-ID')} kg
            </strong>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Status Level Pemula</span>
            <strong className="text-base font-black text-white">
              {totalSessions === 0
                ? '🌱 Siap Hari Pertama'
                : totalSessions < 3
                ? '🔥Langkah Pertama'
                : totalSessions < 10
                ? '⚡ Konsisten Mingguan'
                : '🏆 Gym Regular'}
            </strong>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Top Banner & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-3xl p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              Tersimpan Otomatis
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
          <input
            type="text"
            aria-label="Judul Sesi Latihan"
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
            className="text-xl sm:text-2xl font-black text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-emerald-500 focus:outline-none w-full"
          />
          <p className="text-xs text-slate-400 mt-1">
            Klik nama gerakan untuk melihat cara pakai & video. Centang kotak selesai untuk menyalakan Rest Timer otomatis.
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
            className="flex-1 sm:flex-initial py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
          >
            <TimerIcon className="w-4 h-4 text-emerald-400" /> Rest Timer
          </button>
          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="flex-1 sm:flex-initial py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
          >
            <History className="w-4 h-4 text-amber-400" /> Riwayat & Backup ({history.length})
          </button>
        </div>
      </div>

      {/* History & Backup Drawer */}
      {showHistory && (
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-5 animate-fadeIn space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <History className="w-4 h-4 text-amber-400" /> Riwayat Sesi & Backup Data Lokal:
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportData}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 border border-slate-700 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Ekspor Backup (.json)
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-400 border border-slate-700 flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" /> Impor Backup
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </div>
          </div>

          {history.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">
              Belum ada riwayat sesi selesai. Centang set latihanmu hari ini lalu klik "Selesaikan Latihan"!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {history.map((rec) => (
                <div key={rec.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="font-bold text-white mb-0.5">{rec.title}</div>
                  <div className="text-xs text-slate-400 mb-2">{rec.date}</div>
                  <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-900">
                    <span>{rec.completedSets} Set Selesai</span>
                    <span className="font-bold text-emerald-400">{rec.totalVolumeKg} kg Volume</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Exercises List Cards */}
      <div className="space-y-4">
        {exercises.map((exercise, exIndex) => {
          const matchedCatalogEx = exerciseList.find(
            (item) => item.name.toLowerCase() === exercise.name.toLowerCase()
          );

          return (
            <div
              key={exercise.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3"
            >
              {/* Exercise Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-black flex items-center justify-center">
                    {exIndex + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-white">
                        {exercise.name}
                      </h3>
                      {matchedCatalogEx && onInspectExercise && (
                        <button
                          type="button"
                          onClick={() => onInspectExercise(matchedCatalogEx)}
                          className="px-2 py-0.5 rounded-md bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/50 text-xs font-semibold flex items-center gap-1 transition"
                          title="Lihat cara pakai & simulasi gerakan"
                        >
                          <HelpCircle className="w-3 h-3" /> Panduan & Video
                        </button>
                      )}
                    </div>
                    <span className="text-xs text-emerald-400/90 font-medium">
                      {exercise.muscle} • Istirahat {exercise.restSeconds || 90} detik
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => deleteExercise(exercise.id)}
                  aria-label={`Hapus ${exercise.name}`}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                  title="Hapus gerakan dari sesi ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Sets Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800/80 pb-2">
                      <th className="py-2 px-2 font-semibold w-12">SET</th>
                      <th className="py-2 px-2 font-semibold">BEBAN (KG)</th>
                      <th className="py-2 px-2 font-semibold">REPETISI</th>
                      <th className="py-2 px-2 font-semibold text-center w-24">SELESAI</th>
                      <th className="py-2 px-1 w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {exercise.sets.map((set, setIndex) => (
                      <tr
                        key={setIndex}
                        className={`transition ${
                          set.completed ? 'bg-emerald-950/25 text-emerald-300' : ''
                        }`}
                      >
                        <td className="py-2.5 px-2 font-bold text-slate-300">
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
                            className="w-20 py-1.5 px-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
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
                            className="w-16 py-1.5 px-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <button
                            type="button"
                            onClick={() => toggleSetComplete(exercise, setIndex)}
                            aria-label={`Tandai set ${set.setNum} selesai`}
                            className={`p-2 rounded-xl border transition ${
                              set.completed
                                ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="py-2.5 px-1 text-right">
                          {exercise.sets.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSet(exercise.id, setIndex)}
                              aria-label={`Hapus set ${set.setNum}`}
                              className="text-slate-500 hover:text-rose-400 p-1 text-sm font-bold"
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
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => addSetToExercise(exercise.id)}
                  className="text-xs font-semibold text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Set
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-initial py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 border border-slate-700"
          >
            <Plus className="w-4 h-4 text-emerald-400" /> Tambah Gerakan
          </button>
          <button
            type="button"
            onClick={resetCurrentCheckmarks}
            className="py-3 px-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition flex items-center gap-1.5 border border-slate-800"
            title="Reset tanda centang untuk mengulang sesi"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Centang
          </button>
        </div>

        <button
          type="button"
          onClick={finishWorkout}
          className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-black transition flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20"
        >
          <Trophy className="w-4 h-4" /> Selesaikan Latihan Hari Ini 🎉
        </button>
      </div>

      {/* Custom Add Exercise Modal (Replaces prompt()) */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 text-slate-100 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base">Tambah Gerakan ke Sesi Ini</h3>
              <button
                onClick={() => setShowAddModal(false)}
                aria-label="Tutup modal tambah gerakan"
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Option 1: Pick from catalog */}
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                Pilih Cepat dari Katalog Pemula:
              </span>
              <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                {exerciseList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleAddFromModal(item)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs flex items-center justify-between transition"
                  >
                    <div>
                      <strong className="text-white block">{item.name}</strong>
                      <span className="text-slate-400">{item.muscleGroup}</span>
                    </div>
                    <span className="text-emerald-400 font-bold">+ Pilih</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Option 2: Custom name */}
            <div className="pt-3 border-t border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Atau Ketik Nama Alat / Gerakan Sendiri:
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Contoh: Dumbbell Goblet Squat"
                  value={customExName}
                  onChange={(e) => setCustomExName(e.target.value)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
                <select
                  value={customExMuscle}
                  onChange={(e) => setCustomExMuscle(e.target.value)}
                  className="py-2 px-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200"
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
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
              >
                Tambahkan Gerakan Kustom
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Celebration Modal (Replaces alert()) */}
      {celebrationSummary && (
        <div
          onClick={() => setCelebrationSummary(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-slate-900 border border-emerald-500/50 rounded-3xl p-6 text-center space-y-4 shadow-2xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">Latihan Hari Ini Tuntas! 🎉</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kerja kerasmu hari ini sudah tersimpan di riwayat. Ingat untuk minum air putih dan konsumsi makanan berprotein!
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-400 block">Set Diselesaikan</span>
                <strong className="text-lg font-black text-emerald-400">
                  {celebrationSummary.completedSets} Set
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block">Total Volume Angkatan</span>
                <strong className="text-lg font-black text-amber-400">
                  {celebrationSummary.totalVolumeKg} kg
                </strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCelebrationSummary(null)}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition"
            >
              Mantap, Tutup Ringkasan
            </button>
          </div>
        </div>
      )}

      {/* Floating Rest Timer Modal */}
      {showTimerModal && (
        <div
          onClick={() => setShowTimerModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
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
