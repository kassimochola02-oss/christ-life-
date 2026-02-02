
import React, { useState, useEffect } from 'react';
import { View } from './types';
import { BottomNav } from './components/BottomNav';
import { Home } from './views/Home';
import { Bible } from './views/Bible';
import { Groups } from './views/Groups';
import { Music } from './views/Music';
import { Giving } from './views/Giving';
import { SectorDetail } from './views/SectorDetail';
import { LiveStream } from './views/LiveStream';
import { Login } from './views/Login';
import { VoiceAssistant } from './components/VoiceAssistant';
import { CLB_API } from './services/api';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setView] = useState<View>(View.HOME);
  const [globalAlert, setGlobalAlert] = useState<string | null>(null);

  // Python Remote Control Polling
  useEffect(() => {
    if (!isAuthenticated) return;

    const pollControl = async () => {
      const state = await CLB_API.getControlState();
      
      // If server forces a view (e.g. "LIVE_STREAM")
      if (state.force_view && state.force_view !== currentView) {
        setView(state.force_view as View);
      }

      // If server sends a message
      if (state.global_alert !== globalAlert) {
        setGlobalAlert(state.global_alert);
      }
    };

    const interval = setInterval(pollControl, 10000); // Check every 10s
    pollControl();

    return () => clearInterval(interval);
  }, [isAuthenticated, currentView, globalAlert]);

  const renderView = () => {
    if (!isAuthenticated) {
      return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    if (currentView.startsWith('GROUP_')) {
        return <SectorDetail view={currentView} onBack={() => setView(View.GROUPS)} />;
    }

    switch (currentView) {
      case View.HOME:
        return <Home setView={setView} />;
      case View.BIBLE:
        return <Bible />;
      case View.GROUPS:
        return <Groups setView={setView} />;
      case View.MUSIC:
        return <Music />;
      case View.GIVING:
        return <Giving />;
      case View.LIVE_STREAM:
        return <LiveStream onBack={() => setView(View.HOME)} />;
      default:
        return <Home setView={setView} />;
    }
  };

  const showNav = isAuthenticated && currentView !== View.LIVE_STREAM;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
      {/* Remote Control Alert Bar */}
      {isAuthenticated && globalAlert && (
        <div className="absolute top-4 left-4 right-4 z-50 animate-fade-in">
          <div className="bg-indigo-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between border border-indigo-700">
            <p className="text-[10px] font-bold uppercase tracking-widest">{globalAlert}</p>
            <button onClick={() => setGlobalAlert(null)} className="text-indigo-400 font-black">×</button>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-gray-50">
        {renderView()}
      </main>
      
      {showNav && <BottomNav currentView={currentView} setView={setView} />}
      {showNav && <VoiceAssistant />}
    </div>
  );
};

export default App;
