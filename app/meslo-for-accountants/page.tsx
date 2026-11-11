import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MESLO for Accountants | The Principles of MESLO',
  description:
    'Help your clients understand their costs and strengthen their businesses with The Principles of MESLO.',
  alternates: {
    canonical: '/meslo-for-accountants',
  },
};

const openingQuestions = [
  'Do you have clients who struggle to distinguish direct costs, indirect costs, and general and administrative (G&A) expenses—and understand how those costs affect profitability?',
  'Are your clients generating more revenue but struggling to translate that growth into stronger margins, predictable cash flow, and lasting financial stability?',
  'Do you work with business owners who are so consumed by day-to-day operations that they struggle to build the systems, teams, and financial discipline needed to work on the business rather than in it?',
];

export default function MesloForAccountantsPage() {
  return (
    <main className="bg-[#10283a]">
      <article className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-20">
        <header className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b7d63d]">
            MESLO for Accountants
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Help your clients understand their costs. Strengthen their businesses.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#d2dce4]">
            A technical reference for pricing, cost management, and profitability across service-
            and product-based businesses.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#where-to-buy-heading"
              className="inline-flex min-h-12 items-center rounded-xl bg-[#b7d63d] px-5 py-3 font-semibold text-[#14212b] transition hover:bg-[#c8e64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7d63d]"
            >
              Get The Principles of MESLO
            </Link>
            <a
              href="#client-financial-decisions"
              className="inline-flex min-h-12 items-center rounded-xl border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              See what you can put into practice
            </a>
          </div>
        </header>

        <section aria-labelledby="client-challenges" className="mt-16 lg:mt-20">
          <h2 id="client-challenges" className="text-2xl font-semibold text-white sm:text-3xl">
            The challenges behind your clients&apos; numbers
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

        <section aria-labelledby="client-financial-decisions" className="mt-16 max-w-4xl lg:mt-20">
          <h2 id="client-financial-decisions" className="scroll-mt-32 text-2xl font-semibold text-white sm:text-3xl">
            Connect the numbers to everyday decisions
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#d2dce4]">
            Accountants and financial advisers see the numbers. But many business owners need a
            practical way to connect those numbers to everyday pricing, estimating, and operational
            decisions.
          </p>
          <p className="mt-4 text-lg leading-8 text-[#d2dce4]">
            <em>The Principles of MESLO</em> provides a framework for understanding cost structures,
            developing financially sound prices, monitoring job profitability, and strengthening
            the business systems that support sustainable growth.
          </p>
          <p className="mt-4 text-lg leading-8 text-[#d2dce4]">
            MESLO can complement the work of CPAs, bookkeepers, controllers, and business advisers
            by helping their clients understand the financial decisions behind the numbers.
          </p>
        </section>

        <section className="mt-16 rounded-3xl border border-[#b7d63d]/25 bg-[#b7d63d]/[0.07] p-6 sm:p-8 lg:mt-20 lg:p-10">
          <p className="max-w-3xl text-lg leading-8 text-white">
            <strong className="font-semibold">
              Better-informed business owners make better financial decisions.
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
