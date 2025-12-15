import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LiveStreamProps {
  onBack: () => void;
}

export const LiveStream: React.FC<LiveStreamProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
       <div className="absolute top-4 left-4 z-10">
          <button onClick={onBack} className="text-white p-2 bg-black bg-opacity-50 rounded-full">
            <ArrowLeft size={24} />
          </button>
       </div>
       
       <div className="flex-1 flex items-center justify-center bg-gray-900">
          {/* Placeholder for Video Player */}
          <div className="text-center text-gray-400 p-8">
             <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
             <p>Waiting for live signal...</p>
             <p className="text-xs mt-2">Check back on Sunday at 10:00 AM</p>
          </div>
       </div>

       <div className="p-4 bg-gray-900 text-white">
          <h2 className="font-bold text-lg">Sunday Service Live</h2>
          <div className="flex items-center space-x-2 mt-2">
             <span className="px-2 py-1 bg-red-600 rounded text-xs font-bold">OFFLINE</span>
             <span className="text-sm text-gray-400">124 waiting</span>
          </div>
       </div>
    </div>
  );
};
