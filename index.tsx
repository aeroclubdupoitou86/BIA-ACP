import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("✈️ [BIA-ACP] Moteur démarré !");

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}