import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 실제 도메인이 확정되면 이 환경 변수 한 곳에만 설정합니다. 비어 있어도 빌드됩니다.
const SITE_URL = process.env.SITE_URL?.trim() || '';

export default defineConfig({
  site: SITE_URL || undefined,
  integrations: SITE_URL ? [sitemap()] : [],
  vite: { plugins: [tailwindcss()] },
});
