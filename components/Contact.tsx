import React, { useState } from 'react';

const Contact: React.FC = () => {
  const address = "Rue S Lieut Raymond Collard, 86580 Biard";
  
  // URL Maps Universelle corrigée (Format officiel de recherche Google)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Aéroclub du Poitou " + address)}`;

  const [copied, setCopied] = useState(false);

  // Fonction de gestion Instagram (Mobile App vs Web)
  const handleInstagramClick = (e: React.MouseEvent) => {
    const instagramUsername = "aeroclubpoitou";
    const appUrl = `instagram://user?username=${instagramUsername}`;
    const webUrl = `https://www.instagram.com/${instagramUsername}/`;

    // Détection si l'utilisateur est sur mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Sur mobile, on tente d'ouvrir l'application
      e.preventDefault();
      window.location.href = appUrl;

      // Si l'application n'est pas installée, on bascule sur le web après 500ms
      setTimeout(() => {
        // On vérifie si la page est toujours visible (si l'app s'est ouverte, le timeout est souvent suspendu)
        window.location.href = webUrl;
      }, 500);
    }
    // Sur PC, on ne fait rien, le target="_blank" et le href standard feront le travail
  };

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("Aéroclub du Poitou, " + address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ContactCard = ({ role, name, phone, icon }: { role: string, name: string, phone: string, icon: string }) => {
    const formattedPhone = phone.replace(/\s/g, '');
    return (
      <div className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
        <div className={`w-10 h-10 ${icon.includes('shield') ? 'bg-blue-600' : 'bg-slate-800'} text-white rounded-lg flex items-center justify-center text-base mr-4 shrink-0 shadow-md`}>
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{role}</p>
          <p className="font-black text-slate-900 text-base leading-tight mb-1.5 truncate">{name}</p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-600">{phone}</span>
            <div className="flex gap-1.5">
              <a 
                href={`tel:${formattedPhone}`} 
                className="w-8 h-8 bg-white border border-slate-200 rounded-md flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90"
              >
                <i className="fa-solid fa-phone text-[9px]"></i>
              </a>
              <a 
                href={`sms:${formattedPhone}`} 
                className="w-8 h-8 bg-white border border-slate-200 rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-800 hover:text-white transition-all shadow-sm active:scale-90"
              >
                <i className="fa-solid fa-message text-[9px]"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-4">
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-8">
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
              L'équipe pédagogique
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ContactCard 
              role="Responsable Formation" 
              name="Jean-François GUICHON" 
              phone="06 80 84 43 18" 
              icon="fa-user-shield" 
            />

            <ContactCard 
              role="Instructeur BIA ACP" 
              name="Julien FRADET" 
              phone="06 59 87 70 01" 
              icon="fa-user-tie" 
            />

            <div className="md:col-span-2">
              <a 
                href="mailto:aeroclubdupoitou86@gmail.com" 
                className="flex items-center bg-blue-50 p-4 rounded-xl border border-blue-100 hover:bg-blue-100 transition-all group overflow-hidden"
              >
                <div className="w-10 h-10 bg-white text-blue-600 rounded-lg flex items-center justify-center text-base mr-4 shrink-0 shadow-sm">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-0.5">Nous écrire</p>
                  <p className="font-black text-slate-900 text-xs sm:text-base truncate">
                    aeroclubdupoitou86@gmail.com
                  </p>
                </div>
                <i className="fa-solid fa-chevron-right ml-3 text-blue-300 group-hover:translate-x-1 transition-transform hidden sm:block"></i>
              </a>
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-row items-stretch gap-2 sm:gap-3">
                <a 
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-start p-3 sm:p-4 rounded-xl border border-slate-100 hover:border-slate-300 transition-all bg-white min-w-0"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center text-sm sm:text-base mr-3 sm:mr-4 shrink-0">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Nous trouver</p>
                    <p className="font-black text-slate-900 text-[10px] sm:text-sm mb-0.5 truncate">AéroClub du Poitou</p>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium italic truncate">{address}</p>
                  </div>
                </a>
                <button 
                  onClick={handleCopyAddress}
                  className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2 rounded-xl border transition-all font-black text-[8px] sm:text-[10px] uppercase tracking-widest shrink-0 whitespace-nowrap shadow-sm self-stretch ${
                    copied 
                      ? 'bg-green-50 border-green-200 text-green-600' 
                      : 'bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100 hover:border-blue-200 active:scale-95'
                  }`}
                >
                  <i className={`fa-solid ${copied ? 'fa-check' : 'fa-map-pin'} text-[10px] sm:text-xs`}></i>
                  <span>{copied ? 'Copié !' : "Copier l'adresse"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 py-6">
        <a href="https://www.facebook.com/acpoitouvmpoitiers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-blue-600 transition-all">
          <i className="fa-brands fa-facebook text-lg"></i>
        </a>
        
        {/* BOUTON INSTAGRAM INTELLIGENT */}
        <a 
          href="https://www.instagram.com/aeroclubpoitou/" 
          onClick={handleInstagramClick}
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-pink-500 transition-all"
        >
          <i className="fa-brands fa-instagram text-lg"></i>
        </a>

        <a href="https://www.aero-club-poitou.fr/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-blue-400 transition-all">
          <i className="fa-solid fa-globe text-lg"></i>
        </a>
      </div>
    </div>
  );
};

export default Contact;