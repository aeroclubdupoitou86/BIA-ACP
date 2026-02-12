import React, { useState, useEffect, useCallback, useRef } from 'react';

const Agenda: React.FC = () => {
  const [zoomScale, setZoomScale] = useState(1.0);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const publicUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBOaU_OuHjCh4GQLjyjDNOsoBZgWDhmt_EJf_LQuihoSVnEQusw1PKTxM70PkzCwzIgk4mmjWo58BZ/pubhtml";
  const embedUrl = `${publicUrl}?widget=true&headers=false`;

  // Largeur native estimée pour un affichage propre du planning sans trop de blanc
  const SHEET_NATIVE_WIDTH = 780; 

  const updateAutoZoom = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Calcul du zoom pour que le contenu occupe exactement toute la largeur du conteneur
      const calculatedScale = containerWidth / SHEET_NATIVE_WIDTH;
      setZoomScale(calculatedScale);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateAutoZoom, 300);
    window.addEventListener('resize', updateAutoZoom);
    window.addEventListener('orientationchange', updateAutoZoom);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateAutoZoom);
      window.removeEventListener('orientationchange', updateAutoZoom);
    };
  }, [updateAutoZoom]);

  const adjustZoom = (delta: number) => {
    setZoomScale(prev => Math.max(0.1, Math.min(3.0, prev + delta)));
  };

  const handleSync = () => {
    setIframeKey(prev => prev + 1);
    setTimeout(updateAutoZoom, 600);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex items-center shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <i className="fa-solid fa-plane-arrival text-8xl rotate-12"></i>
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-xl sm:text-3xl mr-5 sm:mr-8 shrink-0 shadow-lg shadow-blue-500/20">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div>
            <h4 className="font-black text-lg sm:text-2xl leading-tight">Cours du Samedi</h4>
            <p className="text-blue-300 text-sm sm:text-lg font-medium">
              <span className="text-white font-black">09:00 — 11:00</span> • Aéroclub du Poitou
            </p>
          </div>
        </div>
        
        <div className="bg-amber-50 border-2 border-amber-200/50 rounded-2xl p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1.5">
            <i className="fa-solid fa-triangle-exclamation text-amber-500 text-xs"></i>
            <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">Important</span>
          </div>
          <p className="text-[11px] text-amber-900 font-bold leading-tight">
            Vérifiez toujours le planning le vendredi soir.
          </p>
          <p className="text-[9px] text-amber-700/80 font-bold mt-1.5 leading-tight italic">
            (horaires hors vacances scolaires et changements éventuels)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between bg-slate-50 p-1 rounded-lg border border-slate-100 h-12">
          <button 
            onClick={() => adjustZoom(-0.05)} 
            className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-white hover:text-blue-600 rounded-md transition-all active:scale-90"
          >
            <i className="fa-solid fa-minus text-xs"></i>
          </button>
          <div className="text-[10px] font-black text-slate-900 uppercase tracking-tighter w-12 text-center">
            {Math.round(zoomScale * 100)}%
          </div>
          <button 
            onClick={() => adjustZoom(0.05)} 
            className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-white hover:text-blue-600 rounded-md transition-all active:scale-90"
          >
            <i className="fa-solid fa-plus text-xs"></i>
          </button>
        </div>
        
        <button 
          onClick={handleSync} 
          className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 hover:text-slate-900 h-12 border border-slate-200 transition-all active:scale-95"
        >
          <i className="fa-solid fa-rotate"></i>
          <span className="hidden sm:inline">Synchroniser</span>
          <span className="sm:hidden text-[8px]">Sync</span>
        </button>
        
        <a 
          href={publicUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-blue-700 h-12 transition-all active:scale-95"
        >
          <i className="fa-solid fa-expand"></i>
          <span className="hidden sm:inline">Plein écran</span>
          <span className="sm:hidden text-[8px]">Ouvrir</span>
        </a>
      </div>

      <div ref={containerRef} className="bg-white border border-slate-200 shadow-lg h-[65vh] sm:h-[75vh] min-h-[450px] relative rounded-2xl overflow-hidden">
        <div className="w-full h-full overflow-auto bg-white" style={{ WebkitOverflowScrolling: 'touch' }}>
           <div 
             style={{ 
               width: `${SHEET_NATIVE_WIDTH}px`,
               minWidth: '100%',
               height: `${100 / zoomScale}%`,
               transform: `scale(${zoomScale})`,
               transformOrigin: 'top left',
             }}
           >
             <iframe 
                key={iframeKey}
                src={embedUrl}
                className="w-full h-full border-none"
                title="Planning BIA"
                loading="lazy"
              ></iframe>
           </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-5">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
          <i className="fa-solid fa-circle-info text-xl"></i>
        </div>
        <div className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed text-justify space-y-2">
          <p>
            Les cours inscrits dans la colonne <strong>"MODULE (prévisionnel)"</strong> aux dates qui ne sont pas passées sont des prévisions, et donc susceptibles d'être modifiés.
          </p>
          <p>
            Les informations de la colonne <strong>"INFOS & modules"</strong> indiquent ce qui a été fait lors du cours correspondant à la date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Agenda;