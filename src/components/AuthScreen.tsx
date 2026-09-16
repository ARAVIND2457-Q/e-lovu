import React, { useState } from 'react';
import { Heart, Mail, Lock, User, Calendar, ArrowRight, AlertCircle, X, Stethoscope } from 'lucide-react';
import { useAuth, DEMO_ACCOUNT, type UserRole } from '../context/AuthContext';

interface AuthScreenProps {
  initialMode: 'signin' | 'signup';
  onSuccess: () => void;
  onBack: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ initialMode, onSuccess, onBack }) => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('2026-06-18');
  const [role, setRole] = useState<UserRole>('patient');

  const switchMode = (next: 'signin' | 'signup') => {
    setMode(next);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp({ name, email, password, dueDate, role });
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setMode('signin');
    setError(null);
    setEmail(DEMO_ACCOUNT.email);
    setPassword(DEMO_ACCOUNT.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition cursor-pointer"
          >
            ← Back to home
          </button>
          <button
            onClick={onBack}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-rose-100/60 border-rose-100 overflow-hidden">
          {/* Brand header */}
          <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-rose-700 p-6 text-center">
            <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md mb-3">
              <span className="text-2xl">🐘</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-tight">
              {mode === 'signin' ? 'Welcome back to eLovu' : 'Join eLovu Health'}
            </h1>
            <p className="text-xs text-rose-100 mt-1">
              {mode === 'signin'
                ? 'Sign in to your maternal care dashboard'
                : 'Create your account in under a minute'}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="p-2 bg-slate-50 border-b border-slate-100 flex gap-1">
            {(['signin', 'signup'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => switchMode(tab)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  mode === tab
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border-red-200 text-xs text-red-800 font-medium">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {mode === 'signup' && (
              <>
                <label className="block">
                  <span className="text-xs font-bold text-slate-700">Full name</span>
                  <div className="mt-1.5 relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sarah Mitchell"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition placeholder:text-slate-400"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-slate-700">I am a</span>
                  <div className="mt-1.5 grid-cols-2 gap-2">
                    {(
                      [
                        { value: 'patient', label: 'Expecting mother', icon: Heart },
                        { value: 'clinician', label: 'Clinician', icon: Stethoscope },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setRole(option.value)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          role === option.value
                            ? 'bg-rose-50 text-rose-700 border-rose-300'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-rose-200'
                        }`}
                      >
                        <option.icon className="w-3.5 h-3.5" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </label>

                {role === 'patient' && (
                  <label className="block">
                    <span className="text-xs font-bold text-slate-700">Estimated due date</span>
                    <div className="mt-1.5 relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition"
                      />
                    </div>
                  </label>
                )}
              </>
            )}

            <label className="block">
              <span className="text-xs font-bold text-slate-700">Email address</span>
              <div className="mt-1.5 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition placeholder:text-slate-400"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-bold text-slate-700">Password</span>
              <div className="mt-1.5 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100 transition placeholder:text-slate-400"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-200 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  {mode === 'signin' ? 'Signing in…' : 'Creating account…'}
                </>
              ) : (
                <>
                  {mode === 'signin' ? 'Sign in' : 'Create account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {mode === 'signin' && (
              <button
                type="button"
                onClick={fillDemo}
                className="w-full py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border-rose-200 transition cursor-pointer"
              >
                Use demo credentials ({DEMO_ACCOUNT.email})
              </button>
            )}

            <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
              Demo app — credentials are stored locally in your browser only. No real patient data is
              used or transmitted.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
