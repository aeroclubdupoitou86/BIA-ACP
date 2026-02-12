import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const startApp = () => {
  const container = document.getElementById('root');
  if (!container) return;

  try {
    const root = createRoot(container);
    root.render(<App />);
    console.log("✈️ [BIA-ACP] Moteurs allumés. Prêt au décollage.");
  } catch (err) {
    console.error("❌ Erreur au démarrage:", err);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}