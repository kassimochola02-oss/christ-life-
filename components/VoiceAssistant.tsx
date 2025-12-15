import React, { useState } from 'react';
import { Mic, X, Loader2, Volume2 } from 'lucide-react';
import { useGeminiLive } from '../services/geminiLive';

export const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, isTalking, connect, disconnect, error } = useGeminiLive();

  const handleToggle = async () => {
    if (isOpen) {
      disconnect();
      setIsOpen(false);
    } else {
      setIsOpen(true);
      await connect();
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-20 right-4 p-4 rounded-full shadow-xl z-50 transition-all duration-300 transform hover:scale-105 ${
          isOpen ? 'bg-red-500' : 'bg-indigo-600'
        } text-white`}
      >
        {isOpen ? <X size={24} /> : <Mic size={24} />}
      </button>

      {/* Overlay Modal */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 w-64 bg-white rounded-2xl shadow-2xl p-6 z-50 border border-gray-100 animate-fade-in-up">
          <div className="flex flex-col items-center text-center space-y-4">
            <h3 className="font-semibold text-gray-800">CLB Assistant</h3>
            
            {error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : !isConnected ? (
              <div className="flex items-center space-x-2 text-gray-500">
                 <Loader2 className="animate-spin" size={20} />
                 <span className="text-sm">Connecting...</span>
              </div>
            ) : (
              <div className="relative">
                 <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${isTalking ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                    <Mic className={`${isTalking ? 'text-indigo-600 animate-pulse' : 'text-gray-400'}`} size={32} />
                 </div>
                 {isTalking && (
                   <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                     <Volume2 size={12} className="text-white" />
                   </div>
                 )}
              </div>
            )}
            
            <p className="text-xs text-gray-500">
              {isConnected 
                ? (isTalking ? "I'm speaking..." : "Listening...") 
                : "Initializing..."}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
