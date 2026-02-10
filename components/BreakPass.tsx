
import React, { useState, useEffect } from 'react';
import { QrCode, Shield, CheckCircle, Clock, AlertTriangle, RefreshCw, Heart, LogIn, UserCheck, FileText } from 'lucide-react';
import { UserProfile, BreakRecord, BreakType } from '../types';
import { getBreakAdvice } from '../services/wellnessService';

interface BreakPassProps {
  user: UserProfile;
  activeBreak: BreakRecord | null;
  onEnd: () => void;
  onStart: (type: BreakType) => void;
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

const BreakPass: React.FC<BreakPassProps> = ({ user, activeBreak, onEnd, onStart }) => {
  const [advice, setAdvice] = useState<{tip: string, quote: string} | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeBreak) {
      setLoadingAdvice(true);
      getBreakAdvice(activeBreak.type).then(data => {
        setAdvice(data);
        setLoadingAdvice(false);
      });
    }
  }, [activeBreak]);

  if (!activeBreak) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 mx-auto mb-6">
          <AlertTriangle size={48} />
        </div>
        <h3 className="text-xl font-black text-black">TIDAK ADA ISTIRAHAT AKTIF</h3>
        <p className="text-black font-bold opacity-40 mt-2 max-w-xs mx-auto">Anda belum memulai sesi istirahat. Silakan kembali ke Dashboard.</p>
      </div>
    );
  }

  const tlName = TEAM_LEADERS.find(tl => tl.email === activeBreak.tlEmail)?.name || activeBreak.tlEmail;
  const timeElapsed = Math.floor((currentTime.getTime() - activeBreak.startTime) / 1000);
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  
  const totalSeconds = 3600;
  const progress = Math.min((timeElapsed / totalSeconds) * 100, 100);

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-6 text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield size={18} className="text-slate-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Astro WH Facilities Management</span>
          </div>
          <h2 className="text-2xl font-black uppercase">Electronic Exit Pass</h2>
        </div>

        <div className="p-8">
          <div className="flex flex-col items-center">
            <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-100 mb-6 relative group">
              <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center shadow-inner border border-slate-100">
                <QrCode size={140} className="text-black" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-[2rem]">
                  <p className="text-[10px] font-black text-black uppercase tracking-widest px-4 text-center">Security Verification Code</p>
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-black uppercase tracking-tight">{user.name}</h3>
              <p className="text-slate-500 font-black text-xs uppercase tracking-widest">{user.department} • UNIT WH-01</p>
            </div>

            <div className="w-full bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Elapsed Time</p>
                  <p className="text-4xl font-black text-black tabular-nums">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Allowance</p>
                  <p className="text-lg font-black text-slate-900">60:00</p>
                </div>
              </div>
              
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${progress > 90 ? 'bg-red-500' : 'bg-slate-900'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-3">
                 <p className="text-[10px] font-bold text-slate-400 italic">Exit: {new Date(activeBreak.startTime).toLocaleTimeString()}</p>
                 <p className="text-[10px] font-bold text-slate-400 italic">Re-entry: {new Date(activeBreak.startTime + 3600000).toLocaleTimeString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200 mb-8">
              <div className="bg-slate-900 p-1.5 rounded-lg text-white">
                <UserCheck size={16} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Authorization</p>
                <p className="text-sm font-black text-slate-900 leading-tight">{tlName}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 p-6 bg-slate-50/50 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <FileText size={14} />
                <span>Ref: {activeBreak.id}</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{currentTime.toLocaleTimeString()}</span>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
            <Heart size={80} className="text-slate-900" />
        </div>
        <div className="flex items-center gap-4 mb-4">
            <div className="bg-slate-100 p-2.5 rounded-xl text-slate-900">
                <Heart size={20} />
            </div>
            <h4 className="text-sm font-black text-black uppercase tracking-widest">Saran & Motivasi Kerja</h4>
        </div>

        {loadingAdvice ? (
          <div className="flex items-center gap-3 py-4 text-slate-400">
            <RefreshCw size={18} className="animate-spin" />
            <p className="text-xs font-bold italic">Memuat informasi internal...</p>
          </div>
        ) : advice ? (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tips Kesehatan</p>
                <p className="text-sm font-bold text-black leading-relaxed">{advice.tip}</p>
            </div>
            <div className="px-4 border-l-4 border-slate-900">
                <p className="text-sm font-black italic text-slate-600">"{advice.quote}"</p>
            </div>
          </div>
        ) : null}
      </div>

      <button
        onClick={onEnd}
        className="w-full bg-slate-900 hover:bg-black text-white font-black py-5 rounded-3xl shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 mt-4"
      >
        <LogIn size={22} />
        KONFIRMASI KEMBALI BEKERJA
      </button>
    </div>
  );
};

export default BreakPass;
