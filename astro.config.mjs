import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({site:'https://gijangmarket.com',output:'static',integrations:[sitemap({filter:(page)=>{const p=new URL(page).pathname;return !['/privacy/','/terms/','/cookies/','/404/'].includes(p);}})],vite:{plugins:[tailwindcss()]}});
