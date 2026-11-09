import React from 'react';
import { Dumbbell, Activity, CalendarCheck, Layers, ShieldCheck, Calculator } from 'lucide-react';

export function MobileBottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'alat', label: 'Alat', icon: Dumbbell },
    { id: 'gerakan', label: 'Gerakan', icon: Activity },
    { id: 'program', label: 'Program', icon: CalendarCheck },
    { id: 'tracker', label: 'Tracker', icon: Layers },
    { id: 'nutrisi', label: 'Nutrisi', icon: Calculator },
    { id: 'etika', label: 'Etika', icon: ShieldCheck }
  ];

  return (
    <nav
      aria-label="Navigasi Bawah Mobile"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-1.5 py-1.5"
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                onSelectTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition ${
                  isActive ? 'bg-emerald-950/80 border border-emerald-800/50' : ''
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
