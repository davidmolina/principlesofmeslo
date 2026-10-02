import fs from 'node:fs';
import path from 'node:path';
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import matter from 'gray-matter';
import TurndownService from 'turndown';
import slugify from 'slugify';

type FeedItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  categories?: string[];
};

type ImportPost = {
  sourceUrl: string;
  title: string;
  publishedAt: string | null;
  topic: string;
  markdown: string;
};

type Chunk = {
  heading: string | null;
  content: string;
  words: number;
};

type CliArgs = {
  sourceMode: 'rss' | 'repo';
  feedUrl: string;
  baseUrl: string;
  outDir: string;
  repoPath?: string;
  minWords: number;
  maxWords: number;
  overlapWords: number;
  maxPosts?: number;
  concurrency: number;
};

const parser = new Parser();
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

function parseArgs(argv: string[]): CliArgs {
  const map = new Map<string, string>();

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) map.set(key, 'true');
    else {
      map.set(key, next);
      i += 1;
    }
  }

  return {
    sourceMode: (map.get('source-mode') as 'rss' | 'repo') ?? 'rss',
    feedUrl: map.get('feed-url') ?? 'https://davidcmolina.com/feed.xml',
    baseUrl: map.get('base-url') ?? 'https://davidcmolina.com',
    outDir: path.resolve(map.get('out-dir') ?? 'content/imported-blog'),
    repoPath: map.get('repo-path') ? path.resolve(map.get('repo-path')!) : undefined,
    minWords: Number(map.get('min-words') ?? 80),
    maxWords: Number(map.get('max-words') ?? 140),
    overlapWords: Number(map.get('overlap-words') ?? 35),
    maxPosts: map.get('max-posts') ? Number(map.get('max-posts')) : undefined,
    concurrency: Number(map.get('concurrency') ?? 8),
  };
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function normalizeWhitespace(text: string) {
  return text.replace(/\n{3,}/g, '\n\n').replace(/[ \t]+\n/g, '\n').trim();
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function cleanTopic(input: string): string {
  const topic = input.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, ' ');
  return topic || 'blog';
}

function chooseArticleHtml($: cheerio.CheerioAPI): string {
  const candidates = ['article', '.post', '.post-content', '.entry-content', '.content', 'main'];
  let bestHtml = '';
  let bestLen = 0;

  for (const sel of candidates) {
    const node = $(sel).first();
    if (!node.length) continue;
    const len = node.text().trim().length;
    if (len > bestLen) {
      bestLen = len;
      bestHtml = node.html() || '';
    }
  }

  return bestHtml || $('body').html() || '';
}

function extractMainContent(html: string, sourceUrl: string): ImportPost {
  const $ = cheerio.load(html);
  $('script, style, nav, footer, header, aside, iframe, noscript').remove();

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
    new URL(sourceUrl).pathname.split('/').filter(Boolean)[0] ||
    'blog';

  const articleHtml = chooseArticleHtml($);
  const markdown = normalizeWhitespace(turndown.turndown(articleHtml));

  return {
    sourceUrl,
    title,
    publishedAt,
    topic: cleanTopic(topic),
    markdown,
  };
}

function splitIntoSections(markdown: string): Array<{ heading: string | null; text: string }> {
  const lines = markdown.split('\n');
  const sections: Array<{ heading: string | null; text: string }> = [];
  let heading: string | null = null;
  let acc: string[] = [];

  const push = () => {
    const text = acc.join('\n').trim();
    if (text) sections.push({ heading, text });
    acc = [];
  };

  for (const line of lines) {
    const match = line.match(/^#{1,3}\s+(.+)$/);
    if (match) {
      push();
      heading = match[1].trim();
      acc.push(line);
      continue;
    }
    acc.push(line);
  }
  push();

  return sections.length > 0 ? sections : [{ heading: null, text: markdown.trim() }];
}

function toWordTokens(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

function chunkMarkdown(markdown: string, minWords = 80, maxWords = 140, overlapWords = 35): Chunk[] {
  const sections = splitIntoSections(markdown);
  const out: Chunk[] = [];
  const safeOverlap = Math.max(0, Math.min(overlapWords, maxWords - 1));
  const step = Math.max(1, maxWords - safeOverlap);

  for (const section of sections) {
    const tokens = toWordTokens(section.text);
    if (tokens.length === 0) continue;

    if (tokens.length <= maxWords) {
      const content = tokens.join(' ').trim();
      out.push({ heading: section.heading, content, words: tokens.length });
      continue;
    }

    for (let start = 0; start < tokens.length; start += step) {
      const end = Math.min(start + maxWords, tokens.length);
      const segment = tokens.slice(start, end);
      if (segment.length < minWords && end !== tokens.length) continue;
      const content = segment.join(' ').trim();
      if (!content) continue;
      out.push({ heading: section.heading, content, words: segment.length });
      if (end === tokens.length) break;
    }
  }

  return out.length > 0 ? out : [{ heading: null, content: markdown, words: countWords(markdown) }];
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'meslo-importer/1.0 (+https://principlesofmeslo.com)',
      accept: 'text/html,application/xml;q=0.9,*/*;q=0.8',
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

async function runWithConcurrency<T>(items: T[], limit: number, fn: (item: T, index: number) => Promise<void>) {
  const queue = [...items.entries()];

  async function worker() {
    while (queue.length > 0) {
      const next = queue.shift();
      if (!next) return;
      const [index, item] = next;
      await fn(item, index);
    }
  }

  const workers = Array.from({ length: Math.max(1, limit) }, () => worker());
  await Promise.all(workers);
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  if (!raw.startsWith('---\n')) return { frontmatter: {}, body: raw.trim() };
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return { frontmatter: {}, body: raw.trim() };

  const fmText = raw.slice(4, end).trim();
  const body = raw.slice(end + 5).trim();
  const frontmatter: Record<string, string> = {};

  for (const line of fmText.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key) frontmatter[key] = value;
  }

  return { frontmatter, body };
}

async function importFromRss(args: CliArgs): Promise<ImportPost[]> {
  const feed = await parser.parseURL(args.feedUrl);
  const items = ((feed.items || []) as FeedItem[])
    .filter((item) => item.link)
    .slice(0, args.maxPosts ?? Number.MAX_SAFE_INTEGER);

  const posts: ImportPost[] = [];

  await runWithConcurrency(items, args.concurrency, async (item, index) => {
    const url = item.link!;
    try {
      const html = await fetchHtml(url);
      const post = extractMainContent(html, url);
      if (post.markdown.length < 120) {
        console.log(`[skip] ${url} (too short)`);
        return;
      }
      if (item.pubDate && !post.publishedAt) post.publishedAt = item.pubDate;
      if (item.categories?.length && post.topic === 'blog') {
        post.topic = cleanTopic(item.categories[0]);
      }
      posts.push(post);
      console.log(`[rss] ${index + 1}/${items.length} imported ${post.title}`);
    } catch (err) {
      console.log(`[rss:error] ${url} ${(err as Error).message}`);
    }
  });

  return posts;
}

async function listMarkdownFiles(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listMarkdownFiles(abs)));
    } else if (entry.isFile() && /\.(md|markdown|mdx)$/i.test(entry.name)) {
      out.push(abs);
    }
  }
  return out;
}

async function importFromRepo(args: CliArgs): Promise<ImportPost[]> {
  if (!args.repoPath) throw new Error('--repo-path is required when --source-mode repo');
  const postsDir = path.join(args.repoPath, '_posts');
  const files = (await listMarkdownFiles(postsDir)).slice(0, args.maxPosts ?? Number.MAX_SAFE_INTEGER);

  const posts: ImportPost[] = [];

  for (const file of files) {
    const raw = await fs.promises.readFile(file, 'utf8');
    const { frontmatter, body } = parseFrontmatter(raw);
    const title = frontmatter.title || path.basename(file, path.extname(file));

    posts.push({
      sourceUrl: path.relative(args.repoPath, file),
      title,
      publishedAt: frontmatter.date ?? null,
      topic: cleanTopic(frontmatter.categories || frontmatter.tags || 'blog'),
      markdown: normalizeWhitespace(body),
    });
  }

  return posts;
}

async function writeChunks(posts: ImportPost[], args: CliArgs) {
  ensureDir(args.outDir);
  const staleFiles = fs.readdirSync(args.outDir).filter((name) => name.endsWith('.mdx'));
  for (const file of staleFiles) {
    fs.unlinkSync(path.join(args.outDir, file));
  }

  const manifest: Array<Record<string, string | number | null>> = [];

  for (const [index, post] of posts.entries()) {
    const chunks = chunkMarkdown(post.markdown, args.minWords, args.maxWords, args.overlapWords);
    const baseSlug = slugify(post.title || 'untitled', { lower: true, strict: true }) || `post-${index + 1}`;

    for (let i = 0; i < chunks.length; i += 1) {
      const chunk = chunks[i];
      const chunkSlug = `${baseSlug}-${String(i + 1).padStart(2, '0')}`;
      const filePath = path.join(args.outDir, `${chunkSlug}.mdx`);

      const mdx = matter.stringify(chunk.content, {
        title: chunks.length > 1 ? `${post.title} (Part ${i + 1})` : post.title,
        slug: chunkSlug,
        source_url: post.sourceUrl,
        source_title: post.title,
        published_at: post.publishedAt,
        topic: post.topic,
        tags: ['imported', 'blog', 'knowledge', post.topic].filter(Boolean),
        chunk_heading: chunk.heading,
        chunk_words: chunk.words,
        chunk_index: i + 1,
        chunk_total: chunks.length,
        content_type: 'blog-import',
      });

      fs.writeFileSync(filePath, mdx, 'utf8');

      manifest.push({
        id: chunkSlug,
        title: post.title,
        source_url: post.sourceUrl,
        published_at: post.publishedAt,
        topic: post.topic,
        file: path.relative(process.cwd(), filePath),
        chunk_index: i + 1,
        chunk_total: chunks.length,
        chunk_words: chunk.words,
      });
    }

    console.log(`[write] ${index + 1}/${posts.length} ${post.title} -> ${chunks.length} chunk(s)`);
  }

  const manifestPath = path.join(args.outDir, '_import-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Done. Wrote ${manifest.length} MDX chunks to ${args.outDir}`);
  console.log(`Manifest: ${manifestPath}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const posts = args.sourceMode === 'repo' ? await importFromRepo(args) : await importFromRss(args);
  await writeChunks(posts, args);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
