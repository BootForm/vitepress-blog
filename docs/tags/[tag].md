---
layout: page
---

<script setup>
import { useData, withBase } from 'vitepress'
import { data as posts } from '../posts/posts.data.ts'

const { params } = useData()
</script>

<!-- Every href here is dynamic (a Vue binding or a runtime expression), so every one needs
     withBase(). See posts/index.md's comment for why a plain markdown link's automatic base
     handling doesn't apply on this page at all. -->

<div class="mx-auto max-w-2xl px-6 py-16">

<h1 class="mb-8! text-3xl! font-bold! tracking-tight">Posts tagged &ldquo;{{ params.tag }}&rdquo;</h1>

<div v-for="post in posts.filter((p) => p.tags.includes(params.tag))" :key="post.url" class="mb-8">
  <a :href="withBase(post.url)" class="text-lg font-semibold hover:text-brand-500">{{ post.title }}</a>
</div>

<p><a :href="withBase('/posts/')" class="text-brand-500 hover:underline">All posts</a></p>

</div>
