import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // o tu framework correspondiente
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <- Añadir el plugin aquí
  ],
});