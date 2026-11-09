import React, { useState } from 'react';
import { ShieldCheck, BookOpen, Briefcase, Search, CheckSquare, Square, Sparkles, MessageCircle } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      
      {/* Tab Switcher */}
      <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1.5 gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('etiquette')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition whitespace-nowrap ${
            activeSubTab === 'etiquette'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Etika & Aturan Gym
        </button>
        <button
          onClick={() => setActiveSubTab('glossary')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition whitespace-nowrap ${
            activeSubTab === 'glossary'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Kamus Istilah Gym
        </button>
        <button
          onClick={() => setActiveSubTab('checklist')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition whitespace-nowrap ${
            activeSubTab === 'checklist'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" /> Checklist Tas Gym
        </button>
      </div>

      {/* SUBTAB 1: ETIKET GYM */}
      {activeSubTab === 'etiquette' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-xs sm:text-sm flex items-start gap-3">
            <span className="text-xl">🤝</span>
            <div>
              <strong className="text-emerald-400 block mb-0.5">Etika Gym Bikin Kamu Dihargai Sesama Member:</strong>
              <p className="text-slate-300 leading-relaxed">
                Di gym, tidak ada yang peduli seberapa ringan bebanmu. Yang paling dihargai adalah kerapian, rasa hormat, dan kemauan mengembalikan alat ke tempatnya.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gymEtiquette.map((rule) => (
              <div
                key={rule.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                      {rule.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-400">
                      Tingkat: {rule.importance}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-white mb-2">{rule.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {rule.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-medium text-emerald-300 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>"{rule.phrase}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: KAMUS ISTILAH */}
      {activeSubTab === 'glossary' && (
        <div className="space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari istilah gym (misal: RPE, progressive overload, failure)..."
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm"
              >
                <div className="font-bold text-emerald-400 text-sm mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {item.term}
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: CHECKLIST TAS GYM */}
      {activeSubTab === 'checklist' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-lg font-black text-white mb-1">Checklist Tas Gym Hari Pertama</h3>
            <p className="text-xs text-slate-400">
              Centang barang yang sudah kamu masukkan ke dalam tas sebelum berangkat ke gym agar tidak ada yang ketinggalan!
            </p>
          </div>

          <div className="space-y-2.5">
            {checklist.map((item, idx) => (
              <div
                key={idx}
                onClick={() => toggleChecklistItem(idx)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                  item.checked
                    ? 'bg-emerald-950/20 border-emerald-900/60 text-slate-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="mt-0.5 text-emerald-400">
                  {item.checked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-600" />}
                </div>
                <div className="text-xs sm:text-sm">
                  <strong className={`block ${item.checked ? 'text-white' : 'text-slate-300'}`}>
                    {item.item}
                  </strong>
                  <span className="text-[11px] text-slate-400">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
