import React, { useState } from 'react';
import {
  AlertTriangle,
  Phone,
  X,
  PhoneCall,
  MapPin,
  HeartHandshake,
  ShieldAlert
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const [activeCall, setActiveCall] = useState<string | null>(null);

  if (!isOpen) return null;

  const warningSigns = [
    {
      title: 'Severe headache that won’t go away with medication',
      severity: 'Preeclampsia Warning Sign',
      urgent: true
    },
    {
      title: 'Changes in vision: blurriness, seeing spots, flashing lights',
      severity: 'Preeclampsia Warning Sign',
      urgent: true
    },
    {
      title: 'Noticeable decrease or absence of baby movement (< 10 kicks in 2h)',
      severity: 'Fetal Well-being Concern',
      urgent: true
    },
    {
      title: 'Sudden severe swelling of face, fingers, hands or upper legs',
      severity: 'Fluid Retention / Preeclampsia',
      urgent: true
    },
    {
      title: 'Heavy vaginal bleeding, gush of fluid, or continuous fluid leak',
      severity: 'Placenta / Rupture of Membranes',
      urgent: true
    },
    {
      title: 'Trouble breathing, severe chest tightness, or racing heartbeat',
      severity: 'Cardiovascular / Pulmonary Risk',
      urgent: true
    },
    {
      title: 'Severe upper stomach pain (under your right ribs)',
      severity: 'HELLP / Liver Concern',
      urgent: true
    },
    {
      title: 'Feelings of severe anxiety, hopelessness, or thoughts of hurting yourself',
      severity: 'Perinatal Crisis Support',
      urgent: true
    }
  ];

  const handleStartCall = (name: string) => {
    setActiveCall(name);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-red-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <ShieldAlert className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-1">
                ACOG Urgent Maternal Triage
              </div>
              <h2 className="text-2xl font-bold">Maternal Emergency & Warning Signs</h2>
              <p className="text-red-100 text-xs sm:text-sm mt-0.5">
                If you are experiencing any of the following symptoms, seek immediate clinical care.
              </p>
            </div>
          </div>
        </div>

        {/* Live Call Simulator Banner if Active */}
        {activeCall && (
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <PhoneCall className="w-6 h-6 animate-spin" />
              <div>
                <p className="font-bold text-sm">Connected to: {activeCall}</p>
                <p className="text-xs text-emerald-100">Live Clinical Triage Line • Call in progress</p>
              </div>
            </div>
            <button
              onClick={() => setActiveCall(null)}
              className="bg-white text-emerald-700 font-bold px-3 py-1.5 rounded-xl text-xs hover:bg-emerald-50 cursor-pointer"
            >
              End Call
            </button>
          </div>
        )}

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Direct Calling Actions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              1-Tap Direct Clinical Connection
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleStartCall('Caduceus 24/7 Labor & Delivery Triage')}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-red-50 hover:bg-red-100/80 border border-red-200 text-left transition cursor-pointer group"
              >
                <div className="p-2.5 bg-red-600 text-white rounded-xl group-hover:scale-105 transition">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Caduceus L&D Triage</div>
                  <div className="text-[11px] text-red-700 font-semibold">+1 (800) 555-CADUCEUS</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">24/7 Dedicated Obstetric On-Call Nurse</p>
                </div>
              </button>

              <button
                onClick={() => handleStartCall('Ruth Health "Ask a Doula" Urgent Text')}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-left transition cursor-pointer group"
              >
                <div className="p-2.5 bg-rose-600 text-white rounded-xl group-hover:scale-105 transition">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Ruth Health Doula Dispatch</div>
                  <div className="text-[11px] text-rose-700 font-semibold">Priority SMS / Hotline</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Instant labor coping & calm triage</p>
                </div>
              </button>

              <button
                onClick={() => handleStartCall('988 National Maternal Mental Health Lifeline')}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-left transition cursor-pointer group"
              >
                <div className="p-2.5 bg-purple-600 text-white rounded-xl group-hover:scale-105 transition">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Maternal Mental Health Lifeline</div>
                  <div className="text-[11px] text-purple-700 font-semibold">Call or Text: 1-833-TLC-MAMA / 988</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Free, confidential perinatal counselors 24/7</p>
                </div>
              </button>

              <button
                onClick={() => handleStartCall('Emergency 911 / Ambulance')}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-left transition cursor-pointer group"
              >
                <div className="p-2.5 bg-red-500 text-white rounded-xl group-hover:scale-105 transition">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Call 911 Emergency</div>
                  <div className="text-[11px] text-red-300 font-semibold">Immediate Emergency Dispatch</div>
                  <p className="text-[10px] text-slate-400 mt-0.5">For life-threatening crisis or active delivery</p>
                </div>
              </button>
            </div>
          </div>

          {/* Urgent Warning Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Red-Flag Maternal Symptoms (CDC Hear Her Campaign)
              </h3>
            </div>
            <div className="space-y-2">
              {warningSigns.map((sign, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-red-300 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{sign.title}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-100 text-red-700 whitespace-nowrap ml-2">
                    {sign.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location / Nearest Facility Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <p className="font-bold">Your Designated Delivery Hospital:</p>
              <p className="mt-0.5">
                <strong>Hoag Memorial Hospital Presbyterian - Newport Beach / Caduceus L&D</strong>
              </p>
              <p className="text-amber-800 mt-0.5">One Hoag Dr, Newport Beach, CA 92663 • 12 mins away</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold transition cursor-pointer"
          >
            I Understand / Close
          </button>
        </div>
      </div>
    </div>
  );
};
