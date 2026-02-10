
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Shield, User, Building2, ArrowRight, Calendar } from 'lucide-react';

interface SetupProfileProps {
  onComplete: (user: UserProfile) => void;
}

const SetupProfile: React.FC<SetupProfileProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && department && id) {
      onComplete({ id, name, department });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 text-white rounded-2xl mb-4 shadow-lg shadow-slate-200">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Astro WH Access Control</h1>
          <p className="text-slate-500 font-medium mt-2">Sistem Verifikasi Keluar-Masuk Fasilitas CBN Astro.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-black mb-1">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sesuai ID Card"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-black font-bold"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-1">Jadwal Masuk Shift</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="datetime-local"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-black font-bold uppercase"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-1">Departemen</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={18} />
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-black font-bold appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Pilih Unit Kerja</option>
                <option value="Outbound">Outbound</option>
                <option value="Inbound">Inbound</option>
                <option value="Inventory">Inventory</option>
                <option value="Management">Management</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ArrowRight size={16} className="rotate-90" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-200 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            Masuk Sistem
            <ArrowRight size={20} />
          </button>
        </form>
        
        <p className="text-center text-xs text-slate-400 mt-8 font-semibold">
          Internal Use Only - Astro Warehouse Management
        </p>
      </div>
    </div>
  );
};

export default SetupProfile;
