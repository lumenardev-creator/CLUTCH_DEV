import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { supabase } from '../lib/supabase';

export const LoginView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      // Look up the user by email in the waitlist
      const { data, error: fetchError } = await supabase
        .from('waitlist')
        .select('name, email, password_hash, role, sport')
        .eq('email', email)
        .maybeSingle();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (!data) {
        setError('No account found with this email.');
        return;
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, data.password_hash);
      if (!passwordMatch) {
        setError('Incorrect password. Please try again.');
        return;
      }

      // Store user info in sessionStorage so ComingSoon knows they're logged in
      sessionStorage.setItem('clutch_user', JSON.stringify({
        name: data.name,
        email: data.email,
        role: data.role,
        sport: data.sport,
      }));

      navigate('/coming-soon');
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center px-6 py-24 bg-transparent min-h-screen relative z-20">
      <div className="max-w-lg w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white/20 text-gray-900 animate-in fade-in zoom-in duration-500">
        <h2 className="text-4xl font-black mb-8 text-center tracking-tight text-gray-900">Log In</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="login-email" className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Email *</label>
            <input required id="login-email" name="email" type="email" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900" placeholder="Your email..." />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Password *</label>
            <input required id="login-password" name="password" type="password" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900" placeholder="Your password..." />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-semibold text-center bg-red-50 rounded-xl py-3 px-4" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-blue-600 text-white font-black rounded-xl shadow-xl hover:-translate-y-1 transition-all text-xl mt-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? 'Logging in...' : 'Log In'}
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
