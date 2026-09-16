import React, { useMemo, useState } from 'react';
import {
  Activity,
  Heart,
  Timer,
  X,
  TrendingUp,
  Droplet,
  Weight,
  CheckCircle2,
  Plus,
  Stethoscope,
} from 'lucide-react';
import { HeroBanner } from './HeroBanner';
import { WeekNavigator } from './WeekNavigator';
import type { ContractionRecord, KickRecord, PatientProfile, VitalsRecord } from '../types';
import { initialKicks, initialVitals, weekMilestones } from '../data/mockData';

interface PatientDashboardProps {
  patient: PatientProfile;
}

type ModalKind = 'vitals' | 'kick' | 'contraction' | null;

const riskStyles: Record<VitalsRecord['status'], string> = {
  normal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  elevated: 'bg-amber-50 text-amber-700 border-amber-200',
  'high-risk': 'bg-red-50 text-red-700 border-red-200',
};

const classifyBp = (systolic: number, diastolic: number): VitalsRecord['status'] => {
  if (systolic >= 140 || diastolic >= 90) return 'high-risk';
  if (systolic >= 130 || diastolic >= 85) return 'elevated';
  return 'normal';
};

/** Mean arterial pressure, used for the same MAP value shown in seeded data. */
const meanArterialPressure = (systolic: number, diastolic: number) =>
  Math.round(((systolic + 2 * diastolic) / 3) * 10) / 10;

/** "YYYY-MM-DD HH:mm" in local time, matching the seeded record format. */
const formatTimestamp = (date = new Date()) => {
  const pad = (value: number) => String(value).padStart(2, '0');
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    ` ${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
};

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient }) => {
  const [modal, setModal] = useState<ModalKind>(null);
  const [vitals, setVitals] = useState<VitalsRecord[]>(initialVitals);
  const [kicks, setKicks] = useState<KickRecord[]>(initialKicks);
  const [contractions, setContractions] = useState<ContractionRecord[]>([]);
  const [selectedWeek, setSelectedWeek] = useState(patient.gestationalWeek);

  const milestone = weekMilestones[selectedWeek] ?? weekMilestones[patient.gestationalWeek];

  // Shared form state for the three logging modals.
  const [systolic, setSystolic] = useState('118');
  const [diastolic, setDiastolic] = useState('76');
  const [heartRate, setHeartRate] = useState('74');
  const [glucose, setGlucose] = useState('');
  const [weight, setWeight] = useState(String(patient.currentWeight));
  const [kickMinutes, setKickMinutes] = useState('20');
  const [kickCount, setKickCount] = useState('10');
  const [contractionSeconds, setContractionSeconds] = useState('60');
  const [contractionInterval, setContractionInterval] = useState('5');

  const latestVitals = vitals[0];
  const latestKick = kicks[0];

  const averages = useMemo(() => {
    const recent = vitals.slice(0, 7);
    if (!recent.length) return { systolic: 0, diastolic: 0, glucose: 0 };
    const sum = (pick: (record: VitalsRecord) => number) =>
      recent.reduce((total, record) => total + pick(record), 0) / recent.length;
    return {
      systolic: Math.round(sum((r) => r.systolic)),
      diastolic: Math.round(sum((r) => r.diastolic)),
      glucose: Math.round(sum((r) => r.glucose ?? 0)),
    };
  }, [vitals]);

  const closeModal = () => setModal(null);

  const saveVitals = (event: React.FormEvent) => {
    event.preventDefault();
    const sys = Number(systolic);
    const dia = Number(diastolic);

    const record: VitalsRecord = {
      id: `vit-${Date.now()}`,
      timestamp: formatTimestamp(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      systolic: sys,
      diastolic: dia,
      heartRate: Number(heartRate),
      glucose: glucose ? Number(glucose) : undefined,
      glucoseType: glucose ? 'fasting' : undefined,
      weight: weight ? Number(weight) : undefined,
      map: meanArterialPressure(sys, dia),
      status: classifyBp(sys, dia),
      notes: 'Logged from the patient dashboard.',
    };

    setVitals((prev) => [record, ...prev]);
    closeModal();
  };

  const saveKicks = (event: React.FormEvent) => {
    event.preventDefault();
    const count = Number(kickCount);
    const record: KickRecord = {
      id: `kick-${Date.now()}`,
      date: `Today, ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`,
      startTime: new Date().toTimeString().slice(0, 5),
      durationMinutes: Number(kickMinutes),
      kickCount: count,
      kicksTimestamps: Array.from({ length: count }, (_, i) => i + 1),
      intensity: count >= 10 ? 'strong' : count >= 6 ? 'moderate' : 'light',
      notes: 'Session logged from the dashboard.',
    };
    setKicks((prev) => [record, ...prev]);
    closeModal();
  };

  const saveContraction = (event: React.FormEvent) => {
    event.preventDefault();
    const record: ContractionRecord = {
      id: `cnt-${Date.now()}`,
      timestamp: formatTimestamp(),
      durationSeconds: Number(contractionSeconds),
      intervalMinutes: Number(contractionInterval),
      intensity: Number(contractionSeconds) >= 60 ? 'strong' : 'moderate',
    };
    setContractions((prev) => [record, ...prev]);
    closeModal();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <HeroBanner
        patient={{ ...patient, gestationalWeek: selectedWeek }}
        milestone={milestone}
        onOpenVitalsModal={() => setModal('vitals')}
        onOpenKickCounter={() => setModal('kick')}
        onOpenContractionTimer={() => setModal('contraction')}
        onOpenAiNavigator={() => setModal('vitals')}
        onOpenDoulaChat={() => setModal('kick')}
        onOpenRiskAssessment={() => setModal('vitals')}
      />

      <WeekNavigator currentWeek={selectedWeek} onSelectWeek={setSelectedWeek} />

      {/* Vitals summary */}
      <div className="grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl border-rose-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-rose-100/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-500" />
              <h2 className="text-base font-bold text-slate-900">Remote Monitoring Log</h2>
            </div>
            <button
              onClick={() => setModal('vitals')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add reading
            </button>
          </div>

          <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
            {vitals.slice(0, 8).map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/60 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {record.systolic}/{record.diastolic}
                      <span className="text-xs font-medium text-slate-400 ml-1.5">mmHg</span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {record.timestamp} · MAP {record.map ?? meanArterialPressure(record.systolic, record.diastolic)}
                      {record.weight ? ` · ${record.weight} lbs` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {record.glucose !== undefined && (
                    <span className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                      <Droplet className="w-3.5 h-3.5 text-indigo-500" />
                      {record.glucose} mg/dL
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${riskStyles[record.status]}`}
                  >
                    {record.status === 'high-risk' ? 'high risk' : record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border-rose-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-rose-500" /> 7-Day Averages
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">Blood pressure</span>
                <span className="text-sm font-black text-slate-800">
                  {averages.systolic}/{averages.diastolic}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-indigo-500" /> Fasting glucose
                </span>
                <span className="text-sm font-black text-slate-800">{averages.glucose} mg/dL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                  <Weight className="w-3.5 h-3.5 text-emerald-500" /> Current weight
                </span>
                <span className="text-sm font-black text-slate-800">
                  {latestVitals?.weight ?? patient.currentWeight} lbs
                </span>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 border-emerald-200 text-[11px] text-emerald-900 font-medium">
              Target gain for your BMI: {patient.targetWeightGainRange[0]}–{patient.targetWeightGainRange[1]} lbs
            </div>
          </div>

          <div className="bg-white rounded-3xl border-rose-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-500" /> Movement & Contractions
            </h2>
            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-2xl bg-pink-50/60 border-pink-100">
                <p className="text-[10px] uppercase font-bold text-pink-700">Latest kick session</p>
                <p className="text-lg font-black text-slate-800">
                  {latestKick ? `${latestKick.kickCount} kicks / ${latestKick.durationMinutes}m` : '—'}
                </p>
                <p className="text-[11px] text-slate-500">{latestKick?.date}</p>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50/60 border-amber-100">
                <p className="text-[10px] uppercase font-bold text-amber-700">
                  Contractions logged today
                </p>
                <p className="text-lg font-black text-slate-800">{contractions.length}</p>
                <p className="text-[11px] text-slate-500">
                  {contractions.length >= 3
                    ? 'Follow the 5-1-1 rule and call L&D triage'
                    : 'Nothing meeting the 5-1-1 labor rule yet'}
                </p>
              </div>
              <div className="grid-cols-2 gap-2">
                <button
                  onClick={() => setModal('kick')}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-pink-500 text-white hover:bg-pink-600 transition cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5" /> Kick counter
                </button>
                <button
                  onClick={() => setModal('contraction')}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 transition cursor-pointer"
                >
                  <Timer className="w-3.5 h-3.5" /> Timer
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-5 text-white">
            <h2 className="text-sm font-bold flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-rose-400" /> Your Care Team
            </h2>
            <div className="mt-3 space-y-2.5 text-xs">
              <div>
                <p className="text-slate-400">OBGYN</p>
                <p className="font-semibold text-white">{patient.assignedObgyn}</p>
              </div>
              <div>
                <p className="text-slate-400">Doula</p>
                <p className="font-semibold text-white">{patient.assignedDoula}</p>
              </div>
              <div>
                <p className="text-slate-400">Clinic</p>
                <p className="font-semibold text-white">{patient.clinicName}</p>
              </div>
              <div className="pt-1 border-t border-slate-800">
                <p className="text-slate-400">Emergency contact</p>
                <p className="font-semibold text-white">
                  {patient.emergencyContact.name} · {patient.emergencyContact.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logging modals */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border-rose-100">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  {modal === 'vitals' && <Activity className="w-5 h-5" />}
                  {modal === 'kick' && <Heart className="w-5 h-5" />}
                  {modal === 'contraction' && <Timer className="w-5 h-5" />}
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  {modal === 'vitals' && 'Log RPM Vitals'}
                  {modal === 'kick' && 'Kick Count Session'}
                  {modal === 'contraction' && 'Contraction Timer'}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={
                modal === 'vitals' ? saveVitals : modal === 'kick' ? saveKicks : saveContraction
              }
              className="p-5 space-y-4"
            >
              {modal === 'vitals' && (
                <>
                  <div className="grid-cols-3 gap-3">
                    {[
                      { label: 'Systolic', value: systolic, set: setSystolic },
                      { label: 'Diastolic', value: diastolic, set: setDiastolic },
                      { label: 'Heart rate', value: heartRate, set: setHeartRate },
                    ].map((field) => (
                      <label key={field.label} className="block">
                        <span className="text-[11px] font-bold text-slate-600">{field.label}</span>
                        <input
                          type="number"
                          required
                          value={field.value}
                          onChange={(e) => field.set(e.target.value)}
                          className="mt-1 w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition"
                        />
                      </label>
                    ))}
                  </div>
                  <div className="grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-[11px] font-bold text-slate-600">
                        Glucose (optional)
                      </span>
                      <input
                        type="number"
                        value={glucose}
                        onChange={(e) => setGlucose(e.target.value)}
                        placeholder="mg/dL"
                        className="mt-1 w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition placeholder:text-slate-400"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-bold text-slate-600">Weight (lbs)</span>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="mt-1 w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition"
                      />
                    </label>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border-slate-200 text-[11px] text-slate-600 font-medium">
                    Status will be auto-classified as{' '}
                    <strong>{classifyBp(Number(systolic), Number(diastolic))}</strong> · MAP{' '}
                    {meanArterialPressure(Number(systolic), Number(diastolic))}
                  </div>
                </>
              )}

              {modal === 'kick' && (
                <>
                  <div className="grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-[11px] font-bold text-slate-600">Kicks felt</span>
                      <input
                        type="number"
                        required
                        value={kickCount}
                        onChange={(e) => setKickCount(e.target.value)}
                        className="mt-1 w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-bold text-slate-600">
                        Session length (min)
                      </span>
                      <input
                        type="number"
                        required
                        value={kickMinutes}
                        onChange={(e) => setKickMinutes(e.target.value)}
                        className="mt-1 w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition"
                      />
                    </label>
                  </div>
                  <div className="p-3 rounded-xl bg-pink-50 border-pink-200 text-[11px] text-pink-900 font-medium">
                    ACOG guidance: ten distinct movements within two hours. Anything less warrants a
                    call to your care team.
                  </div>
                </>
              )}

              {modal === 'contraction' && (
                <>
                  <div className="grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-[11px] font-bold text-slate-600">Duration (seconds)</span>
                      <input
                        type="number"
                        required
                        value={contractionSeconds}
                        onChange={(e) => setContractionSeconds(e.target.value)}
                        className="mt-1 w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-bold text-slate-600">
                        Minutes since last
                      </span>
                      <input
                        type="number"
                        required
                        value={contractionInterval}
                        onChange={(e) => setContractionInterval(e.target.value)}
                        className="mt-1 w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition"
                      />
                    </label>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border-amber-200 text-[11px] text-amber-900 font-medium">
                    The 5-1-1 rule: contractions every 5 minutes, lasting 1 minute, for 1 hour —
                    that's your cue to head in.
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Save entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
