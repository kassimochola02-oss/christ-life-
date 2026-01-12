import React, { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle, Copy, Building2 } from 'lucide-react';
import { BANK_ACCOUNT_NUMBER, BANK_NAME, ACCOUNT_NAME } from '../constants';

export const Giving: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BANK_ACCOUNT_NUMBER);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 1000);
  };

  if (submitted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-6 text-center pb-24">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">May God Bless You!</h2>
        <p className="text-gray-600 mb-6">Thank you for your generous contribution to CLB. Your support makes our ministry possible.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
        >
          Give More
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-4 px-4 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Giving & Tithe</h1>
        <p className="text-gray-500">Support the ministry and the community.</p>
      </header>

      {/* Bank Account Quick View */}
      <div className="bg-white border border-indigo-100 rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
            <div className="bg-indigo-50 p-2 rounded-lg">
                <Building2 className="text-indigo-600" size={24} />
            </div>
            <div>
                <h3 className="font-bold text-gray-900">Bank Transfer</h3>
                <p className="text-xs text-gray-500">{BANK_NAME}</p>
            </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative group">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Account Number</p>
            <p className="text-xl font-mono font-bold text-gray-800 tracking-wider">{BANK_ACCOUNT_NUMBER}</p>
            <p className="text-xs text-gray-500 mt-2 font-medium">{ACCOUNT_NAME}</p>
            
            <button 
                onClick={handleCopy}
                className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-white rounded-lg shadow-sm text-indigo-600 hover:text-indigo-800 transition"
            >
                {copyStatus ? <span className="text-[10px] font-bold">COPIED!</span> : <Copy size={18} />}
            </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Donate via Mobile Money</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="flex flex-col items-center justify-center p-4 border-2 border-indigo-600 bg-indigo-50 rounded-xl text-indigo-700">
            <Smartphone size={24} className="mb-2" />
            <span className="text-xs font-bold">Mobile Money</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl text-gray-500 hover:border-gray-300 transition">
            <CreditCard size={24} className="mb-2" />
            <span className="text-xs font-bold">Visa / Master</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Amount (UGX)</label>
            <input type="number" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-bold text-lg" placeholder="10,000" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">For</label>
            <select className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium appearance-none">
              <option>Offertory</option>
              <option>Tithe</option>
              <option>Building Fund</option>
              <option>Welfare</option>
              <option>Radio Ministry</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition transform active:scale-95 mt-4">
            Proceed with Donation
          </button>
        </form>
      </div>
    </div>
  );
};
