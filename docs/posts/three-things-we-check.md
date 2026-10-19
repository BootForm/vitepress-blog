---
layout: page
title: 3 things we check before every quote
date: 2026-07-14
author: priya
tags: [quotes, how-we-work]
image: /posts/three-things-we-check.jpg
description: A quote that changes once we show up isn't a quote, it's a guess with a number attached. Three things we always check first.
---

<script setup>
import { withBase } from 'vitepress'
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<img :src="withBase(frontmatter.image)" alt="" class="aspect-video w-full object-cover">

<div class="mx-auto flex max-w-2xl flex-wrap gap-2 px-6 pt-8">
<a v-for="tag in frontmatter.tags" :key="tag" :href="withBase(`/tags/${tag}.html`)" class="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 hover:bg-brand-500 hover:text-white dark:bg-brand-500/30 dark:text-white/90">#{{ tag }}</a>
</div>

<div class="prose dark:prose-invert mx-auto max-w-2xl px-6 pb-16 pt-4">

# 3 things we check before every quote

*CHANGE ME: another example post.*

A quote that changes once we show up isn't a quote, it's a guess with a number attached. Three
things we always check first:

1. **Soil, not just the lawn.** A patchy lawn is usually a soil problem, not a mowing problem.
2. **Drainage.** Standing water after rain changes what we recommend planting, and where.
3. **What's already there.** Ripping out a healthy hedge to start over is rarely the cheapest
   option, even when it looks that way at first glance.

[Back to all posts](/posts/)

</div>
