import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("✈️ [BIA-ACP] Initialisation du module principal...");

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("✅ [BIA-ACP] Cockpit activé.");
} else {
  console.error("❌ [BIA-ACP] Erreur critique : Élément #root non trouvé.");
}