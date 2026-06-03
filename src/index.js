import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 1. Importamos el Enrutador
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* 👈 2. Abrazamos tu App con el Enrutador */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);