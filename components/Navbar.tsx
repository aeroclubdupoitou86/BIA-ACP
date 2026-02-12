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
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 flex justify-around items-center h-20 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] px-2">
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
              <div className={`relative mb-1 flex items-center justify-center transition-all duration-300 transform ${isActive ? 'scale-110 -translate-y-1' : 'group-hover:scale-110'}`}>
                <i className={`fa-solid ${tab.icon} text-lg transition-all duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}></i>
                
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center animate-[bounceIn_0.5s_ease-out]">
                    <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center shadow-inner border border-blue-100">
                      <i className="fa-solid fa-plane text-blue-600 text-sm transform rotate-[-45deg] animate-[planeWiggle_3s_infinite_ease-in-out]"></i>
                    </div>
                  </div>
                )}
              </div>

              <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${isActive ? 'opacity-100 scale-100 mt-1' : 'opacity-60 scale-95 group-hover:opacity-100'}`}>
                {tab.name}
              </span>

              <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 bg-blue-600 rounded-b-full transition-all duration-500 ease-out shadow-[0_2px_10px_rgba(37,99,235,0.4)] ${isActive ? 'w-10 opacity-100' : 'w-0 opacity-0'}`}></div>
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes planeWiggle {
          0%, 100% { transform: rotate(-45deg) translateY(0); }
          50% { transform: rotate(-40deg) translateY(-2px); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;