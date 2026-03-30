import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginView = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-grow flex items-center justify-center px-6 py-24 bg-transparent min-h-screen relative z-20">
      <div className="max-w-lg w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white/20 text-gray-900 animate-in fade-in zoom-in duration-500">
        <h2 className="text-4xl font-black mb-8 text-center tracking-tight text-gray-900">Log In</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          // Simple mock login flow: you could redirect to athlete or coach portal depending on logic
          // For now, redirect to coach portal as default to show functionality
          navigate('/coach');
        }} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Email *</label>
            <input required type="email" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900" placeholder="Your email..." />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Password *</label>
            <input required type="password" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900" placeholder="Your password..." />
          </div>
          <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-xl shadow-xl hover:-translate-y-1 transition-all text-xl mt-4">
            Log In
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-500 font-medium">Don't have an account? </span>
            <button type="button" onClick={() => navigate('/signup')} className="text-blue-600 font-bold hover:underline">
              Sign Up
            </button>
          </div>
          <button type="button" onClick={() => navigate('/')} className="w-full pt-4 pb-2 text-gray-400 font-bold hover:text-gray-600 text-center block">
            Back to Home
          </button>
        </form>
      </div>
    </main>
  );
};
