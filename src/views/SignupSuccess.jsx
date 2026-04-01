import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleCheck } from 'lucide-react';

export const SignupSuccess = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-grow flex items-center justify-center px-6 py-24 bg-transparent min-h-screen relative z-20">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl border border-white/20 text-gray-900 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner animate-bounce-subtle">
          <CircleCheck size={56} className="text-green-500" />
        </div>
        <h2 className="text-4xl font-black mb-4 text-gray-900">You're on the Waitlist! 🏀</h2>
        <p className="text-gray-500 text-xl mb-12 leading-relaxed">
          Thanks for signing up with <span className="font-bold text-gray-700">Clutch</span>. We'll email you when we go live.
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full py-5 bg-gray-900 text-white font-black rounded-xl shadow-xl hover:scale-105 hover:-translate-y-1 transition-all text-xl"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};
