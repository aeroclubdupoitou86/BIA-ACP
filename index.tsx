import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("✈️ [BIA-ACP] Allumage des systèmes embarqués...");

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("❌ Panne au démarrage:", error);
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; text-align:center; padding:20px; background:#f8fafc;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:48px; color:#ef4444; margin-bottom:20px;"></i>
        <h1 style="color:#0f172a; margin-bottom:8px;">Erreur de démarrage</h1>
        <p style="color:#64748b; font-size:14px; margin-bottom:24px;">Le système n'a pas pu s'initialiser.</p>
        <button onclick="window.location.reload()" style="background:#2563eb; color:white; border:none; padding:12px 24px; border-radius:12px; cursor:pointer; font-weight:bold;">
          Redémarrer
        </button>
      </div>
    `;
  }
}