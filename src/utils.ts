// 从 Markdown 正文中提取第一个 H1（标题写在正文里时用它做卡片标题）
export function firstHeading(body: string): string | undefined {
  return body.match(/^#\s+(.+)$/m)?.[1];
}

// BASE_URL 可能是 '/blog' 或 '/'（GitHub Pages 子路径），统一去掉末尾斜杠再拼接
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

// 站点首页地址（部署在子路径时为 '/blog'，本地为 '/'）
export const homeHref = BASE || '/';

// 根据 content entry 的 id 生成文章链接（id 可能是 'a/b/c' 形式，逐段编码）
export function postHref(id: string): string {
  return `${homeHref}/posts/${id.split('/').map(encodeURIComponent).join('/')}`;
}

export function formatDate(date?: Date): string | undefined {
  return date?.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
