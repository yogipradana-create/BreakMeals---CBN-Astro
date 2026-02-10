
import React from 'react';
import { Clock, Calendar, ChevronRight, Hash, History, Key, UserCheck } from 'lucide-react';
import { BreakRecord } from '../types';

interface BreakHistoryProps {
  history: BreakRecord[];
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

const BreakHistory: React.FC<BreakHistoryProps> = ({ history }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500 pb-10">
      <header>
        <h1 className="text-2xl font-black text-black tracking-tight">Riwayat Aktivitas WH</h1>
        <p className="text-black font-bold opacity-60">Log lengkap verifikasi keluar-masuk Astro CBN.</p>
      </header>

      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((h) => {
            const tlName = TEAM_LEADERS.find(tl => tl.email === h.tlEmail)?.name || h.tlEmail;
            return (
              <div key={h.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:border-indigo-500 transition-all border-l-8 border-l-indigo-600">
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                      h.type.includes('Makan') ? 'bg-orange-100 text-orange-700' :
                      h.type.includes('Ibadah') ? 'bg-emerald-100 text-emerald-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      <Clock size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-black text-lg">{h.type}</h3>
                        <span className="px-2 py-0.5 bg-black text-white text-[9px] font-black rounded uppercase tracking-widest">ID {h.id.split('-')[1]}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-1">
                        <div className="flex items-center gap-1.5 text-xs text-black font-bold">
                          <Calendar size={14} className="opacity-40" />
                          <span>{new Date(h.startTime).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-black font-black">
                          <Clock size={14} className="opacity-40" />
                          <span>{new Date(h.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {h.endTime ? new Date(h.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-indigo-700 font-black uppercase tracking-widest mt-3 bg-indigo-50 px-3 py-1.5 rounded-lg w-fit">
                          <UserCheck size={14} />
                          <span>Auth: {tlName}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-2xl font-black text-black leading-none">{h.duration}</p>
                      <p className="text-[10px] text-black font-black uppercase opacity-40">Menit</p>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-200 shadow-inner">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-6">
            <History size={40} />
          </div>
          <h3 className="text-xl font-black text-black">BELUM ADA DATA LOG</h3>
          <p className="text-black font-bold opacity-40 mt-2 max-w-xs mx-auto">Selesaikan sesi istirahat Anda untuk mencatat riwayat di sistem WH Astro.</p>
        </div>
      )}
    </div>
  );
};

export default BreakHistory;
