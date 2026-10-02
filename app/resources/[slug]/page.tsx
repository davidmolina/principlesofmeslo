import { promises as fs } from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import MarkupMarginCalculator from '@/components/calculators/MarkupMarginCalculator';

function safeSlug(input: string) {
  return input.replace(/[^a-z0-9-]/gi, '');
}

const mdxComponents = {
  MarkupMarginCalculator,
  a: (props: React.ComponentProps<'a'>) => (
    <a {...props} className="text-[#64c4ff] underline-offset-2 hover:underline" />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p {...props} className="whitespace-pre-wrap text-sm leading-7 text-neutral-300" />
  ),
  h1: (props: React.ComponentProps<'h1'>) => (
    <h1 {...props} className="text-4xl font-semibold tracking-tight text-white" />
  ),
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 {...props} className="text-2xl font-semibold text-white" />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 {...props} className="text-xl font-semibold text-white" />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul {...props} className="list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-300" />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol {...props} className="list-decimal space-y-2 pl-5 text-sm leading-7 text-neutral-300" />
  ),
  li: (props: React.ComponentProps<'li'>) => <li {...props} />,
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      {...props}
      className="border-l-2 border-amber-400/40 bg-white/5 pl-4 text-sm leading-7 text-neutral-200"
    />
  ),
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong {...props} className="font-semibold text-white" />
  ),
  code: (props: React.ComponentProps<'code'>) => (
    <code
      {...props}
      className="rounded-md border border-white/10 bg-neutral-950/40 px-1.5 py-0.5 font-mono text-[0.85em] text-neutral-200"
    />
  ),
  hr: (props: React.ComponentProps<'hr'>) => <hr {...props} className="border-white/10" />,
};

export async function generateStaticParams() {
  // Keep small and explicit for now: static generation for the calculator only.
  return [{ slug: 'markup-vs-margin-calculator' }];
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const safe = safeSlug(slug);
  if (!safe) notFound();

  const file = path.join(process.cwd(), 'content', 'resources', `${safe}.mdx`);
  let raw = '';
  try {
    raw = await fs.readFile(file, 'utf8');
  } catch {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<{
    title?: string;
    description?: string;
    tags?: string[];
  }>({
    source: raw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-neutral-400">
          <Link href="/resources" className="hover:text-white">
            Resources
          </Link>
          <span className="px-2">/</span>
          <span className="text-neutral-300">{safe}</span>
        </div>
      </div>

      {frontmatter?.description ? (
        <p className="mt-4 text-lg leading-8 text-neutral-300">{frontmatter.description}</p>
      ) : null}

      <section className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        {content}
      </section>
    </main>
  );
}

