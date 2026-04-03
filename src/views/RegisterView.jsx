import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterView = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-grow flex items-center justify-center px-6 py-24 bg-transparent min-h-screen relative z-20">
      <div className="max-w-lg w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white/20 text-gray-900 animate-in fade-in zoom-in duration-500">
        <h2 className="text-4xl font-black mb-8 text-center tracking-tight text-gray-900">Register Interest</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          navigate('/success');
        }} className="space-y-6">
          {["Name", "Email", "Phone Number"].map((f, i) => (
            <div key={i}>
              <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">{f} *</label>
              <input required type={f === "Email" ? "email" : f === "Phone Number" ? "tel" : "text"} className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900" placeholder={`Your ${f.toLowerCase()}...`} />
            </div>
          ))}
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Role *</label>
            <select required defaultValue="" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900 bg-white">
              <option value="" disabled>Are you a coach or an athlete?</option>
              <option value="athlete">Athlete</option>
              <option value="coach">Coach</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Sport *</label>
            <input required type="text" className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-colors text-lg text-gray-900" placeholder="What sport do you play?" />
          </div>
          <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-xl shadow-xl hover:-translate-y-1 transition-all text-xl mt-4">
            Complete Registration
          </button>
          <button type="button" onClick={() => navigate('/')} className="w-full py-3 text-gray-400 font-bold hover:text-gray-600">
            Back
          </button>
        </form>
      </div>
    </main>
  );
};
