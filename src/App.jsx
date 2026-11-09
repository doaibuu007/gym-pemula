import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HeroBanner } from './components/HeroBanner';
import { EquipmentCard, EquipmentModal } from './components/EquipmentModal';
import { ExerciseCard, ExerciseModal } from './components/ExerciseModal';
import { ProgramsSection } from './components/ProgramsSection';
import { WorkoutTracker } from './components/WorkoutTracker';
import { EtiquetteSection } from './components/EtiquetteSection';
import { NutritionWarmupSection } from './components/NutritionWarmupSection';
import { PlanQuizModal } from './components/PlanQuizModal';
import { equipmentList, equipmentCategories } from './data/equipmentData';
import { exerciseList, muscleGroupFilters } from './data/exercisesData';
import { Dumbbell, Activity } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('gym_ios_theme');
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [activeTab, setActiveTab] = useState('alat'); // 'alat', 'gerakan', 'program', 'tracker', 'nutrisi', 'etika'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipCategory, setSelectedEquipCategory] = useState('all');
  const [selectedMuscle, setSelectedMuscle] = useState('Semua Otot');
  const [activeEquipment, setActiveEquipment] = useState(null);
  const [activeExercise, setActiveExercise] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#000000' : '#F2F2F7');
    }
    try {
      localStorage.setItem('gym_ios_theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Filtered Equipment
  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      const matchCategory =
        selectedEquipCategory === 'all' || item.category === selectedEquipCategory;
      const matchSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.indonesianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetMuscleGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetMuscles.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedEquipCategory, searchQuery]);

  // Filtered Exercises
  const filteredExercises = useMemo(() => {
    return exerciseList.filter((item) => {
      const matchMuscle =
        selectedMuscle === 'Semua Otot' || item.muscleGroup === selectedMuscle;
      const matchSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.purpose.toLowerCase().includes(searchQuery.toLowerCase());
      return matchMuscle && matchSearch;
    });
  }, [selectedMuscle, searchQuery]);

  const handlePlanGenerated = (plan) => {
    setActivePlan(plan);
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProgramForTracker = (programSession) => {
    setActivePlan(programSession);
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAppendExerciseToTracker = (exercise) => {
    setActivePlan({
      mode: 'append',
      timestamp: Date.now(),
      exercise
    });
    setActiveTab('tracker');
  };

  const handleQuickSearch = (term) => {
    setSearchQuery(term);
    setActiveTab('alat');
    window.scrollTo({ top: 250, behavior: 'smooth' });
  };

  const showSearchHero = activeTab === 'alat' || activeTab === 'gerakan';

  return (
    <div className="min-h-screen bg-[var(--ios-bg)] text-[var(--ios-label)] flex flex-col pb-24 lg:pb-12 transition-colors duration-200">
      {/* iOS Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenQuiz={() => setIsQuizOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full space-y-8 flex-1">
        {/* Hero Section (Only on Alat & Gerakan tabs so it doesn't clutter Tracker/Calculator) */}
        {showSearchHero && (
          <HeroBanner
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onQuickSearch={handleQuickSearch}
          />
        )}

        {/* SECTION 1: KATALOG ALAT GYM */}
        {activeTab === 'alat' && (
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--ios-label)] tracking-tight flex items-center gap-2">
                  <Dumbbell className="w-6 h-6 text-[var(--ios-tint)]" />
                  Ensiklopedia Alat Gym & Mesin (<span className="font-mono tabular-nums">{filteredEquipment.length}</span>)
                </h2>
                <p className="text-xs sm:text-sm text-[var(--ios-label-secondary)] mt-0.5">
                  Pilih alat untuk melihat cara atur jok, simulasi biomekanika, video, dan alternatif saat gym penuh.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {equipmentCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedEquipCategory(cat.id)}
                    className={`ios-pill min-h-[38px] px-3.5 text-xs whitespace-nowrap ${
                      selectedEquipCategory === cat.id ? 'ios-pill-active' : ''
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Equipment */}
            {filteredEquipment.length === 0 ? (
              <div className="ios-card p-10 text-center space-y-3">
                <p className="text-[var(--ios-label-secondary)] text-sm">
                  Tidak ditemukan alat dengan kata kunci "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedEquipCategory('all');
                  }}
                  className="min-h-[44px] px-5 py-2 rounded-full bg-[var(--ios-fill)] text-[var(--ios-tint)] text-xs font-semibold"
                >
                  Reset Pencarian
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEquipment.map((equipment) => (
                  <EquipmentCard
                    key={equipment.id}
                    equipment={equipment}
                    onOpenDetail={setActiveEquipment}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* SECTION 2: GERAKAN LATIHAN */}
        {activeTab === 'gerakan' && (
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--ios-label)] tracking-tight flex items-center gap-2">
                  <Activity className="w-6 h-6 text-[var(--ios-tint)]" />
                  Katalog Gerakan Berdasarkan Otot (<span className="font-mono tabular-nums">{filteredExercises.length}</span>)
                </h2>
                <p className="text-xs sm:text-sm text-[var(--ios-label-secondary)] mt-0.5">
                  Panduan postur, simulasi gerak, pernapasan (inhale/exhale), dan rekomendasi beban hari pertama.
                </p>
              </div>

              {/* Muscle Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {muscleGroupFilters.map((muscle) => (
                  <button
                    key={muscle}
                    type="button"
                    onClick={() => setSelectedMuscle(muscle)}
                    className={`ios-pill min-h-[38px] px-3.5 text-xs whitespace-nowrap ${
                      selectedMuscle === muscle ? 'ios-pill-active' : ''
                    }`}
                  >
                    {muscle}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Exercises */}
            {filteredExercises.length === 0 ? (
              <div className="ios-card p-10 text-center space-y-3">
                <p className="text-[var(--ios-label-secondary)] text-sm">
                  Tidak ada gerakan yang cocok dengan filter saat ini.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedMuscle('Semua Otot');
                  }}
                  className="min-h-[44px] px-5 py-2 rounded-full bg-[var(--ios-fill)] text-[var(--ios-tint)] text-xs font-semibold"
                >
                  Tampilkan Semua Gerakan
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredExercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onOpenDetail={setActiveExercise}
                    onAddToTracker={handleAppendExerciseToTracker}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* SECTION 3: PROGRAM LATIHAN TERSTRUKTUR */}
        {activeTab === 'program' && (
          <section className="space-y-6">
            <ProgramsSection
              onSelectProgramForTracker={handleSelectProgramForTracker}
              onInspectExercise={setActiveExercise}
            />
          </section>
        )}

        {/* SECTION 4: WORKOUT TRACKER & TIMER */}
        {activeTab === 'tracker' && (
          <section className="space-y-6">
            <WorkoutTracker
              activePlan={activePlan}
              onInspectExercise={setActiveExercise}
            />
          </section>
        )}

        {/* SECTION 5: KALKULATOR NUTRISI, PEMANASAN & KEAMANAN */}
        {activeTab === 'nutrisi' && (
          <section className="space-y-6">
            <NutritionWarmupSection />
          </section>
        )}

        {/* SECTION 6: ETIKA & GLOSARIUM */}
        {activeTab === 'etika' && (
          <section className="space-y-6">
            <EtiquetteSection />
          </section>
        )}
      </main>

      {/* Detail Modals */}
      {activeEquipment && (
        <EquipmentModal
          equipment={activeEquipment}
          onClose={() => setActiveEquipment(null)}
        />
      )}

      {activeExercise && (
        <ExerciseModal
          exercise={activeExercise}
          onClose={() => setActiveExercise(null)}
          onAddToTracker={handleAppendExerciseToTracker}
        />
      )}

      {/* Plan Quiz Modal */}
      <PlanQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onPlanGenerated={handlePlanGenerated}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Footer Info & Disclaimer */}
      <footer className="border-t border-[var(--ios-separator)] bg-[var(--ios-card)] py-6 text-center text-xs text-[var(--ios-label-secondary)]">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="font-semibold text-[var(--ios-label)]">
            GymMulai • Panduan Lengkap Pemula Gym Indonesia (iOS Fitness Edition)
          </p>
          <p className="text-[var(--ios-label-secondary)] max-w-2xl mx-auto">
            Disclaimer: Konten bertujuan sebagai edukasi olahraga pemula. Konsultasikan dengan dokter apabila Anda memiliki kondisi medis khusus atau cedera persendian.
          </p>
        </div>
      </footer>
    </div>
  );
}
