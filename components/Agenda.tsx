import React, { useState, useEffect, useCallback, useRef } from 'react';

const Agenda: React.FC = () => {
  const [zoomScale, setZoomScale] = useState(1.0);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const embedUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBOaU_OuHjCh4GQLjyjDNOsoBZgWDhmt_EJf_LQuihoSVnEQusw1PKTxM70PkzCwzIgk4mmjWo58BZ/pubhtml?widget=false&headers=false&chrome=false&rm=minimal&gridlines=false";
  const publicUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBOaU_OuHjCh4GQLjyjDNOsoBZgWDhmt_EJf_LQuihoSVnEQusw1PKTxM70PkzCwzIgk4mmjWo58BZ/pubhtml";

  const REFERENCE_WIDTH_CONTENT = 650; 

  const updateDefaultZoom = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const isMobile = window.innerWidth < 768;
      
      // Sur mobile on force un zoom pour que le tableau soit lisible
      let calculatedScale = containerWidth / REFERENCE_WIDTH_CONTENT;
      if (!isMobile && calculatedScale < 1.0) calculatedScale = 1.0;
      
      setZoomScale(parseFloat(calculatedScale.toFixed(3)));
    }
  }, []);

  useEffect(() => {
    updateDefaultZoom();
    const timer = setTimeout(updateDefaultZoom, 500);
    window.addEventListener('resize', updateDefaultZoom);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDefaultZoom);
    };
  }, [updateDefaultZoom]);

  const adjustZoom = (delta: number) => {
    setZoomScale(prev => Math.max(0.1, Math.min(4.0, parseFloat((prev + delta).toFixed(2)))));
  };

  const handleSync = () => {
    setIframeKey(prev => prev + 1);
    setTimeout(updateDefaultZoom, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
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
            Vérifiez toujours le planning le vendredi soir pour d'éventuels changements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between bg-slate-50 p-1 rounded-lg border border-slate-100 h-10">
          <button onClick={() => adjustZoom(-0.1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white rounded-md transition-all active:scale-90"><i className="fa-solid fa-minus text-[10px]"></i></button>
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{Math.round(zoomScale * 100)}%</div>
          <button onClick={() => adjustZoom(0.1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white rounded-md transition-all active:scale-90"><i className="fa-solid fa-plus text-[10px]"></i></button>
        </div>
        <button onClick={handleSync} className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 h-10 border border-slate-200"><i className="fa-solid fa-rotate"></i><span>Sync</span></button>
        <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-md hover:bg-blue-700 h-10 transition-all"><i className="fa-solid fa-expand"></i><span>Plein écran</span></a>
      </div>

      {/* Conteneur avec scroll horizontal activé */}
      <div ref={containerRef} className="bg-white border-2 border-slate-200 shadow-lg h-[65vh] sm:h-[75vh] min-h-[450px] relative rounded-xl overflow-hidden">
        <div className="w-full h-full overflow-x-auto overflow-y-auto bg-white" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div style={{ 
            width: `${Math.max(REFERENCE_WIDTH_CONTENT, REFERENCE_WIDTH_CONTENT * zoomScale)}px`,
            minWidth: '100%',
            height: '100%',
            position: 'relative'
          }}>
            <iframe 
              key={iframeKey}
              src={embedUrl}
              className="border-none absolute top-0 left-0"
              style={{ 
                width: `${REFERENCE_WIDTH_CONTENT}px`,
                height: `${100 / zoomScale}%`, 
                transform: `scale(${zoomScale})`,
                transformOrigin: 'top left',
                backgroundColor: 'white'
              }}
              title="Tableau de bord BIA"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 border border-blue-100"><i className="fa-solid fa-info-circle text-xl"></i></div>
        <div className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed italic text-justify">
          <p>Les cours inscrits dans la colonne <strong>"MODULE (prévisionnel)"</strong> sont susceptibles d'être modifiés.</p>
        </div>
      </div>
    </div>
  );
};

export default Agenda;