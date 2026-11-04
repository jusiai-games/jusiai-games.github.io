import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const devlog = defineCollection({
  loader: glob({
    base: './src/content/devlog',
    pattern: '**/*.{md,mdx}',
    // 파일 이름의 날짜 접두사는 폴더 정렬용이고 URL에는 넣지 않는다.
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { devlog };
