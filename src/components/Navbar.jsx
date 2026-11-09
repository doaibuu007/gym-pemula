import React from 'react';
import { Dumbbell, Sparkles, Layers, Activity, CalendarCheck, ShieldCheck, Calculator } from 'lucide-react';

export function Navbar({ activeTab, onSelectTab, onOpenQuiz }) {
  const navItems = [
    { id: 'alat', label: 'Katalog Alat', icon: Dumbbell },
    { id: 'gerakan', label: 'Gerakan', icon: Activity },
    { id: 'program', label: 'Program', icon: CalendarCheck },
    { id: 'tracker', label: 'Tracker & Timer', icon: Layers },
    { id: 'nutrisi', label: 'Kalori & Pemanasan', icon: Calculator },
    { id: 'etika', label: 'Etika & Kamus', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onSelectTab('alat')}
          className="flex items-center gap-2.5 cursor-pointer group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-emerald-400 -rotate-45" />
            </div>
          </div>
          <div>
            <span className="font-black text-lg tracking-tight text-white flex items-center gap-1">
              Gym<span className="text-emerald-400">Mulai</span>
            </span>
            <span className="text-[11px] text-slate-400 block -mt-1 font-medium">Panduan Pemula</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Menu Utama">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Quiz Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenQuiz}
            className="py-2 px-3.5 sm:px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kuis Rencana</span>
          </button>
        </div>
      </div>
    </header>
  );
}
