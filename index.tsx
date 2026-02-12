import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("🚀 [BIA-ACP] Engine Start...");

const mountApp = () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
    console.log("✅ [BIA-ACP] Dashboard Ready");
  }
};

// On s'assure que le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}