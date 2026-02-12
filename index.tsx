import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  console.log("🛠️ [BIA-ACP] Initialisation du root React...");
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("✅ [BIA-ACP] Application démarrée.");
} else {
  console.error("❌ [BIA-ACP] Conteneur #root introuvable.");
}