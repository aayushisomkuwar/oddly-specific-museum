import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ExhibitsProvider } from './hooks/ExhibitsContext.jsx';
import './styles/global.css';
import './styles/components.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ExhibitsProvider>
        <App />
      </ExhibitsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
