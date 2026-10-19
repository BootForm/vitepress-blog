import { readdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

// VitePress's dynamic-route mechanism: this file's name (`[tag].paths.js`) tells it to generate
// one real page per entry this `paths()` function returns, from the single template file next to
// it (`[tag].md`). Each entry's `params` become that page's route params, read back in the
// template via `useData().params`.
//
// Reads frontmatter directly with gray-matter, the same way scripts/generate-rss.mjs does,
// rather than vitepress's own `createContentLoader`. A `.paths.js` file's `paths()` runs before
// vitepress's content-loader context is ready, so calling `createContentLoader(...).load()` here
// fails with "content loader invoked without an active vitepress process". `posts/posts.data.ts`
// can use `createContentLoader` because it runs later, once an actual page requests that data.
const postsDir = join(dirname(dirname(fileURLToPath(import.meta.url))), 'posts')

export default {
  paths() {
    const tags = new Set()
    for (const file of readdirSync(postsDir)) {
      if (!file.endsWith('.md') || file === 'index.md') continue
      const { data } = matter(readFileSync(join(postsDir, file), 'utf-8'))
      for (const tag of data.tags ?? []) tags.add(tag)
    }
    return Array.from(tags).map((tag) => ({ params: { tag } }))
  },
}
