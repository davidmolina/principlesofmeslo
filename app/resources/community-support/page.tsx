import Link from 'next/link';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export default async function CommunitySupportIndexPage() {
  const dir = path.join(process.cwd(), 'content', 'resources', 'community-support');
  let slugs: string[] = [];

  try {
    const entries = await fs.readdir(dir);
    slugs = entries
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => name.replace(/\.mdx$/, ''))
      .sort();
  } catch {
    slugs = [];
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white">Community Support</h1>
      <p className="mt-3 text-neutral-300">
        Community-based organizations and agencies that help contractors find technical assistance,
        training, capital readiness, and government contracting pathways.
      </p>

      <div className="mt-10 grid gap-3 md:grid-cols-2">
        {slugs.map((slug) => (
          <Link
            key={slug}
            href={`/resources/community-support/${slug}`}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-200 hover:bg-white/10"
          >
            {slug.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </main>
  );
}

