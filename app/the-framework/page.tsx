const meslo = [
  {
    letter: 'M',
    title: 'Material',
    desc: 'Quantify scope clearly, reduce misses, and build defensible takeoffs.',
  },
  {
    letter: 'E',
    title: 'Equipment',
    desc: 'Capture owned, rented, and specialty equipment with operational realism.',
  },
  {
    letter: 'S',
    title: 'Subcontractors',
    desc: 'Level scope, compare bids intelligently, and avoid hidden carry gaps.',
  },
  {
    letter: 'L',
    title: 'Labor',
    desc: 'Tie production, crew logic, and execution assumptions back to the estimate.',
  },
  {
    letter: 'O',
    title: 'Other Costs',
    desc: 'Capture ancillary, temporary, and project-specific costs that do not belong in the first four buckets.',
  },
  {
    letter: 'I/B',
    title: 'Insurance/Bond',
    desc: 'Price the coverage and surety requirements that protect the project and qualify the bid.',
  },
  {
    letter: 'OH',
    title: 'Overhead',
    desc: 'Protect margin by pricing the business system behind the work, not just the field.',
  },
  {
    letter: 'P',
    title: 'Profit',
    desc: 'Set a deliberate return for risk, capability, and long-term business sustainability.',
  },
  {
    letter: 'T',
    title: 'Taxes',
    desc: 'Account for tax exposure clearly so the final bid price remains accurate and defensible.',
  },
];

export default function TheFrameworkPage() {
  return (
    <main className="bg-[#10283a]">
      <section className="border-t border-white/10 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b7d63d]">
              The framework
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              A practical system for estimating and execution discipline.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#d2dce4]">
              Millions of small business owners struggle to structure, estimate, and scale their
              companies. MESLO helps you reduce noise, improve estimating efficiency, and move into
              operational execution with confidence.
            </p>
            <p className="mt-5 text-lg leading-8 text-[#d2dce4]">
              MESLO stands for Material, Equipment, Subcontractors, Labor, and Other Costs.
              The full estimating structure also includes Insurance/Bond, Overhead, Profit,
              and Taxes so the bid reflects both execution requirements and business reality.
            </p>
            <p className="mt-5 text-lg leading-8 text-[#d2dce4]">
              MESLO is more than a formula. It is a system, process, and workflow that
              helps increase or decrease markups based on the situation, producing a
              definite price per linear foot, square foot, or cubic yard without compromise.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {meslo.map((item) => (
              <div
                key={item.letter}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                <div className="flex h-12 min-w-12 items-center justify-center rounded-2xl bg-[#64c4ff]/20 px-3 text-lg font-bold text-[#64c4ff] ring-1 ring-[#64c4ff]/30">
                  {item.letter}
                </div>
                <h2 className="mt-5 text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#d2dce4]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
