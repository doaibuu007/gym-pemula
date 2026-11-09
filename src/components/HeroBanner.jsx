import React from 'react';
import { Sparkles, Search, CheckCircle, Shield, ArrowRight, HelpCircle, HeartHandshake } from 'lucide-react';

export function HeroBanner({ searchQuery, onSearchChange, onOpenQuiz, onQuickSearch }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 sm:p-8 shadow-2xl">
      
      {/* Decorative Glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-4">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Panduan Lengkap Hari Pertama di Gym</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Mulai Gym Tanpa <span className="text-emerald-400 underline decoration-emerald-500/40 decoration-wavy">Bingung</span> & Tanpa <span className="text-teal-400">Cemas</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
          Pelajari nama alat, cara setting posisi jok & pin beban, teknik gerakan anti-cedera, hingga jadwal latihan terstruktur untuk pemula.
        </p>

        {/* Search Bar */}
        <div className="pt-2">
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari alat, gerakan, atau otot (misal: Dada, Lat Pulldown, Kaki, Kabel)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full py-3.5 pl-11 pr-4 rounded-2xl bg-slate-950 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none shadow-inner"
            />
          </div>

          {/* Quick search chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-xs text-slate-400">
            <span>Paling sering dicari:</span>
            {['Chest Press', 'Lat Pulldown', 'Leg Press', 'Dumbbell', 'Trisep'].map((tag) => (
              <button
                key={tag}
                onClick={() => onQuickSearch(tag)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-800 hover:text-emerald-400 text-slate-300 transition text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Starter Golden Rules Strip */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 flex-shrink-0">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white block font-bold">Gerakan {'>'} Beban</strong>
              <span className="text-[11px] text-slate-400">Form yang benar jauh lebih cepat bentuk otot daripada beban berat tapi goyang.</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white block font-bold">Mulai dari Mesin</strong>
              <span className="text-[11px] text-slate-400">Mesin beban punya jalur aman dan stabil untuk melatih otot tanpa takut tertimpa.</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 flex-shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white block font-bold">Jangan Sungkan</strong>
              <span className="text-[11px] text-slate-400">Semua orang di gym pernah jadi pemula. Bertanya cara pakai alat adalah hal yang sangat wajar.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
