import { createContentLoader } from 'vitepress'
import { authors } from '../.vitepress/authors'

export interface Post {
  title: string
  date: string
  authorId: string
  authorName: string
  tags: string[]
  description: string
  image: string
  url: string
}

declare const data: Post[]
export { data }

// The glob is relative to docs/ (VitePress's srcDir), not to this file, and matches every post
// file next to this one, but not this file itself (a .ts file, never matched by *.md) and not
// posts/index.md, filtered out below by URL. Runs at build time (and on save in `npm run dev`),
// so a new post file shows up in the list with no other code change needed.
//
// Deliberately not using createContentLoader's own `excerpt` option: it slices the raw markdown
// from the top of the file down to a `<!-- more -->` marker, which on these posts means
// everything before the marker, including the <script setup> block, the hero <img>, and the tags
// loop above the heading, not just the intended teaser sentence. A plain `description` frontmatter
// field (the same pattern vitepress-portfolio's work.data.ts uses) sidesteps that entirely: it's
// one string, written by hand, always exactly what shows in the list.
export default createContentLoader('posts/*.md', {
  transform(raw): Post[] {
    return raw
      .filter(({ url }) => url !== '/posts/')
      .map(({ url, frontmatter }) => {
        const authorId = frontmatter.author ?? ''
        return {
          title: frontmatter.title ?? 'Untitled',
          date: frontmatter.date ?? '',
          authorId,
          authorName: authors[authorId]?.name ?? authorId,
          tags: frontmatter.tags ?? [],
          description: frontmatter.description ?? '',
          image: frontmatter.image ?? '',
          url,
        }
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  },
})
