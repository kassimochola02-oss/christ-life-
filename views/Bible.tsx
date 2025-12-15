import React, { useState } from 'react';
import { LUGANDA_BIBLE_SAMPLE, ENGLISH_BIBLE_SAMPLE } from '../constants';

export const Bible: React.FC = () => {
  const [version, setVersion] = useState<'KJV' | 'Luganda'>('Luganda');
  const verses = version === 'Luganda' ? LUGANDA_BIBLE_SAMPLE : ENGLISH_BIBLE_SAMPLE;

  return (
    <div className="pb-24 pt-4 px-4 bg-white min-h-screen">
      <header className="mb-6 sticky top-0 bg-white z-10 py-2 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Holy Bible</h1>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setVersion('Luganda')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              version === 'Luganda' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
            }`}
          >
            Luganda
          </button>
          <button
            onClick={() => setVersion('KJV')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              version === 'KJV' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
            }`}
          >
            English (KJV)
          </button>
        </div>
      </header>

      <div className="space-y-6">
        {verses.map((v, i) => (
          <div key={i} className="prose prose-indigo max-w-none">
            <h3 className="text-lg font-semibold text-gray-800">
              {v.book} {v.chapter}:{v.verse}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              "{v.text}"
            </p>
            <div className="w-full h-px bg-gray-100 mt-4"></div>
          </div>
        ))}
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mt-8 text-center">
          <p className="text-yellow-800 text-sm">More chapters available in full version.</p>
        </div>
      </div>
    </div>
  );
};
