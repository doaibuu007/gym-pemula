import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, HelpCircle, CalendarCheck } from 'lucide-react';
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
      {/* iOS Section Header */}
      <div>
        <p
          className="text-xs font-bold uppercase tracking-wider mb-1"
          style={{ color: 'var(--ios-green-text)' }}
        >
          Kurikulum Mingguan
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <CalendarCheck className="w-6 h-6" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
          <span>Program Latihan Terstruktur</span>
        </h2>
        <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--ios-text-secondary)' }}>
          Pilih salah satu program di bawah, lalu muat sesi hariannya langsung ke pencatat latihan (Tracker).
        </p>
      </div>

      {/* Program Selection Cards (Native Buttons for R-32 & R-39) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {workoutPrograms.map((program) => {
          const isSelected = selectedProgramId === program.id;
          return (
            <button
              key={program.id}
              type="button"
              onClick={() => {
                setSelectedProgramId(program.id);
                setExpandedDayIndex(0);
              }}
              aria-pressed={isSelected}
              className={`p-4 rounded-[20px] border text-left transition flex flex-col justify-between ${
                isSelected ? 'ios-callout-green' : 'ios-card-interactive'
              }`}
            >
              <div className="w-full">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={
                      isSelected
                        ? {
                            backgroundColor: 'var(--ios-green)',
                            color: 'var(--ios-green-on-fill)'
                          }
                        : {
                            backgroundColor: 'var(--ios-fill)',
                            color: 'var(--ios-text-secondary)'
                          }
                    }
                  >
                    {program.badge}
                  </span>
                  <span
                    className="text-xs font-semibold tabular-nums"
                    style={{ color: 'var(--ios-text-secondary)' }}
                  >
                    {program.durationWeeks}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-1">{program.title}</h3>
                <p
                  className="text-xs line-clamp-2 leading-relaxed"
                  style={{ color: 'var(--ios-text-secondary)' }}
                >
                  {program.subtitle}
                </p>
              </div>

              <div
                className="w-full mt-4 pt-3 border-t text-xs font-bold flex items-center justify-between"
                style={{
                  borderColor: 'var(--ios-separator)',
                  color: 'var(--ios-green-text)'
                }}
              >
                <span>{program.frequency.split('(')[0].trim()}</span>
                <span>{program.days.length} Sesi/Minggu</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Program Detailed View in iOS Grouped Card */}
      <div className="ios-card p-5 sm:p-6 space-y-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: 'var(--ios-green-soft)',
                color: 'var(--ios-green-text)'
              }}
            >
              Level: {currentProgram.level}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: 'var(--ios-fill)',
                color: 'var(--ios-text-secondary)'
              }}
            >
              Jadwal: {currentProgram.frequency}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {currentProgram.title}
          </h3>
          <p
            className="text-xs sm:text-sm leading-relaxed mt-1"
            style={{ color: 'var(--ios-text-secondary)' }}
          >
            {currentProgram.description}
          </p>
        </div>

        {/* Days Accordion in iOS Inset Grouped Style */}
        <div className="space-y-3">
          {currentProgram.days.map((day, dIdx) => {
            const isExpanded = expandedDayIndex === dIdx;
            return (
              <div key={dIdx} className="ios-inset-surface overflow-hidden">
                {/* Accordion Header */}
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => setExpandedDayIndex(isExpanded ? null : dIdx)}
                  className="w-full min-h-[56px] p-4 flex items-center justify-between text-left transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-[10px] font-extrabold text-sm flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'var(--ios-green-soft)',
                        color: 'var(--ios-green-text)'
                      }}
                    >
                      {dIdx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">{day.dayName}</h4>
                      <p className="text-xs" style={{ color: 'var(--ios-text-secondary)' }}>
                        {day.target}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-semibold hidden sm:inline"
                      style={{ color: 'var(--ios-text-secondary)' }}
                    >
                      {day.exercises.length} Gerakan
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" style={{ color: 'var(--ios-green-text)' }} aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-5 h-5" style={{ color: 'var(--ios-text-secondary)' }} aria-hidden="true" />
                    )}
                  </div>
                </button>

                {/* Accordion Content: iOS Inset Grouped Rows */}
                {isExpanded && (
                  <div
                    className="p-4 pt-2 border-t space-y-3"
                    style={{ borderColor: 'var(--ios-separator)' }}
                  >
                    <div className="ios-grouped-list">
                      {day.exercises.map((ex, exIdx) => {
                        const matchedExercise = exerciseList.find(
                          (item) => item.name.toLowerCase() === ex.name.toLowerCase()
                        );
                        return (
                          <div
                            key={exIdx}
                            className="ios-grouped-row p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                          >
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span
                                className="font-bold tabular-nums"
                                style={{ color: 'var(--ios-green-text)' }}
                              >
                                {exIdx + 1}.
                              </span>
                              <span className="font-bold text-sm">{ex.name}</span>
                              <span
                                className="px-2 py-0.5 rounded-md font-medium"
                                style={{
                                  backgroundColor: 'var(--ios-fill)',
                                  color: 'var(--ios-text-secondary)'
                                }}
                              >
                                {ex.muscle}
                              </span>
                              {matchedExercise && onInspectExercise && (
                                <button
                                  type="button"
                                  onClick={() => onInspectExercise(matchedExercise)}
                                  className="min-h-[34px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition"
                                  style={{
                                    backgroundColor: 'var(--ios-blue-soft)',
                                    color: 'var(--ios-blue-text)'
                                  }}
                                >
                                  <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>Lihat Cara Pakai</span>
                                </button>
                              )}
                            </div>
                            <div
                              className="flex items-center gap-3 font-mono font-semibold"
                              style={{ color: 'var(--ios-text-secondary)' }}
                            >
                              <span>
                                {ex.sets} Set × {ex.reps}
                              </span>
                              <span>•</span>
                              <span style={{ color: 'var(--ios-amber-text)' }}>
                                Istirahat {ex.rest}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => handleUseProgram(day, day.dayName)}
                        className="ios-btn-primary text-xs sm:text-sm"
                      >
                        <Play className="w-4 h-4 fill-current shrink-0" aria-hidden="true" />
                        <span>Mulai Sesi Ini di Workout Tracker</span>
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
