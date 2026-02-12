import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("✈️ [BIA-ACP] index.tsx : Allumage des calculateurs...");

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("✅ [BIA-ACP] Cockpit prêt pour le décollage.");
} else {
  console.error("❌ [BIA-ACP] Erreur critique : le conteneur #root est introuvable.");
}