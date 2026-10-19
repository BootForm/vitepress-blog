import { spawnSync } from "child_process";
import path from "node:path";

export function fixUrl(url: string) {
  const urlFixed = url.replace(/(?<![:‘’"'])\/\//g, "/");
  return urlFixed ? urlFixed.trim() : null;
}

export function extractTitle(fileContent: string | undefined) {
  const match = fileContent!.match(/^\s*#\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

export function extractFirstImage(
  fileContent: string | undefined,
): string | null {
  const markdownImgRegex = /!\[.*?\]\((.*?)\)/;
  const htmlImgRegex = /<img\s+[^>]*?\b(?<![:\w-])src\s*=\s*["'](.*?)["']/i;

  const mdMatch = fileContent!.match(markdownImgRegex);
  if (mdMatch) {
    return mdMatch[1].trim();
  }

  const htmlMatch = fileContent!.match(htmlImgRegex);
  if (htmlMatch) {
    return htmlMatch[1].trim();
  }

  return null;
}

export function extractDescription(
  fileContent: string,
  maxLength: number = 300,
  inclusive: boolean = true,
): string | null {
  // Strip fenced code blocks first so headers (e.g. ## Results) inside code blocks
  // are never mistaken for document section headers, and blocks are not cut in half.
  const codeBlockRegex =
    /(?:^|\r?\n)[ \t]*(?:`{3,}|~{3,})[^\r\n]*\r?\n[\s\S]*?(?:(?:\r?\n[ \t]*(?:`{3,}|~{3,})[^\r\n]*(?=\r?\n|$))|(?![^]))/g;
  const contentWithoutCode = fileContent.replace(codeBlockRegex, "\n");

  const titleRegex = /^[ \t]*#[ \t]+[^\r\n]+(?:\r?\n|$)/m;
  const titleMatch = contentWithoutCode.match(titleRegex);
  if (!titleMatch || titleMatch.index === undefined) {
    return null;
  }

  const contentAfterTitle = contentWithoutCode.slice(
    titleMatch.index + titleMatch[0].length,
  );

  // Match the first ## Header
  const h2Regex = /^[ \t]*##[ \t]+[^\r\n]+/m;
  const h2Match = contentAfterTitle.match(h2Regex);

  const rawSection =
    h2Match && h2Match.index !== undefined
      ? contentAfterTitle.slice(0, h2Match.index)
      : contentAfterTitle;

  const cleaned = rawSection
    // Strip scripts and styles along with content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    // Strip HTML comments
    .replace(/<!--[\s\S]*?-->/g, "")
    // Strip markdown images: ![alt](url) or ![alt][ref]
    .replace(/!\[[\s\S]*?\](?:\([\s\S]*?\)|\[[\s\S]*?\])/g, "")
    // Strip any remaining code blocks (fenced or unclosed)
    .replace(codeBlockRegex, "\n")
    .replace(/`{3,}[\s\S]*?`{3,}/g, "")
    // Strip HTML tags
    .replace(/<[^>]+>/g, "")
    // Strip markdown links but preserve anchor text: [text](url) -> text
    .replace(/\[([\s\S]*?)\](?:\([\s\S]*?\)|\[[\s\S]*?\])/g, "$1")
    // Strip inline code: `code` -> code
    .replace(/`([^`]+)`/g, "$1")
    // Strip bold/italics
    .replace(/(\*\*|__)([\s\S]*?)\1/g, "$2")
    .replace(/(\*|_)([\s\S]*?)\1/g, "$2")
    .replace(/~~([\s\S]*?)~~/g, "$1")
    // Strip blockquote & list markers
    .replace(/^[ \t]*[>*+-][ \t]+/gm, "")
    .replace(/^[ \t]*\d+\.[ \t]+/gm, "")
    // Strip horizontal rules
    .replace(/^[ \t]*[-*_]{3,}[ \t]*$/gm, "")
    // Normalize spaces and newlines
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return null;
  }

  const suffix = "..";
  if (cleaned.length > maxLength) {
    const limit = inclusive
      ? Math.max(0, maxLength - suffix.length)
      : maxLength;
    return cleaned.slice(0, limit).trimEnd() + suffix;
  }

  return cleaned;
}

export const extractExcerpt = extractDescription;

export function getGitLastUpdated(filePath: string): string | null {
  const { stdout, error, status } = spawnSync(
    "git",
    ["log", "-1", "--pretty=%ai", "--", path.basename(filePath)],
    { cwd: path.dirname(filePath), encoding: "utf8" },
  );
  if (error || status !== 0 || !stdout) {
    console.error(`Git log failed or file is not tracked: ${filePath}`);
    return null;
  }

  // Extract just the YYYY-MM-DD portion (the first 10 characters)
  return stdout.trim().slice(0, 10);
}

export function getDateByFileName(filePath: string): string | null {
  const match = filePath!.match(/(\d{4}\-\d{1,2}\-\d{1,2})/m);
  return match ? match[0].trim() : null;
}
