import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✈️ [BIA-ACP] Systèmes opérationnels.");
  } catch (err) {
    console.error("❌ [BIA-ACP] Échec du montage:", err);
  }
}