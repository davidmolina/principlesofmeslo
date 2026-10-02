import { notFound } from 'next/navigation';
import { getMarkdownByRelativePath } from '@/lib/all-markdown';
import { RenderMarkdown } from '@/lib/render-markdown';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function MarkdownDocPage({ params }: Props) {
  const { slug } = await params;
  const decoded = slug.map(decodeURIComponent).join('/');
  const relative = `${decoded}.md`;
  const doc = await getMarkdownByRelativePath(relative);

  if (!doc) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">{relative}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">{doc.title || decoded}</h1>
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <RenderMarkdown content={doc.body} />
      </section>
    </main>
  );
}
