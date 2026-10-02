import { promises as fs } from 'node:fs';
import path from 'node:path';

export type RetrievalRecord = {
  id: string;
  title: string;
  text: string;
  metadata: Record<string, string | number | null>;
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^\w\s]/g, ' ');
}

function score(query: string, text: string, title: string): number {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const nText = normalize(text);
  const nTitle = normalize(title);

  let scoreValue = 0;
  for (const term of terms) {
    if (nTitle.includes(term)) scoreValue += 4;
    if (nText.includes(term)) scoreValue += 1;
  }
  return scoreValue;
}

export async function loadImportedKnowledge(
  sourcePath = 'content/imported-blog/_embedded.jsonl',
): Promise<RetrievalRecord[]> {
  const abs = path.resolve(sourcePath);
  let raw = '';

  try {
    raw = await fs.readFile(abs, 'utf8');
  } catch {
    return [];
  }

  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as RetrievalRecord);
}

export async function retrieveImportedKnowledge(
  query: string,
  limit = 5,
  sourcePath = 'content/imported-blog/_embedded.jsonl',
): Promise<RetrievalRecord[]> {
  const records = await loadImportedKnowledge(sourcePath);

  return records
    .map((record) => ({
      record,
      score: score(query, record.text, record.title),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.record);
}
