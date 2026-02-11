import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div className="p-6 sm:p-12">
          <div className="mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center">
              <span className="w-2 h-8 bg-blue-600 rounded-full mr-4"></span>
              L'équipe pédagogique
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Responsable Formation */}
            <div className="flex items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl mr-5 shrink-0 shadow-lg shadow-blue-100">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <div>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Responsable Formation</p>
                <p className="font-black text-slate-900 text-lg leading-tight mb-2">Jean-François GUICHON</p>
                <a href="tel:0680844318" className="inline-flex items-center text-sm font-bold text-slate-600 hover:text-blue-600">
                  <i className="fa-solid fa-phone mr-2 text-xs"></i>
                  06 80 84 43 18
                </a>
              </div>
            </div>

            {/* Instructeur */}
            <div className="flex items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-slate-800 text-white rounded-xl flex items-center justify-center text-xl mr-5 shrink-0 shadow-lg">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Instructeur BIA ACP</p>
                <p className="font-black text-slate-900 text-lg leading-tight mb-2">Julien FRADET</p>
                <a href="tel:0659877001" className="inline-flex items-center text-sm font-bold text-slate-600 hover:text-blue-600">
                  <i className="fa-solid fa-phone mr-2 text-xs"></i>
                  06 59 87 70 01
                </a>
              </div>
            </div>

            {/* Email - Fix landscape width */}
            <div className="md:col-span-2">
              <a 
                href="mailto:aeroclubdupoitou86@gmail.com" 
                className="flex items-center bg-blue-50 p-6 rounded-2xl border border-blue-100 hover:bg-blue-100 transition-all group overflow-hidden"
              >
                <div className="w-12 h-12 bg-white text-blue-600 rounded-xl flex items-center justify-center text-xl mr-5 shrink-0 shadow-sm">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Nous écrire</p>
                  <p className="font-black text-slate-900 text-xs sm:text-lg lg:text-xl truncate break-all overflow-hidden">
                    aeroclubdupoitou86@gmail.com
                  </p>
                </div>
                <i className="fa-solid fa-chevron-right ml-4 text-blue-300 group-hover:translate-x-1 transition-transform hidden sm:block"></i>
              </a>
            </div>

            {/* Localisation */}
            <div className="md:col-span-2">
              <a 
                href="https://www.google.com/maps/place/A%C3%A9roclub+du+Poitou/@46.584544,0.3109356,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-6 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all bg-white"
              >
                <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center text-xl mr-5 shrink-0">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Nous trouver</p>
                  <p className="font-black text-slate-900 text-sm sm:text-base mb-1">AéroClub du Poitou</p>
                  <p className="text-xs text-slate-500 font-medium italic">Rue S Lieut Raymond Collard, 86580 Biard</p>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-8 py-10">
        <a href="https://www.facebook.com/acpoitouvmpoitiers" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-blue-600 hover:shadow-md transition-all">
          <i className="fa-brands fa-facebook text-xl"></i>
        </a>
        <a href="https://www.instagram.com/aeroclubpoitou" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-pink-500 hover:shadow-md transition-all">
          <i className="fa-brands fa-instagram text-xl"></i>
        </a>
        <a href="https://www.aero-club-poitou.fr/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-blue-400 hover:shadow-md transition-all">
          <i className="fa-solid fa-globe text-xl"></i>
        </a>
      </div>
    </div>
  );
};

export default Contact;