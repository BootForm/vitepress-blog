// ESLint's flat config — this file is the entire setup.
//
// ESLint 9 reads `eslint.config.js` from the repo root; there is no `.eslintrc` anywhere. Flat
// config is a list of config objects that ESLint merges in order, so the order below is the
// order the rules are applied in.
//
// Four things worth knowing before you change anything here:
//
//  1. `files` decides which files a block applies to. A block without `files` applies to every
//     file ESLint looks at. We list the files that hold real logic; the rest of the repo is
//     markdown, which ESLint doesn't lint, and build output, which we ignore.
//  2. `ignores` is global: those paths are never linted, whatever the other blocks say.
//  3. This repo is `"type": "module"`, so `eslint.config.js` is ESM and `import` works in it.
//  4. The rules are the standard recommended sets (`@eslint/js` for JavaScript,
//     `typescript-eslint` for TypeScript). Nothing here is site-specific, so the same config
//     keeps working in a copy of this template.
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    // Build output and dependencies. `docs/.vitepress/dist` is the built site and
    // `docs/.vitepress/cache` is VitePress's own cache; neither is source.
    ignores: ['node_modules/**', 'docs/.vitepress/dist/**', 'docs/.vitepress/cache/**'],
  },

  // Plain JavaScript rules, everywhere ESLint looks.
  js.configs.recommended,

  // TypeScript rules. `recommended` rather than `recommendedTypeChecked` on purpose: type-aware
  // linting needs a tsconfig with a matching `include` and a type-checking step, which is a lot
  // of machinery for a template whose point is the blog, not the tooling.
  ...tseslint.configs.recommended,

  {
    // The files that hold real logic: the site's config, the theme override, the post list
    // loader, the tag-path generator, the RSS script and the shared helpers.
    files: [
      'docs/.vitepress/*.ts',
      'docs/.vitepress/theme/index.ts',
      'docs/posts/posts.data.ts',
      'scripts/generate-rss.ts',
      'utils.ts',
    ],
    languageOptions: {
      // The theme override runs in the browser; the rest runs in Node. Listing both means a
      // global from either environment is allowed, and a typo in a global name is still an error.
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    // `docs/tags/[tag].paths.js`. The square brackets are a glob character class, so a literal
    // `[` has to be written as `[[]` to match the file name.
    files: ['docs/tags/[[]tag].paths.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
)
