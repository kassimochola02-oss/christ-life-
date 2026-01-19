
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-yellow-50 rounded-full blur-3xl opacity-50"></div>

      {/* Header / Logo */}
      <div className="text-center mb-10 z-10">
        <div className="w-24 h-24 bg-black rounded-full border-4 border-yellow-500 flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce-slow">
           <span className="text-[14px] font-black text-white text-center leading-none">The<br/><span className="text-yellow-500 text-[18px]">Chris</span><br/>Life!</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">Welcome Home</h1>
        <p className="text-indigo-600 font-bold text-xs tracking-[0.2em] uppercase mt-1">Raising Role Models</p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm z-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all font-medium text-gray-700"
                placeholder="you@clb.org"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-12 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all font-medium text-gray-700"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-indigo-900 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 transform transition-all active:scale-95 flex items-center justify-center space-x-2 uppercase tracking-[0.2em] text-sm"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Or continue with</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 py-3 border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
               <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
               <ShieldCheck className="w-4 h-4 text-blue-600" />
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Facebook</span>
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm font-medium">
            New to the family?{' '}
            <button className="text-indigo-600 font-black uppercase tracking-widest text-xs ml-1 hover:underline">
              Join Us Now
            </button>
          </p>
        </div>
      </div>

      <div className="mt-10 opacity-20">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">CLB Joy Culture © 2025</p>
      </div>
    </div>
  );
};
