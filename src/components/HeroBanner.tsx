import React, { useState } from 'react';
import {
  Sparkles,
  Activity,
  Heart,
  Timer,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import type { PatientProfile, WeekMilestoneData } from '../types';

interface HeroBannerProps {
  patient: PatientProfile;
  milestone?: WeekMilestoneData;
  onOpenVitalsModal: () => void;
  onOpenKickCounter: () => void;
  onOpenContractionTimer: () => void;
  onOpenAiNavigator: () => void;
  onOpenDoulaChat: () => void;
  onOpenRiskAssessment: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  patient,
  milestone,
  onOpenVitalsModal,
  onOpenKickCounter,
  onOpenContractionTimer,
  onOpenAiNavigator,
  onOpenDoulaChat,
  onOpenRiskAssessment
}) => {
  const [micronudgeDone, setMicronudgeDone] = useState(false);

  const totalWeeks = 40;
  const progressPercent = Math.min(100, Math.round((patient.gestationalWeek / totalWeeks) * 100));
  const daysRemaining = Math.max(0, (totalWeeks - patient.gestationalWeek) * 7 - patient.gestationalDay);

  return (
    <div className="space-y-6">
      {/* Top Main Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 text-white shadow-xl shadow-rose-200/50 p-6 sm:p-8">
        {/* Background decorative circles & glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 bg-rose-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Greeting & Baby Size Visual */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-rose-200 animate-spin" />
              <span>Third Trimester • Week {patient.gestationalWeek}, Day {patient.gestationalDay}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white m-0">
              Good afternoon, {patient.name.split(' ')[0]}! 🌸
            </h1>

            <p className="text-rose-100 text-sm sm:text-base max-w-xl leading-relaxed">
              {patient.babyNameOrNickname} is now the size of an{' '}
              <strong className="text-white underline decoration-rose-300 underline-offset-4">
                {milestone?.fruit || 'Eggplant'} {milestone?.fruitEmoji || '🍆'}
              </strong>
              ! Approximately <strong>{milestone?.babyLengthInches || 14.8} inches</strong> long and{' '}
              <strong>{((milestone?.babyWeightGrams || 1005) / 453.592).toFixed(1)} lbs</strong>.
            </p>

            {/* Journey Progress Bar */}
            <div className="space-y-2 pt-2 max-w-lg">
              <div className="flex justify-between text-xs font-bold text-rose-100">
                <span>Journey Progress: {progressPercent}%</span>
                <span>{daysRemaining} Days to Due Date ({patient.dueDate})</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5 backdrop-blur-xs">
                <div
                  className="h-full bg-gradient-to-r from-rose-200 via-amber-200 to-white rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Quick badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                Caduceus RPM Sync Active
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-200" />
                Doula Assigned: {patient.assignedDoula.split(',')[0]}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Baby Stage & AI Daily Micro-nudge */}
          <div className="lg:col-span-5 space-y-3">
            {/* AI Micronudge Box */}
            <div className="p-4 rounded-2xl bg-white/95 text-slate-800 shadow-lg border border-rose-100 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                    ✨
                  </div>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">
                    eLovu AI Daily Micro-Nudge
                  </span>
                </div>
                <button
                  onClick={() => setMicronudgeDone(!micronudgeDone)}
                  className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition cursor-pointer ${micronudgeDone
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                    }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {micronudgeDone ? 'Completed!' : 'Mark Done'}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                "Hydration & Pelvic Circulation: Drink 500ml water and complete 5 minutes of gentle pelvic rocks on your yoga ball to ease lower back tension."
              </p>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Personalized by Dr. Santosh Pandipati (MFM)</span>
                <button
                  onClick={onOpenAiNavigator}
                  className="text-rose-600 font-bold hover:underline flex items-center gap-0.5"
                >
                  Ask AI Navigator <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
                <span className="text-[10px] text-rose-200 uppercase font-bold tracking-wider block">
                  Today's BP
                </span>
                <div className="text-lg font-black text-white mt-0.5">118 / 76</div>
                <span className="text-[10px] text-emerald-200 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Optimal (MAP 90)
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
                <span className="text-[10px] text-rose-200 uppercase font-bold tracking-wider block">
                  Kick Count Session
                </span>
                <div className="text-lg font-black text-white mt-0.5">10 kicks / 18m</div>
                <span className="text-[10px] text-emerald-200 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> ACOG Target Met
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Quick Action Interactive Hub Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* 1. Log Vitals */}
        <button
          onClick={onOpenVitalsModal}
          className="flex flex-col items-center text-center p-4 rounded-2xl bg-white hover:bg-rose-50/60 border border-rose-100/80 shadow-xs hover:shadow-md transition group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition shadow-xs">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Log RPM Vitals</span>
          <span className="text-[10px] text-slate-500 mt-0.5">BP, Glucose & Weight</span>
        </button>

        {/* 2. Kick Counter */}
        <button
          onClick={onOpenKickCounter}
          className="flex flex-col items-center text-center p-4 rounded-2xl bg-white hover:bg-rose-50/60 border border-rose-100/80 shadow-xs hover:shadow-md transition group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition shadow-xs">
            <Heart className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Kick Counter</span>
          <span className="text-[10px] text-slate-500 mt-0.5">10 Kicks in 2 Hours</span>
        </button>

        {/* 3. Contraction Timer */}
        <button
          onClick={onOpenContractionTimer}
          className="flex flex-col items-center text-center p-4 rounded-2xl bg-white hover:bg-rose-50/60 border border-rose-100/80 shadow-xs hover:shadow-md transition group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition shadow-xs">
            <Timer className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Contraction Timer</span>
          <span className="text-[10px] text-slate-500 mt-0.5">5-1-1 Labor Rule</span>
        </button>

        {/* 4. Ask a Doula */}
        <button
          onClick={onOpenDoulaChat}
          className="flex flex-col items-center text-center p-4 rounded-2xl bg-white hover:bg-rose-50/60 border border-rose-100/80 shadow-xs hover:shadow-md transition group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Ruth Health Doula</span>
          <span className="text-[10px] text-slate-500 mt-0.5">24/7 Unlimited SMS</span>
        </button>

        {/* 5. Maternal Risk Assessment */}
        <button
          onClick={onOpenRiskAssessment}
          className="col-span-2 sm:col-span-1 flex flex-col items-center text-center p-4 rounded-2xl bg-white hover:bg-rose-50/60 border border-rose-100/80 shadow-xs hover:shadow-md transition group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Preeclampsia Risk</span>
          <span className="text-[10px] text-slate-500 mt-0.5">AI Clinical Screener</span>
        </button>
      </div>
    </div>
  );
};
