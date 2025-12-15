import React from 'react';
import { SONGS } from '../constants';
import { Play, ExternalLink } from 'lucide-react';

export const Music: React.FC = () => {
  return (
    <div className="pb-24 pt-4 px-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Worship Harvest</h1>
        <p className="text-gray-500">Stream our latest worship songs.</p>
      </header>

      <div className="bg-indigo-900 rounded-xl p-6 text-white mb-8 relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">New Album Out Now</h2>
            <p className="text-indigo-200 mb-4 text-sm">Listen on your favorite platform</p>
            <div className="flex space-x-2">
                <button className="bg-green-500 text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">Spotify</button>
                <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">Apple Music</button>
            </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
            <Play size={120} />
        </div>
      </div>

      <h3 className="font-semibold text-gray-800 mb-3">Top Songs</h3>
      <div className="space-y-2">
        {SONGS.map((song, idx) => (
          <div key={song.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 font-mono text-sm w-4">{idx + 1}</span>
              <div>
                <p className="font-medium text-gray-900">{song.title}</p>
                <p className="text-xs text-gray-500">{song.artist}</p>
              </div>
            </div>
            <a href={song.platformUrl} className="text-indigo-600 p-2 hover:bg-indigo-50 rounded-full">
               <ExternalLink size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
