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
    // Lets a browser or feed reader auto-discover the feed from the page itself, instead of
    // needing the URL handed to it directly.
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'The Cedar & Vine Journal', href: '/vitepress-blog/feed.xml' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/posts/' },
      { text: 'Contact', link: '/contact' },
    ],

    // No `sidebar` key here either, same reasoning as vitepress-marketing's config.mts. A blog
    // engine is still a marketing surface first; it shouldn't read as documentation.
  },
})
