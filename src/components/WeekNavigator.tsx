import React, { useState } from 'react';
import {
  Baby,
  Heart,
  FileCheck2,
  Sparkles,
  Info,
  Activity,
  Layers
} from 'lucide-react';

import { weekMilestones } from '../data/mockData';

interface WeekNavigatorProps {
  currentWeek: number;
  onSelectWeek: (week: number) => void;
}

export const WeekNavigator: React.FC<WeekNavigatorProps> = ({
  currentWeek,
  onSelectWeek
}) => {
  const [activeTab, setActiveTab] = useState<'baby' | 'mom' | 'clinical' | 'ultrasound'>('baby');
  const availableWeeks = [8, 12, 20, 28, 36, 40];

  // Pick milestone or fallback to closest
  const currentData = weekMilestones[currentWeek] || weekMilestones[28];

  const getTrimester = (week: number) => {
    if (week <= 13) return { name: '1st Trimester', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (week <= 27) return { name: '2nd Trimester', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    if (week <= 40) return { name: '3rd Trimester', color: 'bg-rose-50 text-rose-700 border-rose-200' };
    return { name: '4th Trimester (Postpartum)', color: 'bg-purple-50 text-purple-700 border-purple-200' };
  };

  const trimesterInfo = getTrimester(currentWeek);

  return (
    <div className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden">
      {/* Top Header & Trimester Indicator */}
      <div className="p-6 border-b border-rose-100/80 bg-gradient-to-r from-rose-50/50 via-white to-pink-50/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${trimesterInfo.color}`}>
                {trimesterInfo.name}
              </span>
              <span className="text-xs text-slate-500 font-medium">ACOG Verified Development</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Week {currentWeek} Maternal & Fetal Milestones
            </h2>
          </div>

          {/* Quick Week Switcher Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {availableWeeks.map((wk) => (
              <button
                key={wk}
                onClick={() => onSelectWeek(wk)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${currentWeek === wk
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-200 scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-rose-100/60 hover:text-rose-700'
                  }`}
              >
                Wk {wk}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-5 border-b border-slate-100 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('baby')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${activeTab === 'baby'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
          >
            <Baby className="w-4 h-4" /> Baby Anatomy
          </button>

          <button
            onClick={() => setActiveTab('mom')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${activeTab === 'mom'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
          >
            <Heart className="w-4 h-4" /> Mom's Body
          </button>

          <button
            onClick={() => setActiveTab('clinical')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${activeTab === 'clinical'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
          >
            <FileCheck2 className="w-4 h-4" /> Clinical Care & Labs
          </button>

          <button
            onClick={() => setActiveTab('ultrasound')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${activeTab === 'ultrasound'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
          >
            <Activity className="w-4 h-4" /> Fetal Doppler / 3D View
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* TAB 1: BABY ANATOMY */}
        {activeTab === 'baby' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Fruit Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 rounded-3xl p-6 border border-rose-100 text-center flex flex-col items-center justify-center relative overflow-hidden">
              <span className="text-7xl sm:text-8xl animate-bounce duration-1000 mb-2">
                {currentData.fruitEmoji}
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Size of a {currentData.fruit}
              </h3>
              <p className="text-xs text-rose-600 font-semibold mt-0.5">Week {currentData.week} Scale</p>

              <div className="grid grid-cols-2 gap-3 w-full mt-5">
                <div className="bg-white/90 p-3 rounded-2xl shadow-xs border border-rose-100/60">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Crown to Heel</span>
                  <div className="text-base font-extrabold text-slate-800 mt-0.5">
                    {currentData.babyLengthInches} in
                  </div>
                  <span className="text-[10px] text-slate-400">({currentData.babyLengthCm} cm)</span>
                </div>

                <div className="bg-white/90 p-3 rounded-2xl shadow-xs border border-rose-100/60">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Estimated Weight</span>
                  <div className="text-base font-extrabold text-slate-800 mt-0.5">
                    {(currentData.babyWeightGrams / 453.592).toFixed(1)} lbs
                  </div>
                  <span className="text-[10px] text-slate-400">({currentData.babyWeightGrams} g)</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white/80 rounded-2xl border border-rose-100 text-[11px] text-slate-600 text-left w-full">
                <span className="font-bold text-rose-600">💡 Fun Fact: </span>
                {currentData.funFact}
              </div>
            </div>

            {/* Developmental Milestones List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-500" />
                Key Anatomical Developments This Week
              </h3>

              <div className="space-y-3">
                {currentData.babyHighlights.map((hl, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-rose-200 hover:bg-rose-50/30 transition flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                      {hl}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MOM'S BODY */}
        {activeTab === 'mom' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              What's Happening in Mom's Body
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentData.momBodyChanges.map((change, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 hover:shadow-sm transition"
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs mb-3">
                    0{i + 1}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
                    Maternal Adaptation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{change}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-rose-50 border border-purple-100 flex items-start gap-3">
              <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div className="text-xs text-purple-900">
                <span className="font-bold">Doula Tip for Week {currentWeek}: </span>
                Stay proactive with side-lying posture using pillows between knees and ankles to keep your pelvis aligned and support lower lumbar spine.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CLINICAL GUIDELINES & LABS */}
        {activeTab === 'clinical' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide text-rose-600">
                ACOG Recommendations & Guidelines
              </h3>
              <div className="space-y-2">
                {currentData.clinicalTips.map((tip, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5 font-medium"
                  >
                    <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide text-rose-600">
                Suggested Lab Tests & Screens
              </h3>
              <div className="space-y-2">
                {currentData.suggestedLabs.map((lab, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 flex items-start justify-between font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{lab}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md">
                      Caduceus MFM
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ULTRASOUND / FETAL DOPPLER */}
        {activeTab === 'ultrasound' && (
          <div className="p-6 rounded-3xl bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
            <div className="space-y-3 max-w-md">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> Fetal Doppler Simulation
              </div>
              <h3 className="text-xl font-bold text-white">
                Week {currentWeek} Ultrasound & Heartbeat
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Baby's heart beats rhythmically at approximately ~142 - 150 bpm. You can hear distinct cardiac sounds during your Caduceus prenatal Doppler check or home sync.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Fetal Heart Rate</span>
                  <div className="text-xl font-black text-rose-400 mt-0.5">146 BPM</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Presentation</span>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">Cephalic (Head Down)</div>
                </div>
              </div>
            </div>

            {/* Animated Waveform Visualizer */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-2xl border border-slate-800 w-full md:w-64 text-center">
              <div className="flex items-center justify-center gap-1.5 h-16 mb-3">
                <div className="w-1.5 bg-rose-500 rounded-full animate-bounce h-8"></div>
                <div className="w-1.5 bg-pink-500 rounded-full animate-bounce h-14 delay-75"></div>
                <div className="w-1.5 bg-rose-400 rounded-full animate-bounce h-10 delay-150"></div>
                <div className="w-1.5 bg-rose-500 rounded-full animate-bounce h-16 delay-100"></div>
                <div className="w-1.5 bg-pink-400 rounded-full animate-bounce h-12 delay-200"></div>
                <div className="w-1.5 bg-rose-500 rounded-full animate-bounce h-6 delay-75"></div>
              </div>
              <span className="text-xs font-bold text-rose-300">Live Doppler Audio Signal</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Caduceus RPM Bluetooth Doppler Connected</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
