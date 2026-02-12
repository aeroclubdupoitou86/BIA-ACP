import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("✈️ [BIA-ACP] Systèmes de bord en cours de chargement...");

const init = () => {
  const container = document.getElementById('root');
  if (container) {
    try {
      const root = createRoot(container);
      root.render(<App />);
      console.log("✅ [BIA-ACP] Interface déployée.");
    } catch (e) {
      console.error("❌ [BIA-ACP] Crash au démarrage:", e);
    }
  } else {
    console.error("❌ [BIA-ACP] Point d'ancrage 'root' introuvable.");
  }
};

// S'assurer que le DOM est prêt avant le montage
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}