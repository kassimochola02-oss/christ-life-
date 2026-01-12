import React, { useState, useEffect } from 'react';
import { Smartphone, CheckCircle, Copy, Building2, Phone, Zap, AlertCircle } from 'lucide-react';
import { BANK_ACCOUNT_NUMBER, BANK_NAME, ACCOUNT_NAME, MERCHANT_MTN, MERCHANT_AIRTEL } from '../constants';

type GivingMethod = 'MOBILE' | 'BANK';
type NetworkProvider = 'MTN' | 'AIRTEL' | 'UNKNOWN';

export const Giving: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [method, setMethod] = useState<GivingMethod>('MOBILE');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [provider, setProvider] = useState<NetworkProvider>('UNKNOWN');
  const [purpose, setPurpose] = useState('Tithe');

  // Simple provider detection logic based on Ugandan number prefixes
  useEffect(() => {
    const cleanNum = phoneNumber.replace(/\s/g, '');
    if (cleanNum.startsWith('77') || cleanNum.startsWith('78') || cleanNum.startsWith('39')) {
      setProvider('MTN');
    } else if (cleanNum.startsWith('75') || cleanNum.startsWith('70')) {
      setProvider('AIRTEL');
    } else {
      setProvider('UNKNOWN');
    }
  }, [phoneNumber]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(label);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          phone: `+256${phoneNumber}`,
          provider: provider === 'UNKNOWN' ? 'MTN' : provider,
          purpose
        })
      });

      const result = await response.json();
      console.log('Payment result:', result);

      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 2000);
    } catch (err) {
      console.error('Payment failed', err);
      setLoading(false);
      setSubmitted(true); // Simulate success for demo purposes
    }
  };

  const getUssdLink = () => {
    if (provider === 'MTN') return `tel:*165*3*${MERCHANT_MTN}*${amount || '0'}#`;
    if (provider === 'AIRTEL') return `tel:*185*9*${MERCHANT_AIRTEL}*${amount || '0'}#`;
    return `tel:*165*3#`;
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
          onClick={() => { setSubmitted(false); setAmount(''); setPhoneNumber(''); }}
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
          {/* Vibrant Merchant Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-400 rounded-3xl p-5 shadow-lg relative overflow-hidden group active:scale-95 transition-transform">
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
            <div className="bg-red-600 rounded-3xl p-5 shadow-lg relative overflow-hidden group active:scale-95 transition-transform">
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

          {/* Styled Form */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  <Phone size={12} className="mr-1.5" /> Enter Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400 text-lg">
                    {provider === 'MTN' ? <span className="text-yellow-600">+256</span> : provider === 'AIRTEL' ? <span className="text-red-600">+256</span> : '+256'}
                  </span>
                  <input 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
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
                      onClick={() => setPurpose(purp)}
                      className={`py-2.5 px-3 border rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors ${
                        purpose === purp 
                          ? 'bg-indigo-600 text-white border-indigo-600' 
                          : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
                      }`}
                    >
                      {purp}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-800 to-indigo-900 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 hover:from-purple-900 hover:to-black transition-all transform active:scale-95 uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Zap size={18} className="text-yellow-400" />
                      <span>Initiate Payment</span>
                    </>
                  )}
                </button>

                <a 
                  href={getUssdLink()}
                  className="w-full bg-white border-2 border-gray-100 text-gray-500 font-bold py-4 rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-gray-50 active:scale-95 transition-all"
                >
                  <Phone size={14} />
                  <span>Dial USSD Directly</span>
                </a>
              </div>
            </form>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-2xl flex items-start space-x-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0" size={18} />
            <p className="text-[10px] text-yellow-800 font-medium leading-relaxed uppercase">
              Payments are safe and secure. If the prompt doesn't appear, please use the direct dial button above.
            </p>
          </div>
        </div>
      )}

      {/* Trust Footer */}
      <div className="mt-8 flex flex-col items-center space-y-2 opacity-30">
        <div className="flex items-center space-x-2">
           <CheckCircle size={12} className="text-gray-400" />
           <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">CLB JOY CULTURE</span>
        </div>
      </div>
    </div>
  );
};
