export type AppView = 'patient' | 'clinician' | 'public' | 'marketplace' | 'birth-plan' | 'community';

export type PregnancyStage = 'pre-conception' | 'trimester-1' | 'trimester-2' | 'trimester-3' | 'postpartum';

export interface VitalsRecord {
  id: string;
  timestamp: string;
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  glucose?: number; // mg/dL
  glucoseType?: 'fasting' | 'postprandial' | 'random';
  weight?: number; // lbs
  map?: number; // Mean Arterial Pressure
  notes?: string;
  status: 'normal' | 'elevated' | 'high-risk';
}

export interface KickRecord {
  id: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  kickCount: number;
  kicksTimestamps: number[];
  intensity: 'light' | 'moderate' | 'strong';
  notes?: string;
}

export interface ContractionRecord {
  id: string;
  timestamp: string;
  durationSeconds: number;
  intervalMinutes: number;
  intensity: 'mild' | 'moderate' | 'strong';
}

export interface PatientProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gestationalWeek: number;
  gestationalDay: number;
  dueDate: string;
  conceptionDate: string;
  stage: PregnancyStage;
  babyNameOrNickname: string;
  babyGender: 'girl' | 'boy' | 'surprise';
  assignedObgyn: string;
  assignedDoula: string;
  clinicName: string;
  medicalGroup: string;
  riskCategory: 'low' | 'moderate' | 'high';
  conditions: string[];
  allergies: string[];
  bloodType: string;
  prePregnancyBmi: number;
  currentWeight: number;
  targetWeightGainRange: [number, number];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface WeekMilestoneData {
  week: number;
  fruit: string;
  fruitEmoji: string;
  babyLengthCm: number;
  babyLengthInches: number;
  babyWeightGrams: number;
  babyWeightOz: number;
  babyHighlights: string[];
  momBodyChanges: string[];
  clinicalTips: string[];
  suggestedLabs: string[];
  funFact: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'doula' | 'clinician';
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  text: string;
  category?: 'general' | 'symptom' | 'urgent' | 'nutrition' | 'doula-support';
  suggestedActions?: string[];
  isRedFlag?: boolean;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: 'doula' | 'lactation' | 'mental-health' | 'pelvic-floor' | 'device' | 'biomarker';
  provider: string;
  partnerLogo?: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  isInsuranceCovered: boolean;
  insuranceNote?: string;
  description: string;
  badge?: string;
  image: string;
  features: string[];
  availability?: string;
}

export interface ClinicianPatientSummary {
  id: string;
  name: string;
  age: number;
  gestationalWeek: number;
  gestationalDay: number;
  riskStatus: 'critical' | 'elevated' | 'normal';
  riskFactors: string[];
  lastSyncTime: string;
  latestBp: { systolic: number; diastolic: number; map: number };
  latestWeight: number;
  latestGlucose?: number;
  avgKickRatePerHour: number;
  rpmMinutesCurrentMonth: number;
  rpmStatus: 'on-track' | 'needs-review' | 'billing-ready';
  nextAppointment: string;
  recentAlert?: {
    type: 'bp_spike' | 'reduced_fetal_movement' | 'elevated_glucose' | 'high_epds';
    message: string;
    timestamp: string;
  };
}

export interface BirthPlanItem {
  id: string;
  category: string;
  title: string;
  options: { id: string; label: string; selected: boolean; note?: string }[];
}

export interface HospitalBagItem {
  id: string;
  category: 'mom' | 'baby' | 'partner' | 'documents';
  item: string;
  checked: boolean;
  essential: boolean;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorBadge: string;
  authorWeek: string;
  avatar: string;
  timestamp: string;
  topic: string;
  title: string;
  content: string;
  likes: number;
  hasLiked?: boolean;
  commentsCount: number;
  replies: {
    id: string;
    author: string;
    badge?: string;
    avatar: string;
    timestamp: string;
    text: string;
  }[];
}
