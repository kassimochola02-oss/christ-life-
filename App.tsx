
import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setView] = useState<View>(View.HOME);

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
      <main className="min-h-screen bg-gray-50">
        {renderView()}
      </main>
      
      {showNav && <BottomNav currentView={currentView} setView={setView} />}
      {showNav && <VoiceAssistant />}
    </div>
  );
};

export default App;
