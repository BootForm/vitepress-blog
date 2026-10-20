# A real blog engine for VitePress

VitePress ships none of what an actual blog needs out of the box: a post list, tags, an RSS feed,
authors. This template does, and turns on VitePress's built-in search too. It's the next step after
[vitepress-marketing](https://github.com/BootForm/vitepress-marketing), for when the blog itself
is the point, not a small section of a bigger marketing site.

By the end you will have a blog with a generated post list, working tag pages, an RSS feed,
full-text search, and a working contact form.

**[See what you are building →](https://bootform.github.io/vitepress-blog/)**

---

## Before you start

You need:

- A free GitHub account.
- [Node.js](https://nodejs.org) 24 or later.
- Some comfort with a terminal.

Don't have some of this yet, or not sure how? [Setting up your
computer](https://bootform.com/docs/computer-setup) walks through installing Git and Node.js, a
basic terminal tutorial, and installing and using VS Code, from scratch.

If you want a lighter starting point with a home page, pricing, and just a couple of hand-written
posts, [vitepress-marketing](https://github.com/BootForm/vitepress-marketing) is that; this repo
assumes you specifically want the blog mechanics.

---

## Step 1: Make your own copy

Click **Use this template**, then **Create a new repository**.

> **Naming it something other than `vitepress-blog`?** Open `docs/.vitepress/config.ts` and
> change `base: '/vitepress-blog/'` to match (`/your-repo-name/`), along with the favicon and feed
> paths under `head` in the same file. Miss one and the deployed site breaks while everything
> still looks fine locally. The RSS feed reads `base` from this file, so it follows on its own.

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

- **`docs/.vitepress/config.ts`**: your blog's title, description, nav, and the site's address
  under `sitemap.hostname` (the RSS feed uses it for its links).
- **`docs/.vitepress/theme/style.css`**: your brand colour.
- **`docs/.vitepress/authors.ts`**: your real authors. A post references one by key
  (`author: priya`); change the name here and every post using that key updates.
- **`docs/index.md`**: the home page hero.
- **`docs/posts/*.md`**: the three example posts. Each one's frontmatter sets its title, date,
  author, and tags. All of it is optional: leave a field out and the post list works it out from
  the post itself (title from the first `#` heading, image from the first image, date from a
  `2026-09-20` in the file name or else the file's last git commit, description from the text
  under the heading):

  ```md
  ---
  layout: page
  title: Your post title
  date: 2026-09-20
  author: priya
  tags: [some-tag, another-tag]
  ---
  ```

  Add a new post by copying one of these files. The post list, the tag pages, the RSS feed and the
  search index all regenerate from whatever's actually in this folder, no other file to update.

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

## Linting and formatting (optional)

Three scripts, two tools. Neither is needed to write a post — `npm run dev` and `npm run build`
work exactly as before without them. They are here so a copy of this template can keep its code
tidy as it grows.

| Script | What it does |
| --- | --- |
| `npm run lint` | Runs ESLint over the TypeScript and JavaScript that hold real logic. |
| `npm run format` | Rewrites the same files with Prettier. |
| `npm run format:check` | The same as `format`, but only reports which files would change. |

Two things they deliberately leave alone: **markdown** (the posts and the page templates carry Vue
templates inside markdown, and reformatting them can change the markup in ways the build won't
complain about), and `deploy.yml` (a formatting nit should never stop someone's blog from going
live, so the pull-request check lives in its own workflow, `.github/workflows/lint.yml`).

If you add a new script, a `docs/.vitepress/*.ts` config file or a `utils.ts`-style helper, it
gets picked up automatically — the ESLint config lists the directories, not just the files that
exist today.

---

## Frequently hit problems

**A tag page 404s, or a post's tag doesn't show up anywhere.** Check the post's frontmatter:
`tags` needs to be a real YAML list (`tags: [a, b]` or one `- a` per line), not a bare string.

**The RSS feed is empty, or a link in it 404s.** Run `npm run gen-rss` on its own
and read what it prints; it's a plain script, easiest debugged directly rather than through the
full `npm run build`. A 404'ing link almost always means `sitemap.hostname` in `config.ts` isn't your site's real address.

**Search finds a page you don't want in the results, or misses a post.** Search indexes each
page's Markdown headings and text, and runs entirely in the browser (no service, no API key). Keep a
page out with `search: false` in its frontmatter, as `docs/posts/index.md` and
`docs/tags/[tag].md` do. A post with no `#` heading of its own won't show up: give it one.

**`npm run build` fails with something about a content loader.** If you're editing
`docs/tags/[tag].paths.js`, see `AGENTS.md`'s section on why it can't use `createContentLoader`
the way `posts/posts.data.ts` does.

**The Actions deploy fails but `npm run build` works locally.** Compare Node versions: the
workflow pins Node 24 (`.github/workflows/deploy.yml`). Different Node major versions occasionally
disagree on something.

## Licence

MIT. Do whatever you like with it, including using it for a real business.
