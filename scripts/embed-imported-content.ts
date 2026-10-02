import { promises as fs } from 'node:fs';
import path from 'node:path';

type EmbeddedRecord = {
  id: string;
  title: string;
  text: string;
  metadata: Record<string, string | number | null>;
};

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  if (!raw.startsWith('---\n')) {
    return { frontmatter: {}, body: raw };
  }

  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) {
    return { frontmatter: {}, body: raw };
  }

  const frontmatterText = raw.slice(4, end).trim();
  const body = raw.slice(end + 5).trim();
  const frontmatter: Record<string, string> = {};

  for (const line of frontmatterText.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
    if (key) frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function toPlainText(mdx: string): string {
  return mdx
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/^#+\s+/gm, '')
    .replace(/[>*_~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  const inputDir = path.resolve(process.argv[2] ?? 'content/imported-blog');
  const outPath = path.resolve(process.argv[3] ?? 'content/imported-blog/_embedded.jsonl');

  const files = (await fs.readdir(inputDir))
    .filter((file) => file.endsWith('.mdx'))
    .sort();

  const rows: string[] = [];

  for (const file of files) {
    const abs = path.join(inputDir, file);
    const raw = await fs.readFile(abs, 'utf8');
    const { frontmatter, body } = parseFrontmatter(raw);

    const record: EmbeddedRecord = {
      id: file.replace(/\.mdx$/, ''),
      title: frontmatter.title ?? file.replace(/\.mdx$/, ''),
      text: toPlainText(body),
      metadata: {
        source_url: frontmatter.source_url ?? null,
        published_at: frontmatter.published_at ?? null,
        chunk_index: Number(frontmatter.chunk_index ?? 1),
        chunk_total: Number(frontmatter.chunk_total ?? 1),
      },
    };

    rows.push(JSON.stringify(record));
  }

  await fs.writeFile(outPath, rows.join('\n') + '\n', 'utf8');
  console.log(`Embedded export written: ${outPath} (${rows.length} records)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
