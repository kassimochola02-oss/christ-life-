
import React, { useState, useEffect } from 'react';
import { Search, Book, RefreshCw, ChevronRight, BookOpen } from 'lucide-react';
import { fetchVerse, getLugandaVerse, LUGANDA_BIBLE_DATA } from '../services/bibleService';

export const Bible: React.FC = () => {
  const [version, setVersion] = useState<'KJV' | 'NKJV' | 'Luganda'>('Luganda');
  const [query, setQuery] = useState('John 3:16');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ reference: string; text: string } | null>(null);
  const [mode, setMode] = useState<'READ' | 'BROWSE'>('READ');

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    setMode('READ');
    
    if (version === 'Luganda') {
      const text = getLugandaVerse(query);
      if (text) {
        setResult({ reference: query, text });
      } else {
        setResult({ reference: query, text: "Oluniriri luno terunnaba kuteekebwa mu tterekero lyaffe ery'ebitabo erya digital. Tuneeyongera okwongerako ebirala." });
      }
    } else {
      const data = await fetchVerse(query, version.toLowerCase());
      if (data) {
        setResult({ reference: data.reference, text: data.text });
      } else {
        setResult({ reference: query, text: `Verse not found in ${version}. Try searching for 'John 3:16'.` });
      }
    }
    setLoading(false);
  };

  const handleBrowseSelect = (book: string, verseKey: string) => {
    setQuery(`${book} ${verseKey}`);
    setMode('READ');
  };

  useEffect(() => {
    handleSearch();
  }, [version, query]);

  return (
    <div className="pb-24 pt-4 px-4 bg-[#fdfcf8] min-h-screen">
      <header className="mb-6 sticky top-0 bg-[#fdfcf8] z-10 py-2 border-b border-orange-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-black text-gray-900 italic tracking-tighter uppercase">Holy Scripture</h1>
          <button 
            onClick={() => setMode(mode === 'READ' ? 'BROWSE' : 'READ')}
            className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"
          >
            {mode === 'READ' ? <BookOpen size={20} /> : <Search size={20} />}
          </button>
        </div>
        
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl mb-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setVersion('Luganda')}
            className={`flex-1 min-w-[80px] py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              version === 'Luganda' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'
            }`}
          >
            Luganda
          </button>
          <button
            onClick={() => setVersion('NKJV')}
            className={`flex-1 min-w-[80px] py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              version === 'NKJV' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'
            }`}
          >
            NKJV
          </button>
          <button
            onClick={() => setVersion('KJV')}
            className={`flex-1 min-w-[80px] py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              version === 'KJV' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'
            }`}
          >
            KJV
          </button>
        </div>

        {mode === 'READ' && (
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. John 3:16"
              className="w-full bg-white border-2 border-orange-50 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold text-gray-700 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
          </form>
        )}
      </header>

      {mode === 'BROWSE' ? (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Browse Library</h2>
          {Object.entries(LUGANDA_BIBLE_DATA).map(([book, verses]) => (
            <div key={book} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-black text-gray-800 uppercase text-sm mb-3 flex items-center">
                <Book size={14} className="mr-2 text-indigo-400" /> {book}
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(verses).map(vKey => (
                  <button 
                    key={vKey}
                    onClick={() => handleBrowseSelect(book, vKey)}
                    className="px-3 py-1.5 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-600 hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    {vKey}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-300">
              <RefreshCw className="animate-spin mb-4" size={32} />
              <p className="text-xs font-black uppercase tracking-widest">Gathering Word...</p>
            </div>
          ) : result && (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-orange-50 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                <BookOpen size={180} />
              </div>
              <h3 className="text-indigo-600 font-black text-xs uppercase tracking-[0.4em] mb-6">
                {result.reference}
              </h3>
              <p className="text-gray-800 leading-[1.8] text-2xl font-serif italic">
                "{result.text.trim()}"
              </p>
              <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {version} Version
                </span>
                <button 
                  onClick={() => {
                    const shareText = `"${result.text.trim()}" - ${result.reference} (${version} Bible)`;
                    if (navigator.share) {
                      navigator.share({ title: 'CLB Bible Verse', text: shareText });
                    } else {
                      navigator.clipboard.writeText(shareText);
                      alert('Verse copied to clipboard!');
                    }
                  }}
                  className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:text-indigo-800 transition-colors"
                >
                  Share Word
                </button>
              </div>
            </div>
          )}
          
          <div className="bg-indigo-900 rounded-3xl p-6 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-300">Daily Bread</h4>
                <p className="font-bold italic text-sm mb-4">"The grass withers and the flowers fall, but the word of our God endures forever."</p>
                <span className="text-[10px] font-black uppercase text-indigo-400">Isaiah 40:8</span>
             </div>
             <div className="absolute bottom-[-20px] right-[-20px] opacity-10">
                <ChevronRight size={100} />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
