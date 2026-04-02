import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleSignup from '../api/signup';

export const SignupView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.target;
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone_number: form.phone_number.value.trim(),
      password: form.password.value,
      role: form.role.value,
      sport: form.sport.value.trim(),
    };

    try {
      await handleSignup(formData);
      navigate('/signup-success');
    } catch (err) {
      if (err.message === 'EMAIL_EXISTS') {
        setError('This email is already on our waitlist!');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center px-6 py-24 bg-transparent min-h-screen relative z-20">
      <div className="max-w-lg w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white/20 text-gray-900 animate-in fade-in zoom-in duration-500">
        <h2 className="text-4xl font-black mb-8 text-center tracking-tight text-gray-900">Sign Up</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="signup-name" className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Name *</label>
            <input required id="signup-name" name="name" type="text" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900" placeholder="Your name..." />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Email *</label>
            <input required id="signup-email" name="email" type="email" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900" placeholder="Your email..." />
          </div>
          <div>
            <label htmlFor="signup-phone" className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Phone Number *</label>
            <input required id="signup-phone" name="phone_number" type="tel" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900" placeholder="Your phone number..." />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Password *</label>
            <input required id="signup-password" name="password" type="password" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900" placeholder="Your password..." />
          </div>
          <div>
            <label htmlFor="signup-role" className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Role *</label>
            <select required id="signup-role" name="role" defaultValue="" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900 bg-white">
              <option value="" disabled>Are you a coach or an athlete?</option>
              <option value="athlete">Athlete</option>
              <option value="coach">Coach</option>
            </select>
          </div>
          <div>
            <label htmlFor="signup-sport" className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Sport *</label>
            <input required id="signup-sport" name="sport" type="text" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900" placeholder="What sport do you play?" />
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
            {loading ? 'Signing you up...' : 'Complete Sign Up'}
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-500 font-medium">Already have an account? </span>
            <button type="button" onClick={() => navigate('/login')} className="text-blue-600 font-bold hover:underline">
              Log In
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
