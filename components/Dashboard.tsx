
import React, { useState } from 'react';
import { Clock, Coffee, ArrowRight, TrendingUp, CheckCircle, Key, X, UserCheck, Shield } from 'lucide-react';
import { UserProfile, BreakRecord, BreakType } from '../types';

interface DashboardProps {
  user: UserProfile;
  activeBreak: BreakRecord | null;
  history: BreakRecord[];
  onStart: (type: BreakType, tlCode: string, tlEmail: string) => void;
  onEnd: () => void;
}

const TEAM_LEADERS = [
  { name: 'DONI MAULANA PUTRA', email: 'doni.maulana@astro.com' },
  { name: 'Aditya Putra Nasution', email: 'aditya.putra@astro.com' },
  { name: 'Firmansyah', email: 'firmansyah@astro.com' },
  { name: 'ABDUL ROHMAN', email: 'abdul.rohman@astro.com' },
  { name: 'Vira Viruyani', email: 'vira.viruyani@astro.com' },
  { name: 'M Ramdan Prayogi', email: 'm.ramdan@astro.com' },
  { name: 'Bimo Husnanto', email: 'bimo.husnanto@astro.com' },
  { name: 'SYAHRONI', email: 'syahroni@astro.com' }
];

const Dashboard: React.FC<DashboardProps> = ({ user, activeBreak, history, onStart, onEnd }) => {
  const [selectedTL, setSelectedTL] = useState(TEAM_LEADERS[0].email);
  const [tlPassword, setTlPassword] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleInitialClick = () => {
    setShowVerification(true);
  };

  const handleConfirmStart = (e: React.FormEvent) => {
    e.preventDefault();
    const VALID_PASSWORD = '#BreakSatuJam';
    
    if (tlPassword === VALID_PASSWORD) {
      onStart(BreakType.ISTIRAHAT, 'VERIFIED', selectedTL);
      setShowVerification(false);
      setTlPassword('');
    } else {
      alert('Password Verifikasi Salah! Silakan hubungi Team Leader Anda.');
      setTlPassword('');
    }
  };

  const totalBreakTime = history.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const breakCountToday = history.filter(h => new Date(h.startTime).toDateString() === new Date().toDateString()).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-black font-bold opacity-70 uppercase tracking-wider text-xs">Astro WH CBN Facility</p>
          <h1 className="text-3xl font-black text-black">{user.name}</h1>
        </div>
        <div className="flex items-center gap-2 text-black text-sm bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm font-bold">
          <Clock size={16} />
          <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
      </header>

      {activeBreak ? (
        <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Clock size={160} />
          </div>
          <div className="relative z-10">
            <span className="px-3 py-1 bg-white text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Sedang Istirahat Aktif</span>
            <h2 className="text-4xl font-black mt-4 mb-2">Istirahat</h2>
            <div className="flex flex-col gap-2 mb-6">
                <p className="text-indigo-100 font-bold flex items-center gap-2">
                    <Clock size={18} /> Dimulai: {new Date(activeBreak.startTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-white font-black flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-lg">
                    <Clock size={18} /> Harus Kembali: {new Date(activeBreak.startTime + 3600000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
            
            <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl mb-8 flex items-center gap-4 border border-white/20">
                <div className="bg-emerald-400 p-2 rounded-xl text-indigo-900">
                    <UserCheck size={20} />
                </div>
                <div>
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-80">Verified by Team Leader</p>
                    <p className="text-sm font-black">{TEAM_LEADERS.find(tl => tl.email === activeBreak.tlEmail)?.name || activeBreak.tlEmail}</p>
                </div>
            </div>

            <button 
              onClick={onEnd}
              className="bg-white text-indigo-700 font-black py-4 px-8 rounded-2xl hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg"
            >
              <ArrowRight size={20} />
              Selesaikan Istirahat
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
            <button
              onClick={handleInitialClick}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all text-center group flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-sm">
                <Coffee size={40} />
              </div>
              <h3 className="text-3xl font-black text-black">Mulai Istirahat</h3>
              <p className="text-black font-bold text-lg mt-2 opacity-60">Durasi: 1 Jam (60 Menit)</p>
              <div className="mt-8 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 flex items-center gap-3">
                  MULAI SEKARANG <ArrowRight size={20} />
              </div>
            </button>
        </div>
      )}

      {/* Verification Modal */}
      {showVerification && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in duration-200 border border-slate-200">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg">
                <Shield size={24} />
              </div>
              <button onClick={() => setShowVerification(false)} className="text-black hover:bg-slate-100 p-2 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <h3 className="text-2xl font-black text-black mb-2">Otorisasi Team Leader</h3>
            <p className="text-black font-bold opacity-70 mb-8 leading-relaxed">
              Silakan hubungi Team Leader Anda untuk memasukkan password verifikasi istirahat.
            </p>

            <form onSubmit={handleConfirmStart} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-black uppercase tracking-widest mb-3">Pilih Team Leader</label>
                <select 
                  value={selectedTL}
                  onChange={(e) => setSelectedTL(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-100 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 font-bold text-black appearance-none cursor-pointer"
                >
                  {TEAM_LEADERS.map(tl => (
                    <option key={tl.email} value={tl.email}>{tl.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-black uppercase tracking-widest mb-3">Password Verifikasi TL</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    autoFocus
                    type="password"
                    value={tlPassword}
                    onChange={(e) => setTlPassword(e.target.value)}
                    placeholder="Masukkan Password"
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-indigo-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 font-bold text-black text-lg"
                    required
                  />
                </div>
                <p className="text-[10px] text-center text-indigo-700 mt-4 font-black uppercase tracking-widest">Wajib diisi oleh Team Leader</p>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                KONFIRMASI & KELUAR
                <ArrowRight size={22} />
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-black">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs text-black font-black uppercase tracking-wider opacity-60">Total Istirahat</p>
            <p className="text-xl font-black text-black">{totalBreakTime} Menit</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
            <Coffee size={24} />
          </div>
          <div>
            <p className="text-xs text-black font-black uppercase tracking-wider opacity-60">Sesi Hari Ini</p>
            <p className="text-xl font-black text-black">{breakCountToday} Kali</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-black font-black uppercase tracking-wider opacity-60">Status ID</p>
            <p className="text-xl font-black text-emerald-600">Terverifikasi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
