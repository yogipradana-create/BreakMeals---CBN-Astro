
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mencegah crash jika process.env diakses di browser sebelum diinjeksi oleh platform
if (typeof window !== 'undefined' && !window.process) {
  // @ts-ignore
  window.process = { env: { API_KEY: '' } };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
