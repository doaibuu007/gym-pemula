import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Volume2, VolumeX, X } from 'lucide-react';
import { playShortBeep, playFinishChime } from '../utils/audio';

export function RestTimer({
  initialSeconds = 90,
  onFinished,
  onClose,
  autoStart = false,
  exerciseName = ''
}) {
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

  useEffect(() => {
    if (!onClose) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

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
      className="ios-sheet p-5 w-full max-w-sm mx-auto"
    >
      <div className="ios-grabber sm:hidden" aria-hidden="true" />

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: isRunning ? 'var(--ios-green)' : 'var(--ios-text-secondary)'
              }}
            />
            <h3
              className="font-bold text-xs tracking-wider uppercase"
              style={{ color: 'var(--ios-green-text)' }}
            >
              Timer Istirahat Antar Set
            </h3>
          </div>
          {exerciseName && (
            <p
              className="text-xs truncate max-w-[210px] mt-0.5 font-medium"
              style={{ color: 'var(--ios-text-secondary)' }}
            >
              {exerciseName}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-11 h-11 rounded-full flex items-center justify-center transition"
            style={{
              backgroundColor: 'var(--ios-fill)',
              color: soundEnabled ? 'var(--ios-green-text)' : 'var(--ios-text-secondary)'
            }}
            aria-label={soundEnabled ? 'Matikan suara alarm timer' : 'Nyalakan suara alarm timer'}
            title={soundEnabled ? 'Suara Aktif' : 'Suara Nonaktif'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" aria-hidden="true" /> : <VolumeX className="w-4 h-4" aria-hidden="true" />}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup Rest Timer"
              className="w-11 h-11 rounded-full flex items-center justify-center transition"
              style={{
                backgroundColor: 'var(--ios-fill)',
                color: 'var(--ios-text-secondary)'
              }}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* iOS Clock Style Digital Readout */}
      <div className="text-center my-4">
        <div className="text-5xl font-black font-mono tracking-tight tabular-nums">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--ios-text-secondary)' }}>
          {timeLeft === 0
            ? 'Istirahat selesai! Siap mulai set berikutnya.'
            : 'Atur napas & minum seteguk air putih'}
        </p>
      </div>

      {/* Progress Track */}
      <div
        className="w-full h-2.5 rounded-full overflow-hidden mb-5"
        style={{ backgroundColor: 'var(--ios-fill)' }}
      >
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: 'var(--ios-green)'
          }}
        />
      </div>

      {/* Presets in iOS Segmented Pill Style */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: '60d (Isolasi)', secs: 60 },
          { label: '90d (Mesin)', secs: 90 },
          { label: '120d (Berat)', secs: 120 }
        ].map((p) => (
          <button
            key={p.secs}
            type="button"
            onClick={() => selectPreset(p.secs)}
            className={`min-h-[44px] py-2 px-2 rounded-xl text-xs font-bold border transition ${
              totalSeconds === p.secs ? 'ios-callout-green' : 'ios-inset-surface'
            }`}
            style={{
              color: totalSeconds === p.secs ? 'var(--ios-green-text)' : 'var(--ios-text-secondary)'
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleRun}
          className="flex-1 ios-btn-primary text-xs sm:text-sm"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Jeda</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current shrink-0" aria-hidden="true" />
              <span>{timeLeft === 0 ? 'Ulangi' : 'Mulai'}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => addTime(15)}
          aria-label="Tambah 15 detik waktu istirahat"
          className="ios-btn-secondary text-xs px-3"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          <span>15d</span>
        </button>

        <button
          type="button"
          onClick={resetTimer}
          aria-label="Reset timer ke awal"
          className="ios-btn-secondary px-3"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
