import React from 'react';

const Cours: React.FC = () => {
  const driveLink = "https://drive.google.com/drive/folders/1dAqKwP94pzw5LyX3TLM1Ryz_98R4Dp7Q";

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in pb-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex flex-col">
          <div className="p-6 sm:p-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">
              <i className="fa-solid fa-folder-open mr-2"></i>
              Ressources Partagées
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-3 sm:mb-4 leading-tight">
              Supports de cours
            </h2>
            <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed max-w-xl text-xs sm:text-base italic">
              Les cours dispensés à l'aéroclub sont disponibles en ligne. Il est possible de les télécharger ↓
            </p>
            <a 
              href={driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 bg-blue-600 text-white font-bold rounded-xl sm:rounded-2xl hover:bg-blue-700 transition-all shadow-md active:scale-95 group"
            >
              <i className="fa-brands fa-google-drive mr-3 text-lg group-hover:rotate-12 transition-transform"></i>
              Ouvrir le Google Drive
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-row items-center gap-4 sm:gap-6">
        <div className="w-10 h-10 sm:w-16 sm:h-16 bg-slate-50 rounded-xl sm:rounded-full flex items-center justify-center text-lg sm:text-2xl shrink-0 text-blue-600">
          <i className="fa-solid fa-lightbulb"></i>
        </div>
        <div>
          <h4 className="font-bold text-sm sm:text-base mb-0.5 text-slate-900">Le saviez-vous ?</h4>
          <p className="text-[11px] sm:text-sm text-slate-500 leading-snug sm:leading-relaxed">
            L'examen du BIA est un QCM national. Entraînez-vous avec les annales sur les applications existantes pour vous familiariser avec les questions types.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cours;