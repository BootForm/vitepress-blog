---
# CHANGE ME: everything in this frontmatter block. `layout: home` is what makes this a marketing
# homepage instead of a documentation page. See AGENTS.md's "one rule" section.
layout: home

# No `hero:` or `features:` key here on purpose: VitePress's default theme always renders its own
# frontmatter-driven sections (hero, then features) BEFORE the page's own markdown body, with no
# way to reorder them. Since the custom backdrop hero below needs to come first, both the hero and
# the three feature cards are hand-built in the body instead, in the order this page actually
# wants them.
---

<script setup>
import { withBase } from 'vitepress'
import { data as posts } from './posts/posts.data.ts'

// posts.data.ts already sorts newest first, so the home page only ever needs the front of the
// list: the 4 most recent posts, not the full archive (that's what /posts/ is for).
const latestPosts = posts.slice(0, 4)

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<!-- ───── Backdrop hero ─────
     CHANGE ME: your own photo, title and tagline. A photo as a full-width backdrop with a dark
     overlay for contrast, shorter than the default theme's hero, is what makes this read as a
     real landscaping business's homepage instead of the same text-only (or side-by-side image)
     hero every other template in this org starts from. The `!`-suffixed classes force this past
     the same unlayered element resets documented in AGENTS.md's CSS-layering note. -->
<div
  class="relative flex h-[280px] items-center justify-center overflow-hidden bg-cover bg-center text-center sm:h-[340px]"
  :style="{ backgroundImage: `url(${withBase('/home/hero.jpg')})` }"
>
  <div class="absolute inset-0 bg-black/55"></div>
  <div class="relative px-6">
    <h1 class="text-3xl! font-bold! tracking-tight text-white! sm:text-4xl!">The Cedar & Vine Journal</h1>
    <p class="mx-auto! mt-3 max-w-lg text-center text-white/85!">
      Notes from a small landscaping crew. What we're learning, what went wrong, and the
      occasional before-and-after.
    </p>
    <div class="mt-6 flex justify-center gap-3">
      <a :href="withBase('/posts/')" class="rounded-md bg-brand-500 px-5 py-2.5 font-medium text-white! no-underline! hover:bg-brand-600">Read the posts</a>
      <a :href="withBase('/contact')" class="rounded-md bg-white/10 px-5 py-2.5 font-medium text-white! no-underline! ring-1 ring-white/40 hover:bg-white/20">Get in touch</a>
    </div>
  </div>
</div>

<!-- ───── Features ─────
     Hand-built instead of the default theme's `features` frontmatter key, so it can sit after the
     custom hero above instead of before it (see this page's frontmatter comment). -->
<div class="mx-auto grid max-w-5xl gap-6 px-6 py-16 sm:grid-cols-3">
  <div class="rounded-lg border border-black/10 p-6 dark:border-white/10">
    <h3 class="font-semibold text-black! dark:text-white!">A real post list</h3>
    <p class="mt-2 text-sm text-black/70! dark:text-white/70!">Generated at build time from the files in docs/posts/, sorted by date. Add a file, it shows up here.</p>
  </div>
  <div class="rounded-lg border border-black/10 p-6 dark:border-white/10">
    <h3 class="font-semibold text-black! dark:text-white!">Tags</h3>
    <p class="mt-2 text-sm text-black/70! dark:text-white/70!">Every post's tags become a real page (docs/tags/[tag].md), listing every post with that tag.</p>
  </div>
  <div class="rounded-lg border border-black/10 p-6 dark:border-white/10">
    <h3 class="font-semibold text-black! dark:text-white!">RSS</h3>
    <p class="mt-2 text-sm text-black/70! dark:text-white/70!">A feed at /feed.xml, regenerated on every build from the same posts.</p>
  </div>
</div>

<!-- ───── Latest posts ─────
     Same data source and same post images as the Posts page and each post's own hero, just
     capped to the 4 most recent so the home page reads as a preview, not a duplicate archive. -->
<div class="mx-auto max-w-5xl px-6 py-16">

<h2 class="mb-6 text-2xl! font-bold! tracking-tight">Latest posts</h2>

<div class="grid gap-6 grid-cols-1 sm:grid-cols-2">
  <a
    v-for="post in latestPosts"
    :key="post.url"
    :href="withBase(post.url)"
    class="group flex flex-col overflow-hidden rounded-lg border border-black/10 no-underline! transition hover:border-brand-500 dark:border-white/10"
  >
    <img v-if="post.image" :src="withBase(post.image)" alt="" class="aspect-video w-full object-cover">
    <div class="flex flex-col gap-1 p-4">
      <h3 class="font-semibold text-black! group-hover:text-brand-500! dark:text-white!">{{ post.title }}</h3>
      <p class="text-xs text-black/50! dark:text-white/50!">{{ formatDate(post.date) }} · {{ post.authorName }}</p>
      <p class="text-sm leading-snug text-black/70! dark:text-white/70!">{{ post.description }}</p>
    </div>
  </a>
</div>

<p class="mt-6 text-center">

[See all posts](/posts/)

</p>

</div>
