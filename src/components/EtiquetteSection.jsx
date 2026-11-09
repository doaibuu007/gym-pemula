import React, { useState } from 'react';
import { ShieldCheck, BookOpen, Briefcase, Search, CheckSquare, Square, MessageCircle, X } from 'lucide-react';
import { gymEtiquette, gymGlossary, starterBagChecklist } from '../data/etiquetteData';

export function EtiquetteSection() {
  const [activeSubTab, setActiveSubTab] = useState('etiquette'); // 'etiquette', 'glossary', 'checklist'
  const [glossarySearch, setGlossarySearch] = useState('');
  const [checklist, setChecklist] = useState(starterBagChecklist);

  const toggleChecklistItem = (index) => {
    setChecklist((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const filteredGlossary = gymGlossary.filter(
    (g) =>
      g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  const completedChecklistCount = checklist.filter((i) => i.checked).length;

  return (
    <div className="space-y-6">
      {/* iOS Segmented Tab Switcher */}
      <div className="ios-segmented w-full flex overflow-x-auto" role="tablist" aria-label="Menu Etika dan Istilah Gym">
        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'etiquette'}
          onClick={() => setActiveSubTab('etiquette')}
          className={`ios-segment-btn flex-1 min-h-[40px] px-4 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap ${
            activeSubTab === 'etiquette' ? 'ios-segment-btn-active' : ''
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Etika & Aturan Gym
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'glossary'}
          onClick={() => setActiveSubTab('glossary')}
          className={`ios-segment-btn flex-1 min-h-[40px] px-4 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap ${
            activeSubTab === 'glossary' ? 'ios-segment-btn-active' : ''
          }`}
        >
          <BookOpen className="w-4 h-4" /> Kamus Istilah Gym
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'checklist'}
          onClick={() => setActiveSubTab('checklist')}
          className={`ios-segment-btn flex-1 min-h-[40px] px-4 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap ${
            activeSubTab === 'checklist' ? 'ios-segment-btn-active' : ''
          }`}
        >
          <Briefcase className="w-4 h-4" /> Checklist Tas Gym
        </button>
      </div>

      {/* SUBTAB 1: ETIKET GYM */}
      {activeSubTab === 'etiquette' && (
        <div className="space-y-4">
          <div className="ios-card p-4 bg-[var(--ios-tint-soft)] text-xs sm:text-sm flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[var(--ios-tint)] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--ios-tint)] block mb-0.5">Etika Gym Membuat Kamu Dihargai Sesama Member:</strong>
              <p className="text-[var(--ios-label-secondary)] leading-relaxed">
                Di gym, tidak ada yang menghakimi seberapa ringan bebanmu. Yang paling dihargai adalah kerapian, rasa hormat, dan kebiasaan mengembalikan alat ke tempatnya.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gymEtiquette.map((rule) => (
              <article
                key={rule.id}
                className="ios-card p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--ios-tint-soft)] text-[var(--ios-tint)]">
                      {rule.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--ios-amber)]">
                      Tingkat: {rule.importance}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[var(--ios-label)] mb-2 tracking-tight">{rule.title}</h3>
                  <p className="text-xs text-[var(--ios-label-secondary)] leading-relaxed mb-4">
                    {rule.description}
                  </p>
                </div>

                <div className="p-3 rounded-[12px] bg-[var(--ios-card-elevated)] border border-[var(--ios-separator)] text-xs font-medium text-[var(--ios-tint)] flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[var(--ios-tint)] flex-shrink-0" />
                  <span>"{rule.phrase}"</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: KAMUS ISTILAH */}
      {activeSubTab === 'glossary' && (
        <div className="space-y-4">
          {/* iOS UISearchTextField */}
          <div className="relative">
            <label htmlFor="glossary-search" className="sr-only">
              Cari istilah gym
            </label>
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ios-label-secondary)] pointer-events-none" />
            <input
              id="glossary-search"
              type="search"
              placeholder="Cari istilah gym (misal: RPE, progressive overload, failure)..."
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              className="ios-search w-full min-h-[44px] py-2.5 pl-10 pr-10 text-sm"
            />
            {glossarySearch && (
              <button
                type="button"
                onClick={() => setGlossarySearch('')}
                aria-label="Bersihkan pencarian istilah"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[var(--ios-fill)] text-[var(--ios-label-secondary)] flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {filteredGlossary.length === 0 ? (
            <div className="ios-card p-8 text-center space-y-2">
              <p className="text-sm font-semibold text-[var(--ios-label)]">
                Istilah "{glossarySearch}" tidak ditemukan.
              </p>
              <button
                type="button"
                onClick={() => setGlossarySearch('')}
                className="min-h-[40px] px-4 py-2 rounded-full bg-[var(--ios-fill)] text-xs font-semibold text-[var(--ios-tint)]"
              >
                Tampilkan Semua Istilah
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredGlossary.map((item, idx) => (
                <div
                  key={idx}
                  className="ios-card p-4 text-xs sm:text-sm"
                >
                  <div className="font-bold text-[var(--ios-tint)] text-sm mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--ios-tint)]" />
                    {item.term}
                  </div>
                  <p className="text-[var(--ios-label-secondary)] leading-relaxed text-xs">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: CHECKLIST TAS GYM */}
      {activeSubTab === 'checklist' && (
        <div className="ios-card p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-[var(--ios-label)] tracking-tight">Checklist Tas Gym Hari Pertama</h3>
              <p className="text-xs text-[var(--ios-label-secondary)]">
                Centang barang yang sudah kamu masukkan ke dalam tas sebelum berangkat ke gym.
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold font-mono tabular-nums bg-[var(--ios-tint-soft)] text-[var(--ios-tint)] self-start sm:self-auto">
              {completedChecklistCount}/{checklist.length} Siap
            </span>
          </div>

          <div className="ios-grouped-list bg-[var(--ios-card-elevated)]">
            {checklist.map((item, idx) => (
              <button
                key={idx}
                type="button"
                role="checkbox"
                aria-checked={item.checked}
                onClick={() => toggleChecklistItem(idx)}
                className={`ios-list-row w-full text-left min-h-[56px] transition flex items-start gap-3 ${
                  item.checked ? 'bg-[var(--ios-tint-soft)]' : 'hover:bg-[var(--ios-fill)]'
                }`}
              >
                <div className="mt-0.5 text-[var(--ios-tint)] flex-shrink-0">
                  {item.checked ? (
                    <CheckSquare className="w-5 h-5 text-[var(--ios-tint)]" />
                  ) : (
                    <Square className="w-5 h-5 text-[var(--ios-label-tertiary)]" />
                  )}
                </div>
                <div className="text-xs sm:text-sm">
                  <strong className={`block ${item.checked ? 'text-[var(--ios-label)] line-through opacity-80' : 'text-[var(--ios-label)]'}`}>
                    {item.item}
                  </strong>
                  <span className="text-[11px] text-[var(--ios-label-secondary)]">{item.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
