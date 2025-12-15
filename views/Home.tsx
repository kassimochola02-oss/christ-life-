import React from 'react';
import { View, Announcement } from '../types';
import { ANNOUNCEMENTS } from '../constants';
import { Video, Calendar, Bell } from 'lucide-react';

interface HomeProps {
  setView: (view: View) => void;
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Christ Life</h1>
          <p className="text-indigo-600 font-semibold text-sm">Bweyogerere</p>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm text-gray-600">
          <Bell size={20} />
        </button>
      </header>

      {/* Live Stream Card */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-4 text-white shadow-lg shadow-red-200">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <span className="animate-pulse w-2 h-2 bg-white rounded-full"></span>
            <span className="text-xs font-bold uppercase tracking-wider">Live Now</span>
          </div>
          <Video size={20} />
        </div>
        <h3 className="text-xl font-bold mb-2">Sunday Main Service</h3>
        <p className="text-red-100 text-sm mb-4">Join us online for worship and the word.</p>
        <div className="flex space-x-3">
          <button 
            onClick={() => setView(View.LIVE_STREAM)}
            className="flex-1 bg-white text-red-600 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition"
          >
            Watch Stream
          </button>
           <a 
            href="https://meet.google.com/new" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 bg-red-700 bg-opacity-40 text-white py-2 rounded-lg text-sm font-semibold hover:bg-opacity-50 transition flex items-center justify-center"
          >
            Google Meet
          </a>
        </div>
      </div>

      {/* Adverts / Announcements */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Calendar className="mr-2 text-indigo-600" size={18} />
          Highlights & Events
        </h2>
        <div className="space-y-4">
          {ANNOUNCEMENTS.map((ad) => (
            <div key={ad.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <div className="h-32 bg-gray-200 relative">
                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{ad.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{ad.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
