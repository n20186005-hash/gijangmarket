import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 실제 도메인이 확정되면 이 환경 변수 한 곳에만 설정합니다. 비어 있어도 빌드됩니다.
// gijangmarket.com 이 확정 도메인이므로 기본값으로 지정합니다(환경 변수로 덮어쓰기 가능).
const SITE_URL = process.env.SITE_URL?.trim() || 'https://gijangmarket.com';

export default defineConfig({
  site: SITE_URL || undefined,
  integrations: SITE_URL ? [sitemap()] : [],
  vite: { plugins: [tailwindcss()] },
});
