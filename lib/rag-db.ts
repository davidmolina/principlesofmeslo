import { buildContentIndex, type IndexedContentEntry } from '@/lib/content-index';

export type RagDocumentRow = IndexedContentEntry & {
  embedding?: number[] | null;
};

export function ragDbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export async function loadRagDocuments(): Promise<RagDocumentRow[]> {
  return buildContentIndex();
}

export async function searchRagDocuments(query: string, limit = 8): Promise<RagDocumentRow[]> {
  const docs = await loadRagDocuments();
  const normalized = query.toLowerCase().trim();

  return docs
    .map((doc) => {
      const haystack = `${doc.title} ${doc.tags.join(' ')} ${doc.excerpt}`.toLowerCase();
      const score = normalized
        .split(/\s+/)
        .filter(Boolean)
        .reduce((sum, token) => sum + (haystack.includes(token) ? 1 : 0), 0);
      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.doc);
}
