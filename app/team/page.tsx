import Link from 'next/link';
import { listCollectionSlugs } from '@/lib/content';

export default async function TeamPage() {
  const slugs = await listCollectionSlugs('team');

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white">Team</h1>
      <p className="mt-3 text-neutral-300">Team pages loaded from the Next.js content directory.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {slugs.map((slug) => (
          <Link
            key={slug}
            href={`/team/${slug}`}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 transition hover:bg-white/10"
          >
            {slug.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </main>
  );
}
