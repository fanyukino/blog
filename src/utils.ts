// 从 Markdown 正文中提取第一个 H1（标题写在正文里时用它做卡片标题）
export function firstHeading(body: string): string | undefined {
  return body.match(/^#\s+(.+)$/m)?.[1];
}

// 没有标题时的兜底：取 id 最后一段（文件名，不含目录前缀）
export function baseName(id: string): string {
  return id.split('/').pop() ?? id;
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

// 标签链接
export function tagHref(tag: string): string {
  return `${homeHref}/tags/${encodeURIComponent(tag)}`;
}

// 分类链接
export function categoryHref(slug: string): string {
  return `${homeHref}/category/${encodeURIComponent(slug)}`;
}

// 文章 id 的第一段路径（对应分类文件夹名，小写）
export function topDir(id: string): string {
  return id.split('/')[0]?.toLowerCase() ?? '';
}

// 判断文章是否属于某个分类（文件夹名与分类 slug 或 label 匹配，不区分大小写）
export function matchesCategory(
  id: string,
  cat: { slug: string; label: string },
): boolean {
  const top = topDir(id);
  return top === cat.slug.toLowerCase() || top === cat.label.toLowerCase();
}
