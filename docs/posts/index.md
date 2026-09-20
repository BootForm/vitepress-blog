---
layout: page
title: Posts
---

<script setup>
import { withBase } from 'vitepress'
import { data as posts } from './posts.data.ts'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<!-- `:href="post.url"` is a Vue binding, evaluated at runtime, not markdown-it link syntax. It
     never goes through the build-time transform that adds `base` to a plain markdown link (see
     AGENTS.md). `withBase()` is VitePress's own helper for exactly this: any href built
     dynamically, in a script block or a template expression, needs to be wrapped in it. -->

<!-- This list is generated at build time by posts.data.ts (createContentLoader), not hand-written
     like vitepress-marketing's blog index. Add a new post file next to this one and it appears
     here automatically, sorted by date, with no other file to update. -->

<div class="mx-auto max-w-2xl px-6 py-16">

<h1 class="mb-8 text-3xl! font-bold! tracking-tight">Posts</h1>

<div v-for="post in posts" :key="post.url" class="mb-10 flex gap-5 border-b border-black/10 pb-10 last:border-0 dark:border-white/10">
<img v-if="post.image" :src="withBase(post.image)" alt="" class="aspect-video w-32 shrink-0 rounded-md object-cover sm:w-40">
<div>
<a :href="withBase(post.url)" class="text-xl font-semibold hover:text-brand-500">{{ post.title }}</a>
<p class="mt-1 text-sm opacity-50">{{ formatDate(post.date) }} · {{ post.authorName }}</p>
<p class="mt-3 opacity-80">{{ post.description }}</p>
<div v-if="post.tags.length" class="mt-3 flex flex-wrap gap-2">
<a v-for="tag in post.tags" :key="tag" :href="withBase(`/tags/${tag}.html`)" class="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 hover:bg-brand-500 hover:text-white dark:bg-brand-500/20 dark:text-brand-500">#{{ tag }}</a>
</div>
</div>
</div>

<p v-if="posts.length === 0" class="opacity-60">No posts yet.</p>

</div>
