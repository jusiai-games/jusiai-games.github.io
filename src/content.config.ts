import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const devlog = defineCollection({
	// `src/content/devlog/` 안의 Markdown/MDX 파일을 데브로그 글로 불러옵니다.
	loader: glob({ base: './src/content/devlog', pattern: '**/*.{md,mdx}' }),
	// frontmatter 타입 검사
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
