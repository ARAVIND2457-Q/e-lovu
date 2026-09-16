import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AuthScreen } from './components/AuthScreen';
import { PatientDashboard } from './components/PatientDashboard';
import { ClinicianPortal } from './components/ClinicianPortal';
import { Marketplace } from './components/Marketplace';
import { BirthPlanning } from './components/BirthPlanning';
import { Community } from './components/Community';
import { EmergencyModal } from './components/EmergencyModal';
import { initialPatient } from './data/mockData';
import type { AppView } from './types';
import './App.css';

type Screen = 'landing' | 'auth';

const ElovuApp = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [screen, setScreen] = useState<Screen>('landing');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [currentView, setCurrentView] = useState<AppView>('patient');
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  // The signed-in account overlays the seeded demo patient so the dashboard
  // reflects the name and due date the user registered with.
  const patient = user
    ? { ...initialPatient, name: user.name, dueDate: user.dueDate || initialPatient.dueDate }
    : initialPatient;

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setScreen('auth');
  };

  if (!isAuthenticated) {
    if (screen === 'auth') {
      return (
        <AuthScreen
          initialMode={authMode}
          onSuccess={() => {
            setScreen('landing');
            setCurrentView('patient');
          }}
          onBack={() => setScreen('landing')}
        />
      );
    }

    return (
      <LandingPage onOpenAuth={openAuth} currentView={currentView} setCurrentView={setCurrentView} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-white">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        patient={patient}
        onOpenEmergency={() => setEmergencyOpen(true)}
      />

      {currentView === 'clinician' && <ClinicianPortal />}
      {currentView === 'marketplace' && <Marketplace />}
      {currentView === 'birth-plan' && <BirthPlanning />}
      {currentView === 'community' && <Community />}
      {currentView !== 'clinician' &&
        currentView !== 'marketplace' &&
        currentView !== 'birth-plan' &&
        currentView !== 'community' && <PatientDashboard patient={patient} />}

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <p className="text-xs text-slate-400 text-center sm:text-left max-w-xl leading-relaxed">
          Demo clone for learning purposes. Not affiliated with e-Lovu Health and not a medical
          device — never a substitute for professional medical advice.
        </p>
        <button
          onClick={signOut}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline transition cursor-pointer"
        >
          Sign out
        </button>
      </footer>

      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ElovuApp />
    </AuthProvider>
  );
}

export default App;
