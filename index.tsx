import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("✈️ [BIA-ACP] Moteur démarré avec succès !");

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('🚀 Service Worker enregistré:', reg.scope))
      .catch(err => console.log('❌ Échec SW:', err));
  });
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}