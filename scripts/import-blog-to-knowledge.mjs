#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import TurndownService from 'turndown';
import { load } from 'cheerio';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function normalizeUrl(baseUrl, value) {
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return null;
  }
}

async function fetchText(url, retries = 2) {
  let attempt = 0;
  let lastError;
  while (attempt <= retries) {
    try {
      const res = await fetch(url, {
        headers: {
          'user-agent': 'meslo-importer/1.0 (+https://principlesofmeslo.com)',
          accept: 'text/html,application/xml;q=0.9,*/*;q=0.8',
        },
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return await res.text();
    } catch (err) {
      lastError = err;
      attempt += 1;
      if (attempt <= retries) {
        await new Promise((r) => setTimeout(r, 500 * attempt));
      }
    }
  }
  throw lastError;
}

function extractUrlsFromSitemap(xml, baseUrl) {
  const locMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/gims)].map((m) => m[1].trim());
  return locMatches
    .map((loc) => normalizeUrl(baseUrl, loc))
    .filter(Boolean);
}

function extractUrlsFromRss(xml, baseUrl) {
  const links = [];

  for (const m of xml.matchAll(/<item>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?<\/item>/gim)) {
    const url = normalizeUrl(baseUrl, m[1].trim());
    if (url) links.push(url);
  }

  for (const m of xml.matchAll(/<entry>[\s\S]*?<link[^>]*?href=["']([^"']+)["'][^>]*?>[\s\S]*?<\/entry>/gim)) {
    const url = normalizeUrl(baseUrl, m[1].trim());
    if (url) links.push(url);
  }

  return links;
}

function slugify(input) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function pickArticleHtml($) {
  const selectors = [
    'article',
    'main article',
    'main .post-content',
    '.post-content',
    '.entry-content',
    '.article-content',
    'main',
  ];

  let best = null;
  let bestLen = 0;

  for (const sel of selectors) {
    $(sel).each((_i, el) => {
      const html = $(el).html() ?? '';
      const textLen = $(el).text().trim().length;
      if (textLen > bestLen) {
        best = html;
        bestLen = textLen;
      }
    });
    if (bestLen > 1800) break;
  }

  if (best) return best;
  return $('body').html() ?? '';
}

function cleanupHtml($) {
  $('script,style,noscript,iframe,svg,canvas,form,nav,footer,header,aside').remove();
  $('[class*="share"],[class*="social"],[class*="menu"],[class*="comment"]').remove();
}

function extractPost(html, url, turndown) {
  const $ = load(html);
  cleanupHtml($);

  const title =
    $('meta[property="og:title"]').attr('content')?.trim() ||
    $('h1').first().text().trim() ||
    $('title').text().trim() ||
    'Untitled';

  const publishedAt =
    $('meta[property="article:published_time"]').attr('content')?.trim() ||
    $('time[datetime]').first().attr('datetime')?.trim() ||
    null;
  const topic =
    $('meta[property="article:section"]').attr('content')?.trim() ||
    $('meta[name="keywords"]').attr('content')?.split(',')[0]?.trim() ||
    new URL(url).pathname.split('/').filter(Boolean)[0] ||
    'blog';

  const articleHtml = pickArticleHtml($);
  let markdown = turndown.turndown(articleHtml).trim();

  markdown = markdown
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s*\[\s*\]\([^)]*\)\s*$/gm, '')
    .trim();

  return {
    url,
    title,
    publishedAt,
    topic,
    markdown,
  };
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function chunkMarkdown(markdown, minWords, maxWords) {
  const lines = markdown.split('\n');
  const sections = [];
  let currentHeading = null;
  let currentLines = [];

  const pushSection = () => {
    const text = currentLines.join('\n').trim();
    if (!text) return;
    sections.push({ heading: currentHeading, text });
    currentLines = [];
  };

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      pushSection();
      currentHeading = headingMatch[2].trim();
      currentLines.push(line);
      continue;
    }
    currentLines.push(line);
  }
  pushSection();

  const chunks = [];

  for (const section of sections) {
    const paragraphs = section.text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    let acc = [];
    let accWords = 0;

    const flush = () => {
      const text = acc.join('\n\n').trim();
      if (!text) return;
      chunks.push({
        text,
        heading: section.heading,
        wordCount: countWords(text),
      });
      acc = [];
      accWords = 0;
    };

    for (const para of paragraphs) {
      const paraWords = countWords(para);
      if (accWords + paraWords > maxWords && accWords >= minWords) {
        flush();
      }
      acc.push(para);
      accWords += paraWords;
    }
    flush();
  }

  // Merge tiny tail chunks into previous chunk when possible.
  for (let i = chunks.length - 1; i > 0; i -= 1) {
    if (chunks[i].wordCount >= minWords) continue;
    const mergedText = `${chunks[i - 1].text}\n\n${chunks[i].text}`.trim();
    const mergedWords = countWords(mergedText);
    if (mergedWords <= maxWords + 120) {
      chunks[i - 1] = {
        text: mergedText,
        heading: chunks[i - 1].heading,
        wordCount: mergedWords,
      };
      chunks.splice(i, 1);
    }
  }

  if (chunks.length === 0) {
    return [{ text: markdown.trim(), heading: null, wordCount: countWords(markdown) }];
  }
  return chunks;
}

function shouldKeepUrl(url, prefixes, allowAll) {
  if (allowAll) return true;
  const u = new URL(url);
  return prefixes.some((p) => u.pathname.startsWith(p));
}

function fmEscape(value) {
  return String(value).replace(/\n/g, ' ').replace(/"/g, '\\"').trim();
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return { frontmatter: {}, body: raw.trim() };
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return { frontmatter: {}, body: raw.trim() };
  const fmText = raw.slice(4, end).trim();
  const body = raw.slice(end + 5).trim();
  const frontmatter = {};
  for (const line of fmText.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key) frontmatter[key] = value;
  }
  return { frontmatter, body };
}

async function listMarkdownFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listMarkdownFiles(abs)));
      continue;
    }
    if (entry.isFile() && /\.(md|markdown|mdx)$/i.test(entry.name)) out.push(abs);
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const baseUrl = args['base-url'] ?? 'https://davidcmolina.com';
  const outDir = path.resolve(args['out-dir'] ?? 'content/imported-blog');
  const sourceMode = args['source-mode'] ?? 'rss';
  const repoPath = args['repo-path'] ? path.resolve(args['repo-path']) : null;
  const maxPosts = args['max-posts'] ? Number(args['max-posts']) : null;
  const minWords = args['min-words'] ? Number(args['min-words']) : 300;
  const maxWords = args['max-words'] ? Number(args['max-words']) : 800;
  const allowAll = Boolean(args['allow-all']);
  const prefixes = (args['path-prefixes'] ?? '/blog/,/posts/,/articles/')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  const rssList = (args.rss ?? '/feed/,/rss/,/blog/feed/')
    .split(',')
    .map((v) => normalizeUrl(baseUrl, v.trim()))
    .filter(Boolean);

  const sitemapSeeds = (args.sitemap ?? '/sitemap.xml,/sitemap_index.xml')
    .split(',')
    .map((v) => normalizeUrl(baseUrl, v.trim()))
    .filter(Boolean);

  await ensureDir(outDir);

  const discovered = new Set();
  const visitedSitemaps = new Set();

  if (sourceMode === 'repo') {
    if (!repoPath) {
      throw new Error('source-mode=repo requires --repo-path to the Jekyll repository');
    }

    const postsDir = path.join(repoPath, '_posts');
    const files = await listMarkdownFiles(postsDir);
    const selected = maxPosts ? files.slice(0, maxPosts) : files;
    const manifest = [];

    for (const [idx, file] of selected.entries()) {
      const raw = await fs.readFile(file, 'utf8');
      const { frontmatter, body } = parseFrontmatter(raw);
      const title = frontmatter.title || path.basename(file, path.extname(file));
      const publishedAt = frontmatter.date || null;
      const topic = (frontmatter.categories || frontmatter.tags || 'blog').split(',')[0].trim();
      const chunks = chunkMarkdown(body, minWords, maxWords);
      const baseSlug = slugify(title) || `post-${idx + 1}`;

      for (let i = 0; i < chunks.length; i += 1) {
        const part = i + 1;
        const fileSlug = chunks.length > 1 ? `${baseSlug}-part-${part}` : baseSlug;
        const filePath = path.join(outDir, `${fileSlug}.mdx`);
        const chunkTitle = chunks.length > 1 ? `${title} (Part ${part})` : title;
        const mdx = `---\ntitle: \"${fmEscape(chunkTitle)}\"\ntags: imported, blog, knowledge\nsource_title: \"${fmEscape(title)}\"\nsource_url: \"${fmEscape(path.relative(repoPath, file))}\"\ntopic: \"${fmEscape(topic)}\"\n${publishedAt ? `published_at: \"${fmEscape(publishedAt)}\"\n` : ''}${chunks[i].heading ? `chunk_heading: \"${fmEscape(chunks[i].heading)}\"\n` : ''}chunk_words: ${chunks[i].wordCount}\nchunk_index: ${part}\nchunk_total: ${chunks.length}\n---\n\n${chunks[i].text.trim()}\n`;
        await fs.writeFile(filePath, mdx, 'utf8');
        manifest.push({
          id: fileSlug,
          title: chunkTitle,
          source_url: path.relative(repoPath, file),
          published_at: publishedAt,
          file: path.relative(process.cwd(), filePath),
        });
      }
      console.log(`[repo] ${idx + 1}/${selected.length} ${file} -> ${chunks.length} chunk(s)`);
    }

    const manifestPath = path.join(outDir, '_import-manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log(`\nDone. Wrote ${manifest.length} MDX chunks to ${outDir}`);
    console.log(`Manifest: ${manifestPath}`);
    return;
  }

  if (sourceMode === 'rss' || sourceMode === 'both') {
    for (const rssUrl of rssList) {
      try {
        const xml = await fetchText(rssUrl);
        for (const u of extractUrlsFromRss(xml, baseUrl)) discovered.add(u);
        console.log(`[rss] ${rssUrl}: ok`);
      } catch {
        console.log(`[rss] ${rssUrl}: skipped`);
      }
    }
  }

  if (
    sourceMode === 'sitemap' ||
    sourceMode === 'both' ||
    (sourceMode === 'rss' && discovered.size === 0)
  ) {
    const queue = [...sitemapSeeds];
    while (queue.length > 0) {
      const sitemapUrl = queue.shift();
      if (!sitemapUrl || visitedSitemaps.has(sitemapUrl)) continue;
      visitedSitemaps.add(sitemapUrl);

      try {
        const xml = await fetchText(sitemapUrl);
        const urls = extractUrlsFromSitemap(xml, baseUrl);
        for (const u of urls) {
          if (u.endsWith('.xml')) queue.push(u);
          else discovered.add(u);
        }
        console.log(`[sitemap] ${sitemapUrl}: ${urls.length} urls`);
      } catch {
        console.log(`[sitemap] ${sitemapUrl}: skipped`);
      }
    }
  }

  const candidates = [...discovered]
    .filter((u) => shouldKeepUrl(u, prefixes, allowAll))
    .filter((u) => !u.match(/\.(jpg|jpeg|png|gif|webp|pdf|zip)$/i))
    .sort();

  const targetUrls = maxPosts ? candidates.slice(0, maxPosts) : candidates;
  console.log(`\nDiscovered ${discovered.size} URLs, importing ${targetUrls.length} posts...`);

  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
  });

  const manifest = [];

  for (const [idx, url] of targetUrls.entries()) {
    try {
      const html = await fetchText(url);
      const post = extractPost(html, url, turndown);

      if (!post.markdown || post.markdown.length < 140) {
        console.log(`[skip] ${url} (content too short)`);
        continue;
      }

      const baseSlug = slugify(post.title) || `post-${idx + 1}`;
      const chunks = chunkMarkdown(post.markdown, minWords, maxWords);

      for (let i = 0; i < chunks.length; i += 1) {
        const part = i + 1;
        const fileSlug = chunks.length > 1 ? `${baseSlug}-part-${part}` : baseSlug;
        const filePath = path.join(outDir, `${fileSlug}.mdx`);
        const chunkTitle = chunks.length > 1 ? `${post.title} (Part ${part})` : post.title;

        const mdx = `---\ntitle: \"${fmEscape(chunkTitle)}\"\ntags: imported, blog, knowledge\nsource_title: \"${fmEscape(post.title)}\"\nsource_url: \"${fmEscape(post.url)}\"\ntopic: \"${fmEscape(post.topic)}\"\n${post.publishedAt ? `published_at: \"${fmEscape(post.publishedAt)}\"\n` : ''}${chunks[i].heading ? `chunk_heading: \"${fmEscape(chunks[i].heading)}\"\n` : ''}chunk_words: ${chunks[i].wordCount}\nchunk_index: ${part}\nchunk_total: ${chunks.length}\n---\n\n${chunks[i].text.trim()}\n`;

        await fs.writeFile(filePath, mdx, 'utf8');

        manifest.push({
          id: fileSlug,
          title: chunkTitle,
          source_url: post.url,
          published_at: post.publishedAt,
          file: path.relative(process.cwd(), filePath),
        });
      }

      console.log(`[ok] ${idx + 1}/${targetUrls.length} ${url} -> ${chunks.length} chunk(s)`);
    } catch (err) {
      console.log(`[error] ${url} (${err?.message ?? 'unknown error'})`);
    }
  }

  const manifestPath = path.join(outDir, '_import-manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  if (args['vector-jsonl']) {
    const jsonlPath = path.resolve(args['vector-jsonl']);
    const lines = manifest.map((item) => JSON.stringify(item)).join('\n');
    await fs.writeFile(jsonlPath, lines + '\n', 'utf8');
    console.log(`Vector metadata JSONL written: ${jsonlPath}`);
  }

  console.log(`\nDone. Wrote ${manifest.length} MDX chunks to ${outDir}`);
  console.log(`Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
