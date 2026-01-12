import React from 'react';
import { View } from '../types';
import { Users, Video, Music, Smile, Shield, Mic2, Star } from 'lucide-react';

interface GroupsProps {
  setView: (view: View) => void;
}

export const Groups: React.FC<GroupsProps> = ({ setView }) => {
  const sectors = [
    { id: View.GROUP_MCS, label: 'MC LIVE', icon: Users, color: 'bg-yellow-400 text-purple-900', desc: 'Wednesdays 5:30PM' },
    { id: View.GROUP_KIDS, label: 'CL KIDS', icon: Smile, color: 'bg-green-100 text-green-700', desc: 'Raising little models' },
    { id: View.GROUP_DANCE, label: 'YOUTH XP', icon: Star, color: 'bg-purple-600 text-white', desc: 'Rich & Sent' },
    { id: View.GROUP_WORSHIP, label: 'WORSHIP', icon: Mic2, color: 'bg-orange-100 text-orange-600', desc: 'The Joy Culture' },
    { id: View.GROUP_MEDIA, label: 'MEDIA TEAM', icon: Video, color: 'bg-indigo-100 text-indigo-700', desc: 'Live Stream Ops' },
    { id: View.GROUP_ADMIN, label: 'LEADERSHIP', icon: Shield, color: 'bg-gray-800 text-white', desc: 'Equip Nights' },
  ];

  return (
    <div className="pb-24 pt-4 px-4 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <div className="flex items-center space-x-2 mb-1">
           <div className="w-1 h-6 bg-yellow-400 rounded-full"></div>
           <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">CHURCH SECTORS</h1>
        </div>
        <p className="text-gray-500 text-sm font-medium">Find your community and missional group.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {sectors.map((sector) => (
          <button
            key={sector.id}
            onClick={() => setView(sector.id)}
            className="flex flex-col items-start p-5 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all active:scale-95 group relative overflow-hidden"
          >
            {/* Hover visual effect */}
            <div className="absolute top-[-20%] right-[-20%] w-20 h-20 bg-gray-50 rounded-full group-hover:bg-opacity-50 transition-all"></div>
            
            <div className={`w-12 h-12 ${sector.color} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:rotate-6 transition-transform`}>
              <sector.icon size={24} />
            </div>
            <span className="font-black text-gray-900 text-sm uppercase tracking-tight">{sector.label}</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-wider">{sector.desc}</span>
            
            <div className="mt-4 w-6 h-1 bg-gray-200 rounded-full group-hover:w-12 group-hover:bg-indigo-400 transition-all"></div>
          </button>
        ))}
      </div>
      
      <div className="mt-10 bg-indigo-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Star size={80} />
        </div>
        <h3 className="text-lg font-black uppercase italic tracking-tighter mb-2">Join a Missional Community</h3>
        <p className="text-sm text-indigo-200 leading-relaxed mb-4">"MC Live" happens every Wednesday. Connect with a family near you in Bweyogerere.</p>
        <button className="bg-white text-indigo-900 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
          Find my MC
        </button>
      </div>
    </div>
  );
};
