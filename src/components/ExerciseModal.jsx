import React, { useState, useEffect } from 'react';
import { X, Dumbbell, AlertCircle, Sparkles, ExternalLink, Plus, Scale } from 'lucide-react';
import { MuscleHighlightDiagram, InteractiveMotionSimulator } from './VisualDiagram';

export function ExerciseModal({ exercise, onClose, onAddToTracker }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!exercise) return null;

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    exercise.youtubeSearch || `${exercise.name} proper form tutorial`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={exercise.name}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl my-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-slate-950/80 border-b border-slate-800 p-4 sm:p-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                {exercise.muscleGroup}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                {exercise.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{exercise.name}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup detail gerakan"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-200">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Rekomendasi Set/Rep:</span>
              <strong className="text-emerald-400 text-sm">{exercise.recommendedSets}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Jeda Istirahat:</span>
              <strong className="text-slate-100 text-sm">{exercise.restSeconds} Detik</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block mb-0.5">Alat yang Dipakai:</span>
              <strong className="text-slate-100 text-sm truncate block">{exercise.equipment}</strong>
            </div>
          </div>

          {/* Purpose & Starting Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-950/25 border border-emerald-900/50">
              <span className="font-bold text-emerald-400 block mb-1">🎯 Manfaat Gerakan:</span>
              <p className="text-slate-200 leading-relaxed">{exercise.purpose}</p>
            </div>
            {exercise.startingWeight && (
              <div className="p-3.5 rounded-2xl bg-amber-950/25 border border-amber-900/50">
                <span className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                  <Scale className="w-3.5 h-3.5" /> Beban Awal Pemula:
                </span>
                <p className="text-slate-200 leading-relaxed">{exercise.startingWeight}</p>
              </div>
            )}
          </div>

          {/* Interactive Motion Simulator */}
          <InteractiveMotionSimulator
            id={exercise.id}
            name={exercise.name}
            muscleGroup={exercise.muscleGroup}
          />

          {/* Muscle Highlight Diagram */}
          <MuscleHighlightDiagram
            activeMuscle={exercise.muscleGroup}
            secondaryMuscles={exercise.secondaryMuscles || []}
          />

          {/* Step by step */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Langkah-langkah Melakukan Gerakan:
            </h4>
            <div className="space-y-2">
              {exercise.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm">
                  <span className="w-5 h-5 flex-shrink-0 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <p className="text-slate-200 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Breathing Guide */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs sm:text-sm">
            <span className="font-bold text-cyan-400 block mb-1">🫁 Aturan Napas:</span>
            <p className="text-slate-200 leading-relaxed">{exercise.breathing}</p>
          </div>

          {/* Pro Tip & Common Mistake */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40">
              <span className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" /> Pro Tip Pelatih:
              </span>
              <p className="text-slate-200 leading-relaxed">{exercise.proTip}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40">
              <span className="font-bold text-rose-400 flex items-center gap-1.5 mb-1">
                <AlertCircle className="w-4 h-4 text-rose-400" /> Kesalahan Umum:
              </span>
              <p className="text-slate-200 leading-relaxed">{exercise.commonMistake}</p>
            </div>
          </div>

          {/* Video Embed */}
          {exercise.videoEmbedId && (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Video Panduan Praktik:
                </h4>
                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  Cari di YouTube <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <iframe
                  src={`https://www.youtube.com/embed/${exercise.videoEmbedId}`}
                  title={`Video panduan ${exercise.name}`}
                  className="w-full h-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
          >
            Tutup
          </button>
          {onAddToTracker && (
            <button
              onClick={() => {
                onAddToTracker(exercise);
                onClose();
              }}
              className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" /> Tambah ke Sesi Latihan Aktif
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ExerciseCard({ exercise, onOpenDetail, onAddToTracker }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onOpenDetail(exercise)}
      className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 transition-all duration-300 cursor-pointer shadow-lg flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-950 border border-slate-800/80">
          {!imgError ? (
            <img
              src={exercise.thumbnail}
              alt={exercise.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-emerald-950/40 p-4 text-center">
              <Dumbbell className="w-10 h-10 text-emerald-400 mb-2" />
              <span className="text-xs font-bold text-slate-200">{exercise.name}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-950/90 text-emerald-400 border border-slate-800">
            {exercise.muscleGroup}
          </span>
          <span className="absolute bottom-2 left-2.5 text-xs text-white font-semibold">
            {exercise.recommendedSets}
          </span>
        </div>

        <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
          {exercise.name}
        </h3>
        <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
          {exercise.purpose}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-400 truncate">{exercise.equipment}</span>
        <div className="flex items-center gap-1.5">
          {onAddToTracker && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAddToTracker(exercise);
              }}
              aria-label={`Tambah ${exercise.name} ke Tracker`}
              title="Tambah ke Sesi Latihan"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(exercise);
            }}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            Simulasi & Video →
          </button>
        </div>
      </div>
    </div>
  );
}
