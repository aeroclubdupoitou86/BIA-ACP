import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("✈️ [BIA-ACP] Moteur de rendu démarré...");

const container = document.getElementById('root');
if (container) {
    try {
        const root = createRoot(container);
        root.render(<App />);
        console.log("✅ [BIA-ACP] Interface injectée.");
    } catch (err) {
        console.error("❌ [BIA-ACP] Erreur au rendu React:", err);
    }
}

// Désactivation des Service Workers pour éviter les problèmes de cache
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
            registration.unregister();
            console.log("🧹 [BIA-ACP] Cache nettoyé.");
        }
    });
}