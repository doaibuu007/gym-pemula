import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Video, Wrench, Dumbbell, ExternalLink, Layers, Scale } from 'lucide-react';
import { MuscleHighlightDiagram, MachineMechanismDiagram, InteractiveMotionSimulator } from './VisualDiagram';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl my-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="relative bg-slate-950/80 border-b border-slate-800 p-4 sm:p-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                {equipment.difficulty}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                {equipment.categoryLabel || categoryLabelMap[equipment.category] || equipment.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {equipment.name}
            </h2>
            <p className="text-sm font-medium text-emerald-400">
              {equipment.indonesianName}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup detail alat"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 sm:px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('setup')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'setup'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-4 h-4" /> 1. Cara Setting Alat
          </button>
          <button
            onClick={() => setActiveTab('execution')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'execution'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4" /> 2. Simulasi & Video
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'rules'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> 3. Do's, Don'ts & Alternatif
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-200">
          {/* Quick Summary & Starting Weight Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-emerald-950/25 border border-emerald-900/50 rounded-2xl p-3.5 text-xs">
              <strong className="text-emerald-400 block mb-1 uppercase tracking-wider">💡 Fungsi Utama:</strong>
              <p className="text-slate-200 leading-relaxed">{equipment.summary}</p>
            </div>
            {equipment.startingWeightGuide && (
              <div className="bg-amber-950/25 border border-amber-900/50 rounded-2xl p-3.5 text-xs">
                <strong className="text-amber-400 flex items-center gap-1.5 mb-1 uppercase tracking-wider">
                  <Scale className="w-3.5 h-3.5" /> Rekomendasi Beban Hari Pertama:
                </strong>
                <p className="text-slate-200 leading-relaxed">{equipment.startingWeightGuide}</p>
              </div>
            )}
          </div>

          {/* TAB 1: CARA SETTING ALAT */}
          {activeTab === 'setup' && (
            <div className="space-y-4">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-400" />
                Langkah Penyesuaian Sebelum Mulai:
              </h3>

              <div className="space-y-3">
                {equipment.setupGuide.map((step, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
                    <div className="flex items-center gap-2 font-bold text-sm text-emerald-300 mb-1.5">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                        {idx + 1}
                      </span>
                      {step.part}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 mb-2 leading-relaxed">
                      {step.instruction}
                    </p>
                    {step.tip && (
                      <div className="text-xs font-medium text-amber-300 bg-amber-950/30 border border-amber-900/40 rounded-xl px-3 py-2">
                        ⚠️ <strong>Tips Pemula:</strong> {step.tip}
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
              {/* Interactive Offline Motion Simulator */}
              <InteractiveMotionSimulator
                id={equipment.id}
                name={equipment.name}
                category={equipment.category}
                muscleGroup={equipment.targetMuscleGroup}
              />

              {/* Muscle Diagram */}
              <MuscleHighlightDiagram
                activeMuscle={equipment.targetMuscleGroup}
                targetMuscles={equipment.targetMuscles}
              />

              {/* Step by Step Execution */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Urutan Gerakan Langkah demi Langkah:
                </h4>
                <div className="space-y-2">
                  {equipment.executionSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm">
                      <span className="w-5 h-5 flex-shrink-0 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed text-slate-200">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breathing Guide */}
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs sm:text-sm">
                <span className="font-bold text-cyan-400 block mb-1">
                  🫁 Cara Mengatur Napas yang Benar:
                </span>
                <p className="text-slate-200 leading-relaxed">{equipment.breathing}</p>
              </div>

              {/* Video Tutorial Section */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-emerald-400" /> Video Referensi YouTube:
                  </h4>
                  <a
                    href={searchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    Cari Lebih Banyak Video di YouTube <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <iframe
                    src={equipment.videoUrl}
                    title={`Video tutorial ${equipment.name}`}
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
                {/* DO's */}
                <div className="bg-emerald-950/20 border border-emerald-900/60 rounded-2xl p-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> Wajib Dilakukan (Do's)
                  </h4>
                  <ul className="space-y-2 text-xs leading-relaxed text-slate-200">
                    {equipment.dosAndDonts.dos.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DONT's */}
                <div className="bg-rose-950/20 border border-rose-900/60 rounded-2xl p-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-3">
                    <AlertTriangle className="w-4 h-4 text-rose-400" /> Jangan Lakukan (Don'ts)
                  </h4>
                  <ul className="space-y-2 text-xs leading-relaxed text-slate-200">
                    {equipment.dosAndDonts.donts.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Alternatives when occupied */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Alat Sedang Dipakai Orang Lain? Gunakan Alternatif Ini:
                </h4>
                <p className="text-xs text-slate-300 mb-3">
                  Jangan buang waktu mengantre lama saat gym ramai. Kamu bisa melatih otot yang sama menggunakan:
                </p>
                <div className="flex flex-wrap gap-2">
                  {equipment.alternativesIfOccupied.map((alt, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
                    >
                      <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
          <span className="text-xs text-slate-400 truncate">
            Otot Utama: <strong className="text-slate-200">{equipment.targetMuscles.join(', ')}</strong>
          </span>
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export function EquipmentCard({ equipment, onOpenDetail }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onOpenDetail(equipment)}
      className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-emerald-500/10 flex flex-col justify-between"
    >
      <div>
        {/* Image / Fallback Thumbnail */}
        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-950 border border-slate-800/80">
          {!imgError ? (
            <img
              src={equipment.image}
              alt={equipment.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-emerald-950/40 p-4 text-center">
              <Dumbbell className="w-10 h-10 text-emerald-400 mb-2" />
              <span className="text-xs font-bold text-slate-200">{equipment.name}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

          <div className="absolute top-2 left-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-950/90 text-emerald-400 border border-slate-800">
              {equipment.categoryLabel || categoryLabelMap[equipment.category] || equipment.category}
            </span>
          </div>

          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-xs text-white font-semibold">
            <span className="truncate">Target: {equipment.targetMuscleGroup}</span>
            <span className="text-amber-400">★ {equipment.rating}</span>
          </div>
        </div>

        {/* Title & Info */}
        <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
          {equipment.name}
        </h3>
        <p className="text-xs text-emerald-400 font-semibold mb-2">
          {equipment.indonesianName}
        </p>
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
          {equipment.summary}
        </p>
      </div>

      <div>
        {/* Muscle Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {equipment.targetMuscles.slice(0, 2).map((m, idx) => (
            <span key={idx} className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-200">
              {m.split('(')[0].trim()}
            </span>
          ))}
          {equipment.targetMuscles.length > 2 && (
            <span className="text-xs px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400">
              +{equipment.targetMuscles.length - 2}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail(equipment);
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-800 group-hover:bg-emerald-500 text-slate-200 group-hover:text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5"
        >
          <Wrench className="w-3.5 h-3.5" /> Cara Setting, Simulasi & Video
        </button>
      </div>
    </div>
  );
}
