import React, { useMemo, useState } from 'react';
import {
  Stethoscope,
  Activity,
  Search,
  AlertTriangle,
  Phone,
  Video,
  Calendar,
  CheckCircle2,
  X,
  TrendingUp,
  Droplet,
  Weight,
  Heart,
  FileCheck2,
  MessageSquare,
  Clock,
  ArrowUpDown,
} from 'lucide-react';
import type { ClinicianPatientSummary } from '../types';
import { clinicianCohort } from '../data/mockData';

type RiskFilter = 'all' | 'critical' | 'elevated' | 'normal';
type SortKey = 'risk' | 'week' | 'sync';

const riskConfig: Record<
  ClinicianPatientSummary['riskStatus'],
  { label: string; chip: string; dot: string; rank: number }
> = {
  critical: {
    label: 'Critical',
    chip: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
    rank: 0,
  },
  elevated: {
    label: 'Elevated',
    chip: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    rank: 1,
  },
  normal: {
    label: 'Normal',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    rank: 2,
  },
};

const rpmConfig: Record<ClinicianPatientSummary['rpmStatus'], string> = {
  'billing-ready': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'needs-review': 'bg-amber-50 text-amber-700 border-amber-200',
  'on-track': 'bg-slate-100 text-slate-600 border-slate-200',
};

const alertConfig: Record<
  NonNullable<ClinicianPatientSummary['recentAlert']>['type'],
  { label: string; icon: React.ElementType }
> = {
  bp_spike: { label: 'BP spike', icon: Activity },
  reduced_fetal_movement: { label: 'Reduced movement', icon: Heart },
  elevated_glucose: { label: 'Elevated glucose', icon: Droplet },
  high_epds: { label: 'Elevated EPDS', icon: AlertTriangle },
};

/** Human label for an RPM status value like "billing-ready". */
const rpmLabel = (status: ClinicianPatientSummary['rpmStatus']) => status.split('-').join(' ');

/** Order index within the patient's reported sync string, e.g. "15 mins ago". */
const syncMinutes = (sync: string) => {
  const match = sync.match(/(\d+)\s*(min|hour)/i);
  if (!match) return 9999;
  const value = Number(match[1]);
  return match[2].toLowerCase().startsWith('hour') ? value * 60 : value;
};

interface ClinicianPortalProps {
  /** Called when the clinician wants to hand back to the patient-facing app. */
  onExit?: () => void;
}

export const ClinicianPortal: React.FC<ClinicianPortalProps> = () => {
  const [cohort] = useState<ClinicianPatientSummary[]>(clinicianCohort);
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('all');
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('risk');
  const [selected, setSelected] = useState<ClinicianPatientSummary | null>(null);
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});
  const [outreachLog, setOutreachLog] = useState<string[]>([]);

  const counts = useMemo(
    () => ({
      all: cohort.length,
      critical: cohort.filter((p) => p.riskStatus === 'critical').length,
      elevated: cohort.filter((p) => p.riskStatus === 'elevated').length,
      normal: cohort.filter((p) => p.riskStatus === 'normal').length,
    }),
    [cohort],
  );

  const alertsToday = cohort.filter((p) => p.recentAlert && !acknowledged[p.id]);
  const billingReady = cohort.filter((p) => p.rpmStatus === 'billing-ready');
  const totalRpmMinutes = cohort.reduce((sum, p) => sum + p.rpmMinutesCurrentMonth, 0);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cohort
      .filter((p) => (riskFilter === 'all' ? true : p.riskStatus === riskFilter))
      .filter((p) => (q ? p.name.toLowerCase().includes(q) || p.id.includes(q) : true))
      .sort((a, b) => {
        if (sortKey === 'risk') {
          const byRisk = riskConfig[a.riskStatus].rank - riskConfig[b.riskStatus].rank;
          if (byRisk !== 0) return byRisk;
          return b.gestationalWeek - a.gestationalWeek;
        }
        if (sortKey === 'week') return b.gestationalWeek - a.gestationalWeek;
        return syncMinutes(a.lastSyncTime) - syncMinutes(b.lastSyncTime);
      });
  }, [cohort, riskFilter, query, sortKey]);

  const logOutreach = (patient: ClinicianPatientSummary, channel: string) => {
    setOutreachLog((prev) => [
      `${channel} → ${patient.name} (${patient.id}) at ${new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })}`,
      ...prev,
    ]);
  };

  const metrics = [
    {
      label: 'Active cohort',
      value: cohort.length,
      sub: `${billingReady.length} RPM billing-ready`,
      icon: Stethoscope,
      tone: 'text-indigo-600 bg-indigo-50',
    },
    {
      label: 'Open alerts',
      value: alertsToday.length,
      sub: alertsToday.length ? 'Awaiting clinician review' : 'All alerts acknowledged',
      icon: AlertTriangle,
      tone: 'text-red-600 bg-red-50',
    },
    {
      label: 'Critical risk',
      value: counts.critical,
      sub: 'Escalated to MFM on-call',
      icon: Activity,
      tone: 'text-rose-600 bg-rose-50',
    },
    {
      label: 'RPM minutes MTD',
      value: totalRpmMinutes,
      sub: 'Across all monitored patients',
      icon: TrendingUp,
      tone: 'text-emerald-600 bg-emerald-50',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Portal header */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/12 rounded-full blur-2xl pointer-events-none" />
        <div className="relative flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-bold uppercase tracking-wider border-white/15">
              <Stethoscope className="w-3.5 h-3.5 text-indigo-300" />
              Caduceus Medical Group · MFM
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight">
              OBGYN Clinical Portal
            </h1>
            <p className="mt-1.5 text-sm text-slate-400 max-w-2xl leading-relaxed">
              Remote monitoring cohort for Dr. Santosh Pandipati, MD (MFM). Review synced vitals,
              triage alerts and document RPM time before billing.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-white/5 border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                On-call clinician
              </p>
              <p className="text-sm font-bold text-white mt-0.5">Dr. S. Pandipati</p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-emerald-500/12 border-emerald-500/30">
              <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                Sync status
              </p>
              <p className="text-sm font-bold text-emerald-200 mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-3xl border-rose-100 p-5">
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${metric.tone}`}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-black text-slate-900">{metric.value}</p>
            <p className="text-xs font-bold text-slate-700 mt-0.5">{metric.label}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{metric.sub}</p>
          </div>
        ))}
      </div>

      {/* Alert triage queue */}
      <div className="bg-white rounded-3xl border-rose-100 overflow-hidden">
        <div className="p-5 border-b border-rose-100/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className="text-base font-bold text-slate-900">Alert Triage Queue</h2>
            {alertsToday.length > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                {alertsToday.length} open
              </span>
            )}
          </div>
          <span className="hidden sm:block text-[11px] text-slate-500 font-medium">
            Escalations routed to L&D triage
          </span>
        </div>

        {alertsToday.length === 0 ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="mt-2 text-sm font-bold text-slate-800">All alerts acknowledged</p>
            <p className="text-xs text-slate-500 mt-0.5">
              No outstanding red-flag escalations in this cohort.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {alertsToday.map((patient) => {
              const alert = patient.recentAlert!;
              const config = alertConfig[alert.type];
              const AlertIcon = config.icon;
              return (
                <div
                  key={patient.id}
                  className="p-5 flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <AlertIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">{patient.name}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-100 text-red-700">
                          {config.label}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {alert.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
                        {alert.message}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {patient.id} · Week {patient.gestationalWeek} · BP {patient.latestBp.systolic}/
                        {patient.latestBp.diastolic}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelected(patient)}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => logOutreach(patient, 'Called')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call
                    </button>
                    <button
                      onClick={() =>
                        setAcknowledged((prev) => ({ ...prev, [patient.id]: true }))
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 transition cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ack
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cohort table */}
      <div className="bg-white rounded-3xl border-rose-100 overflow-hidden">
        <div className="p-5 border-b border-rose-100/80 flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Patient Cohort</h2>
            <span className="text-[11px] font-semibold text-slate-500">
              {visible.length} of {cohort.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or MRN"
                className="pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 border-slate-200 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition placeholder:text-slate-400 w-full sm:w-52"
              />
            </div>

            <button
              onClick={() =>
                setSortKey((prev) => (prev === 'risk' ? 'week' : prev === 'week' ? 'sync' : 'risk'))
              }
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              title="Cycle sort order"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortKey === 'risk' ? 'By risk' : sortKey === 'week' ? 'By gestation' : 'By last sync'}
            </button>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100">
              {(['all', 'critical', 'elevated', 'normal'] as RiskFilter[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setRiskFilter(filter)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold capitalize transition cursor-pointer ${
                    riskFilter === filter
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter} ({counts[filter]})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-5 py-3">Patient</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">Gestation</th>
                <th className="px-4 py-3">Latest BP</th>
                <th className="px-4 py-3">Glucose</th>
                <th className="px-4 py-3">Kicks/hr</th>
                <th className="px-4 py-3">RPM</th>
                <th className="px-4 py-3">Next visit</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {visible.map((patient) => {
                const risk = riskConfig[patient.riskStatus];
                return (
                  <tr key={patient.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${risk.dot}`} />
                        <div>
                          <p className="text-sm font-bold text-slate-900">{patient.name}</p>
                          <p className="text-[11px] text-slate-400">
                            {patient.age} y/o · {patient.lastSyncTime}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${risk.chip}`}
                      >
                        {risk.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-slate-700">
                      {patient.gestationalWeek}w {patient.gestationalDay}d
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-bold text-slate-800">
                        {patient.latestBp.systolic}/{patient.latestBp.diastolic}
                      </p>
                      <p className="text-[10px] text-slate-400">MAP {patient.latestBp.map}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      {patient.latestGlucose !== undefined ? (
                        <span
                          className={`text-sm font-semibold ${
                            patient.latestGlucose > 130 ? 'text-red-600' : 'text-slate-700'
                          }`}
                        >
                          {patient.latestGlucose}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-sm font-semibold ${
                          patient.avgKickRatePerHour === 0
                            ? 'text-slate-400'
                            : patient.avgKickRatePerHour < 10
                              ? 'text-red-600'
                              : 'text-slate-700'
                        }`}
                      >
                        {patient.avgKickRatePerHour === 0 ? 'N/A' : patient.avgKickRatePerHour}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          rpmConfig[patient.rpmStatus]
                        }`}
                      >
                        {rpmLabel(patient.rpmStatus)}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {patient.rpmMinutesCurrentMonth} min MTD
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-600 font-medium">
                      {patient.nextAppointment}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelected(patient)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer"
                      >
                        Chart
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {visible.length === 0 && (
          <div className="p-10 text-center">
            <Search className="w-7 h-7 text-slate-300 mx-auto" />
            <p className="mt-2 text-sm font-bold text-slate-700">No patients match</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Try a different name, MRN or risk filter.
            </p>
          </div>
        )}
      </div>

      {/* Outreach activity log */}
      {outreachLog.length > 0 && (
        <div className="bg-white rounded-3xl border-rose-100 p-5">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-600" /> Outreach Activity (this session)
          </h2>
          <ul className="mt-3 space-y-1.5">
            {outreachLog.map((entry, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {entry}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Patient chart drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-xl h-full overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-start justify-between sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black">{selected.name}</h2>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      riskConfig[selected.riskStatus].chip
                    }`}
                  >
                    {riskConfig[selected.riskStatus].label}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {selected.id} · {selected.age} y/o · Week {selected.gestationalWeek},{' '}
                  {selected.gestationalDay}d · Synced {selected.lastSyncTime}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                aria-label="Close chart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-rose-50/60 border-rose-100">
                  <Activity className="w-4 h-4 text-rose-600" />
                  <p className="text-[10px] uppercase font-bold text-slate-500 mt-1.5">BP / MAP</p>
                  <p className="text-lg font-black text-slate-800">
                    {selected.latestBp.systolic}/{selected.latestBp.diastolic}
                  </p>
                  <p className="text-[10px] text-slate-500">MAP {selected.latestBp.map}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-indigo-50/60 border-indigo-100">
                  <Droplet className="w-4 h-4 text-indigo-600" />
                  <p className="text-[10px] uppercase font-bold text-slate-500 mt-1.5">Glucose</p>
                  <p className="text-lg font-black text-slate-800">
                    {selected.latestGlucose !== undefined ? selected.latestGlucose : '—'}
                  </p>
                  <p className="text-[10px] text-slate-500">mg/dL</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border-emerald-100">
                  <Weight className="w-4 h-4 text-emerald-600" />
                  <p className="text-[10px] uppercase font-bold text-slate-500 mt-1.5">Weight</p>
                  <p className="text-lg font-black text-slate-800">{selected.latestWeight}</p>
                  <p className="text-[10px] text-slate-500">lbs</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Risk Factors
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {selected.riskFactors.map((factor) => (
                    <li
                      key={factor}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border-slate-200/80 text-xs font-medium text-slate-700"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              {selected.recentAlert && (
                <div className="p-4 rounded-2xl bg-red-50 border-red-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold text-red-800">
                      {alertConfig[selected.recentAlert.type].label}
                    </p>
                    <span className="text-[10px] text-red-600 font-medium ml-auto">
                      {selected.recentAlert.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-red-900 mt-1.5 leading-relaxed">
                    {selected.recentAlert.message}
                  </p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 border-slate-200/80 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Monitoring & Billing
                </h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Avg kick rate</span>
                  <span className="font-bold text-slate-800">
                    {selected.avgKickRatePerHour === 0
                      ? 'Not applicable'
                      : `${selected.avgKickRatePerHour}/hr`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">RPM minutes this month</span>
                  <span className="font-bold text-slate-800">
                    {selected.rpmMinutesCurrentMonth} min
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">RPM status</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      rpmConfig[selected.rpmStatus]
                    }`}
                  >
                    {rpmLabel(selected.rpmStatus)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-200">
                  <span className="text-slate-600 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Next appointment
                  </span>
                  <span className="font-bold text-slate-800">{selected.nextAppointment}</span>
                </div>
              </div>

              <div className="grid-cols-2 gap-2">
                <button
                  onClick={() => logOutreach(selected, 'Video call')}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" /> Start telehealth
                </button>
                <button
                  onClick={() => logOutreach(selected, 'Note filed')}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5" /> File note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
