import { notFound } from 'next/navigation';
import { getMdxCollectionPage, listMdxCollectionSlugs } from '@/lib/content';
import { RenderMarkdown } from '@/lib/render-markdown';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await listMdxCollectionSlugs('articles');
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getMdxCollectionPage('articles', slug);

  if (!doc) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white">{doc.title || slug}</h1>
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <RenderMarkdown content={doc.body} />
      </section>
    </main>
  );
}
