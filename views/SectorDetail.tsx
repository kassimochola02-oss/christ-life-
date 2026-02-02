
import React, { useState } from 'react';
import { View } from '../types';
import { ArrowLeft, Send, Upload, PlayCircle, Lock, MessageCircle, Send as TelegramIcon, ExternalLink } from 'lucide-react';
import { TELEGRAM_URL, WHATSAPP_URL } from '../constants';

interface SectorDetailProps {
  view: View;
  onBack: () => void;
}

export const SectorDetail: React.FC<SectorDetailProps> = ({ view, onBack }) => {
  const [message, setMessage] = useState('');

  // --- Render Functions for Specific Content ---
  
  const renderChat = (title: string) => (
    <div className="flex flex-col h-[calc(100vh-140px)]">
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-xl mb-4">
            <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-[80%]">
                    <p className="text-sm text-gray-800">Hello team! Reminder about the meeting tomorrow.</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">John - 10:30 AM</span>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="bg-indigo-600 text-white p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl max-w-[80%]">
                    <p className="text-sm">Noted, see you there!</p>
                    <span className="text-[10px] text-indigo-200 mt-1 block">You - 10:32 AM</span>
                </div>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message ${title}...`}
                className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:border-indigo-500"
            />
            <button className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700">
                <Send size={20} />
            </button>
        </div>
    </div>
  );

  const renderSocialPlatforms = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <TelegramIcon size={120} className="text-blue-500" />
            </div>
            <div className="relative z-10">
                <h3 className="text-xl font-black text-blue-600 uppercase italic tracking-tighter mb-2">Telegram Channel</h3>
                <p className="text-sm text-gray-600 mb-6 font-medium">Join our main channel for real-time church announcements, devotionals, and key links.</p>
                <a 
                    href={TELEGRAM_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-blue-600 active:scale-95 transition-all"
                >
                    <TelegramIcon size={16} />
                    <span>Join Telegram</span>
                </a>
            </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <MessageCircle size={120} className="text-green-500" />
            </div>
            <div className="relative z-10">
                <h3 className="text-xl font-black text-green-600 uppercase italic tracking-tighter mb-2">WhatsApp Community</h3>
                <p className="text-sm text-gray-600 mb-6 font-medium">Connect with other members, share prayer requests, and stay updated with your local missional community.</p>
                <a 
                    href={WHATSAPP_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-green-600 active:scale-95 transition-all"
                >
                    <MessageCircle size={16} />
                    <span>Join WhatsApp</span>
                </a>
            </div>
        </div>

        <div className="bg-indigo-50 rounded-3xl p-6 text-indigo-900 border border-indigo-100">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2">Follow Us Everywhere</h4>
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl">
                <span className="text-sm font-bold">TikTok @CLB_JOY</span>
                <ExternalLink size={16} className="text-indigo-400" />
            </div>
        </div>
    </div>
  );

  const renderKidsContent = () => (
      <div className="grid grid-cols-1 gap-4">
          {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="h-40 bg-yellow-100 flex items-center justify-center relative">
                      <PlayCircle size={48} className="text-yellow-600 opacity-80" />
                      <img src={`https://picsum.photos/400/200?random=${i+10}`} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Cartoon" />
                  </div>
                  <div className="p-3">
                      <h3 className="font-bold text-gray-800">Bible Hero Story #{i}</h3>
                      <p className="text-sm text-gray-500">David & Goliath - Animated</p>
                  </div>
              </div>
          ))}
      </div>
  );

  const renderDanceUpload = () => (
      <div>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center mb-6 bg-gray-50">
              <Upload className="text-gray-400 mb-2" size={32} />
              <p className="font-medium text-gray-600">Upload Rehearsal Video</p>
              <p className="text-xs text-gray-400 mt-1">MP4, MOV up to 50MB</p>
              <input type="file" className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          </div>
          <h3 className="font-bold text-gray-800 mb-3">Recent Uploads</h3>
          <div className="space-y-3">
               <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-100">
                   <div className="w-16 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                   <div>
                       <p className="text-sm font-medium">Sunday Choreography.mp4</p>
                       <p className="text-xs text-gray-500">Uploaded 2h ago</p>
                   </div>
               </div>
          </div>
      </div>
  );

  const renderAdmin = () => (
      <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4 text-indigo-900">
                  <Lock size={18} className="mr-2" />
                  <h3 className="font-bold">Post Sermon Review</h3>
              </div>
              <textarea 
                className="w-full border border-gray-300 rounded-lg p-3 h-32 text-sm mb-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                placeholder="Write the sermon summary..."
              ></textarea>
              <button className="w-full bg-indigo-900 text-white py-2 rounded-lg text-sm font-semibold">Post Review</button>
          </div>

           <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2">Internal Announcements</h3>
              <p className="text-sm text-gray-500">Post updates for church leaders.</p>
           </div>
      </div>
  );

  // --- Logic to select content ---
  let title = '';
  let content = null;

  switch (view) {
    case View.GROUP_SOCIAL:
        title = 'Social Media';
        content = renderSocialPlatforms();
        break;
    case View.GROUP_MCS:
        title = 'MCs & Meetups';
        content = renderChat('Community');
        break;
    case View.GROUP_MEDIA:
        title = 'Media Team';
        content = (
            <>
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-800 mb-2">Device Guides</h4>
                    <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                        <li>How to run the Sound Mixer</li>
                        <li>Live Stream setup guide</li>
                        <li>Projector Troubleshooting</li>
                    </ul>
                </div>
                {renderChat('Media Team')}
            </>
        );
        break;
    case View.GROUP_WORSHIP:
        title = 'Worship Team';
        content = (
            <>
                 <div className="mb-4">
                     <h4 className="font-bold text-gray-800 mb-2">Sunday Setlist</h4>
                     <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                         <li className="p-3 text-sm">1. Way Maker - Key C</li>
                         <li className="p-3 text-sm">2. Goodness of God - Key G</li>
                         <li className="p-3 text-sm">3. Amazing Grace - Key D</li>
                     </ul>
                 </div>
                 {renderChat('Worship Team')}
            </>
        );
        break;
    case View.GROUP_DANCE:
        title = 'Dance Team';
        content = renderDanceUpload();
        break;
    case View.GROUP_KIDS:
        title = 'Kids Church';
        content = renderKidsContent();
        break;
    case View.GROUP_ADMIN:
        title = 'Admin Portal';
        content = renderAdmin();
        break;
    default:
        title = 'Group';
  }

  return (
    <div className="pb-24 pt-4 px-4 bg-gray-50 min-h-screen">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full mr-2">
            <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </header>
      {content}
    </div>
  );
};
