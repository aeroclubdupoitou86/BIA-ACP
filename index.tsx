import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("✈️ [BIA-ACP] index.tsx : Système d'exploitation en cours de chargement...");

const mountApp = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    console.error("❌ [BIA-ACP] Élément #root introuvable.");
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✅ [BIA-ACP] Interface prête. Décollage immédiat !");
  } catch (err) {
    console.error("❌ [BIA-ACP] Erreur critique lors du montage:", err);
  }
};

// Exécution immédiate ou après chargement du DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountApp);
} else {
    mountApp();
}
