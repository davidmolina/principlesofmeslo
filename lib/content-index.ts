import { getMesloDocs, type MesloDoc } from '@/lib/meslo-knowledge';

export type IndexedContentEntry = {
  id: string;
  title: string;
  collection: string;
  tags: string[];
  url: string;
  excerpt: string;
};

function excerpt(text: string, maxLength = 220) {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length <= maxLength ? clean : `${clean.slice(0, maxLength).trim()}...`;
}

function toPublicUrl(doc: MesloDoc) {
  const [collection, ...rest] = doc.id.split('/');
  const slug = rest.join('/');

  switch (collection) {
    case 'articles':
      return `/articles/${slug}`;
    case 'resources':
      if (slug.startsWith('community-support/')) {
        return `/resources/community-support/${slug.replace('community-support/', '')}`;
      }
      if (slug.startsWith('contractor-support/')) {
        return `/resources/contractor-support/${slug.replace('contractor-support/', '')}`;
      }
      return `/resources/${slug}`;
    case 'book':
      return '/book';
    case 'glossary':
    case 'framework':
    case 'meslo':
    case 'assistant':
    case 'smallbiz':
    case 'knowledge':
    case 'back-office':
    case 'estimating':
    case 'business-pricing':
    case 'gov-contracting':
      return `/assistant?q=${encodeURIComponent(doc.title)}`;
    default:
      return '/assistant';
  }
}

function toIndexedEntry(doc: MesloDoc): IndexedContentEntry {
  const [collection] = doc.id.split('/');

  return {
    id: doc.id,
    title: doc.title,
    collection: collection ?? 'unknown',
    tags: doc.tags,
    url: toPublicUrl(doc),
    excerpt: excerpt(doc.content),
  };
}

export async function buildContentIndex(): Promise<IndexedContentEntry[]> {
  const docs = await getMesloDocs();
  return docs.map(toIndexedEntry);
}

export async function findIndexedContent(query: string, limit = 10): Promise<IndexedContentEntry[]> {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];

  const entries = await buildContentIndex();
  return entries
    .map((entry) => {
      const haystack = `${entry.title} ${entry.tags.join(' ')} ${entry.excerpt}`.toLowerCase();
      const score = haystack.includes(normalized)
        ? 100
        : normalized.split(/\s+/).filter(Boolean).reduce((sum, token) => sum + (haystack.includes(token) ? 1 : 0), 0);
      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.entry);
}
