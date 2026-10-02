import Link from 'next/link';

const sections = [
  {
    title: 'Definition',
    body:
      'The Master Takeoff is the central estimating document for a project. It brings quantities, scope assumptions, pricing logic, and execution notes into one working source of truth.',
  },
  {
    title: 'What It Organizes',
    body:
      'A disciplined Master Takeoff should support Material, Equipment, Subcontractors, Labor, Other Costs, Insurance/Bond, Overhead, Profit, and Taxes so the full MESLO formula can be reviewed in one place.',
  },
  {
    title: 'Why It Matters',
    body:
      'Without a clean takeoff, pricing becomes fragmented. A strong Master Takeoff reduces missed scope, exposes assumptions early, and improves the handoff from estimating to operations.',
  },
];

const relatedLinks = [
  { href: '/book', label: 'Book navigation' },
  { href: '/articles/master-takeoff-method', label: 'Article: Master Takeoff Method' },
  { href: '/resources/starter-toolkit', label: 'MESLO Starter Toolkit' },
  { href: '/assistant?q=What goes into the Master Takeoff?', label: 'Ask the assistant' },
];

export default function MasterTakeoffPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b7d63d]">
          Core MESLO Concept
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white">
          Master Takeoff
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#d2dce4]">
          The Master Takeoff is now treated as a first-class MESLO concept page so it can anchor
          the book, assistant, glossary, and article system from one stable route.
        </p>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#d2dce4]">{section.body}</p>
            </article>
          ))}
        </div>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-lg font-semibold text-white">Related Sources</h2>
          <div className="mt-4 grid gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-white/10 bg-[#0a1e2a]/80 px-4 py-3 text-sm text-[#d2dce4] transition hover:border-white/20 hover:bg-[#102839]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
