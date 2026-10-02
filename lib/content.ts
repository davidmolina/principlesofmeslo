import { promises as fs } from 'node:fs';
import path from 'node:path';

export type ParsedMarkdown = {
  title?: string;
  body: string;
  frontmatter: Record<string, string>;
};

function parseFrontmatter(raw: string): ParsedMarkdown {
  if (!raw.startsWith('---\n')) {
    return { body: raw.trim(), frontmatter: {} };
  }

  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) {
    return { body: raw.trim(), frontmatter: {} };
  }

  const fmText = raw.slice(4, end).trim();
  const body = raw.slice(end + 5).trim();
  const frontmatter: Record<string, string> = {};

  for (const line of fmText.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^['\"]|['\"]$/g, '');
    if (key) frontmatter[key] = value;
  }

  return {
    title: frontmatter.title,
    body,
    frontmatter,
  };
}

async function readMarkdown(absPath: string): Promise<ParsedMarkdown | null> {
  try {
    const raw = await fs.readFile(absPath, 'utf8');
    return parseFrontmatter(raw);
  } catch {
    return null;
  }
}

function safeSlug(slug: string): string {
  return slug.replace(/[^a-z0-9-]/gi, '');
}

export async function getRootPage(slug: string): Promise<ParsedMarkdown | null> {
  const safe = safeSlug(slug);
  if (!safe) return null;
  const file = path.join(process.cwd(), 'content', 'pages', `${safe}.mdx`);
  return readMarkdown(file);
}

export async function getServicePage(slug: string): Promise<ParsedMarkdown | null> {
  const safe = safeSlug(slug);
  if (!safe) return null;
  const file = path.join(process.cwd(), 'content', 'services', `${safe}.mdx`);
  return readMarkdown(file);
}

export async function getTeamPage(slug: string): Promise<ParsedMarkdown | null> {
  const safe = safeSlug(slug);
  if (!safe) return null;
  const file = path.join(process.cwd(), 'content', 'team', `${safe}.mdx`);
  return readMarkdown(file);
}

export async function listCollectionSlugs(collection: 'services' | 'team'): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), 'content', collection);
    const files = await fs.readdir(dir);
    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''))
      .sort();
  } catch {
    return [];
  }
}

export type MdxCollection =
  | 'articles'
  | 'assistant'
  | 'book'
  | 'framework'
  | 'glossary'
  | 'knowledge'
  | 'meslo'
  | 'resources';

export async function getMdxCollectionPage(
  collection: MdxCollection,
  slug: string,
): Promise<ParsedMarkdown | null> {
  const safe = safeSlug(slug);
  if (!safe) return null;
  const file = path.join(process.cwd(), 'content', collection, `${safe}.mdx`);
  return readMarkdown(file);
}

export async function listMdxCollectionSlugs(collection: MdxCollection): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), 'content', collection);
    const files = await fs.readdir(dir);
    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''))
      .sort();
  } catch {
    return [];
  }
}
