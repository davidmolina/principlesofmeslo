import Link from 'next/link';
import { getMdxCollectionPage, listMdxCollectionSlugs } from '@/lib/content';

export default async function ArticlesPage() {
  const slugs = await listMdxCollectionSlugs('articles');
  const articles = await Promise.all(
    slugs.map(async (slug) => ({
      slug,
      doc: await getMdxCollectionPage('articles', slug),
    })),
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white">Articles</h1>
      <p className="mt-3 text-neutral-300">
        Practical insights from MESLO framework principles, estimating systems, and operations.
      </p>
      <div className="mt-8 grid gap-4">
        {articles.map(({ slug, doc }) => (
          <Link
            key={slug}
            href={`/articles/${slug}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold text-white">{doc?.title ?? slug}</h2>
            <p className="mt-2 text-sm text-neutral-300">
              {(doc?.body ?? '').slice(0, 160).trim() || 'Read article'}...
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
