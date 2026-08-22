// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://fanyukino.github.io',
  // 项目站点部署在 GitHub Pages 的 /blog/ 子路径下
  base: '/blog',
});
