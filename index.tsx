import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("✈️ [BIA-ACP] index.tsx chargé avec succès");

const startApp = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error("❌ [BIA-ACP] Élément #root introuvable");
    return;
  }

  try {
    console.log("🛠️ [BIA-ACP] Tentative de montage React...");
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✅ [BIA-ACP] Application montée. Décollage réussi !");
  } catch (err) {
    console.error("❌ [BIA-ACP] Erreur lors du rendu React:", err);
    container.innerHTML = `<div style="padding:40px; text-align:center; font-family:sans-serif;">
      <h2 style="color:#ef4444;">Panne système</h2>
      <p style="color:#64748b;">${err instanceof Error ? err.message : 'Une erreur inconnue est survenue.'}</p>
    </div>`;
  }
};

// Exécution propre
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  startApp();
} else {
  window.addEventListener('DOMContentLoaded', startApp);
}