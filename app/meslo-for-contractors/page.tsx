import type { Metadata } from 'next';
import Link from 'next/link';

const pageTitle = 'MESLO for Contractors | The Principles of MESLO';
const pageDescription =
  'Win work, understand your costs, protect your margins, and build a more sustainable contracting business with The Principles of MESLO.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/meslo-for-contractors',
  },
};

const openingQuestions = [
  {
    title: 'Pricing jobs with confidence',
    description: 'Are you struggling to estimate and price jobs accurately, competitively, and efficiently?',
  },
  {
    title: 'Knowing what a job really costs',
    description:
      'Have you ever won a contract only to discover that your actual costs exceeded your original estimate?',
  },
  {
    title: 'Making room to step away',
    description:
      'Does stepping away, scaling operations, or planning for retirement feel impossible because the business depends on you?',
  },
];

const practicalBenefits = [
  {
    title: 'Estimate and price with purpose',
    description:
      'Use MESLO, a practical framework to estimate and price jobs accurately, competitively, and efficiently.',
  },
  {
    title: 'Understand costs and protect margins',
    description:
      'Apply job costing to understand actual project costs, protect your margins, and manage cash flow.',
  },
  {
    title: 'Build systems that support growth',
    description:
      'Strengthen your back office and develop reliable operational systems that help your business depend less on you.',
  },
];

export default function MesloForContractorsPage() {
  return (
    <main className="bg-[#10283a]">
      <article className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-20">
        <header className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b7d63d]">
            MESLO for Contractors
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build a business that depends less on you.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#d2dce4]">
            A technical reference for estimating, pricing, job costing, and building a more
            profitable contracting business.
          </p>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-[#dce9f1] sm:text-2xl sm:leading-9">
            If stepping away, scaling, or planning for retirement feels impossible, it may be time
            to strengthen the systems behind your business—not just chase the next job.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#where-to-buy-heading"
              className="inline-flex min-h-12 items-center rounded-xl bg-[#b7d63d] px-5 py-3 font-semibold text-[#14212b] transition hover:bg-[#c8e64f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7d63d]"
            >
              Get The Principles of MESLO
            </Link>
            <a
              href="#practical-benefits"
              className="inline-flex min-h-12 items-center rounded-xl border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              See what you can put into practice
            </a>
          </div>
        </header>

        <section aria-labelledby="contractor-challenges" className="mt-16 lg:mt-20">
          <h2 id="contractor-challenges" className="text-2xl font-semibold text-white sm:text-3xl">
            The challenges behind the next job
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {openingQuestions.map((question) => (
              <div
                key={question.title}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
              >
                <h3 className="text-lg font-semibold text-white">{question.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#d2dce4]">{question.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="practical-benefits" className="mt-16 lg:mt-20">
          <h2 id="practical-benefits" className="scroll-mt-32 text-2xl font-semibold text-white sm:text-3xl">
            What you can put into practice
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-[#d2dce4]">
            Win the work, understand what it costs, and build the systems to make long-term success
            possible.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {practicalBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-white/10 bg-[#18384d] p-6"
              >
                <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#d2dce4]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="long-term-success" className="mt-16 max-w-4xl lg:mt-20">
          <h2 id="long-term-success" className="text-2xl font-semibold text-white sm:text-3xl">
            Build a successful contracting business beyond the next job
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#d2dce4]">
            Winning contracts is only part of the picture. Understanding your true costs, protecting
            your margins, managing cash flow, and developing reliable operational systems are what
            make long-term success possible.
          </p>
          <p className="mt-4 text-lg leading-8 text-[#d2dce4]">
            <em>The Principles of MESLO</em> introduces a practical framework for estimating,
            pricing, job costing, and building a stronger back office—helping you move toward a
            profitable, sustainable business.
          </p>
        </section>

        <section className="mt-16 rounded-3xl border border-[#b7d63d]/25 bg-[#b7d63d]/[0.07] p-6 sm:p-8 lg:mt-20 lg:p-10">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Stop guessing. Start estimating with purpose.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#d2dce4]">
            Explore <em>The Principles of MESLO</em> and take the next step toward more confident
            estimates, a stronger contracting business, and a clear path to succession or an exit
            with dignity.
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
