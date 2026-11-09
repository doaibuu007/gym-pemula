import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, HelpCircle } from 'lucide-react';
import { workoutPrograms } from '../data/programsData';
import { exerciseList } from '../data/exercisesData';

export function ProgramsSection({ onSelectProgramForTracker, onInspectExercise }) {
  const [selectedProgramId, setSelectedProgramId] = useState('full-body-3days');
  const [expandedDayIndex, setExpandedDayIndex] = useState(0);

  const currentProgram =
    workoutPrograms.find((p) => p.id === selectedProgramId) || workoutPrograms[0];

  const handleUseProgram = (dayRoutine, dayName) => {
    if (onSelectProgramForTracker) {
      onSelectProgramForTracker({
        title: `${currentProgram.title} - ${dayName}`,
        routine: dayRoutine.exercises
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Program Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {workoutPrograms.map((program) => (
          <div
            key={program.id}
            onClick={() => {
              setSelectedProgramId(program.id);
              setExpandedDayIndex(0);
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
              selectedProgramId === program.id
                ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    selectedProgramId === program.id
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {program.badge}
                </span>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  {program.durationWeeks}
                </span>
              </div>
              <h3 className="font-bold text-base text-white mb-1">{program.title}</h3>
              <p className="text-xs text-slate-300 line-clamp-2">{program.subtitle}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-semibold text-emerald-400 flex items-center justify-between">
              <span>{program.frequency.split('(')[0]}</span>
              <span>{program.days.length} Sesi/Minggu</span>
            </div>
          </div>
        ))}
      </div>

      {/* Program Detailed View */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              Level: {currentProgram.level}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
              Jadwal: {currentProgram.frequency}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">{currentProgram.title}</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
            {currentProgram.description}
          </p>
        </div>

        {/* Days Accordion */}
        <div className="space-y-3">
          {currentProgram.days.map((day, dIdx) => {
            const isExpanded = expandedDayIndex === dIdx;
            return (
              <div
                key={dIdx}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden transition"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setExpandedDayIndex(isExpanded ? null : dIdx)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-black text-sm flex items-center justify-center">
                      {dIdx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-white">{day.dayName}</h4>
                      <p className="text-xs text-slate-400">{day.target}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      {day.exercises.length} Gerakan
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="p-4 pt-1 border-t border-slate-800/60 space-y-4">
                    <div className="space-y-2">
                      {day.exercises.map((ex, exIdx) => {
                        const matchedEx = exerciseList.find(
                          (item) => item.name.toLowerCase() === ex.name.toLowerCase()
                        );
                        return (
                          <div
                            key={exIdx}
                            onClick={() => matchedEx && onInspectExercise && onInspectExercise(matchedEx)}
                            className={`flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/70 text-xs sm:text-sm ${
                              matchedEx ? 'cursor-pointer hover:border-emerald-500/50 transition' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center">
                                {exIdx + 1}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <strong className="text-white">{ex.name}</strong>
                                  {matchedEx && (
                                    <span className="text-xs text-emerald-400 flex items-center gap-0.5 font-medium">
                                      <HelpCircle className="w-3.5 h-3.5" /> Video
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-slate-400">{ex.muscle}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="font-bold text-slate-200 block">
                                {ex.sets} Set × {ex.reps}
                              </span>
                              <span className="text-xs text-slate-400">Istirahat: {ex.rest}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleUseProgram(day, day.dayName)}
                        className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                      >
                        <Play className="w-4 h-4 fill-current" /> Catat Sesi Ini di Workout Tracker
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
