import { promises as fs } from 'node:fs';
import path from 'node:path';
import { ParsedMarkdown } from '@/lib/content';

const root = process.cwd();
const skipDirs = new Set(['.git', '.next', 'node_modules']);

function parseFrontmatter(raw: string): ParsedMarkdown {
  if (!raw.startsWith('---\n')) {
    return { body: raw.trim(), frontmatter: {} };
  }

  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) {
    return { body: raw.trim(), frontmatter: {} };
  }

  const fm = raw.slice(4, end).trim();
  const body = raw.slice(end + 5).trim();
  const frontmatter: Record<string, string> = {};

  for (const line of fm.split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim().replace(/^['\"]|['\"]$/g, '');
    if (key) frontmatter[key] = value;
  }

  return { title: frontmatter.title, body, frontmatter };
}

export async function listAllMarkdownFiles(): Promise<string[]> {
  async function walk(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const abs = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (skipDirs.has(entry.name)) {
            return [];
          }
          return walk(abs);
        }
        if (entry.isFile() && entry.name.endsWith('.md')) {
          return [path.relative(root, abs)];
        }
        return [];
      }),
    );
    return files.flat();
  }

  return (await walk(path.join(root, 'content'))).sort();
}

export async function getMarkdownByRelativePath(relativePath: string): Promise<ParsedMarkdown | null> {
  const contentRoot = path.resolve(path.join(root, 'content'));
  const abs = path.resolve(path.join(contentRoot, relativePath));

  if (!abs.startsWith(contentRoot) || !abs.endsWith('.md')) {
    return null;
  }

  try {
    const raw = await fs.readFile(abs, 'utf8');
    return parseFrontmatter(raw);
  } catch {
    return null;
  }
}
