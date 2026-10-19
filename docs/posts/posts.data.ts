import { createContentLoader } from 'vitepress'
import { join } from 'path'
import { authors } from '../.vitepress/authors'
import { localConfig } from '../.vitepress/config'
import {
  extractTitle,
  extractExcerpt,
  extractFirstImage,
  getGitLastUpdated,
  getDateByFileName,
  removeLeadingSlash,
} from '../../utils'

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
// file in the posts folder (`localConfig.postsUrlPrefix` in config.ts), but not this file itself
// (a .ts file, never matched by *.md) and not the folder's own index.md, filtered out below by
// URL. Runs at build time (and on save in `npm run dev`), so a new post file shows up in the list
// with no other code change needed.
//
// Frontmatter always wins. A field a post leaves out is worked out from the post itself instead
// (see utils.ts), so a plain markdown file with just a `# Heading` is enough to show up properly:
// - title: the post's first `#` heading
// - image: the first markdown or <img> image in the post
// - date: a YYYY-MM-DD in the file name, else the date of the file's last git commit
// - description: the text between the `#` heading and the first `##`, trimmed to 300 characters
//
// Deliberately not using createContentLoader's own `excerpt` option for the description: it slices
// the raw markdown from the top of the file down to a `<!-- more -->` marker, which on these posts
// means everything before the marker, including the <script setup> block, the hero <img>, and the
// tags loop above the heading. extractExcerpt starts after the heading and strips markup instead.
export default createContentLoader(
  `${removeLeadingSlash(localConfig.postsUrlPrefix)}/*.md`,
  {
    includeSrc: true,
    transform(raw): Post[] {
      // The folder's index.md has its own URL, and that's the list page itself, not a post.
      const filterUrls = ['/', `${localConfig.postsUrlPrefix}/`]
      // VitePress's own resolved srcDir (docs/ here), the same value createContentLoader reads.
      const srcDir: string = (globalThis as any).VITEPRESS_CONFIG.srcDir
      return raw
        .filter(({ url }) => !filterUrls.includes(url))
        .map(({ url, frontmatter, src }) => {
          const authorId = frontmatter.author ?? localConfig.defaultAuthor
          // '/posts/my-post.html' (or '/posts/my-post' with cleanUrls) -> 'posts/my-post.md'
          const relativePath = removeLeadingSlash(url).replace(/\.html$/, '') + '.md'
          const absolutePath = join(srcDir, relativePath)
          return {
            title: frontmatter.title || extractTitle(src) || localConfig.defaultTitle,
            image: frontmatter.image || extractFirstImage(src) || localConfig.defaultImageUrl,
            date:
              frontmatter.date ||
              getDateByFileName(absolutePath) ||
              getGitLastUpdated(absolutePath) ||
              '',
            authorId,
            authorName: authors[authorId]?.name ?? authorId,
            tags: frontmatter.tags ?? [],
            description:
              frontmatter.description || extractExcerpt(src ?? '') || localConfig.defaultDescription,
            url,
          }
        })
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    },
  },
)
