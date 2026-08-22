import { getCollection } from 'astro:content';
import { CATEGORIES } from '../consts';
import { firstHeading, postHref, matchesCategory, baseName } from '../utils';

// 静态搜索索引：构建时生成 /search.json，搜索页在浏览器端加载并过滤
export async function GET() {
  const posts = (await getCollection('posts')).filter((post) => !post.data.hidden);
  const index = posts.map((post) => {
    const cat = CATEGORIES.find((c) => matchesCategory(post.id, c));
    return {
      id: post.id,
      title:
        post.data.title ?? firstHeading(post.body ?? '') ?? baseName(post.id),
      description: post.data.description ?? '',
      tags: post.data.tags ?? [],
      date: post.data.date ? post.data.date.toISOString() : null,
      category: cat?.label ?? '其他',
      href: postHref(post.id),
      body: post.body ?? '',
    };
  });
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
