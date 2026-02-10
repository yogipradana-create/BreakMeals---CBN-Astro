import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Memastikan process.env terdefinisi di browser tanpa menyebabkan error
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || '')
    },
    'global': 'window'
  },
  server: {
    host: true,
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});