export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-white">Resources</h1>
      <p className="mt-3 text-neutral-300">Lead magnets and implementation tools for MESLO readers.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a
          href="/resources/starter-toolkit"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
        >
          <div className="text-sm font-semibold text-white">MESLO Starter Toolkit</div>
          <div className="mt-2 text-sm leading-6 text-neutral-300">
            Source copy for the Bid Log, Master Takeoff Worksheet, Operations Handbook, and
            Business Plan templates.
          </div>
          <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Open toolkit source
          </div>
        </a>

        <a
          href="/resources/markup-vs-margin-calculator"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
        >
          <div className="text-sm font-semibold text-white">MESLO Markup vs Margin Calculator</div>
          <div className="mt-2 text-sm leading-6 text-neutral-300">
            Interactive calculator to convert markup and margin and sanity-check your bid price.
          </div>
          <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Open calculator
          </div>
        </a>

        <a
          href="/resources/community-support"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
        >
          <div className="text-sm font-semibold text-white">Community Support</div>
          <div className="mt-2 text-sm leading-6 text-neutral-300">
            Community organizations and agencies that help contractors find technical assistance and
            government contracting pathways.
          </div>
          <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Browse resources
          </div>
        </a>
      </div>
    </main>
  );
}
