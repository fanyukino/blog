import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 博客文章来自仓库根目录下的 Markdown 文件。
// 文章放在分类文件夹里（如 cs/、daily/），首页会自动归类展示。
// 非文章类的 md 文件通过负面 pattern 排除。
const posts = defineCollection({
  loader: glob({
    base: '.',
    pattern: [
      '**/*.md',
      '!SUMMARY.md',
      '!AGENTS.md',
      '!CLAUDE.md',
      '!node_modules/**',
      '!.git/**',
      '!.gitbook/**',
      '!.claude/**',
      '!.astro/**',
      '!dist/**',
      '!src/**',
    ],
  }),
  schema: z.object({
    // 标题写在正文第一个 H1 里即可，frontmatter 里的 title 优先
    title: z.string().optional(),
    description: z.string().optional(),
    // 自定义 URL slug；默认使用文件路径
    slug: z.string().optional(),
    // 排序用，在 frontmatter 里手动添加
    date: z.coerce.date().optional().catch(undefined),
    updated: z.coerce.date().optional().catch(undefined),
    // hidden: true 的文章不会出现在列表里
    hidden: z.boolean().optional(),
    // 标签，用于标签页与搜索
    tags: z.array(z.string()).optional().catch(undefined),
  }),
});

export const collections = { posts };
