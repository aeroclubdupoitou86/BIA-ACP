import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("✈️ [BIA-ACP] Engine start...");

const container = document.getElementById('root');
if (container) {
  try {
    const root = createRoot(container);
    root.render(<App />);
    console.log("✅ [BIA-ACP] Dashboard ready");
  } catch (err) {
    console.error("❌ [BIA-ACP] Startup error:", err);
  }
}