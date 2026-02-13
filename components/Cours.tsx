import React from 'react';

const Cours: React.FC = () => {
  const mainDriveLink = "https://drive.google.com/drive/folders/1dAqKwP94pzw5LyX3TLM1Ryz_98R4Dp7Q?usp=drive_link";

  const modules = [
    { 
      id: 1, 
      title: "Météorologie et Aérologie", 
      icon: "fa-cloud-sun", 
      color: "text-blue-500", 
      bg: "bg-blue-50",
      link: "https://drive.google.com/drive/folders/19r0IoFtI9TO8uf8SXfDYLQNEGonZ7bbW"
    },
    { 
      id: 2, 
      title: "Aérodynamique, GTR", 
      icon: "fa-wind", 
      color: "text-emerald-500", 
      bg: "bg-emerald-50",
      link: "https://drive.google.com/drive/folders/1jyqTB4PSMU8tjHHTF7PafGKwzZgP5KTN"
    },
    { 
      id: 3, 
      title: "Étude des aéronefs", 
      icon: "fa-plane", 
      color: "text-indigo-500", 
      bg: "bg-indigo-50",
      link: "https://drive.google.com/drive/folders/19QCKEP3XxjIyBiCgdibYB9tqKA7PMZw7"
    },
    { 
      id: 4, 
      title: "Navigation, Réglementation", 
      icon: "fa-map-location-dot", 
      color: "text-amber-500", 
      bg: "bg-amber-50",
      link: "https://drive.google.com/drive/folders/1MJbKcXGj53nYGKQTzylkR1PxQzxTAADH"
    },
    { 
      id: 5, 
      title: "Histoire de l'Aéronautique", 
      icon: "fa-monument", 
      color: "text-purple-500", 
      bg: "bg-purple-50",
      link: "https://drive.google.com/drive/folders/1szESSUobDchUN06c2VKoLOlVRnDoSlZw"
    },
    { 
      id: "Anglais", 
      title: "Module Anglais", 
      icon: "fa-language", 
      color: "text-red-500", 
      bg: "bg-red-50",
      link: "https://drive.google.com/drive/folders/1dqFG59aPZZ43z16duAwdZwizBtXBB0fi"
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-12">
      
      {/* TEXTE D'INTRODUCTION DISCRET */}
      <p className="text-[11px] sm:text-xs text-slate-400 font-medium px-2">
        Les cours dispensés à l'aéroclub sont disponibles en ligne. Il est possible de les télécharger ↓
      </p>

      {/* ENCART PRINCIPAL : COURS EN LIGNE (FOND BLEU) */}
      <a 
        href={mainDriveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 rounded-3xl p-6 text-white flex items-center shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-[0.98] group"
      >
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl mr-4 shadow-lg group-hover:scale-110 transition-transform">
          <i className="fa-solid fa-folder-open"></i>
        </div>
        <div>
          <h4 className="font-black text-sm uppercase tracking-widest">COURS EN LIGNE</h4>
          <p className="text-blue-100 text-xs font-medium">Ouvrir le dossier Google Drive</p>
        </div>
      </a>

      {/* LISTE DES MODULES AVEC LIENS SPÉCIFIQUES */}
      <div className="grid grid-cols-1 gap-3">
        {modules.map((module) => (
          <a 
            key={module.id}
            href={module.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className={`w-12 h-12 ${module.bg} ${module.color} rounded-xl flex items-center justify-center text-lg mr-4 group-hover:scale-110 transition-transform`}>
              <i className={`fa-solid ${module.icon}`}></i>
            </div>
            <div className="flex-1">
              <h5 className="font-bold text-slate-900 text-sm">{module.title}</h5>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                {typeof module.id === 'number' ? `Module ${module.id}` : module.id}
              </p>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-300 group-hover:text-blue-500 transition-colors"></i>
          </a>
        ))}
      </div>

    </div>
  );
};

export default Cours;