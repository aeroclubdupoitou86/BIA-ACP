import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("✅ [BIA-ACP] Systèmes de bord opérationnels.");
} else {
  console.error("❌ [BIA-ACP] Erreur critique : conteneur racine introuvable.");
}