
import React, { useState, useEffect } from 'react';
import { User, Clock, CheckCircle, LogOut, History, Shield, LayoutDashboard, QrCode } from 'lucide-react';
import { BreakRecord, UserProfile, BreakType, AppState } from './types';
import Dashboard from './components/Dashboard';
import BreakPass from './components/BreakPass';
import SetupProfile from './components/SetupProfile';
import BreakHistory from './components/BreakHistory';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('smartbreak_state');
    return saved ? JSON.parse(saved) : { user: null, activeBreak: null, history: [] };
  });

  const [view, setView] = useState<'dashboard' | 'pass' | 'history'>('dashboard');

  useEffect(() => {
    localStorage.setItem('smartbreak_state', JSON.stringify(state));
  }, [state]);

  const handleSetProfile = (user: UserProfile) => {
    setState(prev => ({ ...prev, user }));
  };

  const startBreak = (type: BreakType, tlCode: string, tlEmail: string) => {
    if (!state.user) return;
    const newBreak: BreakRecord = {
      id: `BRK-${Date.now()}`,
      userId: state.user.id,
      userName: state.user.name,
      type,
      tlCode,
      tlEmail,
      startTime: Date.now(),
      status: 'active'
    };
    setState(prev => ({ ...prev, activeBreak: newBreak }));
    setView('pass');
  };

  const endBreak = () => {
    if (!state.activeBreak) return;
    const endTime = Date.now();
    const completedBreak: BreakRecord = {
      ...state.activeBreak,
      endTime,
      duration: Math.round((endTime - state.activeBreak.startTime) / 60000),
      status: 'completed'
    };
    setState(prev => ({
      ...prev,
      activeBreak: null,
      history: [completedBreak, ...prev.history]
    }));
    setView('dashboard');
  };

  const logout = () => {
    if (confirm('Apakah Anda yakin ingin keluar? Semua data akan dihapus.')) {
      localStorage.removeItem('smartbreak_state');
      setState({ user: null, activeBreak: null, history: [] });
      setView('dashboard');
    }
  };

  if (!state.user) {
    return <SetupProfile onComplete={handleSetProfile} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0 md:pl-64">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Shield size={24} />
            </div>
            <h1 className="text-xl font-bold text-black leading-tight">Astro WH CBN</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${view === 'dashboard' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-black hover:bg-slate-50'}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setView('pass')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${view === 'pass' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-black hover:bg-slate-50'}`}
          >
            <QrCode size={20} />
            <span>Digital Pass</span>
          </button>
          <button 
            onClick={() => setView('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${view === 'history' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-black hover:bg-slate-50'}`}
          >
            <History size={20} />
            <span>Riwayat</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 mb-4 bg-slate-100 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              {state.user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-black truncate">{state.user.name}</p>
              <p className="text-xs text-black font-medium opacity-70 truncate">{state.user.department}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-700 font-bold hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-50">
        <button onClick={() => setView('dashboard')} className={`flex flex-col items-center gap-1 ${view === 'dashboard' ? 'text-indigo-700' : 'text-black'}`}>
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-bold">Dashboard</span>
        </button>
        <button onClick={() => setView('pass')} className={`relative flex flex-col items-center gap-1 ${view === 'pass' ? 'text-indigo-700' : 'text-black'}`}>
          <div className={`p-3 -mt-8 rounded-full shadow-lg ${state.activeBreak ? 'bg-indigo-600 text-white' : 'bg-white text-black border border-slate-200'}`}>
            <QrCode size={24} />
          </div>
          <span className="text-[10px] font-bold mt-1">E-Pass</span>
        </button>
        <button onClick={() => setView('history')} className={`flex flex-col items-center gap-1 ${view === 'history' ? 'text-indigo-700' : 'text-black'}`}>
          <History size={20} />
          <span className="text-[10px] font-bold">Riwayat</span>
        </button>
      </nav>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {view === 'dashboard' && (
          <Dashboard 
            user={state.user} 
            activeBreak={state.activeBreak} 
            history={state.history} 
            onStart={startBreak} 
            onEnd={endBreak}
          />
        )}
        {view === 'pass' && (
          <BreakPass 
            user={state.user} 
            activeBreak={state.activeBreak} 
            onEnd={endBreak}
            onStart={(type) => {}}
          />
        )}
        {view === 'history' && (
          <BreakHistory history={state.history} />
        )}
      </main>
    </div>
  );
};

export default App;
