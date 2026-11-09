import React, { useState, useEffect } from 'react';
import {
  X,
  Dumbbell,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Plus,
  Scale,
  ChevronRight
} from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-5 ios-sheet-backdrop overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl ios-sheet overflow-hidden flex flex-col max-h-[92dvh]"
      >
        {/* iOS Grabber Handle */}
        <div className="ios-grabber" aria-hidden="true" />

        {/* iOS Sheet Header */}
        <div
          className="px-5 pt-2 pb-4 border-b flex items-start justify-between gap-4"
          style={{ borderColor: 'var(--ios-separator)' }}
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: 'var(--ios-green-soft)',
                  color: 'var(--ios-green-text)'
                }}
              >
                {exercise.muscleGroup}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: 'var(--ios-fill)',
                  color: 'var(--ios-text-secondary)'
                }}
              >
                {exercise.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {exercise.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail gerakan"
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition"
            style={{
              backgroundColor: 'var(--ios-fill)',
              color: 'var(--ios-text-secondary)'
            }}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Sheet Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Quick Metrics in iOS Grouped Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="ios-inset-surface p-3">
              <span className="block mb-0.5" style={{ color: 'var(--ios-text-secondary)' }}>
                Rekomendasi Set/Rep
              </span>
              <strong className="text-sm font-bold" style={{ color: 'var(--ios-green-text)' }}>
                {exercise.recommendedSets}
              </strong>
            </div>
            <div className="ios-inset-surface p-3">
              <span className="block mb-0.5" style={{ color: 'var(--ios-text-secondary)' }}>
                Jeda Istirahat
              </span>
              <strong className="text-sm font-bold">{exercise.restSeconds} Detik</strong>
            </div>
            <div className="ios-inset-surface p-3 col-span-2 sm:col-span-1">
              <span className="block mb-0.5" style={{ color: 'var(--ios-text-secondary)' }}>
                Alat yang Dipakai
              </span>
              <strong className="text-sm font-bold truncate block">{exercise.equipment}</strong>
            </div>
          </div>

          {/* Purpose & Starting Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="ios-callout-green p-3.5">
              <strong
                className="font-bold block mb-1 uppercase tracking-wider"
                style={{ color: 'var(--ios-green-text)' }}
              >
                Manfaat Gerakan
              </strong>
              <p className="leading-relaxed">{exercise.purpose}</p>
            </div>
            {exercise.startingWeight && (
              <div className="ios-callout-amber p-3.5">
                <strong
                  className="font-bold flex items-center gap-1.5 mb-1 uppercase tracking-wider"
                  style={{ color: 'var(--ios-amber-text)' }}
                >
                  <Scale className="w-3.5 h-3.5" aria-hidden="true" />
                  Beban Awal Pemula
                </strong>
                <p className="leading-relaxed">{exercise.startingWeight}</p>
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

          {/* Step by step in iOS Inset Grouped List */}
          <div className="space-y-2">
            <h4
              className="text-xs font-bold uppercase tracking-wider px-1"
              style={{ color: 'var(--ios-text-secondary)' }}
            >
              Langkah-langkah Melakukan Gerakan
            </h4>
            <div className="ios-grouped-list">
              {exercise.instructions.map((step, idx) => (
                <div key={idx} className="ios-grouped-row flex items-start gap-3 p-3.5 text-xs sm:text-sm">
                  <span
                    className="w-6 h-6 shrink-0 rounded-full font-bold text-xs flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--ios-green-soft)',
                      color: 'var(--ios-green-text)'
                    }}
                  >
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Breathing Guide */}
          <div className="ios-callout-blue p-3.5 text-xs sm:text-sm">
            <strong
              className="font-bold block mb-1"
              style={{ color: 'var(--ios-blue-text)' }}
            >
              Aturan Napas
            </strong>
            <p className="leading-relaxed">{exercise.breathing}</p>
          </div>

          {/* Pro Tip & Common Mistake */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="ios-callout-amber p-3.5">
              <strong
                className="font-bold flex items-center gap-1.5 mb-1"
                style={{ color: 'var(--ios-amber-text)' }}
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Pro Tip Pelatih
              </strong>
              <p className="leading-relaxed">{exercise.proTip}</p>
            </div>
            <div className="ios-callout-red p-3.5">
              <strong
                className="font-bold flex items-center gap-1.5 mb-1"
                style={{ color: 'var(--ios-red-text)' }}
              >
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                Kesalahan Umum
              </strong>
              <p className="leading-relaxed">{exercise.commonMistake}</p>
            </div>
          </div>

          {/* Video Embed */}
          {exercise.videoEmbedId && (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <h4
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--ios-text-secondary)' }}
                >
                  Video Panduan Praktik
                </h4>
                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold hover:underline flex items-center gap-1 min-h-[36px]"
                  style={{ color: 'var(--ios-blue-text)' }}
                >
                  <span>Cari di YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
              <div
                className="relative aspect-video rounded-2xl overflow-hidden border"
                style={{
                  backgroundColor: 'var(--ios-card-elevated)',
                  borderColor: 'var(--ios-separator)'
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${exercise.videoEmbedId}`}
                  title={`Video panduan ${exercise.name}`}
                  width="560"
                  height="315"
                  className="w-full h-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        {/* iOS Sheet Footer */}
        <div
          className="p-4 border-t flex items-center justify-between gap-3"
          style={{
            backgroundColor: 'var(--ios-card)',
            borderColor: 'var(--ios-separator)'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="ios-btn-secondary text-xs sm:text-sm"
          >
            <span>Tutup</span>
          </button>
          {onAddToTracker && (
            <button
              type="button"
              onClick={() => {
                onAddToTracker(exercise);
                onClose();
              }}
              className="ios-btn-primary text-xs sm:text-sm"
            >
              <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Tambah ke Sesi Latihan Aktif</span>
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
    <article className="ios-card-interactive p-4 flex flex-col justify-between">
      <div>
        <div
          className="relative aspect-video rounded-2xl overflow-hidden mb-3.5 border"
          style={{
            backgroundColor: 'var(--ios-card-elevated)',
            borderColor: 'var(--ios-separator)'
          }}
        >
          {!imgError ? (
            <img
              src={exercise.thumbnail}
              alt={exercise.name}
              width="600"
              height="338"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <Dumbbell className="w-10 h-10 mb-2" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
              <span className="text-xs font-bold">{exercise.name}</span>
            </div>
          )}

          {/* Solid Scrim Badges */}
          <span
            className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-[11px] font-bold"
            style={{
              backgroundColor: '#111111',
              color: '#30D158'
            }}
          >
            {exercise.muscleGroup}
          </span>
          <span
            className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg text-xs font-bold"
            style={{
              backgroundColor: 'rgba(17, 17, 17, 0.88)',
              color: '#FFFFFF'
            }}
          >
            {exercise.recommendedSets}
          </span>
        </div>

        <h3 className="font-bold text-base leading-snug line-clamp-1">
          {exercise.name}
        </h3>
        <p
          className="text-xs line-clamp-2 mt-1 leading-relaxed"
          style={{ color: 'var(--ios-text-secondary)' }}
        >
          {exercise.purpose}
        </p>
      </div>

      <div
        className="mt-3.5 pt-3 border-t flex items-center justify-between gap-2"
        style={{ borderColor: 'var(--ios-separator)' }}
      >
        <span
          className="text-xs truncate font-medium"
          style={{ color: 'var(--ios-text-secondary)' }}
        >
          {exercise.equipment}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {onAddToTracker && (
            <button
              type="button"
              onClick={() => onAddToTracker(exercise)}
              aria-label={`Tambah ${exercise.name} ke Tracker`}
              title="Tambah ke Sesi Latihan"
              className="w-11 h-11 rounded-xl flex items-center justify-center border transition"
              style={{
                backgroundColor: 'var(--ios-fill)',
                borderColor: 'var(--ios-separator)',
                color: 'var(--ios-green-text)'
              }}
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenDetail(exercise)}
            className="ios-btn-secondary text-xs px-3"
          >
            <span>Lihat Detail</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
