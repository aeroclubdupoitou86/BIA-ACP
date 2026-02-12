import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("✈️ [BIA-ACP] Moteur démarré ! Initialisation de l'interface...");

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
  console.log("✅ [BIA-ACP] Cockpit prêt et déployé.");
} else {
  console.error("❌ [BIA-ACP] Erreur fatale : #root non trouvé.");
}