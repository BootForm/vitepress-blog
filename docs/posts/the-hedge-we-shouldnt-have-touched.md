---
layout: page
title: The hedge we shouldn't have touched
date: 2026-08-20
author: sam
tags: [how-we-work, disasters]
image: /posts/the-hedge-we-shouldnt-have-touched.jpg
description: A client asked us to "tidy up" a decade-old hedge. We should have asked more questions first.
---

<script setup>
import { withBase } from 'vitepress'
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<img :src="withBase(frontmatter.image)" alt="" class="aspect-video w-full object-cover">

<div class="mx-auto flex max-w-2xl flex-wrap gap-2 px-6 pt-8">
<a v-for="tag in frontmatter.tags" :key="tag" :href="withBase(`/tags/${tag}.html`)" class="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 hover:bg-brand-500 hover:text-white dark:bg-brand-500/20 dark:text-brand-500">#{{ tag }}</a>
</div>

<div class="prose dark:prose-invert mx-auto max-w-2xl px-6 pb-16 pt-4">

# The hedge we shouldn't have touched

*CHANGE ME: a third example post, by a different author, sharing one tag with the post above and
having one of its own, enough overlap to make the tag pages worth clicking through.*

A client asked us to "tidy up" a decade-old hedge. We should have asked more questions first.

Two weeks and a lot of bare branches later, we learned the same lesson the [three things we
check](/posts/three-things-we-check) post is really about: check what's already there before you
touch anything.

[Back to all posts](/posts/)

</div>
