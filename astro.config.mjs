import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://mercantile.example.com',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  image: {
    domains: ['images.unsplash.com'],
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
