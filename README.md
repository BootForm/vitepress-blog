# A real blog engine for VitePress

VitePress ships none of what an actual blog needs out of the box: a post list, tags, an RSS feed,
authors. This template does. It's the next step after
[vitepress-marketing](https://github.com/BootForm/vitepress-marketing), for when the blog itself
is the point, not a small section of a bigger marketing site.

By the end you will have a blog with a generated post list, working tag pages, an RSS feed, and a
working contact form.

**[See what you are building →](https://bootform.github.io/vitepress-blog/)**

---

## Before you start

You need:

- A free GitHub account.
- [Node.js](https://nodejs.org) 20 or later.
- Some comfort with a terminal.

If you want a lighter starting point with a home page, pricing, and just a couple of hand-written
posts, [vitepress-marketing](https://github.com/BootForm/vitepress-marketing) is that; this repo
assumes you specifically want the blog mechanics.

---

## Step 1: Make your own copy

Click **Use this template**, then **Create a new repository**.

> **Naming it something other than `vitepress-blog`?** Open `docs/.vitepress/config.mts` and
> change `base: '/vitepress-blog/'` to match (`/your-repo-name/`), and do the same for `SITE_URL`
> in `scripts/generate-rss.mjs`. Miss either and the deployed site or the RSS feed's links break,
> while everything still looks fine locally.

Then:

```bash
git clone https://github.com/yourname/vitepress-blog.git
cd vitepress-blog
npm install
npm run dev
```

Open the address it prints. That's your blog, running locally.

---

## Step 2: Make it yours

Look for `CHANGE ME` across a few files:

- **`docs/.vitepress/config.mts`**: your blog's title, description, and nav.
- **`docs/.vitepress/theme/style.css`**: your brand colour.
- **`docs/.vitepress/authors.ts`**: your real authors. A post references one by key
  (`author: priya`); change the name here and every post using that key updates.
- **`docs/index.md`**: the home page hero.
- **`docs/posts/*.md`**: the three example posts. Each one's frontmatter sets its title, date,
  author, and tags:

  ```md
  ---
  layout: page
  title: Your post title
  date: 2026-09-20
  author: priya
  tags: [some-tag, another-tag]
  ---
  ```

  Add a new post by copying one of these files. The post list, the tag pages, and the RSS feed all
  regenerate from whatever's actually in this folder, no other file to update.

---

## Step 3: Make the contact form actually work

**3a. Generate your form ID.** Open BootForm's own [UUID
generator](https://bootform.com/uuidgenerator), or run `crypto.randomUUID()` in any browser
console.

> **Use your own.** Do not use `11111111-1111-4111-8111-111111111111` (the example shown on
> BootForm's own docs) or a friend's. Whoever claims a form ID first owns it, and everything sent
> to it goes to them.

**3b. Paste it into `docs/contact.md`**, replacing `__YOUR_FORM_ID__` in the `action` attribute.

**3c. Try it, then claim it** at the claim link it gives you, **before** the site goes live
publicly. Held submissions are kept for 48 hours before they're deleted.

---

## Step 4: Deploy it

```bash
git add -A
git commit -m "Make it mine"
git push
```

In your repository, **Settings → Pages → Source → GitHub Actions** (not "deploy from a branch").
The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push to `main`.

Your feed is live at `https://yourname.github.io/vitepress-blog/feed.xml` once it deploys.

---

## Frequently hit problems

**A tag page 404s, or a post's tag doesn't show up anywhere.** Check the post's frontmatter:
`tags` needs to be a real YAML list (`tags: [a, b]` or one `- a` per line), not a bare string.

**The RSS feed is empty, or a link in it 404s.** Run `node scripts/generate-rss.mjs` on its own
and read what it prints; it's a plain script, easiest debugged directly rather than through the
full `npm run build`. A 404'ing link almost always means `SITE_URL` doesn't match `base`.

**`npm run build` fails with something about a content loader.** If you're editing
`docs/tags/[tag].paths.js`, see `AGENTS.md`'s section on why it can't use `createContentLoader`
the way `posts/posts.data.ts` does.

**The Actions deploy fails but `npm run build` works locally.** Compare Node versions: the
workflow pins Node 20 (`.github/workflows/deploy.yml`). Different Node major versions occasionally
disagree on something.

## Licence

MIT. Do whatever you like with it, including using it for a real business.
