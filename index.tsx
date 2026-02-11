import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("🚀 BIA ACP: Lancement du moteur React...");

try {
  const rootEl = document.getElementById('root');
  if (rootEl) {
    const root = createRoot(rootEl);
    root.render(<App />);
    console.log("✅ BIA ACP: Rendu initial lancé avec succès.");
  } else {
    console.error("❌ BIA ACP: Élément #root introuvable !");
  }
} catch (error) {
  console.error("❌ BIA ACP: Erreur critique lors de l'initialisation :", error);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('📡 BIA ACP: Service Worker enregistré.'))
      .catch(err => console.log('⚠️ BIA ACP: Échec du SW:', err));
  });
}