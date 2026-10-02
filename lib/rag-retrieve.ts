import { searchRagDocuments, type RagDocumentRow } from '@/lib/rag-db';
import { retrieveMesloContext } from '@/lib/retrieve-meslo';
import type { MesloLocale } from '@/lib/meslo-knowledge';

export type RagRetrievalResult = {
  query: string;
  results: Array<{
    id: string;
    title: string;
    url: string;
    excerpt: string;
    tags: string[];
  }>;
};

function dedupeById<T extends { id: string }>(items: T[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function mapDbResult(row: RagDocumentRow) {
  return {
    id: row.id,
    title: row.title,
    url: row.url,
    excerpt: row.excerpt,
    tags: row.tags,
  };
}

export async function retrieveKnowledge(
  query: string,
  limit = 8,
  locale: MesloLocale = 'en',
): Promise<RagRetrievalResult> {
  const [dbResults, coreResults] = await Promise.all([
    searchRagDocuments(query, limit),
    retrieveMesloContext(query, limit, locale),
  ]);

  const mappedCore = coreResults.map((doc) => ({
    id: doc.id,
    title: doc.title,
    url: `/assistant?q=${encodeURIComponent(doc.title)}`,
    excerpt: doc.content.replace(/\s+/g, ' ').trim().slice(0, 220),
    tags: doc.tags,
  }));

  return {
    query,
    results: dedupeById([...dbResults.map(mapDbResult), ...mappedCore]).slice(0, limit),
  };
}
