import { createContentLoader } from 'vitepress'
import { join } from 'path'
import {
  extractTitle,
  extractExcerpt,
  extractFirstImage,
  getGitLastUpdated,
  getDateByFileName,
  removeLeadingSlash,
} from '../../utils'
import { localConfig } from '../.vitepress/config'

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

export default createContentLoader(
  `${removeLeadingSlash(localConfig.postsUrlPrefix)}/*.md`,
  {
    includeSrc: true,
    transform(raw): Post[] {
      const filterUrls = ['/', '/posts/', `${localConfig.postsUrlPrefix}/`]
      return raw
        .filter(({ url }) => !filterUrls.includes(url))
        .map(({ url, frontmatter, src }) => {
          const authorId = frontmatter.author ?? localConfig.defaultAuthor
          const relativePath = url.replace(/^\//, '').replace(/\/$/, '') + '.md'
          const absolutePath = join(import.meta.dirname, relativePath)
          return {
            title:
              frontmatter.title ||
              extractTitle(src) ||
              localConfig.defaultTitle,
            image:
              frontmatter.image ||
              extractFirstImage(src) ||
              localConfig.defaultImageUrl,
            date:
              frontmatter.date ||
              getDateByFileName(absolutePath) ||
              getGitLastUpdated(absolutePath),
            authorId,
            authorName: authorId,
            tags: frontmatter.tags ?? [],
            description:
              frontmatter.description ||
              (src ? extractExcerpt(src) : localConfig.defaultDescription),
            url,
          }
        })
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    },
  },
)
