import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, Award, CheckCircle2, ChevronRight, Download, Music, Sparkles, UserCheck } from 'lucide-react';
import './SyllabusPage.css';

interface SyllabusPageProps {
  initialDiscipline?: string | null;
  onNavigateHome: (sectionId?: string) => void;
}

interface SyllabusDetail {
  id: string;
  discipline: string;
  bengaliTitle: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  duration: string;
  certification: string;
  prerequisites: string;
  philosophy: string;
  levels: {
    level: string;
    bengaliLevel: string;
    title: string;
    duration: string;
    focus: string;
    topics: string[];
    outcomes: string[];
  }[];
  auditionRequirements: string[];
  repertoire: string[];
  dailyRegimen: {
    time: string;
    activity: string;
  }[];
}

const syllabiData: SyllabusDetail[] = [
  {
    id: 'vocal',
    discipline: 'Vocal Heritage Syllabus',
    bengaliTitle: 'কণ্ঠ ঐতিহ্য পাঠ্যক্রম',
    category: 'Hindustani Classical Vocal & Rabindrik Parampara',
    tagline: 'Mastering the breath, microtones (Shruti), and emotive depth of North Indian Classical & Bengali art song.',
    description: 'The Vocal Heritage syllabus is an immersion into the primordial acoustic tradition. From the initial resonance of "Sa" in the Mandra Saptak to intricate Khayal compositions and the poetic microtones of Rabindra Sangeet, students inhabit the living continuum of vocal mastery.',
    image: '/assets/gallery/gallery-1.png',
    duration: '4-Year Immersion (8 Semesters)',
    certification: 'Sangit Visharad & Acharya Certification',
    prerequisites: 'Natural pitch sensitivity (Sur-Jnan) & audition qualification',
    philosophy: 'The human voice is the original temple. Before music manifests as melody, it is breath (Prana) and sound vibration (Naad Brahma). We cultivate purity of tone, microtonal discernment across 22 Shrutis, and emotional surrender to the Raga.',
    levels: [
      {
        level: 'Level 1: Prathamik',
        bengaliLevel: 'প্রাথমিক পর্ব',
        title: 'The Alap & Swara Sadhana',
        duration: 'Year 1 (Semesters 1 & 2)',
        focus: 'Breath control (Pranayama), harmonic Sa-Pa grounding, and basic Thāt geometry.',
        topics: [
          'Pranayama for vocalists: diaphragmatic breath extension & lung capacity cultivation',
          'Kharaj Sadhana: deep resonance in the Mandra Saptak (lower octave Sa to Pa)',
          'Shuddh & Komal Swara discrimination: cultivating the ear for pure microtones',
          'Introduction to Bilawal, Kalyan, and Kafi Thāts with systematic Alankars',
          'Rhythmic foundation: Dadra (6 beats), Kaharba (8 beats), and Teental (16 beats)'
        ],
        outcomes: [
          'Unwavering pitch stability on tonic Sa for 30+ seconds',
          'Flawless rendition of foundational Paltas at Vilambit and Drut laya',
          'Primary understanding of the morning prahar raga dynamics'
        ]
      },
      {
        level: 'Level 2: Madhyamik',
        bengaliLevel: 'মাধ্যমিক পর্ব',
        title: 'Raganga Architecture & Prahar Inhabitation',
        duration: 'Year 2 (Semesters 3 & 4)',
        focus: 'Inhabitation of morning and twilight ragas with Akaar, Meend, and Gamak mastery.',
        topics: [
          'Morning Ragas: Bhairav, Todi, and Ahir Bhairav with their spiritual aesthetics',
          'Evening Ragas: Yaman, Bhupali, and Bageshri',
          'The art of Meend (graceful microtonal glide) and Kan-swara (grace notes)',
          'Chhota Khayal in Teental and Ektal: bandish memorization and swara-vistar',
          'Rabindra Sangeet classical roots: Dhrupad and Tappa angas in Tagore compositions'
        ],
        outcomes: [
          'Ability to render 20-minute spontaneous Alap without written notation',
          'Precision in vocal slides across at least 4 contiguous swaras',
          'Accurate execution of Chhota Khayal compositions in 6 fundamental ragas'
        ]
      },
      {
        level: 'Level 3: Kovida',
        bengaliLevel: 'কূবিদ পর্ব',
        title: 'Bada Khayal & Complex Tala Layakari',
        duration: 'Year 3 (Semesters 5 & 6)',
        focus: 'Deep development of Bada Khayal in Vilambit laya, bol-alap, bol-taans, and semi-classical idioms.',
        topics: [
          'Vilambit Ektal & Tilwada: sustaining aesthetic poise at ultra-slow tempos (12-16 BPM)',
          'Layakari permutations: Thah, Dugun, Tigun, Chaugun, and Kuwari transitions',
          'Bol-taan construction: weaving poetic syllables into intricate rhythmic matrices',
          'Thumri & Dadra aesthetics: Purab ang, emotive nuance, and Kaku-bheda (vocal inflection)',
          'Bengali Ragpradhan & Tappa: mastering intricate grain-like musical vibrations (Gitkari)'
        ],
        outcomes: [
          'Full-scale 40-minute concert presentation of a canonical Raga',
          'Mastery over complex Tihais landing with pinpoint precision on the Sam',
          'Authentic interpretation of rare Bengali classical compositions'
        ]
      },
      {
        level: 'Level 4: Visharad / Acharya',
        bengaliLevel: 'বিশারদ ও আচার্য পর্ব',
        title: 'Dynamic Stagecraft & Parampara Transmission',
        duration: 'Year 4 (Semesters 7 & 8)',
        focus: 'Concert artistry, rare Aprachalit Ragas, stage projection, and pedagogical mentorship.',
        topics: [
          'Aprachalit (rare) & Jod (compound) Ragas: Lalit-Gauri, Megh-Malhar, Maru Bihag',
          'Full acoustic concert simulation: accompanying Harmonium, Tanpura, and Tabla',
          'Acoustic physics of vocal projection without reliance on synthetic equalization',
          'Comparative Gharana analysis: Gwalior, Agra, Kirana, and Bishnupur styles',
          'Teaching practicum: mentoring junior disciples under master supervision'
        ],
        outcomes: [
          'Solo public graduation recital (Mancha Pravesh) of 90 minutes before an expert jury',
          'Production of an archival master recording in the Shrutijatak Sanctuary Vault',
          'Conferral of the Sangit Visharad credential'
        ]
      }
    ],
    auditionRequirements: [
      'Singing the 7 basic notes (Sa Re Ga Ma Pa Dha Ni Sa) in ascending/descending order with Tanpura',
      'Demonstration of one classical Bandish or Rabindra Sangeet composition in any Raga',
      'Quick oral repetition of 3 given melodic phrases (Sur-pariksha)',
      'Basic sense of rhythm: identifying the Sam in a 16-beat cycle (Teental)'
    ],
    repertoire: [
      'Bhairav Bandish: "Jago Mohan Pyare" (Vilambit & Drut)',
      'Yaman: "Eri Aali Piya Bina" & "Guru Bin Kaise Gun Gave"',
      'Malkauns: "Pira Na Jani", "Tu Hai Malik Mero"',
      'Rabindra Sangeet: "Anandadhara Bohichhe Bhubane", "Baje Baje Ramya Bina"',
      'Bishnupuri Dhrupad compositions in Chautal'
    ],
    dailyRegimen: [
      { time: '05:30 - 07:00 AM', activity: 'Kharaj Sadhana (Lower octave Sa meditation in darkness)' },
      { time: '07:15 - 08:30 AM', activity: 'Pranayama & Shuddh Swara long-tone holding (Akaar)' },
      { time: '11:00 - 01:00 PM', activity: 'Bandish memorization, Tala clapping & Layakari mathematical drills' },
      { time: '05:30 - 08:00 PM', activity: 'Evening Raga meditation, Tanpura tuning & Guru accompaniment' }
    ]
  },
  {
    id: 'instrumental',
    discipline: 'Instrumental Mastery Syllabus',
    bengaliTitle: 'যন্ত্র সংগীত পাঠ্যক্রম',
    category: 'Esraj, Sitar, Sarod & Stringed Resonance',
    tagline: 'Engineering sympathetic resonance, microtonal fret manipulation, and lightning stroke articulation.',
    description: 'Centering upon Bengal\'s sacred instrument, the Esraj, alongside the classical majesty of the Sitar and Sarod, this syllabus teaches the visitor how wood, animal skin, and steel become an extension of the human consciousness.',
    image: '/assets/gallery/gallery-2.png',
    duration: '4-Year Immersion (8 Semesters)',
    certification: 'Vādhya Visharad & Maestro Diploma',
    prerequisites: 'Basic finger agility, ear for acoustic intervals, and personal commitment to instrument upkeep',
    philosophy: 'An instrument is not an external tool; it is an acoustic resonator for the spirit. We emphasize tactile intimacy: the friction of horsehair upon steel, the tension of jawari, and the sympathetic response of Tarab strings that ring without ever being touched.',
    levels: [
      {
        level: 'Module A: Upakarana & Swara',
        bengaliLevel: 'উপকরণ ও স্বর সাধনা',
        title: 'Harmonic Architecture & Bow/Plectrum Fundamentals',
        duration: 'Year 1 (Semesters 1 & 2)',
        focus: 'Instrument anatomy, string tensioning, jawari calibration, and clean stroke generation.',
        topics: [
          'Anatomy of stringed instruments: Esraj soundbox (Kundi), goatskin membrane, Sarod belly, Sitar tabli',
          'Acoustic physics of the Jawari bridge and sympathetic Tarab strings (tuning 11 to 15 strings)',
          'Esraj: bow hold (Gaj), bow-weight distribution, pressure modulation, and rosin maintenance',
          'Sitar/Sarod: Mizrab/Jawa stroke mechanics (Da, Ra, Dir-Dir, Da-Ra-Da-Ra permutations)',
          'Foundational finger positioning across movable and fixed frets'
        ],
        outcomes: [
          'Ability to tune all main and sympathetic strings within 5 minutes using acoustic pitch forks',
          'Continuous tone production without string scrape or rasping on the bow',
          'Flawless execution of basic Paltas at 80-120 BPM'
        ]
      },
      {
        level: 'Module B: Anga & Meend',
        bengaliLevel: 'অঙ্গ ও মীড় স্থাপত্য',
        title: 'Microtonal Sliding (Meend) & Fretwork Kinetics',
        duration: 'Year 2 (Semesters 3 & 4)',
        focus: 'Developing calloused fingertips for multi-note Meends, Gamaks, Krintan, and Zamzama.',
        topics: [
          'The sacred Meend: pulling strings horizontally or sliding along the brass frets for 3-5 swaras',
          'Khatka, Murki, and Krintan: rapid ornamentation requiring isolated finger independence',
          'Gamak mechanics: heavy pulsating oscillations derived from vocal Dhrupad styles',
          'Gat architecture: Masitkhani Gat (slow dignified tempo) with fixed bols',
          'Esraj vocal imitation (Gayaki Ang): reproducing complex vocal tansen on bowed strings'
        ],
        outcomes: [
          'Executing unbroken 4-swara Meend with zero pitch sagging',
          'Mastery over 4 standard Masitkhani Gats in Yaman, Bhupali, Kafi, and Khamaj',
          'Accurate execution of bow direction changes synchronized with rhythmic accents'
        ]
      },
      {
        level: 'Module C: Tala & Jhala',
        bengaliLevel: 'তাল ও ঝালা গতিবিদ্যা',
        title: 'Razakhani Gat & High-Velocity Jhala Dynamics',
        duration: 'Year 3 (Semesters 5 & 6)',
        focus: 'Accelerating stroke velocity, Chikari rhythms, complex tihais, and dialogue with percussion.',
        topics: [
          'Razakhani Gat: fast tempo compositions with intricate rhythmic stroke patterns',
          'Jhala architecture: rhythmic punctuation on Chikari strings (high-pitch drone chords)',
          'Complex Tihai formulation across asymmetrical tala cycles: Rupak (7 beats), Mattatal (9 beats)',
          'Jugalbandi dynamics: call-and-response Sawal-Jawab with the Tabla maestro',
          'Tagore\'s instrumental overtures: integrating indigenous folk melodies into classical forms'
        ],
        outcomes: [
          'Sustaining clean, resonant Jhala at 240+ BPM for 8 uninterrupted minutes',
          'Spontaneous construction of Chakradhar Tihais that resolve onto the Sam',
          'Interactive rhythmic fluency in concert tempo'
        ]
      },
      {
        level: 'Module D: Mancha & Acharya',
        bengaliLevel: 'মঞ্চ ও আচার্য পূর্ণতা',
        title: 'Monument Concert Repertoire & Sonic Archival',
        duration: 'Year 4 (Semesters 7 & 8)',
        focus: 'Extended Alap-Jod-Jhala suites, rare instrument preservation, and public recital.',
        topics: [
          'The complete 60-minute Alap, Jod, and Jhala progression without rhythmic accompaniment',
          'Micro-jawari adjustments for humid monsoon and dry winter acoustic changes',
          'Archival restoration of historical instruments preserved in the Shrutijatak vault',
          'Stage posture, presence, and psycho-acoustic communication in sacred performance spaces',
          'Pedagogical residency: instruction of first-year disciples'
        ],
        outcomes: [
          'Solo public Mancha Pravesh recital (90 minutes with master accompanists)',
          'Mastery of instrument maintenance and emergency stage repairs (string breakage handling)',
          'Conferral of the Vādhya Visharad diploma'
        ]
      }
    ],
    auditionRequirements: [
      'Basic familiarity with handling the instrument or demonstration of acoustic ear for string pitch',
      'Holding a steady pitch on the main playing string for 20 seconds',
      'Demonstration of finger flexibility and right-hand rhythmic tapping',
      'Personal interview regarding commitment to daily acoustic instrument maintenance'
    ],
    repertoire: [
      'Yaman Masitkhani & Razakhani Gat',
      'Malkauns Alap & Jhala Suite',
      'Bhairavi Thumri rendition on Esraj ("Baju Band Khul Khul Jaye")',
      'Khamaj Dhun & Bengali Baul instrumental interpretations',
      'Tagore\'s "Tumi Kemon Kore Gaan Koro Hey Guni" in classical instrumental adaptation'
    ],
    dailyRegimen: [
      { time: '06:00 - 07:30 AM', activity: 'Acoustic tuning of sympathetic strings, posture meditation, long bow/stroke drills' },
      { time: '08:00 - 09:30 AM', activity: 'Palta drills: 100 repetitions of stroke permutations at variable metronome speeds' },
      { time: '02:00 - 04:00 PM', activity: 'Meend & Gamak physical dexterity; finger muscle recovery and skin conditioning' },
      { time: '06:00 - 08:30 PM', activity: 'Gat exploration, Tabla jugalbandi practice & evening Raga meditation' }
    ]
  },
  {
    id: 'classical',
    discipline: 'Classical Rhythm Syllabus',
    bengaliTitle: 'শাস্ত্রীয় নৃত্য ও তাল পাঠ্যক্রম',
    category: 'Kathak, Odissi & Classical Percussive Geometry',
    tagline: 'Physicalizing the universe through geometric posture (Angika), rhythmic footwork (Tatkar), and sacred expression (Abhinaya).',
    description: 'Classical dance is architecture in motion. This syllabus fuses the mathematical rigor of Kathak footwork and lightning pirouettes (Chakkars) with the sculpturesque lyrical curves (Tribhanga and Chauka) of Odissi and percussive Tala systems.',
    image: '/assets/gallery/gallery-3.png',
    duration: '4-Year Immersion (8 Semesters)',
    certification: 'Nritya Visharad & Master of Sacred Movement',
    prerequisites: 'Physical stamina, body flexibility, rhythm awareness, and medical fitness for rigorous floor impact',
    philosophy: 'The body is a living temple where geometry meets devotion. Every stamp of the foot echoes the heartbeat of the cosmos, every mudra crystallizes an ancient myth, and every turn dissolves the boundary between dancer and deity.',
    levels: [
      {
        level: 'Phase I: Angika & Sthanaka',
        bengaliLevel: 'আঙ্গিক ও স্থানক রূপরেখা',
        title: 'Sacred Posture, Body Geometry & Padabhedas',
        duration: 'Year 1 (Semesters 1 & 2)',
        focus: 'Spine alignment, core stabilization, foundational stances, and basic foot stamping.',
        topics: [
          'Anatomy of classical dance: spine alignment, hip placement, and shock absorption for knees',
          'Kathak fundamental stance: Arambha, Utplavana, and basic Tatkar in Teental (Ta-Thei-Thei-Tat)',
          'Odissi fundamental stances: Chauka (masculine square stance) & Tribhanga (feminine tri-bent curve)',
          'Hastha Mudras: 28 Asamyuta (single hand) and 24 Samyuta (combined hand) sacred gestures',
          'Drishti & Greeva Bheda: eye movements, neck glances, and facial alignment'
        ],
        outcomes: [
          'Sustained holding of Chauka and Tribhanga stances for 3 minutes without posture collapse',
          'Crisp, audible Tatkar foot percussion synchronized with metronomic clapping',
          'Fluid recitation of 52 classical mudras with their Sanskrit nomenclatures'
        ]
      },
      {
        level: 'Phase II: Tatkar & Ghungroo',
        bengaliLevel: 'তৎকার ও ঘুঙুর ধ্বনিবিজ্ঞান',
        title: 'Rhythmic Kinetics, Bols & Chakkar Acceleration',
        duration: 'Year 2 (Semesters 3 & 4)',
        focus: 'Ghungroo (ankle bells) mastery (100 bells per leg), Padant recitation, and multi-spin Chakkars.',
        topics: [
          'Ghungroo acoustics: binding, weight distribution, and producing isolated bell tones',
          'Tatkar progression: Barabar (single speed), Dugun (double), Chaugun (quadruple), and Athgun (octuple)',
          'Padant (oral recitation): vocalizing bols with clear hand gestures before physical execution',
          'Chakkar kinetics: spotting technique, balance conservation, and delivering 5, 9, and 16 spins to a stop',
          'Tukras, Todas, and Parans: classical choreographic units in Teental, Jhaptal, and Dhamar'
        ],
        outcomes: [
          'Executing 16 uninterrupted Chakkars with razor-sharp balance and immediate stillness on the Sam',
          'Flawless recitation and simultaneous dancing of complex Tukras',
          'Ability to modulate Ghungroo volume from thunderous stamping to single-bell whisper'
        ]
      },
      {
        level: 'Phase III: Abhinaya & Rasa',
        bengaliLevel: 'অভিনয় ও রসবোধ',
        title: 'Navarasa Expression & Poetic Interpretation',
        duration: 'Year 3 (Semesters 5 & 6)',
        focus: 'The 9 emotional rasas, narrative storytelling, Thumri abhinaya, and Odissi lyrical choreographies.',
        topics: [
          'The Navarasa framework: Shringara (love), Vira (courage), Karuna (compassion), Raudra (fury), etc.',
          'Thumri Bhav: sitting and standing emotive interpretation of romantic and devotional poetry',
          'Odissi Abhinaya: Jayadeva\'s Gita Govinda Ashtapadis (e.g., "Pashyati Dishi Dishi", "Priye Charushile")',
          'Rabindrik dance drama integration: Chitrangada, Chandalika, and Shyama classical frameworks',
          'Gat-Bhav & Gat-Nikas: depicting mythological archetypes (Radha, Krishna, Shiva, Durga) without words'
        ],
        outcomes: [
          'Delivering a 20-minute emotive solo Abhinaya that evokes palpable rasa in the audience',
          'Nuanced eyebrow, eye, and lip micro-expressions conveying complex emotional states',
          'Command over both Tandava (vigorous) and Lasya (graceful) stylizations'
        ]
      },
      {
        level: 'Phase IV: Mancha Samapan',
        bengaliLevel: 'মঞ্চ সমাপন ও পূর্ণাভিষেক',
        title: 'Complete Repertoire Suite & Sacred Graduation',
        duration: 'Year 4 (Semesters 7 & 8)',
        focus: 'Full-length solo concert presentation (Kathak / Odissi Margam) with live orchestral accompaniment.',
        topics: [
          'Kathak solo concert suite: Vandana, Uthan, Thaat, Aamad, Salami, Toda-Tukra, Tatkar, Tarana',
          'Odissi Margam suite: Mangalacharan, Batu Nritya, Pallavi, Abhinaya, and Moksha',
          'Jugalbandi with live Pakhawaj and Tabla players: impromptu rhythm matching on stage',
          'Stage lighting aesthetics, classical costume drapery, and traditional Mahari/Kathak makeup',
          'Choreographic residency: creating an original ensemble piece for the Shrutijatak Festival'
        ],
        outcomes: [
          'Solo public graduation recital (Mancha Pravesh) of 90 minutes with live musical ensemble',
          'Full mastery of rhythmic improvisation with live percussion',
          'Conferral of the Nritya Visharad title and faculty teaching eligibility'
        ]
      }
    ],
    auditionRequirements: [
      'Basic flexibility screening: floor posture, forward bend, shoulder and hip range of motion',
      'Demonstration of basic rhythm clapping and foot coordination',
      'Brief 2-minute movement demonstration in any classical or contemporary tradition',
      'Physical endurance check: light jump and cardio stamina evaluation'
    ],
    repertoire: [
      'Kathak Shiva Vandana & Kali Stuti',
      'Odissi Batu Nritya (Dedicated to Lord Jagannatha & Batuka Bhairava)',
      'Saanjh-ki-Tarana in Raga Darbari',
      'Gita Govinda Ashtapadi: "Lalita Lavanga Lata"',
      'Tagore\'s "Nrityera Taale Taale" choreographed to pure Kathak tatkar and chakkars'
    ],
    dailyRegimen: [
      { time: '06:00 - 07:30 AM', activity: 'Body conditioning: core strength, yoga asanas, splits, and ankle strengthening' },
      { time: '08:00 - 10:00 AM', activity: 'Ghungroo Tatkar practice: 1000 stamps per foot at varying laya tempos' },
      { time: '03:00 - 05:00 PM', activity: 'Chakkar drills, balance mastery, and Padant recitation drills' },
      { time: '06:00 - 08:30 PM', activity: 'Abhinaya facial expression meditation, Repertoire rehearsal with live musicians' }
    ]
  }
];

const SyllabusPage: React.FC<SyllabusPageProps> = ({ initialDiscipline, onNavigateHome }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(
    initialDiscipline && ['vocal', 'instrumental', 'classical'].includes(initialDiscipline)
      ? initialDiscipline
      : 'all'
  );
  const [activeLevelIndex, setActiveLevelIndex] = useState<Record<string, number>>({
    vocal: 0,
    instrumental: 0,
    classical: 0
  });

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (initialDiscipline && ['vocal', 'instrumental', 'classical'].includes(initialDiscipline)) {
      setSelectedDiscipline(initialDiscipline);
      // If a specific discipline was selected, scroll gently to its card after a brief moment
      setTimeout(() => {
        const el = document.getElementById(`syllabus-${initialDiscipline}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  }, [initialDiscipline]);

  const displayedSyllabi = selectedDiscipline === 'all'
    ? syllabiData
    : syllabiData.filter(s => s.id === selectedDiscipline);

  const handleLevelChange = (disciplineId: string, index: number) => {
    setActiveLevelIndex(prev => ({
      ...prev,
      [disciplineId]: index
    }));
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <div className="syllabus-page-container">
      {/* Top Navigation Bar */}
      <nav className="syllabus-navbar">
        <div className="container syllabus-nav-inner">
          <button 
            onClick={() => onNavigateHome('programs')} 
            className="syllabus-back-btn"
            aria-label="Return to Main Sanctuary"
          >
            <ArrowLeft size={18} />
            <span>Return to Sanctuary</span>
          </button>

          <div className="syllabus-nav-brand" onClick={() => onNavigateHome()}>
            <span className="brand-accent">KOLKATA SHRUTIJATAK</span>
            <span className="brand-sub">Academic Syllabus Vault</span>
          </div>

          <div className="syllabus-nav-actions">
            <button 
              onClick={handlePrintOrDownload} 
              className="syllabus-print-btn"
              title="Print or Save Syllabus PDF"
            >
              <Download size={16} />
              <span className="desktop-only">Save PDF</span>
            </button>
            <button 
              onClick={() => onNavigateHome('contact')} 
              className="btn btn-primary syllabus-apply-btn"
            >
              Apply for Audition
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="syllabus-hero">
        <div className="container text-center">
          <div className="syllabus-badge">
            <Sparkles size={14} className="badge-sparkle" />
            <span>INSTITUTIONAL CURRICULA · 2026–2030</span>
          </div>
          <h1 className="syllabus-hero-title">
            The Architecture of Art <br />
            <span className="bengali-script">শিল্পের স্থাপত্য ও পাঠ্যক্রম</span>
          </h1>
          <p className="syllabus-hero-desc">
            Explore the complete, certified syllabi across our foundational disciplines. 
            Rooted in the eternal Guru-Shishya Parampara, every stage has been engineered to preserve 
            the purity of Bengali classical heritage while cultivating world-class concert mastery.
          </p>

          {/* Discipline Filter Tabs */}
          <div className="discipline-filter-pills" role="tablist">
            <button
              role="tab"
              aria-selected={selectedDiscipline === 'all'}
              className={`filter-pill ${selectedDiscipline === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedDiscipline('all')}
            >
              All Syllabi
            </button>
            <button
              role="tab"
              aria-selected={selectedDiscipline === 'vocal'}
              className={`filter-pill ${selectedDiscipline === 'vocal' ? 'active' : ''}`}
              onClick={() => setSelectedDiscipline('vocal')}
            >
              <Music size={14} />
              Vocal Heritage
            </button>
            <button
              role="tab"
              aria-selected={selectedDiscipline === 'instrumental'}
              className={`filter-pill ${selectedDiscipline === 'instrumental' ? 'active' : ''}`}
              onClick={() => setSelectedDiscipline('instrumental')}
            >
              <Award size={14} />
              Instrumental Mastery
            </button>
            <button
              role="tab"
              aria-selected={selectedDiscipline === 'classical'}
              className={`filter-pill ${selectedDiscipline === 'classical' ? 'active' : ''}`}
              onClick={() => setSelectedDiscipline('classical')}
            >
              <Sparkles size={14} />
              Classical Rhythm
            </button>
          </div>
        </div>
      </header>

      {/* Main Syllabi Content Sections */}
      <main className="syllabus-content container">
        {displayedSyllabi.map((syllabus) => {
          const activeLevel = syllabus.levels[activeLevelIndex[syllabus.id] || 0];

          return (
            <article 
              key={syllabus.id} 
              id={`syllabus-${syllabus.id}`}
              className="discipline-syllabus-card"
            >
              {/* Card Header Banner */}
              <div className="syllabus-card-top">
                <div className="syllabus-visual-col">
                  <div className="syllabus-img-wrapper">
                    <img src={syllabus.image} alt={syllabus.discipline} />
                    <div className="syllabus-img-overlay">
                      <span className="bengali-watermark">{syllabus.bengaliTitle}</span>
                    </div>
                  </div>
                </div>

                <div className="syllabus-meta-col">
                  <div className="discipline-category-tag">{syllabus.category}</div>
                  <h2 className="discipline-title">{syllabus.discipline}</h2>
                  <div className="discipline-bengali-title">{syllabus.bengaliTitle}</div>
                  <p className="discipline-tagline">{syllabus.tagline}</p>

                  <div className="discipline-spec-grid">
                    <div className="spec-item">
                      <Clock size={16} className="spec-icon" />
                      <div>
                        <span className="spec-label">Program Duration</span>
                        <span className="spec-value">{syllabus.duration}</span>
                      </div>
                    </div>

                    <div className="spec-item">
                      <Award size={16} className="spec-icon" />
                      <div>
                        <span className="spec-label">Academic Credential</span>
                        <span className="spec-value">{syllabus.certification}</span>
                      </div>
                    </div>

                    <div className="spec-item">
                      <UserCheck size={16} className="spec-icon" />
                      <div>
                        <span className="spec-label">Prerequisites</span>
                        <span className="spec-value">{syllabus.prerequisites}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Philosophical Pillar */}
              <div className="syllabus-philosophy-quote">
                <div className="quote-mark">“</div>
                <p>{syllabus.philosophy}</p>
                <span className="quote-source">— Academic Council of Kolkata Shrutijatak</span>
              </div>

              {/* Curricular Progression Tabs */}
              <div className="curriculum-progression-section">
                <div className="section-header-compact">
                  <BookOpen size={18} className="compact-icon" />
                  <h3>Curricular Progression (4 Levels / 8 Semesters)</h3>
                </div>

                <div className="level-tabs-strip">
                  {syllabus.levels.map((lvl, idx) => (
                    <button
                      key={lvl.level}
                      className={`level-tab-btn ${activeLevelIndex[syllabus.id] === idx ? 'active' : ''}`}
                      onClick={() => handleLevelChange(syllabus.id, idx)}
                    >
                      <span className="tab-bengali">{lvl.bengaliLevel}</span>
                      <span className="tab-title">{lvl.level}</span>
                    </button>
                  ))}
                </div>

                {/* Active Level Detail Display */}
                <div className="level-detail-card">
                  <div className="level-detail-header">
                    <div>
                      <span className="level-duration-badge">{activeLevel.duration}</span>
                      <h4>{activeLevel.title}</h4>
                      <p className="level-focus-text"><strong>Core Focus:</strong> {activeLevel.focus}</p>
                    </div>
                  </div>

                  <div className="level-breakdown-grid">
                    {/* Topics Covered */}
                    <div className="breakdown-col">
                      <h5>Codified Syllabus Topics</h5>
                      <ul className="syllabus-bullet-list">
                        {activeLevel.topics.map((topic, i) => (
                          <li key={i}>
                            <ChevronRight size={14} className="bullet-arrow" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examination Outcomes */}
                    <div className="breakdown-col outcomes-col">
                      <h5>Milestone Examination Outcomes</h5>
                      <ul className="syllabus-bullet-list outcomes-list">
                        {activeLevel.outcomes.map((outcome, i) => (
                          <li key={i}>
                            <CheckCircle2 size={14} className="bullet-check" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audition & Daily Regimen Two-Column Row */}
              <div className="syllabus-secondary-grid">
                <div className="secondary-box audition-box">
                  <div className="box-title">
                    <UserCheck size={18} />
                    <h4>Audition & Entrance Criteria</h4>
                  </div>
                  <ul className="syllabus-bullet-list">
                    {syllabus.auditionRequirements.map((req, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} className="bullet-check" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-20">
                    <button 
                      onClick={() => onNavigateHome('contact')} 
                      className="btn btn-secondary w-full"
                    >
                      Schedule Entrance Audition
                    </button>
                  </div>
                </div>

                <div className="secondary-box regimen-box">
                  <div className="box-title">
                    <Clock size={18} />
                    <h4>Prescribed Daily Sadhana Regimen</h4>
                  </div>
                  <div className="regimen-schedule">
                    {syllabus.dailyRegimen.map((reg, i) => (
                      <div key={i} className="regimen-row">
                        <span className="regimen-time">{reg.time}</span>
                        <span className="regimen-activity">{reg.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Canonical Repertoire */}
              <div className="syllabus-repertoire-strip">
                <span className="repertoire-label">Representative Archival Repertoire:</span>
                <div className="repertoire-tags">
                  {syllabus.repertoire.map((piece, i) => (
                    <span key={i} className="repertoire-pill">{piece}</span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </main>

      {/* Institutional Call To Action */}
      <section className="syllabus-cta-section">
        <div className="container text-center">
          <span className="eyebrow">ENROLLMENT & INQUIRY</span>
          <h2>Ready to Enter the Parampara?</h2>
          <p>
            Auditions are conducted every solstice and equinox before the Shrutijatak Faculty Board. 
            Begin your formal apprenticeship in Kolkata's living cultural monument.
          </p>
          <div className="syllabus-cta-buttons">
            <button 
              onClick={() => onNavigateHome('contact')} 
              className="btn btn-primary"
            >
              Register for Audition
            </button>
            <button 
              onClick={() => onNavigateHome('programs')} 
              className="btn btn-secondary"
            >
              Explore Sanctuary Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="syllabus-footer">
        <div className="container text-center">
          <p>© {new Date().getFullYear()} Kolkata Shrutijatak Digital Monument. All syllabi certified under Guru-Shishya Parampara.</p>
          <div className="mt-10">
            <button onClick={() => onNavigateHome()} className="btn-tertiary">
              Return to Monument Home →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SyllabusPage;
