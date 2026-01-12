import React, { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle, Copy, Building2, Phone } from 'lucide-react';
import { BANK_ACCOUNT_NUMBER, BANK_NAME, ACCOUNT_NAME, MERCHANT_MTN, MERCHANT_AIRTEL } from '../constants';

type GivingMethod = 'MOBILE' | 'BANK' | 'CARD';

export const Giving: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [method, setMethod] = useState<GivingMethod>('MOBILE');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(label);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call to CLB_API.submitDonation
    setTimeout(() => setSubmitted(true), 1200);
  };

  if (submitted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-6 text-center pb-24 bg-white">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <CheckCircle className="text-green-600" size={48} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-3 uppercase italic tracking-tighter">Blessings Received!</h2>
        <p className="text-gray-600 mb-8 max-w-xs mx-auto font-medium">Thank you for your generosity. Your contribution helps us raise more role models at CLB.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
        >
          Give Again
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-4 px-4 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Giving & Tithe</h1>
        <p className="text-gray-500 text-sm font-medium">Your support builds the kingdom.</p>
      </header>

      {/* Method Toggle */}
      <div className="flex space-x-2 mb-6 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
        {[
          { id: 'MOBILE', label: 'Mobile Money', icon: Smartphone },
          { id: 'BANK', label: 'Bank Transfer', icon: Building2 },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setMethod(item.id as GivingMethod)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              method === item.id 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {method === 'BANK' ? (
        <div className="bg-white border border-indigo-100 rounded-3xl p-6 mb-6 shadow-sm animate-fade-in">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-indigo-50 p-3 rounded-2xl">
              <Building2 className="text-indigo-600" size={28} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 uppercase text-sm tracking-tight">{BANK_NAME}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase">{ACCOUNT_NAME}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 relative overflow-hidden">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2">Account Number</p>
            <p className="text-2xl font-mono font-black text-indigo-900 tracking-wider">{BANK_ACCOUNT_NUMBER}</p>
            
            <button 
              onClick={() => handleCopy(BANK_ACCOUNT_NUMBER, 'bank')}
              className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-white rounded-xl shadow-sm text-indigo-600 hover:scale-110 active:scale-95 transition-all"
            >
              {copyStatus === 'bank' ? <span className="text-[10px] font-black text-green-600">COPIED</span> : <Copy size={20} />}
            </button>
          </div>
          
          <p className="mt-6 text-[10px] text-gray-400 font-bold uppercase leading-relaxed text-center">
            Please include your name and purpose (e.g., "Tithe") in the transfer reason.
          </p>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Merchant Codes Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-400 rounded-3xl p-5 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-125 transition-transform"><Smartphone size={40} /></div>
               <p className="text-[10px] font-black text-purple-900 uppercase mb-1">MTN Merchant</p>
               <p className="text-xl font-black text-purple-900 font-mono tracking-widest">{MERCHANT_MTN}</p>
               <button 
                onClick={() => handleCopy(MERCHANT_MTN, 'mtn')}
                className="mt-3 bg-white bg-opacity-30 text-purple-900 text-[10px] font-black py-1 px-3 rounded-full hover:bg-opacity-50"
               >
                {copyStatus === 'mtn' ? 'COPIED' : 'COPY CODE'}
               </button>
            </div>
            <div className="bg-red-600 rounded-3xl p-5 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-125 transition-transform"><Smartphone size={40} /></div>
               <p className="text-[10px] font-black text-white uppercase mb-1">Airtel Merchant</p>
               <p className="text-xl font-black text-white font-mono tracking-widest">{MERCHANT_AIRTEL}</p>
               <button 
                onClick={() => handleCopy(MERCHANT_AIRTEL, 'airtel')}
                className="mt-3 bg-white bg-opacity-20 text-white text-[10px] font-black py-1 px-3 rounded-full hover:bg-opacity-40"
               >
                {copyStatus === 'airtel' ? 'COPIED' : 'COPY CODE'}
               </button>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  <Phone size={12} className="mr-1.5" /> Enter Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400 text-lg">+256</span>
                  <input 
                    type="tel" 
                    className="w-full border-2 border-gray-50 rounded-2xl p-4 pl-16 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all font-black text-lg tracking-widest" 
                    placeholder="772 000 000" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Amount (UGX)</label>
                <input 
                  type="number" 
                  className="w-full border-2 border-gray-50 rounded-2xl p-4 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all font-black text-2xl text-indigo-900" 
                  placeholder="50,000" 
                  required 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Select Purpose</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Tithe', 'Offertory', 'Welfare', 'Building'].map((purp) => (
                    <button 
                      key={purp}
                      type="button"
                      className="py-2.5 px-3 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-wider text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-colors"
                    >
                      {purp}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition transform active:scale-95 mt-4 uppercase tracking-[0.2em] text-sm"
              >
                Authorize Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Trust Badge */}
      <div className="mt-8 flex items-center justify-center space-x-2 opacity-40">
        <CheckCircle size={14} className="text-gray-400" />
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Secure CLB Payment Portal</span>
      </div>
    </div>
  );
};
