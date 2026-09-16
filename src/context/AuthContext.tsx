import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type UserRole = 'patient' | 'clinician';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  /** ISO date; used to derive gestational progress on the dashboard. */
  dueDate: string;
  clinicName: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (input: SignUpInput) => Promise<AuthUser>;
  signOut: () => void;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  dueDate: string;
  role: UserRole;
}

const STORAGE_KEY = 'elovu.session.v1';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/** Demo-only credential check. There is no backend in this clone. */
const DEMO_ACCOUNT = {
  email: 'sarah@elovu.com',
  password: 'lovu1234',
};

const DEMO_USER: AuthUser = {
  id: 'pat-10492',
  name: 'Sarah Mitchell',
  email: DEMO_ACCOUNT.email,
  role: 'patient',
  dueDate: '2026-06-18',
  clinicName: 'Caduceus Maternal Care Center',
};

const fallbackNameFromEmail = (email: string) => {
  const handle = email.split('@')[0] || 'there';
  return handle
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable (private mode) — session stays in memory only */
    }
  }, [user]);

  /** Simulates network latency so loading states are visible in the UI. */
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const signIn = async (email: string, password: string): Promise<AuthUser> => {
    await wait(700);
    const normalized = email.trim().toLowerCase();

    if (!normalized.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    // Any valid-looking credentials work; the demo account maps to the seeded patient.
    const isDemo = normalized === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password;
    const nextUser: AuthUser = isDemo
      ? DEMO_USER
      : {
          ...DEMO_USER,
          id: `pat-${Math.floor(10000 + Math.random() * 89999)}`,
          name: fallbackNameFromEmail(normalized),
          email: normalized,
        };

    setUser(nextUser);
    return nextUser;
  };

  const signUp = async (input: SignUpInput): Promise<AuthUser> => {
    await wait(900);

    const normalized = input.email.trim().toLowerCase();
    if (!normalized.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (input.password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }
    if (!input.name.trim()) {
      throw new Error('Please tell us your name.');
    }

    const nextUser: AuthUser = {
      ...DEMO_USER,
      id: `pat-${Math.floor(10000 + Math.random() * 89999)}`,
      name: input.name.trim(),
      email: normalized,
      role: input.role,
      dueDate: input.dueDate || DEMO_USER.dueDate,
    };

    setUser(nextUser);
    return nextUser;
  };

  const signOut = () => setUser(null);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: Boolean(user), signIn, signUp, signOut }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>.');
  return ctx;
};

export { DEMO_ACCOUNT };
