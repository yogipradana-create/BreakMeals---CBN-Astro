import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global process shim untuk kompatibilitas library di browser
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.process = window.process || { env: {} };
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Gagal memuat aplikasi: Elemen '#root' tidak ditemukan di index.html");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}