import React from 'react';
import { View } from '../types';
import { Users, Video, Music, Smile, Shield, Mic2 } from 'lucide-react';

interface GroupsProps {
  setView: (view: View) => void;
}

export const Groups: React.FC<GroupsProps> = ({ setView }) => {
  const sectors = [
    { id: View.GROUP_MCS, label: 'MCs & Meetups', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { id: View.GROUP_MEDIA, label: 'Media Team', icon: Video, color: 'bg-purple-100 text-purple-600' },
    { id: View.GROUP_WORSHIP, label: 'Worship Team', icon: Mic2, color: 'bg-orange-100 text-orange-600' },
    { id: View.GROUP_DANCE, label: 'Dance Team', icon: Music, color: 'bg-pink-100 text-pink-600' },
    { id: View.GROUP_KIDS, label: 'Kids Church', icon: Smile, color: 'bg-yellow-100 text-yellow-600' },
    { id: View.GROUP_ADMIN, label: 'Admin Portal', icon: Shield, color: 'bg-gray-100 text-gray-600' },
  ];

  return (
    <div className="pb-24 pt-4 px-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Community Sectors</h1>
        <p className="text-gray-500">Connect with your team and ministry.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {sectors.map((sector) => (
          <button
            key={sector.id}
            onClick={() => setView(sector.id)}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition active:scale-95"
          >
            <div className={`w-14 h-14 ${sector.color} rounded-full flex items-center justify-center mb-3`}>
              <sector.icon size={28} />
            </div>
            <span className="font-semibold text-gray-800 text-sm text-center">{sector.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
