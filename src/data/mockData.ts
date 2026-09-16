import type {
  PatientProfile,
  WeekMilestoneData,
  VitalsRecord,
  KickRecord,
  ContractionRecord,
  ClinicianPatientSummary,
  MarketplaceItem,
  BirthPlanItem,
  HospitalBagItem,
  CommunityPost
} from '../types';

export const initialPatient: PatientProfile = {
  id: 'pat-10492',
  name: ' Mitchell',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
  age: 31,
  gestationalWeek: 28,
  gestationalDay: 3,
  dueDate: '2026-06-18',
  conceptionDate: '2025-09-11',
  stage: 'trimester-3',
  babyNameOrNickname: 'Baby Theo (Little Bean)',
  babyGender: 'boy',
  assignedObgyn: 'Dr. Santosh Pandipati, MD (MFM)',
  assignedDoula: 'Elena Vance, CD (Ruth Health Network)',
  clinicName: 'Caduceus Maternal Care Center',
  medicalGroup: 'Caduceus Medical Group - Irvine',
  riskCategory: 'moderate',
  conditions: ['Gestational Hypertension monitoring', 'Mild Iron Deficiency'],
  allergies: ['Penicillin', 'Sulfa drugs'],
  bloodType: 'O+',
  prePregnancyBmi: 23.4,
  currentWeight: 154,
  targetWeightGainRange: [25, 35],
  emergencyContact: {
    name: 'David Mitchell',
    relationship: 'Partner / Spouse',
    phone: '+1 (949) 555-0192',
  },
};
export const weekMilestones: Record<number, WeekMilestoneData> = {
  8: {
    week: 8,
    fruit: 'Raspberry',
    fruitEmoji: '🫐',
    babyLengthCm: 1.6,
    babyLengthInches: 0.63,
    babyWeightGrams: 1.1,
    babyWeightOz: 0.04,
    babyHighlights: [
      'Tiny webbed fingers and toes are starting to form',
      'Heartbeat is beating at ~150 bpm (twice as fast as adult)',
      'Facial features like eyelids and nose tip are developing'
    ],
    momBodyChanges: [
      'Morning sickness & heightened sense of smell',
      'Mild cramping as uterus expands to size of an orange',
      'Fatigue as progesterone surges'
    ],
    clinicalTips: [
      'Stay hydrated with electrolyte water or ginger tea',
      'Take 800mcg folic acid prenatal vitamin daily',
      'Schedule initial prenatal blood panel'
    ],
    suggestedLabs: ['NIPT Cell-Free DNA (Available at Wk 9-10)', 'Complete Blood Count', 'Blood type & Rh antibody'],
    funFact: 'Your baby is constantly moving and shifting, even though you cannot feel it yet!'
  },
  12: {
    week: 12,
    fruit: 'Plum / Lime',
    fruitEmoji: '🍋',
    babyLengthCm: 5.4,
    babyLengthInches: 2.1,
    babyWeightGrams: 14,
    babyWeightOz: 0.5,
    babyHighlights: [
      'Reflexes are beginning: baby can curl toes and make sucking motions',
      'Kidneys are producing small amounts of urine',
      'Vocal cords are completely formed'
    ],
    momBodyChanges: [
      'Morning sickness may start to taper off',
      'Uterus moves above the pelvic bone, easing bladder pressure slightly',
      'Pregnancy "glow" from increased blood volume'
    ],
    clinicalTips: [
      'Schedule 1st Trimester Nuchal Translucency (NT) ultrasound',
      'Discuss early preeclampsia screening with your Caduceus OBGYN',
      'Maintain light walking or prenatal yoga'
    ],
    suggestedLabs: ['1st Trimester Combined Screen', 'Carrier Screening'],
    funFact: 'Baby’s fingernails and toenails are beginning to develop now!'
  },
  20: {
    week: 20,
    fruit: 'Banana / Sweet Potato',
    fruitEmoji: '🍌',
    babyLengthCm: 25.6,
    babyLengthInches: 10.1,
    babyWeightGrams: 300,
    babyWeightOz: 10.6,
    babyHighlights: [
      'Halfway mark! Baby can hear your voice and heartbeat',
      'Lanugo (fine soft hair) covers baby to regulate body temperature',
      'Baby is practicing swallowing amniotic fluid'
    ],
    momBodyChanges: [
      'You are feeling distinct "quickening" flutters and kicks',
      'Round ligament aches as bump grows steadily',
      'Linea nigra (dark line down belly) may appear'
    ],
    clinicalTips: [
      'Anatomy 20-week detailed ultrasound scan',
      'Check placenta location and cervical length',
      'Start side-sleeping with supportive pillows'
    ],
    suggestedLabs: ['Anatomy Scan / Level 2 Ultrasound', 'Maternal Serum Alpha-Fetoprotein (MSAFP)'],
    funFact: 'Baby has working taste buds and can taste what you eat in the amniotic fluid!'
  },
  28: {
    week: 28,
    fruit: 'Eggplant / Large Butternut Squash',
    fruitEmoji: '🍆',
    babyLengthCm: 37.6,
    babyLengthInches: 14.8,
    babyWeightGrams: 1005,
    babyWeightOz: 35.5,
    babyHighlights: [
      'Third Trimester Begins! Baby can open eyes and blink',
      'Brain develops billions of new neurons and sleep-wake cycles',
      'Lungs are capable of breathing air with surfactant production increasing'
    ],
    momBodyChanges: [
      'Braxton Hicks practice contractions may start',
      'Mild swelling in ankles and feet after standing',
      'Increased heartburn and shortness of breath as uterus presses upward'
    ],
    clinicalTips: [
      'Start daily fetal kick counting sessions (10 kicks within 2 hours)',
      'Glucose Challenge Screening (GCT) for Gestational Diabetes',
      'Tdap vaccine booster and Rhogam shot if Rh-negative',
      'Monitor blood pressure remotely at least twice weekly'
    ],
    suggestedLabs: ['1-Hour Glucose Challenge Test', 'CBC for Anemia', 'Antibody Screen'],
    funFact: 'Baby can dream during REM sleep cycles now!'
  },
  36: {
    week: 36,
    fruit: 'Romaine Lettuce / Papaya',
    fruitEmoji: '🥬',
    babyLengthCm: 47.4,
    babyLengthInches: 18.7,
    babyWeightGrams: 2622,
    babyWeightOz: 92.5,
    babyHighlights: [
      'Baby is shedding lanugo and vernix caseosa coating',
      'Most babies settle into the head-down (cephalic) vertex position',
      'Immune system is receiving maternal antibodies'
    ],
    momBodyChanges: [
      'Baby drops into pelvis ("Lightening"), making it easier to breathe',
      'Increased pelvic pressure and frequent bathroom trips',
      'Nesting instinct kicks into high gear'
    ],
    clinicalTips: [
      'Weekly or bi-weekly prenatal visits start',
      'Group B Strep (GBS) vaginal-rectal swab test',
      'Review birth plan and finalize hospital bag items',
      'Track contraction interval if experiencing tightening'
    ],
    suggestedLabs: ['Group B Streptococcus (GBS) Culture', 'Cervical exam if indicated'],
    funFact: 'Your baby’s skull bones remain soft and flexible to allow passage through the birth canal.'
  },
  40: {
    week: 40,
    fruit: 'Watermelon / Pumpkin',
    fruitEmoji: '🍉',
    babyLengthCm: 51.2,
    babyLengthInches: 20.2,
    babyWeightGrams: 3462,
    babyWeightOz: 122.1,
    babyHighlights: [
      'Full term! Baby is fully ready to meet the world',
      'Lungs, liver, and brain are primed for newborn life',
      'Firm grip and responsive reflexes'
    ],
    momBodyChanges: [
      'Cervix is softening, effacing, and possibly dilating',
      'Loss of mucus plug / "bloody show" may occur',
      'Stronger, regular contractions following the 5-1-1 rule'
    ],
    clinicalTips: [
      'Remember the 5-1-1 rule: Contractions 5 mins apart, lasting 1 min, for 1 full hour',
      'Call Caduceus labor triage or alert your Ruth Health doula',
      'Keep hydrated and focus on rhythmic breathing'
    ],
    suggestedLabs: ['Biophysical Profile (BPP) / Non-Stress Test (NST) if post-dates'],
    funFact: 'Only about 4% to 5% of babies are born on their exact due date!'
  }
};
export const initialVitals: VitalsRecord[] = [
  {
    id: 'vit-1',
    timestamp: '2026-03-24 08:30',
    date: 'Mar 24',
    systolic: 118,
    diastolic: 76,
    heartRate: 74,
    glucose: 88,
    glucoseType: 'fasting',
    weight: 154.2,
    map: 90,
    status: 'normal',
    notes: 'Morning reading before breakfast. Felt well rested.'
  },
  {
    id: 'vit-2',
    timestamp: '2026-03-23 19:15',
    date: 'Mar 23',
    systolic: 124,
    diastolic: 80,
    heartRate: 78,
    glucose: 112,
    glucoseType: 'postprandial',
    weight: 154.0,
    map: 94.7,
    status: 'normal',
    notes: 'After light dinner walk.'
  },
  {
    id: 'vit-3',
    timestamp: '2026-03-23 08:10',
    date: 'Mar 23',
    systolic: 122,
    diastolic: 78,
    heartRate: 72,
    glucose: 90,
    glucoseType: 'fasting',
    weight: 153.8,
    map: 92.7,
    status: 'normal'
  },
  {
    id: 'vit-4',
    timestamp: '2026-03-22 18:40',
    date: 'Mar 22',
    systolic: 132,
    diastolic: 84,
    heartRate: 82,
    glucose: 128,
    glucoseType: 'postprandial',
    weight: 153.5,
    map: 100.0,
    status: 'elevated',
    notes: 'Mild headache after work meetings. AI Navigator nudged hydration & rest.'
  },
  {
    id: 'vit-5',
    timestamp: '2026-03-21 09:00',
    date: 'Mar 21',
    systolic: 116,
    diastolic: 74,
    heartRate: 70,
    glucose: 86,
    glucoseType: 'fasting',
    weight: 153.2,
    map: 88.0,
    status: 'normal'
  },
  {
    id: 'vit-6',
    timestamp: '2026-03-20 08:30',
    date: 'Mar 20',
    systolic: 120,
    diastolic: 78,
    heartRate: 75,
    glucose: 91,
    glucoseType: 'fasting',
    weight: 152.9,
    map: 92.0,
    status: 'normal'
  },
  {
    id: 'vit-7',
    timestamp: '2026-03-19 19:30',
    date: 'Mar 19',
    systolic: 126,
    diastolic: 82,
    heartRate: 80,
    glucose: 115,
    glucoseType: 'postprandial',
    weight: 152.7,
    map: 96.7,
    status: 'normal'
  }
];

export const initialKicks: KickRecord[] = [
  {
    id: 'kick-1',
    date: 'Today, 2:15 PM',
    startTime: '14:15',
    durationMinutes: 18,
    kickCount: 10,
    kicksTimestamps: [1, 3, 5, 8, 9, 12, 14, 15, 17, 18],
    intensity: 'strong',
    notes: 'Baby Theo was very active after an orange snack!'
  },
  {
    id: 'kick-2',
    date: 'Yesterday, 8:40 PM',
    startTime: '20:40',
    durationMinutes: 24,
    kickCount: 10,
    kicksTimestamps: [2, 4, 7, 11, 13, 16, 19, 21, 23, 24],
    intensity: 'moderate',
    notes: 'Bedtime lullaby session.'
  },
  {
    id: 'kick-3',
    date: 'Mar 22, 1:00 PM',
    startTime: '13:00',
    durationMinutes: 32,
    kickCount: 10,
    kicksTimestamps: [3, 8, 12, 15, 19, 22, 25, 28, 30, 32],
    intensity: 'light'
  }
];

export const initialContractions: ContractionRecord[] = [
  {
    id: 'cnt-1',
    timestamp: '15:20',
    durationSeconds: 45,
    intervalMinutes: 12,
    intensity: 'mild'
  },
  {
    id: 'cnt-2',
    timestamp: '15:32',
    durationSeconds: 48,
    intervalMinutes: 12,
    intensity: 'mild'
  },
  {
    id: 'cnt-3',
    timestamp: '15:43',
    durationSeconds: 52,
    intervalMinutes: 11,
    intensity: 'moderate'
  }
];

export const clinicianCohort: ClinicianPatientSummary[] = [
  {
    id: 'pat-10492',
    name: 'Sarah Mitchell',
    age: 31,
    gestationalWeek: 28,
    gestationalDay: 3,
    riskStatus: 'elevated',
    riskFactors: ['Borderline MAP > 95 mmHg', 'History of migraines'],
    lastSyncTime: '15 mins ago',
    latestBp: { systolic: 124, diastolic: 80, map: 94.7 },
    latestWeight: 154.2,
    latestGlucose: 88,
    avgKickRatePerHour: 22,
    rpmMinutesCurrentMonth: 38,
    rpmStatus: 'billing-ready',
    nextAppointment: 'Mar 30, 2026 (Telehealth)',
    recentAlert: {
      type: 'bp_spike',
      message: 'BP reached 132/84 on Mar 22. Resolved after rest.',
      timestamp: '2 days ago'
    }
  },
  {
    id: 'pat-10518',
    name: 'Elena Rostova',
    age: 34,
    gestationalWeek: 35,
    gestationalDay: 1,
    riskStatus: 'critical',
    riskFactors: ['Gestational Diabetes GDM-A2', 'Elevated BP (142/92)', 'Twin Gestation (Di/Di)'],
    lastSyncTime: '32 mins ago',
    latestBp: { systolic: 142, diastolic: 92, map: 108.7 },
    latestWeight: 178.5,
    latestGlucose: 142,
    avgKickRatePerHour: 14,
    rpmMinutesCurrentMonth: 45,
    rpmStatus: 'billing-ready',
    nextAppointment: 'Mar 26, 2026 (In-Clinic Doppler)',
    recentAlert: {
      type: 'bp_spike',
      message: 'Critical BP 142/92 logged. Alert sent to Caduceus MFM On-Call.',
      timestamp: 'Today, 09:15 AM'
    }
  },
  {
    id: 'pat-10331',
    name: 'Maya Chen',
    age: 29,
    gestationalWeek: 21,
    gestationalDay: 5,
    riskStatus: 'normal',
    riskFactors: ['None - Low risk Primigravida'],
    lastSyncTime: '2 hours ago',
    latestBp: { systolic: 112, diastolic: 72, map: 85.3 },
    latestWeight: 141.0,
    latestGlucose: 84,
    avgKickRatePerHour: 18,
    rpmMinutesCurrentMonth: 22,
    rpmStatus: 'on-track',
    nextAppointment: 'Apr 12, 2026 (Routine Anatomy Review)'
  },
  {
    id: 'pat-10604',
    name: 'Destiny Washington',
    age: 26,
    gestationalWeek: 38,
    gestationalDay: 4,
    riskStatus: 'elevated',
    riskFactors: ['Reduced fetal movement reported', 'Prior Cesarean'],
    lastSyncTime: '1 hour ago',
    latestBp: { systolic: 128, diastolic: 84, map: 98.7 },
    latestWeight: 168.2,
    avgKickRatePerHour: 9,
    rpmMinutesCurrentMonth: 31,
    rpmStatus: 'billing-ready',
    nextAppointment: 'Tomorrow, 10:00 AM (NST in clinic)',
    recentAlert: {
      type: 'reduced_fetal_movement',
      message: 'Kick session duration > 75 mins. Recommended cold juice & left lateral position.',
      timestamp: 'Today, 11:30 AM'
    }
  },
  {
    id: 'pat-10119',
    name: 'Chloe Tremblay',
    age: 36,
    gestationalWeek: 14,
    gestationalDay: 2,
    riskStatus: 'normal',
    riskFactors: ['Advanced Maternal Age (AMA)'],
    lastSyncTime: '4 hours ago',
    latestBp: { systolic: 115, diastolic: 75, map: 88.3 },
    latestWeight: 136.4,
    avgKickRatePerHour: 0,
    rpmMinutesCurrentMonth: 18,
    rpmStatus: 'on-track',
    nextAppointment: 'Apr 04, 2026'
  }
];
export const marketplaceItems: MarketplaceItem[] = [
  {
    id: 'mkt-1',
    title: 'Ruth Health "Ask a Doula" 24/7 Unlimited SMS & Care Navigation',
    category: 'doula',
    provider: 'Ruth Health Maternal Care',
    rating: 4.98,
    reviewCount: 342,
    price: 0,
    originalPrice: 79,
    isInsuranceCovered: true,
    insuranceNote: '100% Covered by Caduceus & Partner Plans',
    description: 'Direct 24/7 texting with certified birth & postpartum doulas. Get continuous reassurance, birth plan guidance, pain coping techniques, and partner coaching.',
    badge: 'Popular Partnership',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=400',
    features: [
      'Unlimited 24/7 SMS with Certified Doulas',
      'Labor prep & physiological birth education',
      'Partner pocket navigation & coaching',
      'Postpartum recovery & infant soothing triage'
    ],
    availability: 'Instant Activation'
  },
  {
    id: 'mkt-2',
    title: 'Brightside Health Maternal & Postpartum Precision Psychiatry',
    category: 'mental-health',
    provider: 'Brightside Health Clinical Network',
    rating: 4.95,
    reviewCount: 512,
    price: 15,
    originalPrice: 199,
    isInsuranceCovered: true,
    insuranceNote: 'In-network with major insurance & Medicaid',
    description: 'Specialized evidence-based telemental health care for prenatal anxiety, perinatal depression, and postpartum mood disorders with FDA-approved pregnancy-safe medication management and CBT therapy.',
    badge: 'Clinical Excellence',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    features: [
      'Video consultations within 48 hours',
      'Pregnancy & lactation-safe medication protocols',
      'Perinatal Cognitive Behavioral Therapy (CBT)',
      'Direct integration with your Caduceus OBGYN chart'
    ],
    availability: 'Next Day Appointments'
  },
  {
    id: 'mkt-3',
    title: 'Virtual Lactation & Infant Feeding Consultation (IBCLC)',
    category: 'lactation',
    provider: 'eLovu Clinical Lactation Network',
    rating: 4.92,
    reviewCount: 189,
    price: 0,
    originalPrice: 120,
    isInsuranceCovered: true,
    insuranceNote: 'ACA Mandated 100% Preventive Coverage',
    description: 'One-on-one video session with an International Board Certified Lactation Consultant (IBCLC) for latch optimization, milk supply boosting, pumping schedules, and tongue-tie evaluations.',
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=400',
    features: [
      '60-minute video exam with IBCLC',
      'Flange sizing & custom pump routine',
      'Mastitis & clogged duct emergency support',
      'Formula combination feeding guidance'
    ],
    availability: 'Available Today'
  },
  {
    id: 'mkt-4',
    title: 'Pelvic Floor & Core Physical Therapy Program',
    category: 'pelvic-floor',
    provider: 'Origin Pelvic Health',
    rating: 4.91,
    reviewCount: 220,
    price: 45,
    originalPrice: 150,
    isInsuranceCovered: true,
    insuranceNote: 'HSA / FSA Eligible & Insurance Superbill',
    description: 'Targeted pelvic floor physical therapy to prevent tearing, reduce pregnancy pelvic girdle pain, prepare for pushing, and restore abdominal wall post-delivery.',
    badge: 'Evidence Based',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400',
    features: [
      'Comprehensive pelvic floor assessment',
      'Perineal massage coaching for labor',
      'Diastasis recti healing protocols',
      'Guided biofeedback exercises in-app'
    ],
    availability: 'Slots Open This Week'
  },
  {
    id: 'mkt-5',
    title: 'Omron Evolv Smart Bluetooth Blood Pressure Monitor',
    category: 'device',
    provider: 'Omron Healthcare / eLovu Direct Sync',
    rating: 4.88,
    reviewCount: 840,
    price: 0,
    originalPrice: 99.99,
    isInsuranceCovered: true,
    insuranceNote: 'Prescribed via eLovu RPM Program (CPT 99453)',
    description: 'Tubeless, ultra-accurate wireless upper arm blood pressure monitor. Automatically syncs systolic, diastolic, and MAP readings to your Caduceus OBGYN clinical portal.',
    badge: 'RPM Prescribed',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400',
    features: [
      'Seamless Bluetooth 5.0 auto-sync to eLovu app',
      'ACOG validated for preeclampsia surveillance',
      'Compact all-in-one cuff (no tubes or wires)',
      'Clinical alerts triggered automatically upon abnormal read'
    ],
    availability: 'Ships Free in 24h'
  },
  {
    id: 'mkt-6',
    title: 'eLovu Maternal-Fetal Biomarker & Preeclampsia Risk Screen (sFlt-1/PlGF)',
    category: 'biomarker',
    provider: 'eLovu Genomics & LabCorp',
    rating: 4.97,
    reviewCount: 145,
    price: 0,
    originalPrice: 280,
    isInsuranceCovered: true,
    insuranceNote: 'Covered with clinical indication',
    description: 'Advanced predictive blood biomarker assay evaluating the angiogenic balance (sFlt-1/PlGF ratio) to accurately rule out imminent preeclampsia up to 4 weeks before symptoms arise.',
    badge: 'Breakthrough Biomarker',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400',
    features: [
      'In-home mobile phlebotomist or clinic draw',
      '99.3% negative predictive value for preeclampsia',
      'Longitudinal trend analysis in your eLovu portal',
      'Reviewed directly by Caduceus Maternal-Fetal Specialists'
    ],
    availability: 'Order via OBGYN'
  }
];

export const defaultBirthPlan: BirthPlanItem[] = [
  {
    id: 'env',
    category: 'Labor Environment',
    title: 'Atmosphere & Setting',
    options: [
      { id: 'env-1', label: 'Dim lighting & calming essential oil diffuser (lavender)', selected: true },
      { id: 'env-2', label: 'Play personal labor playlist via Bluetooth speaker', selected: true },
      { id: 'env-3', label: 'Keep room quiet with minimal clinical chatter', selected: true },
      { id: 'env-4', label: 'Wear own comfortable labor gown and warm socks', selected: true },
      { id: 'env-5', label: 'Allow photography / video during labor and immediate skin-to-skin', selected: false }
    ]
  },
  {
    id: 'pain',
    category: 'Pain Management & Comfort',
    title: 'Comfort Measures & Pain Relief',
    options: [
      { id: 'pain-1', label: 'Peanut ball, birthing ball & freedom of movement / walking', selected: true },
      { id: 'pain-2', label: 'Hydrotherapy (shower or labor tub)', selected: true },
      { id: 'pain-3', label: 'Nitrous Oxide (laughing gas) option before epidural', selected: false },
      { id: 'pain-4', label: 'Open to Epidural upon request when active labor is established', selected: true },
      { id: 'pain-5', label: 'Continuous Doula counterpressure & hip squeezes', selected: true }
    ]
  },
  {
    id: 'delivery',
    category: 'Delivery & Pushing',
    title: 'Pushing & Birth Preferences',
    options: [
      { id: 'del-1', label: 'Spontaneous pushing guided by body urges (no prolonged coached pushing)', selected: true },
      { id: 'del-2', label: 'Upright / side-lying or hands-and-knees birthing positions', selected: true },
      { id: 'del-3', label: 'Mirror to see baby crowning if desired', selected: false },
      { id: 'del-4', label: 'Warm perineal compresses to reduce tearing risk', selected: true },
      { id: 'del-5', label: 'Partner (David) cuts umbilical cord after delayed clamping', selected: true }
    ]
  },
  {
    id: 'postpartum',
    category: 'Immediate Postpartum & Baby Care',
    title: 'Golden Hour & Newborn Procedures',
    options: [
      { id: 'post-1', label: 'Immediate uninterrupted skin-to-skin for the full Golden Hour (60+ mins)', selected: true },
      { id: 'post-2', label: 'Delayed cord clamping until pulsation stops (at least 2-3 mins)', selected: true },
      { id: 'post-3', label: 'Delay newborn bath for at least 24 hours to absorb vernix', selected: true },
      { id: 'post-4', label: 'Initiate first breastfeed within 1 hour with Doula/IBCLC guidance', selected: true },
      { id: 'post-5', label: 'Standard newborn medications: Vitamin K, Erythromycin eye ointment, Hep B', selected: true }
    ]
  }
];

export const defaultHospitalBag: HospitalBagItem[] = [
  // Mom
  { id: 'hb-1', category: 'mom', item: 'Photo ID, Insurance Cards & eLovu Digital Health Pass', checked: true, essential: true },
  { id: 'hb-2', category: 'mom', item: 'Printed Copies of eLovu Birth Plan (3 copies for nurse & OB)', checked: true, essential: true },
  { id: 'hb-3', category: 'mom', item: 'Comfortable labor gown & loose postpartum loungewear / robe', checked: true, essential: true },
  { id: 'hb-4', category: 'mom', item: 'Grippy socks, cozy slippers, and shower flip-flops', checked: true, essential: true },
  { id: 'hb-5', category: 'mom', item: 'High-waisted cotton or disposable mesh underwear & maxi pads', checked: true, essential: true },
  { id: 'hb-6', category: 'mom', item: 'Nursing bras (2) + soothing organic nipple balm', checked: false, essential: true },
  { id: 'hb-7', category: 'mom', item: 'Toiletries bag (toothbrush, dry shampoo, lip balm, hair ties)', checked: false, essential: true },
  { id: 'hb-8', category: 'mom', item: 'Extra long 10ft phone charging cable & portable power bank', checked: false, essential: true },
  // Baby
  { id: 'hb-9', category: 'baby', item: 'Infant Car Seat properly installed in vehicle (inspected)', checked: true, essential: true },
  { id: 'hb-10', category: 'baby', item: 'Going-home outfits (Newborn and 0-3M sizes with mittens)', checked: false, essential: true },
  { id: 'hb-11', category: 'baby', item: 'Soft organic swaddle blankets & newborn hats (2)', checked: false, essential: false },
  { id: 'hb-12', category: 'baby', item: 'Baby nail clippers / gentle electric nail file', checked: false, essential: false },
  // Partner
  { id: 'hb-13', category: 'partner', item: 'Change of comfortable clothes & layer sweater/hoodie', checked: false, essential: true },
  { id: 'hb-14', category: 'partner', item: 'High-energy snacks, electrolyte drinks & reusable water bottles', checked: false, essential: true },
  { id: 'hb-15', category: 'partner', item: 'Pillow & cozy blanket for partner sleep cot', checked: false, essential: false },
  // Documents
  { id: 'hb-16', category: 'documents', item: 'Pediatrician contact card & chosen clinic name', checked: false, essential: true },
  { id: 'hb-17', category: 'documents', item: 'Cord blood banking kit (if registered)', checked: false, essential: false }
];

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Jessica L.',
    authorBadge: 'First-time Mama',
    authorWeek: '29 Weeks',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    timestamp: '2 hours ago',
    topic: '3rd Trimester Sleep & Comfort',
    title: 'How are you all sleeping comfortably with the 3rd trimester belly?',
    content: 'Ever since hitting week 28, sleeping on my left side has gotten tricky with lower back ache. I got a U-shaped pregnancy pillow which helps, but what other tips or bedtime stretches do you recommend before bed?',
    likes: 24,
    hasLiked: false,
    commentsCount: 3,
    replies: [
      {
        id: 'rep-1',
        author: 'Elena Vance, CD (Ruth Health)',
        badge: 'Certified Doula',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        timestamp: '1 hour ago',
        text: 'Hi Jessica! Try placing a small wedge under your belly and a pillow between your ankles, keeping your hips squared. A 10-minute cat-cow yoga flow and magnesium drink before bed work wonders!'
      },
      {
        id: 'rep-2',
        author: 'Sarah M.',
        badge: '28 Weeks',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        timestamp: '45 mins ago',
        text: 'I started putting a warm heating pad on my low back for 15 mins before lying down and it relaxed the muscles completely!'
      }
    ]
  },
  {
    id: 'post-2',
    author: 'Rachel K.',
    authorBadge: 'Mom of 2',
    authorWeek: '34 Weeks',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200',
    timestamp: '5 hours ago',
    topic: 'Doula Support & Birth Prep',
    title: 'Having a virtual Doula via eLovu was the best decision we made!',
    content: 'We had our second birth prep session with our Ruth Health doula through the eLovu app yesterday. She helped my husband learn hip squeeze techniques for active labor and reviewed our birth preferences line-by-line with Caduceus hospital policies. We feel 100x more confident!',
    likes: 48,
    hasLiked: true,
    commentsCount: 1,
    replies: [
      {
        id: 'rep-3',
        author: 'Maya Chen',
        badge: '21 Weeks',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
        timestamp: '3 hours ago',
        text: 'That is so encouraging to hear! I just booked my initial Doula consult for next week!'
      }
    ]
  }
];
