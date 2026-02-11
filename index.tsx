import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("🚀 [BIA-ACP] Moteur React démarré.");

const rootEl = document.getElementById('root');
if (rootEl) {
  try {
    const root = createRoot(rootEl);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✅ [BIA-ACP] Interface affichée avec succès.");
  } catch (error) {
    console.error("❌ [BIA-ACP] Erreur de rendu :", error);
  }
} else {
  console.error("❌ [BIA-ACP] Élément #root introuvable !");
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('📡 [BIA-ACP] Service Worker opérationnel.'))
      .catch(err => console.log('⚠️ [BIA-ACP] SW non activé:', err));
  });
}