import React, { useState, useMemo } from 'react';
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
  const [activeTab, setActiveTab] = useState('alat'); // 'alat', 'gerakan', 'program', 'tracker', 'nutrisi', 'etika'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipCategory, setSelectedEquipCategory] = useState('all');
  const [selectedMuscle, setSelectedMuscle] = useState('Semua Otot');
  const [activeEquipment, setActiveEquipment] = useState(null);
  const [activeExercise, setActiveExercise] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(null);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 pb-20 lg:pb-10">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Container */}
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
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Dumbbell className="w-6 h-6 text-emerald-400" />
                  Ensiklopedia Alat Gym & Mesin ({filteredEquipment.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Klik alat mana saja untuk melihat cara setting jok/beban, simulasi animasi, video, dan alternatif saat gym penuh.
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {equipmentCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedEquipCategory(cat.id)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                      selectedEquipCategory === cat.id
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Equipment */}
            {filteredEquipment.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800">
                <p className="text-slate-300 text-sm">
                  Tidak ditemukan alat dengan kata kunci "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedEquipCategory('all');
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-slate-800 text-emerald-400 text-xs font-bold hover:bg-slate-700"
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
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-emerald-400" />
                  Katalog Gerakan Berdasarkan Otot ({filteredExercises.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Panduan form, simulasi gerak, pernapasan (inhale/exhale), dan rekomendasi beban hari pertama.
                </p>
              </div>

              {/* Muscle Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {muscleGroupFilters.map((muscle) => (
                  <button
                    key={muscle}
                    type="button"
                    onClick={() => setSelectedMuscle(muscle)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                      selectedMuscle === muscle
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {muscle}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Exercises */}
            {filteredExercises.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800">
                <p className="text-slate-300 text-sm">
                  Tidak ada gerakan yang cocok dengan filter saat ini.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedMuscle('Semua Otot');
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-slate-800 text-emerald-400 text-xs font-bold hover:bg-slate-700"
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
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="font-bold text-slate-300">
            GymMulai • Panduan Lengkap Pemula Gym Indonesia (PC & HP)
          </p>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Disclaimer: Konten bertujuan sebagai edukasi olahraga pemula. Konsultasikan dengan dokter apabila Anda memiliki kondisi medis khusus atau cedera persendian.
          </p>
        </div>
      </footer>
    </div>
  );
}
