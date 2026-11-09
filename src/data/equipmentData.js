export const equipmentCategories = [
  { id: 'all', label: 'Semua Alat' },
  { id: 'machine', label: 'Mesin Pin (Selectorized)' },
  { id: 'cable', label: 'Mesin Kabel (Cable)' },
  { id: 'freeweights', label: 'Free Weights (Dumbbell/Barbell)' },
  { id: 'smith', label: 'Smith Machine' },
  { id: 'cardio', label: 'Kardio & Pemanasan' }
];

export const categoryLabelMap = {
  machine: 'Mesin Pin (Selectorized)',
  cable: 'Mesin Kabel',
  freeweights: 'Free Weights',
  smith: 'Smith Machine',
  cardio: 'Kardio & Pemanasan'
};

export const equipmentList = [
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown Machine',
    indonesianName: 'Mesin Tarik Punggung Atas',
    category: 'machine',
    categoryLabel: 'Mesin Pin (Selectorized)',
    difficulty: 'Sangat Mudah (Ramah Pemula)',
    targetMuscles: ['Punggung Sayap (Latissimus Dorsi)', 'Bisep', 'Bahu Belakang'],
    targetMuscleGroup: 'Punggung',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc',
    youtubeSearchQuery: 'Cara pakai Lat Pulldown Machine pemula benar',
    summary: 'Mesin utama untuk melatih punggung agar berbentuk V-taper dan memperbaiki postur tubuh bungkuk.',
    startingWeightGuide: 'Wanita: 10–15 kg | Pria: 20–25 kg (Fokus rasakan tarikan di sayap punggung, bukan lengan).',
    setupGuide: [
      {
        part: '1. Pin Beban (Weight Stack)',
        instruction: 'Pilih beban ringan untuk set pertama (15–20 kg). Jangan mulai dari beban yang membuat badan ikut terangkat.',
        tip: 'Tancapkan pin besi sampai masuk penuh ke lubang plat.'
      },
      {
        part: '2. Ketinggian Bantalan Paha (Thigh Pad)',
        instruction: 'Tarik tuas penyesuai bantalan, atur hingga bantalan menekan paha atas dengan pas saat telapak kaki rata di lantai.',
        tip: 'Paha harus terkunci mantap agar tubuhmu tidak terangkat ke atas saat menarik beban.'
      },
      {
        part: '3. Pemilihan Handle (Pegangan)',
        instruction: 'Gunakan bar panjang (Lat Bar) dengan pegangan sedikit lebih lebar dari bahu.',
        tip: 'Gunakan cengkeraman kuat dan pastikan bahu tidak terangkat ke telinga.'
      }
    ],
    executionSteps: [
      'Berdiri, raih bar dengan lebar sedikit melebihi bahu, lalu duduk dan kunci paha di bawah bantalan.',
      'Condongkan dada sedikit ke atas (sekitar 10–15 derajat) dan busungkan dada.',
      'Tarik bar perlahan ke arah dada bagian atas (di bawah tulang selangka). Bayangkan menarik siku ke arah saku celana.',
      'Tahan kontraksi selama 1 detik di posisi bawah.',
      'Lepaskan bar kembali ke atas secara perlahan (2–3 detik) hingga lengan lurus.',
      'Ulangi 10–12 repetisi per set.'
    ],
    breathing: 'Buang napas (Exhale) saat menarik bar ke dada. Tarik napas (Inhale) saat membiarkan bar naik kembali ke atas.',
    dosAndDonts: {
      dos: [
        'Tarik dengan fokus menggerakkan siku ke bawah, bukan sekadar menekuk bisep.',
        'Kendalikan laju gerakan saat bar naik (jangan biarkan beban membanting).',
        'Busungkan dada dan rilekskan leher.'
      ],
      donts: [
        'JANGAN menarik bar ke belakang leher (berisiko mencederai sendi bahu dan leher).',
        'JANGAN mengayunkan pinggang ke belakang secara berlebihan untuk mencari momentum.',
        'JANGAN mengangkat bokong dari kursi saat menarik.'
      ]
    },
    alternativesIfOccupied: [
      'Seated Cable Row (Mesin Dayung Duduk)',
      'Assisted Pull-Up Machine',
      'Chest-Supported Dumbbell Row'
    ]
  },
  {
    id: 'chest-press-machine',
    name: 'Seated Chest Press Machine',
    indonesianName: 'Mesin Dorong Dada Duduk',
    category: 'machine',
    categoryLabel: 'Mesin Pin (Selectorized)',
    difficulty: 'Sangat Mudah (Ramah Pemula)',
    targetMuscles: ['Dada (Pectoralis Major)', 'Trisep', 'Bahu Depan'],
    targetMuscleGroup: 'Dada',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/xUm0BiZCWlQ',
    youtubeSearchQuery: 'Seated Chest Press Machine tutorial form',
    summary: 'Alternatif paling aman dari Bench Press untuk membentuk otot dada tanpa takut tertimpa besi barbel.',
    startingWeightGuide: 'Wanita: 5–10 kg | Pria: 15–25 kg (Pastikan kedua tangan mendorong seimbang).',
    setupGuide: [
      {
        part: '1. Ketinggian Kursi (Seat Height)',
        instruction: 'Tarik tuas di bawah kursi, atur ketinggian agar pegangan (handle) sejajar dengan garis tengah dada saat duduk.',
        tip: 'Jika handle sejajar dengan leher atau bahu atas, kursi terlalu rendah dan bisa membuat bahu nyeri.'
      },
      {
        part: '2. Sandaran Punggung (Backrest)',
        instruction: 'Pastikan siku tertekuk sekitar 90 derajat saat memegang handle di posisi awal.',
        tip: 'Seluruh punggung dan kepala harus menempel rapat di bantalan.'
      },
      {
        part: '3. Pin Beban (Weight Stack)',
        instruction: 'Pilih beban ringan (10–15 kg) untuk set pemanasan pertama.',
        tip: 'Pastikan pin terkunci sempurna.'
      }
    ],
    executionSteps: [
      'Duduk tegak, tempelkan punggung dan kepala di bantalan sandaran. Kaki menapak kokoh di lantai.',
      'Pegang kedua handle. Buka dada dan rapatkan tulang belikat ke belakang.',
      'Dorong handle ke depan menggunakan otot dada hingga tangan hampir lurus (jangan mengunci mati sendi siku).',
      'Tahan 1 detik di posisi depan sambil meremas otot dada.',
      'Kembalikan handle perlahan (2–3 detik) sampai dada merasakan tarikan ringan.',
      'Ulangi 10–12 repetisi.'
    ],
    breathing: 'Buang napas (Exhale) saat mendorong handle ke depan. Tarik napas (Inhale) saat menarik handle kembali.',
    dosAndDonts: {
      dos: [
        'Jaga siku membentuk sudut sekitar 45–60 derajat dari tubuh (bukan 90 derajat melebar).',
        'Kunci belikat bahu ke belakang dan dada selalu membusung.',
        'Gerakan stabil dengan tempo terkontrol.'
      ],
      donts: [
        'JANGAN mengunci siku (lockout) terlalu keras di akhir dorongan.',
        'JANGAN mengangkat bahu ke arah telinga.',
        'JANGAN melepas beban secara mendadak sampai plat berbenturan keras.'
      ]
    },
    alternativesIfOccupied: [
      'Incline Dumbbell Bench Press',
      'Push-Up (Bisa tumpuan lutut untuk pemula)',
      'Smith Machine Bench Press'
    ]
  },
  {
    id: 'leg-press-machine',
    name: '45-Degree Leg Press Machine',
    indonesianName: 'Mesin Dorong Kaki 45 Derajat',
    category: 'machine',
    categoryLabel: 'Mesin Pin / Plat',
    difficulty: 'Mudah (Wajib Perhatikan Lutut)',
    targetMuscles: ['Paha Depan (Quadriceps)', 'Bokong (Glutes)', 'Paha Belakang (Hamstrings)'],
    targetMuscleGroup: 'Kaki',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
    youtubeSearchQuery: 'How to use Leg Press Machine safely beginner',
    summary: 'Mesin terbaik untuk membangun kekuatan kaki dan bokong tanpa membebani tulang belakang seperti Barbell Squat.',
    startingWeightGuide: 'Wanita: 20–30 kg | Pria: 40–60 kg (Mulai dari sled kosong terlebih dahulu untuk memahami tuas pengaman).',
    setupGuide: [
      {
        part: '1. Sandaran Punggung (Backrest Angle)',
        instruction: 'Atur kemiringan sandaran di sudut 45–60 derajat yang nyaman untuk pinggulmu.',
        tip: 'Pastikan bokong dan pinggang bawah menempel rapat dan tidak terangkat.'
      },
      {
        part: '2. Posisi Kaki di Platform (Foot Placement)',
        instruction: 'Letakkan kedua telapak kaki di tengah platform selebar bahu, jari kaki sedikit mengarah ke luar (15 derajat).',
        tip: 'Kaki agak tinggi di platform lebih melatih bokong (glutes); kaki di tengah fokus paha depan (quads).'
      },
      {
        part: '3. Tuas Pengaman (Safety Handles)',
        instruction: 'Dorong platform sedikit ke atas, lalu putar tuas pengaman di samping tempat duduk ke luar untuk membuka kunci.',
        tip: 'Selalu kunci kembali tuas pengaman sebelum turun dari mesin!'
      }
    ],
    executionSteps: [
      'Duduk rapat di kursi, punggung dan bokong menempel penuh.',
      'Letakkan telapak kaki di platform selebar bahu.',
      'Dorong platform sedikit, lalu buka tuas pengaman samping.',
      'Turunkan platform perlahan dengan menekuk lutut hingga sudut 90 derajat (bokong wajib tetap menempel di jok).',
      'Dorong kembali platform ke atas menggunakan tumit dan seluruh telapak kaki.',
      'PENTING: Sisakan sedikit lekukan pada lutut di posisi atas, JANGAN PERNAH mengunci lurus sendi lutut!',
      'Pasang kembali tuas pengaman setelah repetisi terakhir selesai.'
    ],
    breathing: 'Tarik napas saat menurunkan platform. Buang napas kuat saat mendorong platform ke atas.',
    dosAndDonts: {
      dos: [
        'Selalu dorong menggunakan seluruh telapak kaki dan tumit.',
        'Pastikan lutut bergerak searah dengan arah jari-jari kaki (tidak melipat ke dalam).',
        'Pegang gagang samping kursi untuk menahan pinggul tetap rapat.'
      ],
      donts: [
        'PERINGATAN KERAS: JANGAN PERNAH meluruskan dan mengunci mati lutut di atas karena berisiko cedera fatal!',
        'JANGAN menurunkan beban terlalu dalam sampai pinggang bawah terangkat dari kursi.',
        'JANGAN mendorong lutut dengan telapak tangan.'
      ]
    },
    alternativesIfOccupied: [
      'Goblet Squat dengan Dumbbell',
      'Smith Machine Squat',
      'Seated Leg Extension + Leg Curl'
    ]
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row Machine',
    indonesianName: 'Mesin Dayung Duduk Kabel Rendah',
    category: 'machine',
    categoryLabel: 'Mesin Pin (Selectorized)',
    difficulty: 'Sangat Mudah (Ramah Pemula)',
    targetMuscles: ['Punggung Tengah (Rhomboids)', 'Sayap Punggung (Lats)', 'Bisep'],
    targetMuscleGroup: 'Punggung',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/GZbfZ033f74',
    youtubeSearchQuery: 'Seated Cable Row proper form tutorial',
    summary: 'Latihan favorit untuk membangun ketebalan punggung dan memperbaiki postur bahu yang bungkuk.',
    startingWeightGuide: 'Wanita: 10–15 kg | Pria: 20–25 kg.',
    setupGuide: [
      {
        part: '1. Handle Pegangan (V-Bar / Close Grip)',
        instruction: 'Pasang handle berbentuk segitiga/V pada kaitan kabel bawah.',
        tip: 'Handle V-Bar menjaga pergelangan tangan di posisi netral yang nyaman.'
      },
      {
        part: '2. Pijakan Kaki (Foot Plate)',
        instruction: 'Letakkan kedua kaki di plat pijakan dengan lutut ditekuk sedikit.',
        tip: 'Jangan mengunci lutut lurus kaku saat menarik beban.'
      }
    ],
    executionSteps: [
      'Duduk di bantalan, letakkan kaki di pijakan dengan lutut sedikit ditekuk.',
      'Raih handle dengan punggung lurus, lalu duduk tegak (90 derajat terhadap lantai).',
      'Tarik handle ke arah pusar sambil merapatkan kedua tulang belikat di punggung.',
      'Tahan kontraksi 1 detik saat handle menyentuh perut.',
      'Ulurkan tangan perlahan ke depan (2–3 detik) tanpa membungkukkan pinggang bawah.',
      'Ulangi 10–12 repetisi.'
    ],
    breathing: 'Buang napas saat menarik handle ke arah perut. Tarik napas saat mengulurkan tangan kembali ke depan.',
    dosAndDonts: {
      dos: [
        'Pertahankan tulang punggung tetap lurus dan dada membusung.',
        'Fokus jepit belikat punggung saat handle menyentuh perut.',
        'Jaga lutut tetap sedikit ditekuk.'
      ],
      donts: [
        'JANGAN mengayun badan maju-mundur berlebihan.',
        'JANGAN membungkukkan pinggang bawah saat mengulurkan tangan.',
        'JANGAN menarik ke arah leher (tariklah ke arah pusar/perut atas).'
      ]
    },
    alternativesIfOccupied: [
      'Chest-Supported Dumbbell Row',
      'Lat Pulldown (Close Grip)',
      'Single-Arm Dumbbell Row'
    ]
  },
  {
    id: 'leg-extension-machine',
    name: 'Seated Leg Extension Machine',
    indonesianName: 'Mesin Ayun Paha Depan',
    category: 'machine',
    categoryLabel: 'Mesin Pin (Selectorized)',
    difficulty: 'Sangat Mudah (Ramah Pemula)',
    targetMuscles: ['Paha Depan (Quadriceps)'],
    targetMuscleGroup: 'Kaki',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/YyvSfVjQeL0',
    youtubeSearchQuery: 'Seated Leg Extension machine setup and form',
    summary: 'Mesin isolasi paling praktis untuk mengencangkan dan memperkuat otot paha depan (quadriceps).',
    startingWeightGuide: 'Wanita: 10–15 kg | Pria: 15–25 kg (Gunakan tempo lambat, jangan menghentak).',
    setupGuide: [
      {
        part: '1. Sandaran Punggung (Backrest)',
        instruction: 'Atur sandaran sehingga lipatan belakang lututmu pas menempel di ujung tepi bantalan kursi.',
        tip: 'Lutut harus sejajar lurus dengan titik poros putaran mesin.'
      },
      {
        part: '2. Bantalan Kaki Bawah (Shin Pad)',
        instruction: 'Atur bantalan busa bundar agar berada tepat di atas pergelangan kaki / tulang kering bawah.',
        tip: 'Jangan menaruh bantalan di atas punggung jari kaki.'
      }
    ],
    executionSteps: [
      'Duduk dengan punggung menempel rata pada sandaran dan selipkan kaki di belakang bantalan busa.',
      'Pegang kedua gagang di samping kursi agar pinggul tetap terkunci.',
      'Luruskan kaki ke atas menggunakan kekuatan paha depan hingga sejajar lantai.',
      'Tahan kontraksi di atas selama 1–2 detik (rasakan paha depan mengeras).',
      'Turunkan beban secara perlahan (2–3 detik) kembali ke posisi awal.',
      'Ulangi 12–15 repetisi.'
    ],
    breathing: 'Buang napas saat mengangkat kaki ke atas. Tarik napas saat menurunkan kaki.',
    dosAndDonts: {
      dos: [
        'Kendalikan gerakan saat turun, jangan biarkan kaki terhempas bebas.',
        'Tahan 1 detik di posisi puncak untuk kontraksi maksimal.',
        'Arahkan ujung jari kaki menghadap ke atas (dorsiflexion).'
      ],
      donts: [
        'JANGAN menyentak beban secara mendadak dari posisi bawah.',
        'JANGAN mengangkat bokong dari kursi saat mengangkat beban.'
      ]
    },
    alternativesIfOccupied: [
      '45-Degree Leg Press',
      'Goblet Squat dengan Dumbbell',
      'Step-Up ke Bangku Gym'
    ]
  },
  {
    id: 'leg-curl-machine',
    name: 'Seated / Lying Leg Curl Machine',
    indonesianName: 'Mesin Tekuk Paha Belakang (Hamstring)',
    category: 'machine',
    categoryLabel: 'Mesin Pin (Selectorized)',
    difficulty: 'Sangat Mudah (Ramah Pemula)',
    targetMuscles: ['Paha Belakang (Hamstrings)', 'Betis Atas'],
    targetMuscleGroup: 'Kaki',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/ELOCsoDSmrg',
    youtubeSearchQuery: 'Seated Leg Curl machine tutorial form',
    summary: 'Melatih otot paha belakang (hamstring) untuk menyeimbangkan kekuatan lutut dan mencegah cedera kaki.',
    startingWeightGuide: 'Wanita: 10–15 kg | Pria: 15–25 kg.',
    setupGuide: [
      {
        part: '1. Poros Lutut & Sandaran',
        instruction: 'Atur sandaran kursi (untuk Seated) atau posisi berbaring (untuk Lying) agar sendi lutut sejajar dengan titik putar mesin.',
        tip: 'Bantalan rol belakang harus pas berada di bagian belakang pergelangan kaki (di atas tumit).'
      },
      {
        part: '2. Bantalan Pengunci Paha',
        instruction: 'Untuk Seated Leg Curl, turunkan bantalan pengunci di atas paha depan agar kaki tidak terangkat.',
        tip: 'Kunci dengan rapat namun tetap nyaman.'
      }
    ],
    executionSteps: [
      'Posisikan tumit di atas bantalan rol pengungkit.',
      'Tekuk lutut dan tarik bantalan rol ke bawah/belakang sejauh mungkin menggunakan otot paha belakang.',
      'Tahan kontraksi selama 1 detik di posisi tertekuk penuh.',
      'Kembalikan kaki ke posisi lurus secara perlahan (2–3 detik) dengan kendali penuh.',
      'Ulangi 12–15 repetisi.'
    ],
    breathing: 'Buang napas saat menekuk kaki menarik beban. Tarik napas saat meluruskan kaki kembali.',
    dosAndDonts: {
      dos: [
        'Jaga pinggul dan punggung tetap menempel di bantalan.',
        'Rasakan tarikan dan kontraksi penuh di paha bagian belakang.',
        'Gunakan tempo lambat saat mengembalikan beban.'
      ],
      donts: [
        'JANGAN mengangkat pinggul saat beban terasa berat.',
        'JANGAN membiarkan kaki kembali dengan cepat karena sentakan kabel.'
      ]
    },
    alternativesIfOccupied: [
      'Dumbbell Romanian Deadlift (RDL)',
      'Glute Bridge di Matras',
      '45-Degree Leg Press (Posisi kaki tinggi di platform)'
    ]
  },
  {
    id: 'pec-deck-machine',
    name: 'Pec Deck / Rear Delt Fly Machine',
    indonesianName: 'Mesin Peluk Dada & Bahu Belakang (Pec Fly)',
    category: 'machine',
    categoryLabel: 'Mesin Pin (Selectorized)',
    difficulty: 'Sangat Mudah (Ramah Pemula)',
    targetMuscles: ['Dada Tengah (Pectoralis)', 'Bahu Belakang (jika menghadap mesin)'],
    targetMuscleGroup: 'Dada',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/eGjt4lk6g34',
    youtubeSearchQuery: 'Pec Deck Fly machine proper form',
    summary: 'Mesin dua fungsi: duduk menghadap luar untuk meremas otot dada, atau duduk menghadap mesin untuk melatih bahu belakang.',
    startingWeightGuide: 'Wanita: 5–10 kg | Pria: 15–20 kg.',
    setupGuide: [
      {
        part: '1. Ketinggian Jok Kursi (Seat Height)',
        instruction: 'Atur jok agar saat memegang handle, posisi tangan berada sejajar dengan dada tengah.',
        tip: 'Siku ditekuk sedikit (soft bend) dan jangan melebihi tinggi bahu.'
      },
      {
        part: '2. Rentang Tuas Atas (Lever Arm Pin)',
        instruction: 'Atur bukaan lengan tuas ke angka 2 atau 3 agar tidak terlalu jauh menarik sendi bahu ke belakang.',
        tip: 'Untuk fungsi Rear Delt (Bahu Belakang), pindahkan pin tuas ke posisi paling depan dan duduk menghadap sandaran.'
      }
    ],
    executionSteps: [
      'Duduk menempel di sandaran, buka dada, dan kaki menapak di lantai.',
      'Pegang kedua handle dengan siku sedikit ditekuk.',
      'Tarik kedua handle ke depan hingga saling bertemu di depan dada seperti sedang memeluk pohon besar.',
      'Remas otot dada selama 1–2 detik di posisi depan.',
      'Buka kembali lengan perlahan ke samping hingga dada merasakan regangan yang nyaman.',
      'Ulangi 12–15 repetisi.'
    ],
    breathing: 'Buang napas saat merapatkan kedua tangan ke depan. Tarik napas saat membuka tangan ke samping.',
    dosAndDonts: {
      dos: [
        'Pertahankan sedikit lekukan pada siku sepanjang gerakan.',
        'Busungkan dada dan kunci pundak ke bawah.',
        'Fokus pada rasa remasan di dada tengah.'
      ],
      donts: [
        'JANGAN membuka tangan terlalu jauh ke belakang hingga sendi bahu depan terasa nyeri.',
        'JANGAN membenturkan beban saat kembali membuka.'
      ]
    },
    alternativesIfOccupied: [
      'Cable Chest Fly',
      'Dumbbell Flat Fly',
      'Seated Chest Press Machine'
    ]
  },
  {
    id: 'cable-crossover-machine',
    name: 'Cable Machine / Functional Trainer',
    indonesianName: 'Mesin Kabel Serbaguna',
    category: 'cable',
    categoryLabel: 'Mesin Kabel',
    difficulty: 'Mudah s.d Menengah',
    targetMuscles: ['Trisep', 'Bisep', 'Bahu', 'Dada', 'Core'],
    targetMuscleGroup: 'Lengan',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/2-LAMcpzODU',
    youtubeSearchQuery: 'Cable Rope Tricep Pushdown tutorial',
    summary: 'Mesin kabel dengan katrol naik-turun untuk melatih lengan (trisep/bisep), bahu, dada, dan punggung dengan tegangan konstan.',
    startingWeightGuide: 'Wanita: 5–7.5 kg | Pria: 10–15 kg.',
    setupGuide: [
      {
        part: '1. Ketinggian Katrol (Pulley Slider)',
        instruction: 'Tarik pin bulat di tiang rel kabel, geser katrol ke atas (untuk Tricep Pushdown / Face Pull) atau ke bawah (untuk Bicep Curl / Lateral Raise).',
        tip: 'Pastikan pin terpasang kembali dengan bunyi "klik" sebelum menarik beban.'
      },
      {
        part: '2. Memasang Aksesori (Carabiner)',
        instruction: 'Buka pengait besi (carabiner), pasang tali tambang (Rope), batang lurus (Straight Bar), atau pegangan tunggal (D-Handle).',
        tip: 'Pastikan pengait tertutup rapat.'
      }
    ],
    executionSteps: [
      'Contoh Tricep Pushdown: Pasang tali tambang (Rope) di katrol paling atas.',
      'Pegang kedua ujung tali, condongkan badan sedikit ke depan, dan kunci siku di samping pinggang.',
      'Dorong tali ke bawah hingga lengan lurus dan buka ujung tali ke samping luar di bagian bawah.',
      'Tahan 1 detik untuk memeras otot trisep.',
      'Biarkan lengan bawah naik kembali perlahan hingga siku membentuk sudut 90 derajat (siku tetap diam).',
      'Ulangi 12–15 repetisi.'
    ],
    breathing: 'Buang napas saat mendorong tali ke bawah. Tarik napas saat mengembalikan tali ke posisi semula.',
    dosAndDonts: {
      dos: [
        'Kunci posisi siku tetap di samping rusuk seperti engsel pintu.',
        'Buka ujung tali di bawah untuk kontraksi maksimal.',
        'Gerakan halus tanpa menghentak beban.'
      ],
      donts: [
        'JANGAN biarkan siku mengayun maju-mundur.',
        'JANGAN menindih kabel dengan berat badan.'
      ]
    },
    alternativesIfOccupied: [
      'Dumbbell Overhead Tricep Extension',
      'Assisted Dip Machine',
      'Dumbbell Bicep Curl'
    ]
  },
  {
    id: 'dumbbells-set',
    name: 'Dumbbells & Adjustable Bench',
    indonesianName: 'Dumbbell (Barbel Tangan) & Bangku Gym',
    category: 'freeweights',
    categoryLabel: 'Free Weights',
    difficulty: 'Mudah s.d Menengah',
    targetMuscles: ['Dada', 'Bahu', 'Bisep', 'Trisep', 'Punggung', 'Kaki'],
    targetMuscleGroup: 'Bahu',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/VmB1G1K7v94',
    youtubeSearchQuery: 'How to use adjustable gym bench and dumbbells beginner',
    summary: 'Alat paling fleksibel di gym untuk melatih keseimbangan otot kanan dan kiri agar simetris.',
    startingWeightGuide: 'Wanita: 2–4 kg per tangan | Pria: 5–8 kg per tangan.',
    setupGuide: [
      {
        part: '1. Pemilihan Berat Dumbbell',
        instruction: 'Pilih beban yang bisa kamu angkat 10–12 kali dengan gerakan rapi tanpa goyang.',
        tip: 'Ingat aturan emas: Teknik gerakan selalu lebih penting daripada angka di dumbbell.'
      },
      {
        part: '2. Mengatur Sudut Bangku (Adjustable Bench)',
        instruction: 'Tarik pin bangku untuk mengatur kemiringan: Flat (0° untuk dada tengah), Incline (30° untuk dada atas), atau Tegak (80–90° untuk Shoulder Press).',
        tip: 'Goyangkan sedikit sandaran bangku untuk memastikan pin pengunci sudah masuk penuh.'
      },
      {
        part: '3. Cara Aman Mengambil & Menaruh Dumbbell',
        instruction: 'Tekuk lutut (posisi squat) saat mengambil dumbbell dari rak bawah, jangan membungkukkan pinggang!',
        tip: 'Setelah selesai mengambil dumbbell, mundur 2 langkah dari rak agar tidak menghalangi orang lain.'
      }
    ],
    executionSteps: [
      'Duduk di bangku dengan kedua dumbbell diletakkan di atas paha.',
      'Untuk berbaring (Press): Angkat lutut satu per satu untuk membantu mendorong dumbbell ke posisi samping dada sambil merebahkan punggung.',
      'Dorong dumbbell ke atas secara terkontrol tanpa membenturkan kedua ujung besi di puncak.',
      'Turunkan perlahan dalam 2–3 detik kembali ke posisi awal.',
      'Setelah selesai set, naikkan lutut untuk menerima dumbbell kembali ke paha lalu berdiri.'
    ],
    breathing: 'Buang napas saat mendorong/mengangkat beban. Tarik napas saat menurunkan beban.',
    dosAndDonts: {
      dos: [
        'Gunakan rentang gerak penuh yang nyaman bagi sendi.',
        'Gerakkan tangan kiri dan kanan secara serempak.',
        'Wajib kembalikan dumbbell ke nomor rak aslinya setelah selesai!'
      ],
      donts: [
        'JANGAN membenturkan kedua dumbbell di udara.',
        'JANGAN menjatuhkan/melempar dumbbell ke lantai.',
        'JANGAN berdiri tepat menempel di depan rak dumbbell saat latihan.'
      ]
    },
    alternativesIfOccupied: [
      'Seated Chest / Shoulder Press Machine',
      'Cable Machine dengan Single D-Handle',
      'Smith Machine'
    ]
  },
  {
    id: 'smith-machine',
    name: 'Smith Machine',
    indonesianName: 'Mesin Barbel Berel Pengaman',
    category: 'smith',
    categoryLabel: 'Smith Machine',
    difficulty: 'Menengah (Wajib Paham Kait Pengaman)',
    targetMuscles: ['Kaki & Bokong (Squat)', 'Dada (Press)', 'Betis (Calf Raise)'],
    targetMuscleGroup: 'Kaki',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/nFAscOzjJvQ',
    youtubeSearchQuery: 'How to use Smith Machine safely beginner',
    summary: 'Barbel yang bergerak stabil pada rel besi vertikal, dilengkapi kait pengaman yang bisa dikunci kapan saja dengan memutar pergelangan tangan.',
    startingWeightGuide: 'Mulai dengan barbel kosong tanpa tambahan plat (bobot bar bawaan sekitar 10–15 kg).',
    setupGuide: [
      {
        part: '1. Pengait Pengaman Bawah (Safety Stopper)',
        instruction: 'Wajib pasang penahan besi darurat di kedua tiang rel setinggi batas bawah gerakanmu sebelum mulai.',
        tip: 'Stopper ini menjamin barbel tidak akan pernah bisa menindih tubuhmu.'
      },
      {
        part: '2. Cara Membuka & Mengunci Kait Barbel',
        instruction: 'Dorong barbel sedikit ke atas, putar pergelangan tangan untuk melepas kait dari tiang. Untuk mengunci, putar kembali pergelangan tangan hingga kait masuk ke lubang rel.',
        tip: 'Coba buka-kunci barbel kosong 3 kali sebelum memasang beban.'
      }
    ],
    executionSteps: [
      'Atur tinggi barbel setinggi dada atas.',
      'Masuk ke bawah barbel, letakkan bar di atas otot bahu belakang/trapezius (bukan di tulang leher).',
      'Angkat barbel untuk melepas kait, langkahkan kaki sedikit ke depan (sekitar 15 cm di depan garis bar).',
      'Turunkan pinggul seperti duduk di kursi hingga paha sejajar lantai.',
      'Dorong kembali ke atas melalui tumit, lalu putar pergelangan tangan untuk mengunci kait barbel.'
    ],
    breathing: 'Tarik napas dan kunci perut saat turun. Buang napas saat mendorong naik ke atas.',
    dosAndDonts: {
      dos: [
        'Selalu pasang safety stopper di kiri dan kanan tiang.',
        'Jaga punggung tetap lurus dan pandangan ke depan.',
        'Pastikan beban plat di kanan dan kiri seimbang.'
      ],
      donts: [
        'JANGAN menaruh barbel tepat di tulang leher yang menonjol.',
        'JANGAN lupa mengunci kait sebelum melepaskan pegangan tangan.'
      ]
    },
    alternativesIfOccupied: [
      '45-Degree Leg Press Machine',
      'Goblet Squat dengan Dumbbell',
      'Chest Press Machine'
    ]
  },
  {
    id: 'assisted-dip-pullup',
    name: 'Assisted Pull-Up & Dip Machine',
    indonesianName: 'Mesin Bantu Pull-Up & Dip (Beban Penolong)',
    category: 'machine',
    categoryLabel: 'Mesin Pin (Selectorized)',
    difficulty: 'Mudah (Unik: Makin Berat Pin = Makin Ringan!)',
    targetMuscles: ['Punggung Sayap (Lats)', 'Dada Bawah', 'Trisep', 'Bisep'],
    targetMuscleGroup: 'Punggung',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/wFj808u224E',
    youtubeSearchQuery: 'How to use Assisted Pull up machine beginner',
    summary: 'Mesin ajaib yang memungkinkan pemula melakukan Pull-Up dan Tricep Dip dengan bantalan lutut yang membantu mengangkat berat badanmu.',
    startingWeightGuide: 'PENTING: Pilih beban sekitar 60–70% dari berat badanmu! (Misal beratmu 70 kg, pasang pin di 45 kg).',
    setupGuide: [
      {
        part: '1. Aturan Unik Pin Beban (Counterweight)',
        instruction: 'Berbeda dari semua mesin lain di gym: Di mesin ini, SEMAKIN BESAR angka beban yang kamu pilih, SEMAKIN RINGAN gerakanmu karena mesin membantu mendorong lututmu ke atas!',
        tip: 'Jika berat badanmu 60 kg dan kamu memilih pin 40 kg, berarti kamu hanya mengangkat 20 kg.'
      },
      {
        part: '2. Bantalan Lutut (Knee Platform)',
        instruction: 'Lipat keluar bantalan lutut. Naik ke pijakan kaki, pegang handle atas, lalu letakkan satu per satu lututmu di atas bantalan.',
        tip: 'Saat selesai, turunkan satu kaki ke pijakan besi terlebih dahulu sambil menahan bantalan naik perlahan.'
      }
    ],
    executionSteps: [
      'Pasang pin di beban cukup berat (misal 40–50 kg untuk percobaan pertama).',
      'Naik ke pijakan, pegang handle Pull-Up di atas, lalu taruh kedua lutut di bantalan.',
      'Biarkan tubuh turun perlahan hingga tangan lurus.',
      'Tarik tubuh ke atas hingga dagu sejajar dengan tangan.',
      'Turunkan kembali secara terkontrol (2–3 detik).',
      'Setelah selesai, injak pijakan samping sebelum mengangkat lutut dari bantalan.'
    ],
    breathing: 'Buang napas saat menarik badan ke atas. Tarik napas saat turun perlahan.',
    dosAndDonts: {
      dos: [
        'Mulai dengan angka bantuan beban yang besar agar gerakan terasa ringan dan terkontrol.',
        'Turun dari bantalan lutut satu kaki demi satu kaki agar bantalan tidak melontar keras ke atas.'
      ],
      donts: [
        'JANGAN memilih pin 5–10 kg di percobaan pertama (itu hampir sama dengan pull-up murni tanpa bantuan!).',
        'JANGAN melompat turun mendadak saat bantalan lutut masih di posisi bawah.'
      ]
    },
    alternativesIfOccupied: [
      'Lat Pulldown Machine',
      'Cable Rope Tricep Pushdown'
    ]
  },
  {
    id: 'treadmill-cardio',
    name: 'Treadmill & Cardio Zone (Sepeda / Elliptical)',
    indonesianName: 'Treadmill & Alat Kardio Pemanasan',
    category: 'cardio',
    categoryLabel: 'Kardio & Pemanasan',
    difficulty: 'Sangat Mudah (Ramah Pemula)',
    targetMuscles: ['Jantung & Paru-Paru (Kardiovaskular)', 'Kaki & Betis'],
    targetMuscleGroup: 'Kaki',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/8i3VqdIk-2E',
    youtubeSearchQuery: 'How to use gym treadmill safely incline walk',
    summary: 'Digunakan 5–10 menit sebelum latihan beban untuk pemanasan suhu tubuh, atau 15–20 menit jalan menanjak (Incline Walk) setelah angkat beban untuk membakar lemak.',
    startingWeightGuide: 'Kecepatan Pemanasan: 4.0–5.0 km/jam | Incline Fat Loss: Tanjakan 8–12%, Kecepatan 4.2–4.8 km/jam.',
    setupGuide: [
      {
        part: '1. Klip Darurat Merah (Safety Clip)',
        instruction: 'Jepitkan klip tali merah ke bajumu. Jika terpeleset, magnet akan tercabut dan mesin berhenti otomatis.',
        tip: 'Selalu berdiri di pinggiran pijakan kanan-kiri terlebih dahulu sebelum menekan tombol Start.'
      },
      {
        part: '2. Tombol Quick Start, Speed & Incline',
        instruction: 'Tekan "Quick Start", tunggu karpet berjalan pelan (1–2 km/jam), lalu melangkah ke karpet dan naikkan Speed secara bertahap.',
        tip: 'Tombol kanan biasanya mengatur Kecepatan (Speed), tombol kiri mengatur Kemiringan Tanjakan (Incline).'
      }
    ],
    executionSteps: [
      'Berdiri di rel samping, tekan Start, lalu melangkah ke atas karpet saat mulai bergerak pelan.',
      'Atur kecepatan jalan santai 4.5 km/jam selama 5 menit untuk pemanasan.',
      'Pandangan lurus ke depan dan ayunkan lengan secara alami.',
      'Saat ingin berhenti, tekan tombol Stop atau turunkan Speed ke 0 terlebih dahulu. Tunggu karpet berhenti total sebelum turun.'
    ],
    breathing: 'Bernapas teratur berirama melalui hidung dan mulut.',
    dosAndDonts: {
      dos: [
        'Gunakan sepatu olahraga bertali erat.',
        'Tunggu karpet benar-benar berhenti sebelum melangkah turun.'
      ],
      donts: [
        'JANGAN melompat turun atau naik saat karpet sedang berputar kencang.',
        'JANGAN bergelantungan menumpukan seluruh badan di layar monitor treadmill.'
      ]
    },
    alternativesIfOccupied: [
      'Stationary Bike (Sepeda Statis)',
      'Elliptical Cross Trainer (Sangat ramah untuk lutut)',
      'Rowing Machine (Alat Dayung Kardio)'
    ]
  }
];
