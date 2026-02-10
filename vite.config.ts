import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Memastikan process.env didefinisikan sebagai objek kosong jika tidak ada
    // Ini mencegah ReferenceError: process is not defined di browser
    'process.env': process.env || {}
  },
  server: {
    host: true,
    port: 3000
  }
});