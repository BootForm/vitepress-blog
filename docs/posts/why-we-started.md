---
layout: page
title: Why we started Cedar & Vine
date: 2026-06-02
author: priya
tags: [behind-the-scenes]
# CHANGE ME: a real photo of your own work. This same image shows on the post list and on the
# tag pages, so pick something that reads fine small too, not just as a big banner.
image: /posts/why-we-started.jpg
# CHANGE ME: a one-sentence teaser. Shown on the post list and the home page's Latest posts,
# never on this page itself, so it's fine (good, even) if it doesn't repeat the opening line.
description: The one thing we promised ourselves we'd do differently after our own garden quote took a week to get a number.
---

<script setup>
import { withBase } from 'vitepress'
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<!-- The hero image is a runtime binding (`frontmatter.image`), not a literal path in markdown, so
     it needs withBase() by hand. See AGENTS.md. -->
<img :src="withBase(frontmatter.image)" alt="" class="aspect-video w-full object-cover">

<div class="mx-auto flex max-w-2xl flex-wrap gap-2 px-6 pt-8">
<a v-for="tag in frontmatter.tags" :key="tag" :href="withBase(`/tags/${tag}.html`)" class="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 hover:bg-brand-500 hover:text-white dark:bg-brand-500/30 dark:text-white/90">#{{ tag }}</a>
</div>

<!-- `prose` styles plain markdown (headings, paragraphs, lists) without a class on every element.
     See AGENTS.md's typography section. -->
<div class="prose dark:prose-invert mx-auto max-w-2xl px-6 pb-16 pt-4">

# Why we started Cedar & Vine

*CHANGE ME: this is an example post. Replace it, or delete all three example posts and write your
own. The post list and tag pages regenerate from whatever's actually in this folder.*

Every quote we got for our own garden took a week and a phone call to get a number that turned
out to be a guess. So that's the one thing we promised ourselves we'd do differently: a real
price, in writing, usually the same day.

[Back to all posts](/posts/)

</div>
