# Working in this repo

This is a teaching template: a real VitePress blog engine, doing the four things VitePress ships
none of by default (a generated post list, tags, RSS, authors), not just markdown files with a
sidebar turned off. See [`vitepress-marketing`](https://github.com/BootForm/vitepress-marketing)
for the simpler "marketing site with a hand-maintained blog list" version; this repo exists
because that one's blog page deliberately doesn't try to do any of this.

## The one rule this whole org's VitePress templates exist to teach

**Every page needs `layout: home` or `layout: page` in its frontmatter. Never leave a marketing
page on VitePress's default `layout: doc`.** See `vitepress-marketing`'s `AGENTS.md` for the full
reasoning; every page in this repo already follows it.

## How the four pieces actually work

- **Post list** (`docs/posts/index.md`): reads `docs/posts/posts.data.ts`, which uses vitepress's
  `createContentLoader('posts/*.md')` to read every post's frontmatter and excerpt at build time
  (and live, in `npm run dev`). Add a post file, it appears in the list with no other file to
  touch. The glob is relative to `docs/` (vitepress's `srcDir`), not to `posts.data.ts` itself.
- **Tags** (`docs/tags/[tag].md` + `docs/tags/[tag].paths.js`): vitepress's dynamic-route
  mechanism. `paths()` in the `.paths.js` file returns one entry per tag found across every post;
  vitepress renders the `.md` template once per entry, and the template reads which tag it's
  currently rendering via `useData().params.tag`.
  **`[tag].paths.js` reads frontmatter directly with `gray-matter`, not `createContentLoader`.**
  `createContentLoader` throws `content loader invoked without an active vitepress process, or
  before vitepress config is resolved` when called from inside a `.paths.js` file's `paths()` -
  confirmed by hitting this error while building this exact repo. `.paths.js` runs earlier in
  vitepress's pipeline than a page's own data loader does, before whatever internal state
  `createContentLoader` needs is ready. `posts.data.ts` can use `createContentLoader` because
  something (a page, `npm run dev`'s live reload) actually requests that data later, once
  vitepress is fully running.
- **RSS** (`scripts/generate-rss.mjs`, run by `npm run build` before `vitepress build` itself):
  a plain Node script, also reading frontmatter with `gray-matter`, writing `docs/public/feed.xml`
  so vitepress's own build copies it into `dist/` unchanged. `SITE_URL` here must match
  `config.mts`'s `base` (schemed and hostnamed, since feed links have to be absolute). A mismatch
  produces a feed that validates and builds fine, with every link 404ing.
- **Authors** (`docs/.vitepress/authors.ts`): a plain object, keyed by the id a post's frontmatter
  uses (`author: priya`). `posts.data.ts` looks the name up from here so every post referencing
  that key updates together if the author's display name ever changes.

## `base` and internal links: two different failure modes, not one

- **A static, literal internal link** (`[text](/path)` in markdown, or a raw `href="/path"` in
  hand-written HTML) needs `base` handling at build time. Markdown-syntax links get it
  automatically; a raw `<a href="/path">` does not, silently, and 404s once deployed to a subpath.
  See `vitepress-marketing`'s `AGENTS.md` for the full writeup, which applies here identically.
- **A dynamic link built in a `<script setup>` block or a Vue template expression**
  (`:href="post.url"`, `` :href="`/tags/${tag}.html`" ``) is a *different* failure mode with the
  *same symptom*: it never goes through vitepress's markdown-time transform at all, because it
  isn't markdown syntax and doesn't exist as a string until the component runs. `posts/index.md`
  and `tags/[tag].md` are full of exactly this kind of link (every post/tag href on both pages is
  computed at runtime from loaded data). The fix is `withBase()`, imported from `vitepress`:
  `:href="withBase(post.url)"`. Forgetting it here is easy to miss locally, because `npm run dev`
  serves from `/` and never exercises `base` at all, the same way the plain base-path bug hides
  in local dev, just one layer further down. Confirmed both failure modes are actually fixed by
  inspecting the built HTML's real `href` attributes after `npm run build`, not just by trusting
  that the page rendered without an error.

## The constraints that define this repo

- **A real build step**, same as `vitepress-marketing`, more so: this repo also needs
  `gray-matter` and runs a script before the vitepress build itself.
- **Tailwind via `@tailwindcss/vite`** plus **`@tailwindcss/typography`**, installed from the
  start this time. Every post is plain markdown prose, so every post page wraps its content in
  `prose dark:prose-invert`. Skipping this was a real bug caught and fixed after the fact in
  `vitepress-marketing`; this repo starts with it already in place. See that repo's `AGENTS.md`
  for the full explanation of why plain markdown needs it at all.
- **`base` in `config.mts` must match how the site is actually served**, same reasoning as
  `vitepress-marketing`'s `AGENTS.md`. This repo also has `SITE_URL` in
  `scripts/generate-rss.mjs`, which needs the same update in the same commit.
- **Comments in the frontmatter and config are the lesson**, not clutter. Keep `CHANGE ME` markers
  where the reader is meant to edit, and keep them rare enough to still mean something.

## The form

`contact.md`'s form ships the literal placeholder `https://f.bootform.com/__YOUR_FORM_ID__`.

**Never replace it with a real form ID.** A form ID is the entire claim credential: whoever claims
one first owns it permanently, and every fork then delivers its visitors' messages to that person.
The reader generates their own in step 3 of the README. This is not negotiable and is not a
placeholder-for-convenience.

The honeypot input must stay. It is hidden, unlabelled to screen readers, and filtering depends on
it being submitted empty.

## Writing style

- Second person, present tense, short sentences.
- Say what will happen before asking them to run something, and say what they should see after.
- **No em dashes or en dashes.** Use a comma, a colon, a full stop, or brackets.
- No AI attribution in commits or pull requests, here or anywhere else in this organisation.
- Never claim BootForm offers EU data residency, a DPA, or an uptime SLA. It does not.

## Before changing anything

Run `npm run build` locally before committing, and actually open a couple of pages in
`docs/.vitepress/dist/` (or grep their `href`/`src` attributes) rather than trusting a green
build. Both real bugs documented above (the `.paths.js` content-loader crash, the missing
`withBase()`) either failed the build outright or produced working-looking output whose links were
silently wrong, and the second kind only shows up if you actually check.
