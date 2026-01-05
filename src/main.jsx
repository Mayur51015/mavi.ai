/**
 * Main Entry Point
 * 
 * GREEN CODING: Minimal setup, React strict mode for development efficiency
 */

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
