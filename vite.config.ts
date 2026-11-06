import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (gaiacalamari.github.io) is served from the domain root, so base is '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: { target: 'es2020', cssCodeSplit: false },
});
