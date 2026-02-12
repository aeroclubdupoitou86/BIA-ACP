import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("✈️ [BIA-ACP] Initialisation de index.tsx");

const startApp = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error("❌ [BIA-ACP] Élément #root introuvable");
    return;
  }

  try {
    console.log("🛠️ [BIA-ACP] Montage de l'application...");
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✅ [BIA-ACP] Systèmes opérationnels.");
  } catch (err) {
    console.error("❌ [BIA-ACP] Échec critique au décollage:", err);
    container.innerHTML = `<div style="padding:40px; text-align:center; font-family:sans-serif;">
      <h2 style="color:#ef4444;">Panne de démarrage</h2>
      <p style="color:#64748b;">Une erreur technique empêche l'application de s'afficher.</p>
    </div>`;
  }
};

// Exécution immédiate ou sur événement
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  startApp();
} else {
  window.addEventListener('DOMContentLoaded', startApp);
}