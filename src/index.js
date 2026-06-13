import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 1. Importamos el Enrutador
import './index.css';
import App from './App';

const container = document.getElementById('root');

// Empaquetamos tu app con el enrutador para poder usarla en ambos casos
const appContent = (
  <React.StrictMode>
    <BrowserRouter> {/* 👈 2. Abrazamos tu App con el Enrutador */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Lógica de React 18 para detectar HTML estático de react-snap
if (container.hasChildNodes()) {
  // Si el HTML ya fue generado (Ideal para que Google lo lea al instante)
  hydrateRoot(container, appContent);
} else {
  // Renderizado normal si no hay HTML previo
  const root = createRoot(container);
  root.render(appContent);
}