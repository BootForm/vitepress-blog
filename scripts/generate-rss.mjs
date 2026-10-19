// Generates docs/public/feed.xml before the VitePress build, from the same post files
// docs/posts/posts.data.ts lists on the site itself. Deliberately a plain Node script reading
// frontmatter directly (via gray-matter), not something that reuses VitePress's own
// createContentLoader: that API needs a running VitePress build context, and this script runs
// before that build even starts (see package.json's "build" script).
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

// CHANGE ME: must match config.mts's `base`, minus the trailing slash. A mismatch here doesn't
// fail the build. It produces a feed that validates fine and whose every link 404s.
const SITE_URL = 'https://yourname.github.io/vitepress-blog'
const FEED_TITLE = 'The Cedar & Vine Journal' // CHANGE ME: match config.mts's title
const FEED_DESCRIPTION = "Notes from a small landscaping crew." // CHANGE ME: match config.mts's description

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const postsDir = join(rootDir, 'docs', 'posts')
const publicDir = join(rootDir, 'docs', 'public')

const posts = readdirSync(postsDir)
  .filter((file) => file.endsWith('.md') && file !== 'index.md')
  .map((file) => {
    const { data } = matter(readFileSync(join(postsDir, file), 'utf-8'))
    const slug = file.replace(/\.md$/, '')
    return {
      title: data.title ?? 'Untitled',
      date: data.date ?? new Date().toISOString(),
      url: `${SITE_URL}/posts/${slug}.html`,
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char])

const items = posts
  .map(
    (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${post.url}</link>
      <guid>${post.url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
  )
  .join('')

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>${items}
  </channel>
</rss>
`

mkdirSync(publicDir, { recursive: true })
writeFileSync(join(publicDir, 'feed.xml'), feed)

console.log(`Wrote docs/public/feed.xml with ${posts.length} post(s).`)
