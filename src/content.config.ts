import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 博客文章直接来自仓库根目录的 Markdown 文件（GitBook 同步产物）。
// GitBook 中新建/编辑页面并同步后，博客会自动更新。
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
    // GitBook 页面标题通常写在正文的第一个 H1 里，这里允许 frontmatter 覆盖
    title: z.string().optional(),
    description: z.string().optional(),
    // 自定义 URL slug；默认使用文件路径
    slug: z.string().optional(),
    // 排序用；GitBook 不会自动生成，需要时可在文件 frontmatter 里手动添加
    date: z.coerce.date().optional().catch(undefined),
    updated: z.coerce.date().optional().catch(undefined),
    // GitBook 中隐藏的页面（hidden: true）不会出现在文章列表里
    hidden: z.boolean().optional(),
  }),
});

export const collections = { posts };
