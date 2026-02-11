
import React, { useState } from 'react';
import { RegistrationForm } from '../types';

const Registration: React.FC = () => {
  const [form, setForm] = useState<RegistrationForm>({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    school: '',
    level: 'Troisième'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration submitted:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
          <i className="fa-solid fa-check"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Demande d'inscription reçue !</h2>
        <p className="text-slate-600">
          Merci {form.firstName}, votre dossier est en cours d'examen par le comité pédagogique. 
          Vous recevrez un email de confirmation prochainement.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          Nouvelle inscription
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-aviation p-8 rounded-t-2xl text-white">
        <h2 className="text-3xl font-bold mb-2">Inscription BIA 2024-2025</h2>
        <p className="text-blue-200">Rejoignez l'aventure aéronautique et passez votre brevet d'initiation.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-b-2xl shadow-sm border border-slate-200 border-t-0 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Prénom</label>
            <input
              type="text"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.firstName}
              onChange={(e) => setForm({...form, firstName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
            <input
              type="text"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.lastName}
              onChange={(e) => setForm({...form, lastName: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email (étudiant ou parent)</label>
          <input
            type="email"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date de naissance</label>
            <input
              type="date"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.birthDate}
              onChange={(e) => setForm({...form, birthDate: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Niveau scolaire</label>
            <select
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.level}
              onChange={(e) => setForm({...form, level: e.target.value})}
            >
              <option>Troisième</option>
              <option>Seconde</option>
              <option>Première</option>
              <option>Terminale</option>
              <option>Autre (préciser)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Établissement actuel</label>
          <input
            type="text"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.school}
            onChange={(e) => setForm({...form, school: e.target.value})}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Envoyer ma candidature
          </button>
          <p className="text-xs text-slate-500 text-center mt-4">
            En soumettant ce formulaire, vous acceptez d'être recontacté pour les besoins de l'inscription au BIA.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
