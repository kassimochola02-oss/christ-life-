import React from 'react';
import { Home, BookOpen, Users, Music, Heart } from 'lucide-react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const navItems = [
    { view: View.HOME, label: 'Home', icon: Home },
    { view: View.BIBLE, label: 'Bible', icon: BookOpen },
    { view: View.GROUPS, label: 'Groups', icon: Users },
    { view: View.MUSIC, label: 'Music', icon: Music },
    { view: View.GIVING, label: 'Give', icon: Heart },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center z-40 pb-safe">
      {navItems.map((item) => {
        const isActive = currentView === item.view || 
          (item.view === View.GROUPS && currentView.startsWith('GROUP_'));
        
        return (
          <button
            key={item.label}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center space-y-1 w-16 transition-colors duration-200 ${
              isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
