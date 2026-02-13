import React from 'react';

const Cours: React.FC = () => {
  const folderId = "1dAqKwP94pzw5LyX3TLM1Ryz_98R4Dp7Q";
  
  // Cette URL force l'affichage en mode "public web" sans forcer l'app
  const driveFullUrl = `https://drive.google.com/drive/mobile/folders/${folderId}?usp=sharing`;

  return (
    <div className="space-y-6 animate-fade-in pb-4 max-w-6xl mx-auto">
      {/* Encart Principal */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm p-8 sm:p-14">
        <div className="max-w-2xl">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider mb-8 border border-blue-100">
            <i className="fa-solid fa-folder-open mr-2"></i>
            RESSOURCES PARTAGÉES
          </div>
          
          <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed italic mb-10 lowercase text-justify">
            les cours dispensés à l'aéroclub sont disponibles en ligne. il est possible de les télécharger ↓
          </p>

          <a 
            href={driveFullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 group"
          >
            <i className="fa-brands fa-google-drive mr-3 text-lg"></i>
            Ouvrir le Google Drive
          </a>
        </div>
      </div>

      {/* Encart Le Saviez-vous ? */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 sm:p-8 flex items-center gap-6 shadow-sm">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
          <i className="fa-solid fa-lightbulb text-xl"></i>
        </div>
        <div>
          <h4 className="font-black text-slate-900 text-sm mb-1">Le saviez-vous ?</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            L'examen du BIA est un QCM national. Entraînez-vous avec les annales sur les applications existantes pour vous familiariser avec les questions types.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cours;