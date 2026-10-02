import Link from 'next/link';
import { listAllMarkdownFiles } from '@/lib/all-markdown';

export default async function MarkdownIndexPage() {
  const files = await listAllMarkdownFiles();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white">All Markdown Content</h1>
      <p className="mt-3 text-neutral-300">All project markdown content rendered via Next.js routes.</p>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {files.map((file) => {
          const slug = file.replace(/\.md$/, '').split('/').map(encodeURIComponent).join('/');
          return (
            <Link
              key={file}
              href={`/md/${slug}`}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-200 hover:bg-white/10"
            >
              {file}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
