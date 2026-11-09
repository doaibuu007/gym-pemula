import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Volume2, VolumeX, X } from 'lucide-react';
import { playShortBeep, playFinishChime } from '../utils/audio';

export function RestTimer({ initialSeconds = 90, onFinished, onClose, autoStart = false, exerciseName = '' }) {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const soundRef = useRef(soundEnabled);
  const onFinishedRef = useRef(onFinished);

  useEffect(() => {
    soundRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  useEffect(() => {
    setTimeLeft(initialSeconds);
    setTotalSeconds(initialSeconds);
    if (autoStart) setIsRunning(true);
  }, [initialSeconds, autoStart]);

  // Escape key handler
  useEffect(() => {
    if (!onClose) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Stable 1-second interval that does not recreate on every tick
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (soundRef.current) playFinishChime();
          if (onFinishedRef.current) onFinishedRef.current();
          setIsRunning(false);
          return 0;
        }
        if (prev <= 4 && soundRef.current) {
          playShortBeep();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleRun = () => {
    if (!isRunning && timeLeft === 0) {
      setTimeLeft(totalSeconds);
    }
    setIsRunning((r) => !r);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  };

  const addTime = (secs) => {
    setTimeLeft((prev) => prev + secs);
    setTotalSeconds((prev) => Math.max(prev + secs, timeLeft + secs));
  };

  const selectPreset = (secs) => {
    setTotalSeconds(secs);
    setTimeLeft(secs);
    setIsRunning(true);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  return (
    <div
      role="dialog"
      aria-label="Rest Timer Jeda Istirahat"
      className="bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 shadow-2xl rounded-3xl p-5 w-full max-w-sm mx-auto text-slate-100"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`}></span>
            <h3 className="font-bold text-sm tracking-wide uppercase text-emerald-400">Rest Timer</h3>
          </div>
          {exerciseName && (
            <p className="text-xs text-slate-400 truncate max-w-[210px] mt-0.5">
              Jeda: {exerciseName}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label={soundEnabled ? 'Matikan suara timer' : 'Nyalakan suara timer'}
            title={soundEnabled ? 'Suara Aktif' : 'Suara Mati'}
            className={`p-2 rounded-xl border transition ${
              soundEnabled
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Tutup Rest Timer"
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Preset Pills */}
      <div className="flex justify-between gap-1.5 mb-4">
        {[45, 60, 90, 120].map((preset) => (
          <button
            key={preset}
            onClick={() => selectPreset(preset)}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold border transition ${
              totalSeconds === preset
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
          >
            {preset}d
          </button>
        ))}
      </div>

      {/* Circular Display */}
      <div className="relative flex flex-col items-center justify-center my-2">
        <svg className="w-36 h-36 transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r="62"
            className="stroke-slate-800"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r="62"
            className="stroke-emerald-400 transition-all duration-300"
            strokeWidth="8"
            strokeDasharray={389.5}
            strokeDashoffset={389.5 - (389.5 * progressPercent) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-black tracking-tight text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-xs text-slate-400 mt-0.5">
            {isRunning ? 'Atur napas...' : timeLeft === 0 ? 'Mulai Set Baru!' : 'Siap mulai'}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-2.5 mt-4">
        <button
          onClick={resetTimer}
          aria-label="Reset Timer"
          title="Reset"
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleRun}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm shadow-lg transition ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-current" /> Jeda
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> {timeLeft === 0 ? 'Ulangi' : 'Mulai'}
            </>
          )}
        </button>

        <button
          onClick={() => addTime(30)}
          aria-label="Tambah 30 detik"
          className="flex items-center gap-1 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition"
        >
          <Plus className="w-3.5 h-3.5" /> 30d
        </button>
      </div>

      <p className="text-xs text-center text-slate-400 mt-3">
        💡 Minum 1–2 teguk air putih dan lemaskan bahu selama jeda istirahat.
      </p>
    </div>
  );
}
