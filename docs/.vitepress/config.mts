import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // CHANGE ME: your blog's name and description.
  title: 'The Cedar & Vine Journal',
  description: 'Notes on gardens, lawns, and the odd disaster, from a small landscaping crew.',

  // CHANGE ME if you rename the repo, or set to '/' once you're serving from a custom domain.
  // Also update SITE_URL in scripts/generate-rss.mjs to match. The RSS feed's links are absolute
  // URLs, so a mismatched base there produces a feed whose links 404, not a build error.
  base: '/vitepress-blog/',

  vite: {
    plugins: [tailwindcss()],
  },

  head: [
    // The browser tab icon. `head` links are not base-prefixed by VitePress, so this path includes
    // `base` by hand: CHANGE ME alongside `base` if you rename the repo or move to a custom domain.
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-blog/logo.svg' }],
    // Lets a browser or feed reader auto-discover the feed from the page itself, instead of
    // needing the URL handed to it directly.
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'The Cedar & Vine Journal', href: '/vitepress-blog/feed.xml' }],
  ],

  themeConfig: {
    // CHANGE ME: replace docs/public/logo.svg with your own image (any format, same filename, or
    // update this path to match). VitePress serves everything in docs/public/ from the site root,
    // and handles the base-path prefixing for this specific option itself, unlike the footer's
    // own logo image below, which needs withBase() by hand (see theme/index.ts).
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/posts/' },
      { text: 'Contact', link: '/contact' },
    ],

    // No `sidebar` key here either, same reasoning as vitepress-marketing's config.mts. A blog
    // engine is still a marketing surface first; it shouldn't read as documentation.
  },
})
