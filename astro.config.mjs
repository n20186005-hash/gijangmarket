import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({site:'https://gijangmarket.com',output:'static',integrations:[sitemap({filter:page=>page==='https://gijangmarket.com/'})],vite:{plugins:[tailwindcss()]}});
