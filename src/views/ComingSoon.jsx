import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ComingSoon = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('clutch_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('clutch_user');
    navigate('/');
  };

  return (
    <>
      <style>{`
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dot-animate { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
      <main className="flex-grow flex items-center justify-center px-6 py-24 bg-transparent min-h-screen relative z-20">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl border border-white/20 text-gray-900 text-center animate-in fade-in zoom-in duration-500">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl font-black mb-4 text-gray-900">We're Building Something Big</h2>
          <p className="text-gray-500 text-xl mb-6 leading-relaxed">
            <span className="font-bold text-gray-700">Clutch</span> is currently under development. Stay tuned!
          </p>

          {/* Animated dots */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="dot-animate w-3 h-3 rounded-full bg-blue-600 inline-block"
                style={{
                  animation: `bounce-dot 1.4s infinite ease-in-out both`,
                  animationDelay: `${i * 0.16}s`,
                }}
              />
            ))}
          </div>

          {user ? (
            <>
              <div className="bg-green-50 border border-green-200 rounded-xl py-4 px-5 mb-6">
                <p className="text-green-700 font-bold text-lg">✅ You're on the waitlist!</p>
                <p className="text-green-600 text-sm mt-1">
                  Welcome back, <span className="font-semibold">{user.name}</span>. We'll notify you at <span className="font-semibold">{user.email}</span> when we launch.
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all text-lg"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/signup')}
                className="w-full py-5 bg-blue-600 text-white font-black rounded-xl shadow-xl hover:scale-105 hover:-translate-y-1 transition-all text-xl"
              >
                Join Waitlist
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full pt-6 pb-2 text-gray-400 font-bold hover:text-gray-600 text-center block"
          >
            Back to Home
          </button>
        </div>
      </main>
    </>
  );
};
