import { createContentLoader } from 'vitepress'
import { authors } from '../.vitepress/authors'

export interface Post {
  title: string
  date: string
  authorId: string
  authorName: string
  tags: string[]
  excerpt: string
  url: string
}

declare const data: Post[]
export { data }

// The glob is relative to docs/ (VitePress's srcDir), not to this file, and matches every post
// file next to this one, but not this file itself (a .ts file, never matched by *.md) and not
// posts/index.md, filtered out below by URL. Runs at build time (and on save in `npm run dev`),
// so a new post file shows up in the list with no other code change needed.
export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .filter(({ url }) => url !== '/posts/')
      .map(({ url, frontmatter, excerpt }) => {
        const authorId = frontmatter.author ?? ''
        return {
          title: frontmatter.title ?? 'Untitled',
          date: frontmatter.date ?? '',
          authorId,
          authorName: authors[authorId]?.name ?? authorId,
          tags: frontmatter.tags ?? [],
          excerpt: excerpt ?? '',
          url,
        }
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  },
})
