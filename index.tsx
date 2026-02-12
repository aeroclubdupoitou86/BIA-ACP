import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("✈️ [BIA-ACP] Lancement des systèmes de bord...");

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(<App />);
    console.log("✅ [BIA-ACP] Interface active.");
  } catch (err) {
    console.error("❌ [BIA-ACP] Erreur de déploiement:", err);
  }
} else {
  console.error("❌ [BIA-ACP] Erreur : Conteneur #root manquant.");
}