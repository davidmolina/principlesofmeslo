import { promises as fs } from 'node:fs';
import path from 'node:path';

type BookSection = {
  key: string;
  label: string;
};

type BookNavItem = {
  slug: string;
  title: string;
};

const BOOK_SECTIONS: BookSection[] = [
  { key: 'front-matter', label: 'Front Matter' },
  { key: 'part-i-intro-meslo', label: 'Part I · Intro to MESLO' },
  { key: 'part-ii-meslo-formula', label: 'Part II · The MESLO Formula' },
  { key: 'part-iii-operationalizing-back-office', label: 'Part III · Operationalizing Your Back Office' },
  { key: 'closing', label: 'Closing' },
  { key: 'reference', label: 'Reference' },
];

async function readTitle(absPath: string) {
  const raw = await fs.readFile(absPath, 'utf8');
  const match = raw.match(/^title:\s*(.+)$/m);
  if (!match) return path.basename(absPath, '.mdx');
  return match[1].trim().replace(/^['"]|['"]$/g, '');
}

const SECTION_ITEM_ORDER: Record<string, string[]> = {
  'part-ii-meslo-formula': [
    'materials',
    'equipment',
    'subcontractors',
    'labor',
    'other-costs',
    'insurance-bond',
    'overhead-value-of-t',
    'profit-value-of-x',
    'taxes',
  ],
};

const SECTION_ITEM_FALLBACKS: Record<string, BookNavItem[]> = {
  'part-ii-meslo-formula': [{ slug: 'part-ii-meslo-formula/taxes', title: 'Taxes' }],
};

async function getBookNavigation() {
  const root = path.join(process.cwd(), 'content', 'book');

  return Promise.all(
    BOOK_SECTIONS.map(async (section) => {
      const dir = path.join(root, section.key);
      try {
        const entries = await fs.readdir(dir);
        const files = entries.filter((entry) => entry.endsWith('.mdx')).sort();
        const items = await Promise.all(
          files.map(async (file) => ({
            slug: `${section.key}/${file.replace(/\.mdx$/, '')}`,
            title: await readTitle(path.join(dir, file)),
          })),
        );
        const order = SECTION_ITEM_ORDER[section.key];
        const fallbackItems = SECTION_ITEM_FALLBACKS[section.key] ?? [];
        const orderedItems = order
          ? order
              .map((slugPart) => {
                return (
                  items.find((item) => item.slug === `${section.key}/${slugPart}`) ??
                  fallbackItems.find((item) => item.slug === `${section.key}/${slugPart}`) ??
                  null
                );
              })
              .filter((item): item is BookNavItem => item !== null)
          : items;
        const remainingItems = items.filter(
          (item) => !orderedItems.some((orderedItem) => orderedItem.slug === item.slug),
        );
        return { ...section, items: [...orderedItems, ...remainingItems] };
      } catch {
        return { ...section, items: [] };
      }
    }),
  );
}

export default async function BookPage() {
  const sections = await getBookNavigation();

  return (
    <main className="bg-[#0f2432]">
      <section className="border-t border-white/10 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b7d63d]">
              Living Book Architecture
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              The book now lives as a structured MDX collection.
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[#d2dce4]">
              The Principles of MESLO is organized under `content/book` as top-level sections, not
              just isolated chapters. That structure now mirrors the book itself: `front-matter`,
              `part-i-intro-meslo`, `part-ii-meslo-formula`,
              `part-iii-operationalizing-back-office`, `closing`, and `reference`.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <h2 className="text-lg font-semibold text-white">Book Navigation</h2>
              <div className="mt-6 space-y-6">
                {sections.map((section) => (
                  <section key={section.key}>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#64c4ff]">
                      {section.label}
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-[#d2dce4]">
                      {section.items.map((item) => (
                        <li key={item.slug}>• {item.title}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="text-lg font-semibold text-white">Primary Knowledge Nodes</h2>
                <p className="mt-4 text-sm leading-7 text-[#d2dce4]">
                  Part II chapters are now first-class retrieval nodes for the assistant:
                  Materials, Equipment, Subcontractors, Labor, Other Costs, Insurance/Bond,
                  Overhead and the Value of t, and Profit and the Value of x.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="text-lg font-semibold text-white">Operational Systems</h2>
                <p className="mt-4 text-sm leading-7 text-[#d2dce4]">
                  Part III chapters are the business architecture layer: Strategy and the Internet
                  Pipes, Operations and Permanent Delegation, and Tactical and Safety Briefing.
                  These connect directly to the broader small-business knowledge library.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="text-lg font-semibold text-white">Glossary + Reference</h2>
                <p className="mt-4 text-sm leading-7 text-[#d2dce4]">
                  The glossary and reference layer anchors direct assistant answers for terms like
                  markup vs margin, master takeoff, scope leveling, and bid log.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
