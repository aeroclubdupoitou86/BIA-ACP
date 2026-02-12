import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Agenda from './components/Agenda.tsx';
import Actus from './components/Actus.tsx';
import Cours from './components/Cours.tsx';
import Contact from './components/Contact.tsx';
import Aide from './components/Aide.tsx';
import AIAssistant from './components/AIAssistant.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('actus');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'actus': return <Actus />;
      case 'agenda': return <Agenda />;
      case 'assistant': return <AIAssistant />;
      case 'cours': return <Cours />;
      case 'aide': return <Aide />;
      case 'contact': return <Contact />;
      default: return <Actus />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'actus': return "Actualités BIA";
      case 'agenda': return "Planning des Cours";
      case 'assistant': return "AéroBot Expert";
      case 'cours': return "Espace Apprentissage";
      case 'contact': return "Contact & Équipe";
      case 'aide': return "Installation App";
      default: return "BIA ACP";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div key={`logo-${activeTab}`} className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-md shadow-blue-200">
              <i className="fa-solid fa-plane-up text-white text-sm"></i>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {getPageTitle()}
              </h1>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
              Aéroclub du Poitou
            </span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 pb-28">
        <div className="animate-fade-in transition-opacity duration-300">
          {renderContent()}
        </div>
      </main>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;