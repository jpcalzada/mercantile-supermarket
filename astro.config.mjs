import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mercantile.example.com',
  image: {
    domains: [],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
