import React from 'react';
import {
  Dumbbell,
  ClipboardList,
  Layers,
  Activity,
  CalendarCheck,
  ShieldCheck,
  Calculator,
  Sun,
  Moon
} from 'lucide-react';

export function Navbar({ activeTab, onSelectTab, onOpenQuiz, theme, onToggleTheme }) {
  const navItems = [
    { id: 'alat', label: 'Alat Gym', icon: Dumbbell },
    { id: 'gerakan', label: 'Gerakan', icon: Activity },
    { id: 'program', label: 'Program', icon: CalendarCheck },
    { id: 'tracker', label: 'Log & Timer', icon: Layers },
    { id: 'nutrisi', label: 'Nutrisi', icon: Calculator },
    { id: 'etika', label: 'Panduan', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 ios-nav-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* iOS App Identity Button */}
        <button
          type="button"
          onClick={() => onSelectTab('alat')}
          className="min-h-[44px] flex items-center gap-2.5 text-left rounded-xl px-1 -ml-1 transition"
        >
          <div
            className="w-10 h-10 rounded-[11px] flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--ios-green)',
              color: 'var(--ios-green-on-fill)'
            }}
          >
            <Dumbbell className="w-5 h-5 -rotate-45" aria-hidden="true" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight block leading-none">
              Gym<span style={{ color: 'var(--ios-green-text)' }}>Mulai</span>
            </span>
            <span
              className="text-xs font-medium block mt-0.5"
              style={{ color: 'var(--ios-text-secondary)' }}
            >
              Fitness & Panduan Pemula
            </span>
          </div>
        </button>

        {/* Desktop iOS Segmented Control Navigation */}
        <nav className="hidden lg:flex items-center" aria-label="Menu Utama">
          <div className="ios-segmented">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`ios-segment-btn ${isActive ? 'ios-segment-btn-active' : ''}`}
                >
                  <Icon
                    className="w-4 h-4 shrink-0"
                    style={{
                      color: isActive ? 'var(--ios-green-text)' : 'currentColor'
                    }}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right Actions: Theme Switcher + Custom Routine Builder CTA */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Aktifkan Mode Terang (iOS Light)' : 'Aktifkan Mode Gelap (iOS Dark)'}
            title={theme === 'dark' ? 'Ganti ke iOS Light Mode' : 'Ganti ke iOS Dark Mode'}
            className="ios-btn-secondary px-3"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4" style={{ color: 'var(--ios-amber-text)' }} aria-hidden="true" />
                <span className="hidden sm:inline text-xs font-semibold">Terang</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" style={{ color: 'var(--ios-blue-text)' }} aria-hidden="true" />
                <span className="hidden sm:inline text-xs font-semibold">Gelap</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenQuiz}
            className="ios-btn-primary text-xs sm:text-sm px-3.5 sm:px-4"
          >
            <ClipboardList className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Susun Jadwal</span>
          </button>
        </div>
      </div>
    </header>
  );
}
