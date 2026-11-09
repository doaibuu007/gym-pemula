import React from 'react';
import { Search, CheckCircle2, Shield, HeartHandshake, X, ClipboardList } from 'lucide-react';

export function HeroBanner({ searchQuery, onSearchChange, onOpenQuiz, onQuickSearch }) {
  const quickTags = ['Chest Press', 'Lat Pulldown', 'Leg Press', 'Dumbbell', 'Trisep'];

  return (
    <section aria-label="Ringkasan & Pencarian Alat Gym" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Left Column: iOS Large Title + UISearchTextField + Quick Filter Chips */}
      <div className="lg:col-span-7 ios-card p-5 sm:p-6 space-y-5">
        <div className="space-y-2">
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: 'var(--ios-green-text)' }}
          >
            Ringkasan Hari Pertama
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Panduan Alat & Gerakan Gym untuk Pemula
          </h1>
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: 'var(--ios-text-secondary)' }}
          >
            Pelajari fungsi setiap mesin beban, cara mengatur posisi kursi dan pin beban, simulasi postur aman, hingga jadwal latihan mingguan.
          </p>
        </div>

        {/* iOS Search Bar (UISearchTextField) */}
        <div className="space-y-3">
          <label htmlFor="ios-main-search" className="sr-only">
            Cari nama alat gym, gerakan, atau otot target
          </label>
          <div className="relative flex items-center">
            <Search
              className="w-5 h-5 absolute left-3.5 pointer-events-none"
              style={{ color: 'var(--ios-text-secondary)' }}
              aria-hidden="true"
            />
            <input
              id="ios-main-search"
              type="search"
              placeholder="Cari alat, gerakan, atau otot (misal: Dada, Lat Pulldown, Kaki)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="ios-input w-full pl-11 pr-11"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Bersihkan kata kunci pencarian"
                className="w-9 h-9 rounded-full flex items-center justify-center absolute right-1.5"
                style={{ color: 'var(--ios-text-secondary)' }}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Quick Search Chips (44px touch targets) */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-xs font-semibold mr-1"
              style={{ color: 'var(--ios-text-secondary)' }}
            >
              Pencarian populer:
            </span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onQuickSearch(tag)}
                className="min-h-[38px] px-3 py-1.5 rounded-full text-xs font-semibold transition"
                style={{
                  backgroundColor: 'var(--ios-fill)',
                  color: 'var(--ios-text)'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action Callout */}
        <div className="pt-1 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpenQuiz}
            className="ios-btn-primary text-xs sm:text-sm"
          >
            <ClipboardList className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Buat Jadwal Latihan Sesuai Tubuhmu</span>
          </button>
        </div>
      </div>

      {/* Right Column: iOS Inset Grouped List (3 Prinsip Utama Pemula) */}
      <div className="lg:col-span-5 space-y-2">
        <div className="px-1 flex items-center justify-between">
          <h2
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: 'var(--ios-text-secondary)' }}
          >
            Prinsip Dasar Sebelum Mulai
          </h2>
          <span
            className="text-xs font-semibold"
            style={{ color: 'var(--ios-green-text)' }}
          >
            Panduan Aman
          </span>
        </div>

        <div className="ios-grouped-list">
          <div className="ios-grouped-row p-4 flex items-start gap-3.5">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
              style={{
                backgroundColor: 'var(--ios-green-soft)',
                color: 'var(--ios-green-text)'
              }}
            >
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <strong className="text-sm font-bold block">Teknik Gerakan Lebih Penting dari Beban</strong>
              <p
                className="text-xs leading-relaxed mt-0.5"
                style={{ color: 'var(--ios-text-secondary)' }}
              >
                Postur yang rapi membentuk otot jauh lebih efektif daripada memaksakan beban berat dengan badan mengayun.
              </p>
            </div>
          </div>

          <div className="ios-grouped-row p-4 flex items-start gap-3.5">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
              style={{
                backgroundColor: 'var(--ios-amber-soft)',
                color: 'var(--ios-amber-text)'
              }}
            >
              <Shield className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <strong className="text-sm font-bold block">Awali dari Mesin Pin Beban</strong>
              <p
                className="text-xs leading-relaxed mt-0.5"
                style={{ color: 'var(--ios-text-secondary)' }}
              >
                Mesin memiliki jalur gerak terarah yang menjaga stabilitas sendi tanpa risiko tertimpa barbel.
              </p>
            </div>
          </div>

          <div className="ios-grouped-row p-4 flex items-start gap-3.5">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
              style={{
                backgroundColor: 'var(--ios-blue-soft)',
                color: 'var(--ios-blue-text)'
              }}
            >
              <HeartHandshake className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <strong className="text-sm font-bold block">Wajar Bertanya Cara Setting Kursi</strong>
              <p
                className="text-xs leading-relaxed mt-0.5"
                style={{ color: 'var(--ios-text-secondary)' }}
              >
                Setiap alat memiliki tuas kuning/merah untuk mengatur tinggi jok agar pas dengan tinggi badanmu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
