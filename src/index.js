import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import './index.css'; // Asegúrate de que el nombre de tu archivo CSS coincida
import App from './App';

const container = document.getElementById('root');

// Verificamos si react-snap ya generó el HTML para Google
if (container.hasChildNodes()) {
  // Si hay HTML previo (Prerender), solo lo "hidratamos"
  hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Si es un navegador normal y no hay HTML, lo renderizamos desde cero
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}