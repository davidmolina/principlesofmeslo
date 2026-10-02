import { getMesloDocs, getMesloDocsForLocale, type MesloDoc, type MesloLocale } from '@/lib/meslo-knowledge';
import { promises as fs } from 'node:fs';
import path from 'node:path';

function normalize(text: string) {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ');
}

const STOPWORDS = new Set([
  'a',
  'an',
  'the',
  'is',
  'are',
  'what',
  'who',
  'how',
  'when',
  'where',
  'why',
  'does',
  'do',
  'for',
  'to',
  'of',
  'in',
  'on',
  'and',
  'or',
]);

function collectionOf(doc: MesloDoc): string {
  return doc.id.split('/')[0] ?? '';
}

function isAssistantMetaQuery(query: string): boolean {
  const q = normalize(query);
  return (
    q.includes('assistant') ||
    q.includes('chat') ||
    q.includes('help') ||
    q.includes('support')
  );
}

function isSmallBusinessQuery(query: string): boolean {
  const q = normalize(query);
  return (
    q.includes('small business') ||
    q.includes('local marketing') ||
    q.includes('market my') ||
    q.includes('first customers') ||
    q.includes('services locally') ||
    q.includes('grow my business')
  );
}

function isLegalPolicyQuery(query: string): boolean {
  const q = normalize(query);
  return (
    q.includes('privacy') ||
    q.includes('cookie') ||
    q.includes('terms') ||
    q.includes('legal') ||
    q.includes('policy') ||
    q.includes('policies')
  );
}

function isGovernmentContractingQuery(query: string): boolean {
  const q = normalize(query);
  return (
    q.includes('government contracting') ||
    q.includes('gov contracting') ||
    q.includes('federal') ||
    q.includes('sam registration') ||
    q.includes('contracting officer') ||
    q.includes('set aside') ||
    q.includes('capability statement')
  );
}

function isPrimaryMesloFormulaDoc(doc: MesloDoc) {
  return doc.id.startsWith('book/part-ii-meslo-formula/');
}

function isOperationalSystemsDoc(doc: MesloDoc) {
  return doc.id.startsWith('book/part-iii-operationalizing-back-office/');
}

function isGlossaryAnchorDoc(doc: MesloDoc) {
  return new Set([
    'glossary/markup-vs-margin',
    'glossary/master-takeoff',
    'glossary/scope-leveling',
    'glossary/bid-log',
  ]).has(doc.id);
}

function isAssistantPromoDoc(doc: MesloDoc) {
  return /^ask the meslo assistant$/i.test(doc.title.trim());
}

function isPolicyPageDoc(doc: MesloDoc) {
  return (
    doc.id.startsWith('pages/privacy-policy') ||
    doc.id.startsWith('pages/terms-of-service') ||
    doc.id.startsWith('pages/cookie-usage')
  );
}

function hasTag(doc: MesloDoc, tag: string) {
  return doc.tags.some((value) => normalize(value) === normalize(tag));
}

const MESLO_DOMAIN_TERMS = new Set([
  'meslo',
  'material',
  'equipment',
  'subcontractor',
  'subcontractors',
  'labor',
  'other',
  'costs',
  'insurance',
  'bond',
  'profit',
  'taxes',
  'overhead',
  'takeoff',
  'bid',
  'estimating',
  'estimate',
  'markup',
  'margin',
  'contractor',
  'construction',
  'workflow',
  'operations',
  'back',
  'office',
  'wip',
  'retainage',
  'rfi',
  'sov',
]);

const OPERATIONS_DOMAIN_TERMS = new Set([
  'operations',
  'operational',
  'back',
  'office',
  'delegation',
  'system',
  'systems',
  'workflow',
  'workflows',
  'strategy',
  'safety',
]);

function isMesloDomainQuery(query: string): boolean {
  const tokens = normalize(query)
    .split(/\s+/)
    .filter(Boolean);
  return tokens.some((token) => MESLO_DOMAIN_TERMS.has(token));
}

function isOperationalSystemsQuery(query: string): boolean {
  const tokens = normalize(query)
    .split(/\s+/)
    .filter(Boolean);
  return tokens.some((token) => OPERATIONS_DOMAIN_TERMS.has(token));
}

function isDefinitionQuery(query: string): boolean {
  const q = normalize(query);
  return (
    q.startsWith('what is ') ||
    q.startsWith('what are ') ||
    q.includes(' definition ') ||
    q.startsWith('define ') ||
    q.includes(' meaning ')
  );
}

function phraseFromQuery(query: string): string {
  const cleaned = normalize(query)
    .split(/\s+/)
    .filter((word) => word && !STOPWORDS.has(word))
    .join(' ')
    .trim();
  return cleaned;
}

function splitQueryVariants(query: string): string[] {
  const variants = new Set<string>();
  const base = query.trim();
  if (base) variants.add(base);

  const disjunctionParts = query
    .split(/\s+\bor\b\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);

  for (const part of disjunctionParts) {
    variants.add(part);
  }

  return [...variants];
}

function scoreDocVariant(query: string, doc: MesloDoc) {
  const q = normalize(query);
  const words = q
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !STOPWORDS.has(word));
  const highSignalWords = words.filter((word) => word.length >= 5);
  const phrase = phraseFromQuery(query);
  const smallBusinessQuery = isSmallBusinessQuery(query);

  const title = normalize(doc.title);
  const content = normalize(doc.content);
  const tags = doc.tags.map((tag) => normalize(tag));
  const smallbizTaggedDoc = hasTag(doc, 'smallbiz');

  if (highSignalWords.length > 0) {
    const matchedHighSignalCount = highSignalWords.filter(
      (word) => title.includes(word) || content.includes(word) || tags.some((tag) => tag.includes(word)),
    ).length;
    const requiredHighSignalMatches =
      smallBusinessQuery && smallbizTaggedDoc
        ? Math.max(1, Math.ceil(highSignalWords.length * 0.35))
        : Math.max(1, Math.ceil(highSignalWords.length * 0.6));

    if (matchedHighSignalCount < requiredHighSignalMatches) {
      return 0;
    }
  }

  let score = 0;

  if (phrase && title.includes(phrase)) score += 20;
  if (phrase && tags.some((tag) => tag.includes(phrase))) score += 12;
  if (phrase && content.includes(phrase)) score += 8;

  for (const word of words) {
    if (title.includes(word)) score += 7;
    if (content.includes(word)) score += 2;
    if (tags.some((tag) => tag.includes(word))) score += 6;
  }

  return score;
}

function scoreDoc(query: string, doc: MesloDoc) {
  const variants = splitQueryVariants(query);
  let best = 0;

  for (const variant of variants) {
    const score = scoreDocVariant(variant, doc);
    if (score > best) best = score;
  }

  return best;
}

type ImportedRecord = {
  id: string;
  title: string;
  text: string;
  metadata?: Record<string, string | number | null>;
};

let importedCache: MesloDoc[] | null = null;

const IMPORTED_EXCLUDE_PATTERNS = [
  /\bmecha\b/i,
  /mictlampa cihuatlampa/i,
  /aztlan del noroeste/i,
  /preparing one orlando lopez/i,
  /educate conference aftermath/i,
  /why mecha needs to podcast and livestream/i,
] as const;

function shouldExcludeImportedRecord(record: ImportedRecord) {
  const haystack = [
    record.id,
    record.title,
    record.text,
    String(record.metadata?.source_title ?? ''),
    String(record.metadata?.source_url ?? ''),
  ].join('\n');

  return IMPORTED_EXCLUDE_PATTERNS.some((pattern) => pattern.test(haystack));
}

async function loadImportedDocs(): Promise<MesloDoc[]> {
  if (importedCache) return importedCache;

  const filePath = path.join(process.cwd(), 'content', 'imported-blog', '_embedded.jsonl');
  let raw = '';

  try {
    raw = await fs.readFile(filePath, 'utf8');
  } catch {
    importedCache = [];
    return importedCache;
  }

  importedCache = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as ImportedRecord)
    .filter((record) => !shouldExcludeImportedRecord(record))
    .map((record) => ({
      id: `imported-blog/${record.id}`,
      title: record.title,
      tags: [
        'imported-blog',
        String(record.metadata?.topic ?? 'blog'),
        String(record.metadata?.content_type ?? 'blog-import'),
      ].filter(Boolean),
      content: record.text,
    }));

  return importedCache;
}

function scoreWithSourceWeight(query: string, doc: MesloDoc, source: 'core' | 'imported') {
  const base = scoreDoc(query, doc);
  if (base === 0) return 0;

  const definitionQuery = isDefinitionQuery(query);
  const mesloDomainQuery = isMesloDomainQuery(query);
  const operationsQuery = isOperationalSystemsQuery(query);
  const assistantMetaQuery = isAssistantMetaQuery(query);
  const smallBusinessQuery = isSmallBusinessQuery(query);
  const legalPolicyQuery = isLegalPolicyQuery(query);
  const governmentContractingQuery = isGovernmentContractingQuery(query);
  const collection = collectionOf(doc);

  const sourceBoost = source === 'core' ? (mesloDomainQuery ? 8 : 0) : mesloDomainQuery ? 0 : 4;
  const glossaryBoost = definitionQuery && collection === 'glossary' ? 40 : 0;
  const frameworkBoost = definitionQuery && collection === 'framework' ? 8 : 0;
  const mesloBoost = definitionQuery && collection === 'meslo' ? 6 : 0;
  const nonGlossaryDefinitionPenalty = definitionQuery && collection !== 'glossary' ? -4 : 0;
  const formulaNodeBoost = mesloDomainQuery && isPrimaryMesloFormulaDoc(doc) ? 28 : 0;
  const operationalNodeBoost = operationsQuery && isOperationalSystemsDoc(doc) ? 24 : 0;
  const glossaryAnchorBoost = (definitionQuery || mesloDomainQuery) && isGlossaryAnchorDoc(doc) ? 18 : 0;
  const assistantCollectionPenalty = !assistantMetaQuery && collection === 'assistant' ? -20 : 0;
  const assistantPromoPenalty = !assistantMetaQuery && isAssistantPromoDoc(doc) ? -30 : 0;
  const smallbizBoost =
    smallBusinessQuery && (collection === 'smallbiz' || (collection === 'knowledge' && hasTag(doc, 'smallbiz')))
      ? 26
      : 0;
  const policyPenalty = !legalPolicyQuery && isPolicyPageDoc(doc) ? -60 : 0;
  const govContractingPenalty = !governmentContractingQuery && collection === 'gov-contracting' ? -30 : 0;

  return (
    base +
    sourceBoost +
    glossaryBoost +
    frameworkBoost +
    mesloBoost +
    nonGlossaryDefinitionPenalty +
    formulaNodeBoost +
    operationalNodeBoost +
    glossaryAnchorBoost +
    assistantCollectionPenalty +
    assistantPromoPenalty +
    smallbizBoost +
    policyPenalty +
    govContractingPenalty
  );
}

export async function retrieveMesloContext(
  query: string,
  limit = 4,
  locale?: MesloLocale,
): Promise<MesloDoc[]> {
  const coreDocs = locale ? await getMesloDocsForLocale(locale) : await getMesloDocs();
  const importedDocs = await loadImportedDocs();

  const scoredCore = coreDocs
    .map((doc) => ({
      doc,
      score: scoreWithSourceWeight(query, doc, 'core'),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const scoredImported = importedDocs
    .map((doc) => ({
      doc,
      score: scoreWithSourceWeight(query, doc, 'imported'),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const mesloDomainQuery = isMesloDomainQuery(query);
  const selected: MesloDoc[] = [];
  const seen = new Set<string>();

  const combined = [
    ...scoredCore.map((item) => ({ ...item, source: 'core' as const })),
    ...scoredImported.map((item) => ({ ...item, source: 'imported' as const })),
  ].sort((a, b) => b.score - a.score);

  for (const item of combined) {
    if (selected.length >= limit) break;
    if (seen.has(item.doc.id)) continue;
    selected.push(item.doc);
    seen.add(item.doc.id);
  }

  // For MESLO-domain queries, ensure at least one core doc is present if available.
  if (mesloDomainQuery && selected.length > 0 && !selected.some((doc) => collectionOf(doc) !== 'imported-blog')) {
    const bestCore = scoredCore[0]?.doc;
    if (bestCore && !seen.has(bestCore.id)) {
      if (selected.length >= limit) selected.pop();
      selected.unshift(bestCore);
      seen.add(bestCore.id);
    }
  }

  if (selected.length > 0) return selected;
  return coreDocs.slice(0, Math.min(limit, coreDocs.length));
}
