export const workoutPrograms = [
  {
    id: 'full-body-3days',
    title: 'Full Body 3 Hari (Program Emas Pemula)',
    subtitle: 'Rekomendasi Terbaik untuk 4–8 Minggu Pertama di Gym',
    durationWeeks: '8 Minggu',
    frequency: '3 Hari / Minggu (Senin - Rabu - Jumat)',
    badge: 'Paling Populer',
    level: 'Pemula',
    description: 'Program paling efisien untuk pemula karena melatih seluruh otot tubuh 3 kali seminggu, memicu adaptasi saraf dan pembentukan otot secara maksimal tanpa membuat tubuh terlalu pegal berlebihan.',
    days: [
      {
        dayName: 'Sesi A (Senin / Hari 1)',
        target: 'Seluruh Tubuh Fokus Dorong & Kaki',
        exercises: [
          { name: 'Chest Press Machine', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Dada' },
          { name: 'Lat Pulldown Machine', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Punggung' },
          { name: '45-Degree Leg Press', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Kaki' },
          { name: 'Seated Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Bahu' },
          { name: 'Cable Rope Tricep Pushdown', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Lengan' },
          { name: 'Forearm Plank', sets: 3, reps: '30-45 detik', rest: '60s', restSeconds: 60, muscle: 'Perut & Core' }
        ]
      },
      {
        dayName: 'Sesi B (Rabu / Hari 2)',
        target: 'Seluruh Tubuh Fokus Tarik & Kaki',
        exercises: [
          { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Punggung' },
          { name: 'Incline Dumbbell Bench Press', sets: 3, reps: '8-10', rest: '90s', restSeconds: 90, muscle: 'Dada' },
          { name: 'Seated Leg Extension', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Kaki' },
          { name: 'Leg Curl Machine', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Kaki' },
          { name: 'Dumbbell / Cable Lateral Raise', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Bahu' },
          { name: 'Seated Incline Dumbbell Bicep Curl', sets: 3, reps: '10-12', rest: '60s', restSeconds: 60, muscle: 'Lengan' }
        ]
      },
      {
        dayName: 'Sesi C (Jumat / Hari 3)',
        target: 'Seluruh Tubuh Komplit Penguatan',
        exercises: [
          { name: '45-Degree Leg Press', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Kaki' },
          { name: 'Lat Pulldown Machine', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Punggung' },
          { name: 'Pec Deck Machine Fly', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Dada' },
          { name: 'Cable Face Pull (Penguat Postur & Bahu)', sets: 3, reps: '15', rest: '60s', restSeconds: 60, muscle: 'Bahu' },
          { name: 'Cable Rope Tricep Pushdown', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Lengan' },
          { name: 'Treadmill Incline Walk', sets: 1, reps: '15 menit', rest: '30s', restSeconds: 30, muscle: 'Kardio' }
        ]
      }
    ]
  },
  {
    id: 'machine-only-starter',
    title: 'Mesin Saja (Bebas Cemas / Zero Anxiety)',
    subtitle: '100% Mesin Pin - Aman Tanpa Takut Salah Gerak',
    durationWeeks: '4 Minggu',
    frequency: '3 Hari / Minggu',
    badge: 'Paling Aman',
    level: 'Pemula Banget (Hari Pertama di Gym)',
    description: 'Khusus untuk kamu yang baru pertama kali masuk gym dan merasa canggung, takut salah posisi, atau khawatir cedera. Mesin memiliki jalur gerak yang sudah terkunci sehingga kamu bisa fokus melatih otot dengan aman dan percaya diri.',
    days: [
      {
        dayName: 'Hari 1 (Upper Body Mesin)',
        target: 'Dada, Punggung, Bahu & Lengan',
        exercises: [
          { name: 'Chest Press Machine', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Dada' },
          { name: 'Lat Pulldown Machine', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Punggung' },
          { name: 'Pec Deck Machine Fly', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Dada' },
          { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Punggung' },
          { name: 'Cable Rope Tricep Pushdown', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Lengan' }
        ]
      },
      {
        dayName: 'Hari 2 (Lower Body & Kardio Mesin)',
        target: 'Paha Depan, Belakang & Kardio',
        exercises: [
          { name: '45-Degree Leg Press', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Kaki' },
          { name: 'Seated Leg Extension', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Kaki' },
          { name: 'Leg Curl Machine', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Kaki' },
          { name: 'Standing Calf Raise', sets: 3, reps: '15', rest: '60s', restSeconds: 60, muscle: 'Kaki' },
          { name: 'Treadmill Incline Walk', sets: 1, reps: '15-20 menit', rest: '30s', restSeconds: 30, muscle: 'Kardio' }
        ]
      },
      {
        dayName: 'Hari 3 (Full Body Mesin Lengkap)',
        target: 'Penggabungan Seluruh Mesin Favorit',
        exercises: [
          { name: 'Chest Press Machine', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Dada' },
          { name: 'Lat Pulldown Machine', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Punggung' },
          { name: '45-Degree Leg Press', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Kaki' },
          { name: 'Cable Face Pull (Penguat Postur & Bahu)', sets: 3, reps: '15', rest: '60s', restSeconds: 60, muscle: 'Bahu' },
          { name: 'Forearm Plank', sets: 3, reps: '30-45 detik', rest: '60s', restSeconds: 60, muscle: 'Perut & Core' }
        ]
      }
    ]
  },
  {
    id: 'upper-lower-4days',
    title: 'Upper / Lower 4 Hari Seminggu',
    subtitle: 'Untuk yang Memiliki Waktu Latihan 4 Hari',
    durationWeeks: '8–12 Minggu',
    frequency: '4 Hari / Minggu (Senin, Selasa, Kamis, Jumat)',
    badge: 'Progres Cepat',
    level: 'Pemula Lanjutan',
    description: 'Pilihan ideal jika kamu ingin jadwal yang terbagi rapi antara tubuh bagian atas (Upper) dan tubuh bagian bawah (Lower). Setiap bagian otot mendapat waktu istirahat yang cukup untuk regenerasi maksimal.',
    days: [
      {
        dayName: 'Hari 1 - Upper Body (A)',
        target: 'Dada, Punggung, Bahu, Lengan',
        exercises: [
          { name: 'Chest Press Machine', sets: 3, reps: '8-10', rest: '90s', restSeconds: 90, muscle: 'Dada' },
          { name: 'Lat Pulldown Machine', sets: 3, reps: '8-10', rest: '90s', restSeconds: 90, muscle: 'Punggung' },
          { name: 'Incline Dumbbell Bench Press', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Dada' },
          { name: 'Seated Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Bahu' },
          { name: 'Cable Rope Tricep Pushdown', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Lengan' }
        ]
      },
      {
        dayName: 'Hari 2 - Lower Body (A)',
        target: 'Paha Depan, Belakang, Betis, Core',
        exercises: [
          { name: '45-Degree Leg Press', sets: 4, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Kaki' },
          { name: 'Seated Leg Extension', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Kaki' },
          { name: 'Dumbbell Romanian Deadlift', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Kaki' },
          { name: 'Standing Calf Raise', sets: 3, reps: '15', rest: '60s', restSeconds: 60, muscle: 'Kaki' },
          { name: 'Forearm Plank', sets: 3, reps: '45 detik', rest: '60s', restSeconds: 60, muscle: 'Perut & Core' }
        ]
      },
      {
        dayName: 'Hari 3 - Upper Body (B)',
        target: 'Fokus Punggung, Bahu Samping & Bisep',
        exercises: [
          { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '90s', restSeconds: 90, muscle: 'Punggung' },
          { name: 'Pec Deck Machine Fly', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Dada' },
          { name: 'Dumbbell / Cable Lateral Raise', sets: 4, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Bahu' },
          { name: 'Cable Face Pull (Penguat Postur & Bahu)', sets: 3, reps: '15', rest: '60s', restSeconds: 60, muscle: 'Bahu' },
          { name: 'Seated Incline Dumbbell Bicep Curl', sets: 3, reps: '10-12', rest: '60s', restSeconds: 60, muscle: 'Lengan' }
        ]
      },
      {
        dayName: 'Hari 4 - Lower Body (B)',
        target: 'Penguatan Kaki, Hamstring & Kardio',
        exercises: [
          { name: 'Smith Machine Squat (atau Goblet Squat)', sets: 3, reps: '8-10', rest: '90s', restSeconds: 90, muscle: 'Kaki' },
          { name: 'Leg Curl Machine', sets: 3, reps: '12-15', rest: '60s', restSeconds: 60, muscle: 'Kaki' },
          { name: 'Seated Leg Extension', sets: 3, reps: '15', rest: '60s', restSeconds: 60, muscle: 'Kaki' },
          { name: 'Treadmill Incline Walk', sets: 1, reps: '20 menit', rest: '30s', restSeconds: 30, muscle: 'Kardio' }
        ]
      }
    ]
  }
];
