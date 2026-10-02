import { notFound } from 'next/navigation';
import { getServicePage } from '@/lib/content';
import { RenderMarkdown } from '@/lib/render-markdown';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = await getServicePage(slug);

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
