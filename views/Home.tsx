import React from 'react';
import { View, Announcement } from '../types';
import { ANNOUNCEMENTS, ZOOM_MEETING_URL, CHURCH_LOCATION } from '../constants';
import { Video, Calendar, Bell, Users, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

interface HomeProps {
  setView: (view: View) => void;
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="pb-24 pt-4 space-y-6">
      <header className="px-4 flex justify-between items-center mb-2">
        <div className="flex items-center space-x-3">
          {/* Main Logo Representation */}
          <div className="w-12 h-12 bg-black rounded-full border-2 border-yellow-500 flex items-center justify-center overflow-hidden shadow-lg">
             <span className="text-[8px] font-bold text-white text-center leading-none">The<br/><span className="text-yellow-500 text-[10px]">Chris</span><br/>Life!</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 leading-tight tracking-tight uppercase">CLB Church</h1>
            <p className="text-indigo-600 font-bold text-[10px] tracking-[0.2em] uppercase">Raising Role Models</p>
          </div>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm text-gray-600 relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </header>

      {/* Primary Highlights: Sunday Garage Style */}
      <div className="px-4">
        <div className="bg-gradient-to-br from-purple-800 via-purple-700 to-indigo-900 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative Circle Backgrounds like the posters */}
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-[-40px] left-[-20px] w-48 h-48 bg-purple-400 rounded-full opacity-10 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                2 Services
              </div>
              <Video size={20} className="text-yellow-400" />
            </div>
            
            <h3 className="text-3xl font-black mb-1 italic tracking-tighter">SUNDAY GARAGE</h3>
            <p className="text-indigo-200 text-xs font-medium mb-6 flex items-center">
              <MapPin size={12} className="mr-1" /> {CHURCH_LOCATION}
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-3 border border-white border-opacity-10">
                <p className="text-[10px] uppercase font-bold text-yellow-400 mb-1">Service 1</p>
                <p className="text-lg font-black tracking-tight">9:00AM</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-3 border border-white border-opacity-10">
                <p className="text-[10px] uppercase font-bold text-yellow-400 mb-1">Service 2</p>
                <p className="text-lg font-black tracking-tight">11:30PM</p>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => setView(View.LIVE_STREAM)}
                className="w-full bg-yellow-400 text-purple-900 py-3.5 rounded-2xl text-sm font-black shadow-lg hover:bg-yellow-300 transition-all flex items-center justify-center space-x-2 active:scale-95"
              >
                <Video size={18} />
                <span>Watch Online</span>
              </button>
              <a 
                href={ZOOM_MEETING_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white bg-opacity-10 text-white py-3.5 rounded-2xl text-sm font-bold border border-white border-opacity-20 hover:bg-opacity-20 transition flex items-center justify-center space-x-2"
              >
                <Users size={18} />
                <span>Join Zoom</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Icons - Match Poster Footer */}
      <div className="flex justify-center space-x-6 text-gray-400 py-2 border-y border-gray-100 mx-4">
        <Facebook size={20} className="hover:text-blue-600 transition" />
        <Instagram size={20} className="hover:text-pink-600 transition" />
        <Youtube size={20} className="hover:text-red-600 transition" />
        <Twitter size={20} className="hover:text-blue-400 transition" />
      </div>

      {/* Weekly Highlights Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center">
            <Calendar className="mr-2 text-indigo-600" size={20} />
            This Week
          </h2>
          <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest">#JoyCulture</span>
        </div>
        
        <div className="space-y-4">
          {ANNOUNCEMENTS.map((ad) => (
            <div key={ad.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group transition-all hover:shadow-lg">
              <div className="h-40 bg-gray-200 relative overflow-hidden">
                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-white font-black text-xl tracking-tight leading-none uppercase italic">{ad.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{ad.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase tracking-wider">Church Update</span>
                  <button className="text-indigo-600 text-xs font-bold flex items-center">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Branding */}
      <div className="text-center py-6 px-4 bg-gray-100 mx-4 rounded-3xl opacity-60">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">The Christ Life Bweyogerere</p>
        <p className="text-[8px] text-gray-400 mt-1">"Building a generation of role models"</p>
      </div>
    </div>
  );
};
