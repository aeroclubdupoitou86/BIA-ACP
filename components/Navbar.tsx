import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'actus', name: 'Actus', icon: 'fa-newspaper' },
    { id: 'agenda', name: 'Agenda', icon: 'fa-calendar-days' },
    { id: 'cours', name: 'Cours', icon: 'fa-book-open' },
    { id: 'aide', name: 'Aide', icon: 'fa-circle-question' },
    { id: 'contact', name: 'Contact', icon: 'fa-envelope' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 flex justify-around items-center h-20 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] px-2">
      <div className="max-w-7xl mx-auto w-full flex justify-around items-center h-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${
                isActive ? 'text-blue-600' : 'text-slate-400 hover:text-blue-500'
              }`}
            >
              <div className="relative mb-1 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                <i className={`fa-solid ${tab.icon} text-lg transition-all duration-300 group-hover:scale-110 ${isActive ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}></i>
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 plane-takeoff">
                      <i className="fa-solid fa-plane text-blue-600 text-sm"></i>
                    </div>
                  </div>
                )}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-tight transition-all duration-300 ${isActive ? 'opacity-100 scale-100 mt-1' : 'opacity-70 scale-95 group-hover:opacity-100 group-hover:scale-100'}`}>
                {tab.name}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-b-full shadow-[0_2px_10px_rgba(37,99,235,0.4)]"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;