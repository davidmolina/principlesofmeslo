import { notFound } from 'next/navigation';
import { getRootPage } from '@/lib/content';
import { RenderMarkdown } from '@/lib/render-markdown';

type Props = {
  params: Promise<{ slug: string }>;
};

const allowed = new Set([
  'about',
  'privacy-policy',
  'terms-of-service',
  'cookie-usage',
  'fraud-warning',
]);

export default async function RootMarkdownPage({ params }: Props) {
  const { slug } = await params;
  if (!allowed.has(slug)) {
    notFound();
  }

  const page = await getRootPage(slug);
  if (!page) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white">{page.title || slug}</h1>
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <RenderMarkdown content={page.body} />
      </section>
    </main>
  );
}
