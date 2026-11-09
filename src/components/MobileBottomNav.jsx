import React from 'react';
import { Dumbbell, Activity, CalendarCheck, Layers, ShieldCheck, Calculator } from 'lucide-react';

export function MobileBottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'alat', label: 'Alat', icon: Dumbbell },
    { id: 'gerakan', label: 'Gerakan', icon: Activity },
    { id: 'program', label: 'Program', icon: CalendarCheck },
    { id: 'tracker', label: 'Tracker', icon: Layers },
    { id: 'nutrisi', label: 'Nutrisi', icon: Calculator },
    { id: 'etika', label: 'Panduan', icon: ShieldCheck }
  ];

  return (
    <nav
      aria-label="Tab Bar Bawah iOS"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 ios-nav-blur border-t px-1 pt-1 pb-[max(0.35rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-6 gap-0.5 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => {
                onSelectTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-xl transition"
              style={{
                color: isActive ? 'var(--ios-green-text)' : 'var(--ios-text-secondary)'
              }}
            >
              <Icon
                className="w-5 h-5"
                strokeWidth={isActive ? 2.5 : 2}
                aria-hidden="true"
              />
              <span className={`text-[11px] mt-1 tracking-tight leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
