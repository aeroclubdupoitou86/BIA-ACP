import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("✈️ [BIA-ACP] Module index.tsx chargé avec succès.");

const init = () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✅ [BIA-ACP] Interface rendue.");
  } else {
    console.error("❌ [BIA-ACP] Root introuvable.");
  }
};

// Exécution immédiate
init();