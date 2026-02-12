import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("✈️ [BIA-ACP] index.tsx : Démarrage de l'initialisation...");

const mountApp = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    console.error("❌ [BIA-ACP] Élément #root introuvable.");
    return;
  }

  try {
    console.log("🛠️ [BIA-ACP] Création du root React...");
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✅ [BIA-ACP] Montage terminé avec succès.");
  } catch (err) {
    console.error("❌ [BIA-ACP] Erreur fatale lors du montage:", err);
    container.innerHTML = `<div style="padding:40px;text-align:center;">
      <h2 style="color:red;">Erreur Critique</h2>
      <p>${err instanceof Error ? err.message : 'Échec du moteur'}</p>
    </div>`;
  }
};

// On s'assure de lancer le montage peu importe l'état du document
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountApp);
} else {
    mountApp();
}
