import { promises as fs } from 'node:fs';
import path from 'node:path';

const COLLECTIONS = [
  'knowledge',
  'smallbiz',
  'framework',
  'book',
  'meslo',
  'glossary',
  'articles',
  'assistant',
  'resources',
  'estimating',
  'back-office',
  'business-pricing',
  'gov-contracting',
  'pages',
  'services',
  'team',
] as const;
const SUPPORTED_LOCALES = ['en', 'es'] as const;

type MesloCollection = (typeof COLLECTIONS)[number];
export type MesloLocale = (typeof SUPPORTED_LOCALES)[number];

export type MesloDoc = {
  id: string;
  title: string;
  tags: string[];
  content: string;
};

let cache: MesloDoc[] | null = null;
const localeCache = new Map<string, MesloDoc[]>();

function parseFrontmatter(raw: string): { title?: string; tags: string[]; body: string } {
  if (!raw.startsWith('---\n')) {
    return { body: raw.trim(), tags: [] };
  }

  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) {
    return { body: raw.trim(), tags: [] };
  }

  const frontmatterText = raw.slice(4, end).trim();
  const body = raw.slice(end + 5).trim();

  let title: string | undefined;
  let tags: string[] = [];

  for (const line of frontmatterText.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim().replace(/^['\"]|['\"]$/g, '');
    if (!value) continue;

    if (key === 'title') title = value;
    if (key === 'tags') {
      tags = value
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    }
  }

  return { title, tags, body };
}

async function readCollection(collection: MesloCollection, locale?: MesloLocale): Promise<MesloDoc[]> {
  const dir = locale
    ? path.join(process.cwd(), 'content', locale, collection)
    : path.join(process.cwd(), 'content', collection);

  async function listMdxFiles(rootDir: string, currentDir = rootDir): Promise<string[]> {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        files.push(...(await listMdxFiles(rootDir, absolutePath)));
        continue;
      }

      if (!entry.name.endsWith('.mdx')) continue;
      files.push(path.relative(rootDir, absolutePath));
    }

    return files;
  }

  try {
    const files = (await listMdxFiles(dir)).sort();

    const docs = await Promise.all(
      files.map(async (file) => {
        const normalized = file.replace(/\\/g, '/');
        const slug = normalized.replace(/\.mdx$/, '');
        const absolutePath = path.join(dir, normalized);
        const raw = await fs.readFile(absolutePath, 'utf8');
        const parsed = parseFrontmatter(raw);

        return {
          id: `${collection}/${slug}`,
          title: parsed.title ?? slug,
          tags: parsed.tags,
          content: parsed.body,
        } satisfies MesloDoc;
      }),
    );

    return docs;
  } catch {
    return [];
  }
}

export async function loadContent(collection: MesloCollection): Promise<MesloDoc[]> {
  return readCollection(collection);
}

export async function loadLocalizedContent(
  collection: MesloCollection,
  locale: MesloLocale,
): Promise<MesloDoc[]> {
  const localizedDocs = await readCollection(collection, locale);
  if (localizedDocs.length > 0) return localizedDocs;

  if (locale !== 'en') {
    return readCollection(collection, 'en');
  }

  return readCollection(collection);
}

export async function getMesloDocs(): Promise<MesloDoc[]> {
  if (cache) return cache;

  const nested = await Promise.all(COLLECTIONS.map((collection) => loadContent(collection)));
  cache = nested.flat();
  return cache;
}

export async function getMesloDocsForLocale(locale: MesloLocale): Promise<MesloDoc[]> {
  const cached = localeCache.get(locale);
  if (cached) return cached;

  const nested = await Promise.all(COLLECTIONS.map((collection) => loadLocalizedContent(collection, locale)));
  const docs = nested.flat();
  localeCache.set(locale, docs);
  return docs;
}

export function clearMesloDocCache() {
  cache = null;
  localeCache.clear();
}
