import React, { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle } from 'lucide-react';

export const Giving: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setSubmitted(true), 1000);
  };

  if (submitted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-6 text-center pb-24">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">Your generosity helps us continue our mission. A receipt has been sent to your email.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-indigo-600 font-semibold hover:underline"
        >
          Give Again
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-4 px-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Giving</h1>
        <p className="text-gray-500">Support the work of God.</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Choose Method</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="flex flex-col items-center justify-center p-4 border-2 border-indigo-600 bg-indigo-50 rounded-lg text-indigo-700">
            <Smartphone size={24} className="mb-2" />
            <span className="text-xs font-bold">Mobile Money</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg text-gray-500 hover:border-gray-300">
            <CreditCard size={24} className="mb-2" />
            <span className="text-xs font-bold">Card</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Amount (UGX)</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="50,000" required />
          </div>
          <div>
             <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone Number</label>
             <input type="tel" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="07..." required />
          </div>
          <div>
             <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Name (Optional)</label>
             <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">For</label>
            <select className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none">
              <option>Offertory</option>
              <option>Tithe</option>
              <option>Building Fund</option>
              <option>Thanksgiving</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-indigo-700 transition transform active:scale-95">
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};
