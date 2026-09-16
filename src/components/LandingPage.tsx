import React from 'react';
import {
  Heart,
  Activity,
  Stethoscope,
  ShoppingBag,
  ShieldCheck,
  Bell,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import type { AppView } from '../types';
import { DEMO_ACCOUNT } from '../context/AuthContext';

interface LandingPageProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

const features = [
  {
    icon: Heart,
    title: 'Fetal & Maternal Tracking',
    body: 'Kick counters, contraction timers and ACOG-aligned week-by-week milestones that update as your pregnancy progresses.',
    accent: 'from-rose-500 to-pink-500',
  },
  {
    icon: Activity,
    title: 'Remote Patient Monitoring',
    body: 'Log blood pressure, glucose and weight from home. Readings sync to your care team and flag out-of-range trends early.',
    accent: 'from-amber-500 to-orange-500',
  },
  {
    icon: Stethoscope,
    title: 'OBGYN Clinical Portal',
    body: 'A cohort dashboard for clinicians showing risk status, last sync time and RPM billing readiness for every patient.',
    accent: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Sparkles,
    title: '24/7 Doula & Care Navigator',
    body: 'Message an assigned doula any time and get personalised micro-nudges for hydration, movement and rest.',
    accent: 'from-purple-500 to-fuchsia-500',
  },
  {
    icon: ShoppingBag,
    title: 'Care Marketplace',
    body: 'Book lactation consultants, pelvic floor therapy and mental health support — with insurance coverage shown upfront.',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Screening & Escalation',
    body: 'Automated preeclampsia screening plus a one-tap maternal emergency triage pathway when red flags appear.',
    accent: 'from-red-500 to-rose-600',
  },
];

const stats = [
  { value: '48 hrs', label: 'Average time to first clinician contact' },
  { value: '84%', label: 'Of maternal deaths are preventable (CDC)' },
  { value: '2 in 3', label: 'Moms flag a mental health concern postpartum' },
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  currentView,
  setCurrentView,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const navLinks: { key: AppView; label: string }[] = [
    { key: 'patient', label: 'App Demo' },
    { key: 'clinician', label: 'For Clinicians' },
    { key: 'marketplace', label: 'Marketplace' },
    { key: 'birth-plan', label: 'Birth Planning' },
    { key: 'community', label: 'Community' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Public navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 text-white shadow-md shadow-rose-200">
                <span className="text-xl">🐘</span>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-slate-800">
                    e<span className="text-rose-500">Lovu</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-rose-50 text-rose-600 rounded-md border-rose-200/60">
                    Health
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden sm:block font-medium">
                  FemTech Maternal Care & RPM Platform
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => setCurrentView(link.key)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    currentView === link.key
                      ? 'bg-rose-50 text-rose-600 border-rose-200/80'
                      : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Sign in
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-200 transition cursor-pointer"
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileNavOpen((open) => !open)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                aria-label="Toggle navigation"
              >
                {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileNavOpen && (
            <div className="lg:hidden py-3 border-t border-rose-100 flex-wrap gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => {
                    setCurrentView(link.key);
                    setMobileNavOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 -left-24 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border-rose-200/80">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              Continuous care from conception to fourth trimester
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
              Pregnancy care that
              <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                {' '}
                never clocks out
              </span>
              .
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              eLovu connects expecting mothers with their obstetricians, doulas and care navigators in
              one platform — combining remote monitoring, clinical escalation and everyday reassurance
              between appointments.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenAuth('signup')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-200 transition cursor-pointer"
              >
                Create free account
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenAuth('signin')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 bg-white border-slate-200 hover:border-rose-300 hover:text-rose-600 transition cursor-pointer"
              >
                Explore the demo
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Demo login:
              <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-slate-700">
                {DEMO_ACCOUNT.email}
              </code>
              /
              <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-slate-700">
                {DEMO_ACCOUNT.password}
              </code>
            </div>
          </div>

          {/* Mock app preview card */}
          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 p-1 shadow-2xl shadow-rose-200/60">
              <div className="rounded-[22px] bg-white p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Week 28 · Day 3
                    </p>
                    <p className="text-lg font-black text-slate-900">Good afternoon, Sarah 🌸</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border-emerald-200">
                    RPM Sync Active
                  </span>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border-rose-100 p-4 text-center">
                  <span className="text-5xl">🍆</span>
                  <p className="mt-2 text-sm font-bold text-slate-800">
                    Baby Theo is the size of an eggplant
                  </p>
                  <p className="text-xs text-rose-600 font-semibold">14.8 in · 2.2 lbs</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 border-slate-200/80 p-3">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Today's BP</p>
                    <p className="text-lg font-black text-slate-800">118/76</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">Optimal</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border-slate-200/80 p-3">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Kick Session</p>
                    <p className="text-lg font-black text-slate-800">10 / 18m</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">Target met</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 p-3.5 flex items-start gap-3">
                  <Bell className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">Doula message from Elena</p>
                    <p className="text-[11px] text-slate-400">
                      "Great job completing your kick count session today!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-3xl font-black text-rose-400">{stat.value}</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
            One connected platform
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Everything a mother needs, in one place
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Designed with maternal-fetal medicine physicians and doulas to close the gaps between
            prenatal appointments.
          </p>
        </div>

        <div className="mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-3xl bg-white border-slate-200/80 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/60 transition"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.accent} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 p-8 sm:p-12 text-center">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Start your care journey today
            </h2>
            <p className="mt-3 text-rose-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Create an account to explore the patient dashboard, clinical portal and care
              marketplace — no credit card required.
            </p>
            <button
              onClick={() => onOpenAuth('signup')}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-rose-600 bg-white hover:bg-rose-50 shadow-lg transition cursor-pointer"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-slate-800">
              e<span className="text-rose-500">Lovu</span>
            </span>
            <span className="text-xs text-slate-500">Health © 2026</span>
          </div>
          <p className="text-xs text-slate-500 text-center sm:text-right max-w-xl leading-relaxed">
            Demo clone built for learning purposes only. Not affiliated with e-Lovu Health. Not a
            medical device — never a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};
