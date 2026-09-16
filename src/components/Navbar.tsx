import React, { useState } from 'react';
import {
  Heart,
  Activity,
  Stethoscope,
  ShoppingBag,
  FileText,
  Users,
  Globe,
  AlertTriangle,
  Bell,
  ChevronDown,
  Calendar,
  PhoneCall
} from 'lucide-react';
import type { AppView, PatientProfile } from '../types';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  patient: PatientProfile;
  onOpenEmergency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  patient,
  onOpenEmergency
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Morning RPM Vitals Sync',
      desc: 'Blood pressure 118/76 recorded via Omron Cuff.',
      time: '15m ago',
      unread: true,
      type: 'vitals'
    },
    {
      id: 'n2',
      title: 'Ruth Health Doula Message',
      desc: 'Elena: "Great job completing your kick count session today!"',
      time: '1h ago',
      unread: true,
      type: 'doula'
    },
    {
      id: 'n3',
      title: 'Caduceus Care Navigator',
      desc: 'Upcoming 28-Week Glucose Challenge reminder for Mar 30.',
      time: '3h ago',
      unread: false,
      type: 'clinic'
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      {/* Top emergency announcement ticker */}
      <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white px-4 py-1.5 text-xs sm:text-sm font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-semibold tracking-wide uppercase">
            24/7 Clinical Support
          </span>
          <span>
            Caduceus Medical Group & Ruth Health Integrated Care • Direct OBGYN & Doula Access
          </span>
        </div>
        <button
          onClick={onOpenEmergency}
          className="hidden sm:inline-flex items-center gap-1.5 bg-white text-rose-600 font-bold px-2.5 py-0.5 rounded-full text-xs shadow-xs hover:bg-rose-50 transition cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
          Urgent Maternal Hotline
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('patient')}>
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
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-rose-50 text-rose-600 rounded-md border border-rose-200/60">
                  Health
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block font-medium">
                FemTech Maternal Care & RPM Platform
              </p>
            </div>
          </div>

          {/* Navigation Views */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setCurrentView('patient')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${currentView === 'patient'
                  ? 'bg-rose-50 text-rose-600 shadow-xs border border-rose-200/80'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
                }`}
            >
              <Heart className="w-4 h-4" />
              <span>My Pregnancy</span>
            </button>

            <button
              onClick={() => setCurrentView('clinician')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${currentView === 'clinician'
                  ? 'bg-rose-50 text-rose-600 shadow-xs border border-rose-200/80'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
                }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>OBGYN Clinical Portal</span>
              <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                Caduceus MFM
              </span>
            </button>

            <button
              onClick={() => setCurrentView('marketplace')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${currentView === 'marketplace'
                  ? 'bg-rose-50 text-rose-600 shadow-xs border border-rose-200/80'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
                }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Care Marketplace</span>
            </button>

            <button
              onClick={() => setCurrentView('birth-plan')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${currentView === 'birth-plan'
                  ? 'bg-rose-50 text-rose-600 shadow-xs border border-rose-200/80'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
                }`}
            >
              <FileText className="w-4 h-4" />
              <span>Birth Plan & Bags</span>
            </button>

            <button
              onClick={() => setCurrentView('community')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${currentView === 'community'
                  ? 'bg-rose-50 text-rose-600 shadow-xs border border-rose-200/80'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
                }`}
            >
              <Users className="w-4 h-4" />
              <span>Circles</span>
            </button>

            <button
              onClick={() => setCurrentView('public')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${currentView === 'public'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <Globe className="w-4 h-4" />
              <span>About eLovu</span>
            </button>
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Urgent Warning SOS Button */}
            <button
              onClick={onOpenEmergency}
              className="relative group p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200/80 transition cursor-pointer"
              title="Urgent Maternal Warning Signs & Crisis Hotline"
            >
              <AlertTriangle className="w-5 h-5 text-red-500 animate-bounce" />
              <span className="sr-only">Emergency Hotline</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-semibold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-rose-600 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3.5 hover:bg-slate-50/80 transition flex gap-3 ${item.unread ? 'bg-rose-50/30' : ''
                          }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                          {item.type === 'vitals' && <Activity className="w-4 h-4" />}
                          {item.type === 'doula' && <Heart className="w-4 h-4" />}
                          {item.type === 'clinic' && <Stethoscope className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">{item.desc}</p>
                          <span className="text-[10px] text-slate-400 font-medium mt-1 inline-block">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 pt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile & Portal Quick Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition cursor-pointer"
              >
                <img
                  src={patient.avatar}
                  alt={patient.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-rose-400"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {patient.name}
                  </div>
                  <div className="text-[10px] text-rose-600 font-medium">
                    Week {patient.gestationalWeek} • Caduceus MFM
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                  <div className="p-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl mb-2">
                    <p className="text-xs font-bold text-slate-800">{patient.name}</p>
                    <p className="text-[11px] text-slate-600">{patient.babyNameOrNickname}</p>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-rose-700 font-semibold">
                      <Calendar className="w-3 h-3" /> Due: {patient.dueDate}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setCurrentView('patient');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" /> Mom Patient View
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('clinician');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-indigo-600" /> OBGYN Clinician View (Dr. Pandipati)
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('marketplace');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" /> Ruth Health & Marketplace
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('public');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                    >
                      <Globe className="w-3.5 h-3.5 text-slate-700" /> Public Homepage & About eLovu
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View Switcher Tab Bar */}
        <div className="lg:hidden flex items-center justify-between py-2 border-t border-rose-100/80 overflow-x-auto space-x-1">
          <button
            onClick={() => setCurrentView('patient')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${currentView === 'patient' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-rose-50'
              }`}
          >
            My Journey
          </button>
          <button
            onClick={() => setCurrentView('clinician')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${currentView === 'clinician' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-rose-50'
              }`}
          >
            OBGYN Portal
          </button>
          <button
            onClick={() => setCurrentView('marketplace')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${currentView === 'marketplace' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-rose-50'
              }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setCurrentView('birth-plan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${currentView === 'birth-plan' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-rose-50'
              }`}
          >
            Birth Plan
          </button>
          <button
            onClick={() => setCurrentView('community')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${currentView === 'community' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-rose-50'
              }`}
          >
            Circles
          </button>
          <button
            onClick={() => setCurrentView('public')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${currentView === 'public' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            Overview
          </button>
        </div>
      </div>
    </header>
  );
};
