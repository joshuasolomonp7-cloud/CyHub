import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  ShieldCheck, 
  Lock, 
  CheckCircle, 
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Expert } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  expert: Expert | null;
  initialSessionType?: 'consultation' | 'mentorship-class' | 'rapid-triage';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  expert,
  initialSessionType = 'consultation',
}) => {
  const [sessionType, setSessionType] = useState<string>(
    initialSessionType === 'mentorship-class' ? '60min-class' : '60min-consult'
  );

  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow');
  const [selectedTime, setSelectedTime] = useState<string>('14:00 (2:00 PM IST)');
  const [clientGoal, setClientGoal] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  if (!isOpen || !expert) return null;

  const datesList = [
    { label: 'Today', sub: 'Rapid Triage', date: 'Same Day' },
    { label: 'Tomorrow', sub: 'Recommended', date: 'Next Day' },
    { label: 'Wednesday', sub: 'Open Slots', date: 'Standard' },
    { label: 'Thursday', sub: 'Open Slots', date: 'Standard' },
  ];

  const timeSlots = [
    '10:00 AM IST',
    '11:30 AM IST',
    '02:30 PM IST',
    '04:30 PM IST',
    '07:00 PM IST'
  ];

  // Base price in INR (₹)
  let basePrice = expert.hourlyRate;
  let sessionLabel = '60-Minute Security Consultation';

  if (sessionType === '30min-triage') {
    basePrice = Math.round(expert.hourlyRate * 0.55);
    sessionLabel = '30-Minute Rapid Triage Slot';
  } else if (sessionType === 'starter-bundle') {
    basePrice = 2999;
    sessionLabel = 'Security Starter Bundle (Fixed-Scope)';
  } else if (sessionType === '60min-class') {
    basePrice = expert.hourlyRate;
    sessionLabel = '1-on-1 Hands-On Mentoring & Lab Walkthrough';
  }

  const escrowFee = Math.round(basePrice * 0.05); // 5% escrow dispute handling
  const totalPrice = basePrice + escrowFee;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-xl bg-white border border-slate-200 shadow-2xl modal-content overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-5 pb-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={expert.avatar} 
              alt={expert.name} 
              className="w-11 h-11 rounded-lg object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{expert.name}</h3>
                <span className="text-amber-500 text-xs font-mono font-bold">★ {expert.rating.toFixed(2)}</span>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {expert.title} • {expert.location}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {isBooked ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Escrow Booking Confirmed!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your payment of <strong className="text-slate-900 font-mono">₹{totalPrice.toLocaleString('en-IN')}</strong> is securely locked in escrow. An encrypted calendar invite and conference link have been dispatched to your email.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-600 space-y-1">
                <div>Date: <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong></div>
                <div>Session: <strong>{sessionLabel}</strong></div>
                <div>Specialist Payout: <strong>85% (₹{Math.round(basePrice * 0.85).toLocaleString('en-IN')})</strong> released upon sign-off.</div>
              </div>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              {/* Session Type Selector */}
              <div>
                <label className="block text-xs font-mono text-slate-700 font-bold mb-1.5">
                  Choose Engagement Type:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div
                    onClick={() => setSessionType('60min-consult')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      sessionType === '60min-consult'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold">Standard Session</div>
                    <div className="text-[11px] font-mono mt-0.5">₹{expert.hourlyRate.toLocaleString('en-IN')}</div>
                  </div>

                  <div
                    onClick={() => setSessionType('30min-triage')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      sessionType === '30min-triage'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold">30-Min Rapid Triage</div>
                    <div className="text-[11px] font-mono mt-0.5">₹{Math.round(expert.hourlyRate * 0.55).toLocaleString('en-IN')}</div>
                  </div>

                  <div
                    onClick={() => setSessionType('starter-bundle')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      sessionType === 'starter-bundle'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold">Security Starter</div>
                    <div className="text-[11px] font-mono mt-0.5">₹2,999 (Fixed)</div>
                  </div>
                </div>
              </div>

              {/* Date & Time Slot Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1.5 flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5 text-slate-500" /> Choose Date
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {datesList.map((d) => (
                      <div
                        key={d.label}
                        onClick={() => setSelectedDate(`${d.label}`)}
                        className={`p-2 rounded-lg border text-center cursor-pointer text-xs ${
                          selectedDate === d.label
                            ? 'bg-slate-900 text-white font-bold border-slate-900'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-semibold">{d.label}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{d.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 font-bold mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> Time Slot (IST)
                  </label>
                  <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-1.5 rounded-md border text-xs font-mono text-center cursor-pointer ${
                          selectedTime === time
                            ? 'bg-slate-900 text-white font-bold border-slate-900'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scope Notes */}
              <div>
                <label className="block text-xs font-mono text-slate-700 font-bold mb-1">
                  Primary Engagement Objective:
                </label>
                <textarea
                  rows={2}
                  required
                  value={clientGoal}
                  onChange={(e) => setClientGoal(e.target.value)}
                  placeholder="e.g., We need DPDP Act data mapping advice, external firewall port audit, or 1-on-1 CEH lab guidance."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 font-sans"
                ></textarea>
              </div>

              {/* Escrow Pricing Summary */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Specialist Fee ({sessionLabel}):</span>
                  <span className="font-mono text-slate-900 font-bold">₹{basePrice.toLocaleString('en-IN')}.00</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Specialist Retains (85%):</span>
                  <span className="font-mono text-emerald-700 font-medium">₹{Math.round(basePrice * 0.85).toLocaleString('en-IN')}.00</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Escrow Vault & Dispute Protection (5%):
                  </span>
                  <span className="font-mono text-slate-700">₹{escrowFee.toLocaleString('en-IN')}.00</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
                  <span>Total Amount in Escrow:</span>
                  <span className="font-mono text-slate-900">₹{totalPrice.toLocaleString('en-IN')}.00</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-0.5">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  Funds remain protected in zero-interest escrow and release only upon your sign-off.
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Zap className="w-4 h-4 text-sky-400" />
                <span>Confirm Escrow Appointment</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
