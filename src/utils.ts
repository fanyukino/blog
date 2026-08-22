// 从 Markdown 正文中提取第一个 H1（GitBook 页面标题通常是正文第一个 H1）
export function firstHeading(body: string): string | undefined {
  return body.match(/^#\s+(.+)$/m)?.[1];
}

// 根据 content entry 的 id 生成文章链接（id 可能是 'a/b/c' 形式，逐段编码）
export function postHref(id: string): string {
  return `/posts/${id.split('/').map(encodeURIComponent).join('/')}`;
}

export function formatDate(date?: Date): string | undefined {
  return date?.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
