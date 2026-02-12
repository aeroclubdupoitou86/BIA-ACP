import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

/**
 * Point d'entrée de l'application BIA ACP.
 * Le chargement est géré par le moteur de l'aperçu.
 */
console.log("✈️ [BIA-ACP] Allumage des systèmes...");

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
    console.error("❌ Échec de l'allumage du cockpit:", error);
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; text-align:center; padding:20px;">
        <h1 style="color:#ef4444;">Erreur de démarrage</h1>
        <p style="color:#64748b;">Le système de bord n'a pas pu s'initialiser.</p>
        <button onclick="window.location.reload()" style="background:#2563eb; color:white; border:none; padding:10px 20px; border-radius:8px; cursor:pointer; font-weight:bold;">
          Redémarrer
        </button>
      </div>
    `;
  }
}