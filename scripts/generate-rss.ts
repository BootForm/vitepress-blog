import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import config, { localConfig } from "../docs/.vitepress/config.ts";
import {
  getDateByFileName,
  getGitLastUpdated,
  extractTitle,
  fixUrl,
} from "../utils.ts";

const SITE_URL = config.sitemap?.hostname;
const FEED_TITLE = config.title;
const FEED_DESCRIPTION = config.description;
const POSTS = localConfig.postsUrlPrefix;
const BASE = config.base ? `/${config.base}` : "";
const EXTENSION = config.cleanUrls ? "" : ".html";
const PUBLIC = "public";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const postsDir = join(rootDir, config.srcDir!, POSTS);
const publicDir = join(rootDir, config.srcDir!, PUBLIC);

const posts = readdirSync(postsDir)
  .filter(
    (file) =>
      file.endsWith(".md") && file !== "index.md" && file !== "posts.md",
  )
  .map((file) => {
    const filePath = join(postsDir, file);
    const fileContent = readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    const slug = file.replace(/\.md$/, "");
    const urlDir = POSTS === "/" ? "/" : `${POSTS}/`;
    return {
      title:
        data.title ?? extractTitle(fileContent) ?? localConfig.defaultTitle,
      date:
        data.date ?? getDateByFileName(filePath) ?? getGitLastUpdated(filePath),
      url: fixUrl(`${SITE_URL}${BASE}${urlDir}${slug}${EXTENSION}`),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const escapeXml = (value) =>
  String(value).replace(
    /[<>&'"]/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[char],
  );

const rssItems = posts
  .map(
    (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${post.url}</link>
      <guid>${post.url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
  )
  .join("");

const rssHeader = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>${rssItems}
  </channel>
</rss>
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "feed.xml"), rssHeader);

console.log(`Wrote ${publicDir}/feed.xml with ${posts.length} post(s).`);
