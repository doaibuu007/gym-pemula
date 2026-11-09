import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  AlertTriangle,
  Video,
  Wrench,
  Dumbbell,
  ExternalLink,
  Layers,
  Scale,
  ChevronRight
} from 'lucide-react';
import {
  MuscleHighlightDiagram,
  MachineMechanismDiagram,
  InteractiveMotionSimulator
} from './VisualDiagram';
import { categoryLabelMap } from '../data/equipmentData';

export function EquipmentModal({ equipment, onClose }) {
  const [activeTab, setActiveTab] = useState('setup'); // 'setup', 'execution', 'rules'

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!equipment) return null;

  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    equipment.youtubeSearchQuery || `${equipment.name} proper form tutorial`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={equipment.name}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-5 ios-sheet-backdrop overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl ios-sheet overflow-hidden flex flex-col max-h-[92dvh]"
      >
        {/* iOS Sheet Grabber Handle */}
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
                {equipment.difficulty}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: 'var(--ios-fill)',
                  color: 'var(--ios-text-secondary)'
                }}
              >
                {equipment.categoryLabel || categoryLabelMap[equipment.category] || equipment.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {equipment.name}
            </h2>
            <p
              className="text-sm font-semibold mt-0.5"
              style={{ color: 'var(--ios-green-text)' }}
            >
              {equipment.indonesianName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail alat"
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition"
            style={{
              backgroundColor: 'var(--ios-fill)',
              color: 'var(--ios-text-secondary)'
            }}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* iOS Segmented Control Bar */}
        <div
          className="px-4 sm:px-6 py-3 border-b overflow-x-auto"
          style={{ borderColor: 'var(--ios-separator)' }}
        >
          <div className="ios-segmented w-full grid grid-cols-3">
            <button
              type="button"
              onClick={() => setActiveTab('setup')}
              className={`ios-segment-btn text-xs sm:text-sm ${
                activeTab === 'setup' ? 'ios-segment-btn-active' : ''
              }`}
            >
              <Wrench className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>1. Setting Alat</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('execution')}
              className={`ios-segment-btn text-xs sm:text-sm ${
                activeTab === 'execution' ? 'ios-segment-btn-active' : ''
              }`}
            >
              <Video className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>2. Simulasi & Video</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rules')}
              className={`ios-segment-btn text-xs sm:text-sm ${
                activeTab === 'rules' ? 'ios-segment-btn-active' : ''
              }`}
            >
              <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>3. Tips & Alternatif</span>
            </button>
          </div>
        </div>

        {/* Scrollable Sheet Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Quick Summary & Starting Weight Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="ios-callout-green p-3.5 text-xs">
              <strong
                className="block mb-1 uppercase tracking-wider font-bold"
                style={{ color: 'var(--ios-green-text)' }}
              >
                Fungsi Utama Alat
              </strong>
              <p className="leading-relaxed">{equipment.summary}</p>
            </div>
            {equipment.startingWeightGuide && (
              <div className="ios-callout-amber p-3.5 text-xs">
                <strong
                  className="flex items-center gap-1.5 mb-1 uppercase tracking-wider font-bold"
                  style={{ color: 'var(--ios-amber-text)' }}
                >
                  <Scale className="w-3.5 h-3.5" aria-hidden="true" />
                  Rekomendasi Beban Hari Pertama
                </strong>
                <p className="leading-relaxed">{equipment.startingWeightGuide}</p>
              </div>
            )}
          </div>

          {/* TAB 1: CARA SETTING ALAT */}
          {activeTab === 'setup' && (
            <div className="space-y-4">
              <h3
                className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 px-1"
                style={{ color: 'var(--ios-text-secondary)' }}
              >
                <Wrench className="w-4 h-4" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
                Langkah Penyesuaian Sebelum Mulai
              </h3>

              {/* iOS Inset Grouped List for Setup Steps */}
              <div className="ios-grouped-list">
                {equipment.setupGuide.map((step, idx) => (
                  <div key={idx} className="ios-grouped-row p-4">
                    <div className="flex items-center gap-2.5 font-bold text-sm mb-1.5">
                      <span
                        className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-extrabold shrink-0"
                        style={{
                          backgroundColor: 'var(--ios-green-soft)',
                          color: 'var(--ios-green-text)'
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span>{step.part}</span>
                    </div>
                    <p
                      className="text-xs sm:text-sm mb-2 leading-relaxed pl-8"
                      style={{ color: 'var(--ios-text-secondary)' }}
                    >
                      {step.instruction}
                    </p>
                    {step.tip && (
                      <div className="ml-8 text-xs font-medium ios-callout-amber px-3 py-2">
                        <strong style={{ color: 'var(--ios-amber-text)' }}>Tips Pemula:</strong>{' '}
                        <span>{step.tip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <MachineMechanismDiagram machineType={equipment.category} />
            </div>
          )}

          {/* TAB 2: GERAKAN, SIMULASI & VIDEO */}
          {activeTab === 'execution' && (
            <div className="space-y-5">
              <InteractiveMotionSimulator
                id={equipment.id}
                name={equipment.name}
                category={equipment.category}
                muscleGroup={equipment.targetMuscleGroup}
              />

              <MuscleHighlightDiagram
                activeMuscle={equipment.targetMuscleGroup}
                targetMuscles={equipment.targetMuscles}
              />

              {/* Step by Step Execution in iOS Inset Grouped List */}
              <div className="space-y-2">
                <h4
                  className="text-xs font-bold uppercase tracking-wider px-1"
                  style={{ color: 'var(--ios-text-secondary)' }}
                >
                  Urutan Gerakan Langkah demi Langkah
                </h4>
                <div className="ios-grouped-list">
                  {equipment.executionSteps.map((step, idx) => (
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
                      <span className="leading-relaxed">{step}</span>
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
                  Cara Mengatur Napas yang Benar
                </strong>
                <p className="leading-relaxed">{equipment.breathing}</p>
              </div>

              {/* Video Tutorial Section */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                  <h4
                    className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                    style={{ color: 'var(--ios-text-secondary)' }}
                  >
                    <Video className="w-4 h-4" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
                    Video Referensi YouTube
                  </h4>
                  <a
                    href={searchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold hover:underline flex items-center gap-1 min-h-[36px]"
                    style={{ color: 'var(--ios-blue-text)' }}
                  >
                    <span>Cari Lebih Banyak di YouTube</span>
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
                    src={equipment.videoUrl}
                    title={`Video tutorial ${equipment.name}`}
                    width="560"
                    height="315"
                    className="w-full h-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RULES, DOS/DONTS & ALTERNATIVES */}
          {activeTab === 'rules' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="ios-callout-green p-4">
                  <h4
                    className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-3"
                    style={{ color: 'var(--ios-green-text)' }}
                  >
                    <CheckCircle className="w-4 h-4" aria-hidden="true" />
                    Wajib Dilakukan (Do's)
                  </h4>
                  <ul className="space-y-2 text-xs leading-relaxed">
                    {equipment.dosAndDonts.dos.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold" style={{ color: 'var(--ios-green-text)' }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ios-callout-red p-4">
                  <h4
                    className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-3"
                    style={{ color: 'var(--ios-red-text)' }}
                  >
                    <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                    Jangan Lakukan (Don'ts)
                  </h4>
                  <ul className="space-y-2 text-xs leading-relaxed">
                    {equipment.dosAndDonts.donts.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold" style={{ color: 'var(--ios-red-text)' }}>✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Alternatives when occupied */}
              <div className="ios-inset-surface p-4">
                <h4
                  className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1.5"
                  style={{ color: 'var(--ios-amber-text)' }}
                >
                  <Layers className="w-4 h-4" aria-hidden="true" />
                  Alat Sedang Dipakai Orang Lain? Gunakan Alternatif Ini
                </h4>
                <p
                  className="text-xs mb-3"
                  style={{ color: 'var(--ios-text-secondary)' }}
                >
                  Jangan buang waktu mengantre lama saat gym ramai. Kamu bisa melatih otot yang sama menggunakan:
                </p>
                <div className="flex flex-wrap gap-2">
                  {equipment.alternativesIfOccupied.map((alt, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border"
                      style={{
                        backgroundColor: 'var(--ios-card)',
                        borderColor: 'var(--ios-separator)'
                      }}
                    >
                      <Dumbbell className="w-3.5 h-3.5" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
                      <span>{alt}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* iOS Sheet Footer */}
        <div
          className="p-4 border-t flex items-center justify-between gap-2"
          style={{
            backgroundColor: 'var(--ios-card)',
            borderColor: 'var(--ios-separator)'
          }}
        >
          <span className="text-xs truncate" style={{ color: 'var(--ios-text-secondary)' }}>
            Otot Utama: <strong style={{ color: 'var(--ios-text)' }}>{equipment.targetMuscles.join(', ')}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="ios-btn-primary text-xs sm:text-sm"
          >
            <span>Selesai</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function EquipmentCard({ equipment, onOpenDetail }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="ios-card-interactive p-4 flex flex-col justify-between"
    >
      <div>
        {/* Image Thumbnail with explicit dimensions (R-40) */}
        <div
          className="relative aspect-video rounded-2xl overflow-hidden mb-3.5 border"
          style={{
            backgroundColor: 'var(--ios-card-elevated)',
            borderColor: 'var(--ios-separator)'
          }}
        >
          {!imgError ? (
            <img
              src={equipment.image}
              alt={equipment.name}
              width="600"
              height="338"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <Dumbbell className="w-10 h-10 mb-2" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
              <span className="text-xs font-bold">{equipment.name}</span>
            </div>
          )}

          {/* Solid Scrim Pill Badges (Contrast Verified R-25) */}
          <div className="absolute top-2.5 left-2.5">
            <span
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold"
              style={{
                backgroundColor: '#111111',
                color: '#30D158'
              }}
            >
              {equipment.categoryLabel || categoryLabelMap[equipment.category] || equipment.category}
            </span>
          </div>

          <div
            className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1 rounded-lg flex items-center justify-between text-xs font-bold"
            style={{
              backgroundColor: 'rgba(17, 17, 17, 0.88)',
              color: '#FFFFFF'
            }}
          >
            <span className="truncate">Target: {equipment.targetMuscleGroup}</span>
            <span style={{ color: '#FFB340' }}>★ {equipment.rating}</span>
          </div>
        </div>

        {/* Title & Info */}
        <h3 className="font-bold text-base leading-snug line-clamp-1">
          {equipment.name}
        </h3>
        <p
          className="text-xs font-semibold mb-1.5"
          style={{ color: 'var(--ios-green-text)' }}
        >
          {equipment.indonesianName}
        </p>
        <p
          className="text-xs line-clamp-2 leading-relaxed mb-3"
          style={{ color: 'var(--ios-text-secondary)' }}
        >
          {equipment.summary}
        </p>
      </div>

      <div>
        {/* Muscle Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {equipment.targetMuscles.slice(0, 2).map((m, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{
                backgroundColor: 'var(--ios-fill)',
                color: 'var(--ios-text)'
              }}
            >
              {m.split('(')[0].trim()}
            </span>
          ))}
          {equipment.targetMuscles.length > 2 && (
            <span
              className="text-xs px-2 py-1 rounded-lg font-medium"
              style={{
                backgroundColor: 'var(--ios-fill)',
                color: 'var(--ios-text-secondary)'
              }}
            >
              +{equipment.targetMuscles.length - 2}
            </span>
          )}
        </div>

        {/* Action Button (44px min height) */}
        <button
          type="button"
          onClick={() => onOpenDetail(equipment)}
          className="ios-btn-secondary w-full justify-between text-xs font-bold"
        >
          <span className="flex items-center gap-2">
            <Wrench className="w-4 h-4" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
            <span>Panduan Setting & Simulasi</span>
          </span>
          <ChevronRight className="w-4 h-4" style={{ color: 'var(--ios-text-secondary)' }} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
