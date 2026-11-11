import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MESLO for Retail | The Principles of MESLO',
  description:
    'A technical reference for pricing and building a more profitable brick-and-mortar business.',
  alternates: {
    canonical: '/meslo-for-retail',
  },
};

const openingQuestions = [
  'Are you struggling to stay in the black throughout the year, even when sales appear strong?',
  'Do you know whether your product prices adequately cover inventory, labor, operating expenses, and the profit your business needs to grow?',
  "Are you spending so much time managing daily operations that you can't step away, expand, or enjoy the business you've worked so hard to build?",
];

export default function MesloForRetailPage() {
  return (
    <main className="bg-[#10283a]">
      <article className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-20">
        <header className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b7d63d]">
            MESLO for Retail
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            More sales should mean more profit.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#d2dce4]">
            A technical reference for pricing and building a more profitable brick-and-mortar
            business.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#where-to-buy-heading"
              className="inline-flex min-h-12 items-center rounded-xl bg-[#b7d63d] px-5 py-3 font-semibold text-[#14212b] transition hover:bg-[#c8e64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7d63d]"
            >
              Get The Principles of MESLO
            </Link>
            <a
              href="#retail-profitability"
              className="inline-flex min-h-12 items-center rounded-xl border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              See what you can put into practice
            </a>
          </div>
        </header>

        <section aria-labelledby="retail-challenges" className="mt-16 lg:mt-20">
          <h2 id="retail-challenges" className="text-2xl font-semibold text-white sm:text-3xl">
            The challenges behind strong sales
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {openingQuestions.map((question) => (
              <div
                key={question}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
              >
                <p className="text-lg leading-8 text-white">
                  <strong className="font-semibold">{question}</strong>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="retail-profitability" className="mt-16 max-w-4xl lg:mt-20">
          <h2
            id="retail-profitability"
            className="scroll-mt-32 text-2xl font-semibold text-white sm:text-3xl"
          >
            Build profitability into your pricing
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#d2dce4]">
            Increasing sales doesn&apos;t automatically increase profitability. Retail businesses
            need to understand the true cost of the products they sell, the expenses required to
            operate, and the margins necessary to remain financially healthy.
          </p>
          <p className="mt-4 text-lg leading-8 text-[#d2dce4]">
            <em>The Principles of MESLO</em> provides a cost-based framework that can be adapted
            to product pricing, expense management, and operational decision-making.
          </p>
        </section>

        <section className="mt-16 rounded-3xl border border-[#b7d63d]/25 bg-[#b7d63d]/[0.07] p-6 sm:p-8 lg:mt-20 lg:p-10">
          <p className="max-w-3xl text-lg leading-8 text-[#d2dce4]">
            Because building a successful retail business isn&apos;t just about selling more.{' '}
            <strong className="font-semibold text-white">
              It&apos;s about keeping more of what you earn and building something that lasts.
            </strong>
          </p>
          <Link
            href="/#where-to-buy-heading"
            className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-[#b7d63d] px-5 py-3 font-semibold text-[#14212b] transition hover:bg-[#c8e64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7d63d]"
          >
            Get The Principles of MESLO
          </Link>
        </section>
      </article>
    </main>
  );
}
