import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("✈️ [BIA-ACP] Sequence de démarrage initiée...");

const init = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error("❌ [BIA-ACP] Conteneur 'root' introuvable");
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✅ [BIA-ACP] Systèmes opérationnels");
  } catch (error) {
    console.error("❌ [BIA-ACP] Échec du montage de l'application:", error);
  }
};

// Initialisation au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}