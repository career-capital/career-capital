console.log('=== MAIN.TSX LOADING ===');

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('=== ABOUT TO RENDER APP ===');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log('=== APP RENDERED ===');
