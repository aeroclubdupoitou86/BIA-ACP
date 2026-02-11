
import React from 'react';

const Aide: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-10">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6 sm:p-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-blue-100">
              <i className="fa-solid fa-mobile-screen-button"></i>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">Installer l'application</h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Pour accéder plus rapidement au planning et aux cours, installez l'application BIA ACP sur votre écran d'accueil. Elle fonctionnera comme une application native.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* iOS / iPhone / iPad */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-sm mr-4">
                  <i className="fa-brands fa-apple text-xl"></i>
                </div>
                <h3 className="font-bold text-slate-900">Sur iPhone & iPad</h3>
              </div>
              <ol className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mr-3">1</span>
                  <span>Ouvrez le site dans <strong>Safari</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mr-3">2</span>
                  <span>Appuyez sur le bouton <strong>Partager</strong> <i className="fa-solid fa-share-from-square text-blue-600 mx-1"></i> (le carré avec une flèche).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mr-3">3</span>
                  <span>Faites défiler vers le bas et choisissez <strong>"Sur l'écran d'accueil"</strong>.</span>
                </li>
              </ol>
            </div>

            {/* Android / Chrome */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-sm mr-4">
                  <i className="fa-brands fa-android text-xl text-green-600"></i>
                </div>
                <h3 className="font-bold text-slate-900">Sur Android (Chrome)</h3>
              </div>
              <ol className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mr-3">1</span>
                  <span>Ouvrez le site dans <strong>Google Chrome</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mr-3">2</span>
                  <span>Appuyez sur les <strong>trois points</strong> <i className="fa-solid fa-ellipsis-vertical text-slate-400 mx-1"></i> en haut à droite.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mr-3">3</span>
                  <span>Appuyez sur <strong>"Installer l'application"</strong> ou "Ajouter à l'écran d'accueil".</span>
                </li>
              </ol>
            </div>

            {/* Ordinateur */}
            <div className="md:col-span-2 bg-blue-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <i className="fa-solid fa-desktop text-9xl"></i>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mr-4">
                    <i className="fa-solid fa-laptop text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">Sur Ordinateur (Mac / PC)</h3>
                    <p className="text-blue-100 text-xs">Installez-la comme un logiciel classique via Chrome ou Edge.</p>
                  </div>
                </div>
                <div className="text-sm font-medium bg-white/10 p-3 rounded-xl border border-white/20">
                  Cherchez l'icône <i className="fa-solid fa-download mx-1"></i> ou <i className="fa-solid fa-plus-square mx-1"></i> dans la barre d'adresse du navigateur.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-row items-center gap-4 sm:gap-6">
        <div className="w-10 h-10 sm:w-16 sm:h-16 bg-blue-50 rounded-xl sm:rounded-full flex items-center justify-center text-lg sm:text-2xl shrink-0 text-blue-600">
          <i className="fa-solid fa-wifi"></i>
        </div>
        <div>
          <h4 className="font-bold text-sm sm:text-base mb-0.5 text-slate-900">Mode hors-ligne</h4>
          <p className="text-[11px] sm:text-sm text-slate-500 leading-snug sm:leading-relaxed">
            Une fois installée, l'application met en cache les informations essentielles. Vous pourrez consulter le dernier planning chargé même sans connexion internet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aide;
