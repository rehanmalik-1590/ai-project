import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ai-project/', // Make sure this matches your GitHub repo name
  plugins: [react(),
    tailwindcss()
  ]
});
