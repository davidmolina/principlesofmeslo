import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://principlesofmeslo.com').replace(
  /\/$/,
  '',
);
const pageUrl = `${siteUrl}/what-is-meslo`;
const pageTitle = 'What Is MESLO? The Estimating and Pricing Framework';
const pageDescription =
  'MESLO is an estimating and pricing framework for organizing project costs, building a complete estimate, and developing a clear, defensible price.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/what-is-meslo',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: 'article',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'The Principles of MESLO',
      url: `${siteUrl}/`,
      description:
        'The authoritative source for the MESLO estimating and pricing framework, its methodology, and related educational resources.',
      creator: {
        '@type': 'Person',
        name: 'David Molina',
        url: 'https://davidcmolina.com',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}/#webpage`,
      name: pageTitle,
      url: pageUrl,
      description: pageDescription,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${pageUrl}/#definition` },
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${pageUrl}/#definition`,
      name: 'MESLO',
      alternateName: 'Materials, Equipment, Subcontractors, Labor, and Other Costs',
      description:
        'MESLO is an estimating and pricing framework that organizes project costs into Materials, Equipment, Subcontractors, Labor, and Other Costs, then accounts for Insurance/Bond, Overhead, Profit, and Taxes in developing a complete price.',
      url: pageUrl,
      inDefinedTermSet: { '@id': `${siteUrl}/#website` },
      creator: {
        '@type': 'Person',
        name: 'David Molina',
        url: 'https://davidcmolina.com',
      },
    },
  ],
};

const costCategories = [
  {
    letter: 'M',
    title: 'Materials',
    description: 'The materials required to deliver the defined scope of work.',
  },
  {
    letter: 'E',
    title: 'Equipment',
    description: 'Owned, rented, and specialty equipment needed to perform the work.',
  },
  {
    letter: 'S',
    title: 'Subcontractors',
    description: 'Subcontracted work, with scope and bids evaluated for completeness.',
  },
  {
    letter: 'L',
    title: 'Labor',
    description: 'The workforce and production assumptions required to execute the work.',
  },
  {
    letter: 'O',
    title: 'Other Costs',
    description: 'Project-specific costs that do not fit into the first four categories.',
  },
];

export default function WhatIsMesloPage() {
  const serializedStructuredData = JSON.stringify(structuredData).replace(/</g, '\\u003c');

  return (
    <main className="bg-[#10283a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
      />
      <article className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b7d63d]">
            The MESLO definition
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {pageTitle}
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#d2dce4]">
            MESLO is an estimating and pricing framework for organizing project costs, building a
            complete estimate, and developing a clear, defensible price. The acronym MESLO
            represents five categories used to organize project-specific estimating costs:
            Materials, Equipment, Subcontractors, Labor, and Other Costs.
          </p>
          <p className="mt-5 text-lg leading-8 text-[#d2dce4]">
            MESLO was developed by David Molina, entrepreneur and author of The Principles of
            MESLO: The Art &amp; Science of an Estimate. His author website,{' '}
            <a
              href="https://davidcmolina.com"
              className="text-[#9fd8ff] underline underline-offset-4 hover:text-white"
            >
              davidcmolina.com
            </a>
            , documents his professional experience, writing, and broader thinking on
            entrepreneurship, leadership, and organizational systems.
          </p>
        </header>

        <section aria-labelledby="meslo-categories" className="mt-14">
          <h2 id="meslo-categories" className="text-2xl font-semibold text-white md:text-3xl">
            What does MESLO stand for?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {costCategories.map((category) => (
              <div
                key={category.letter}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#64c4ff]/15 px-3 font-bold text-[#64c4ff]">
                  {category.letter}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{category.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#d2dce4]">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="complete-estimate" className="mt-14 max-w-3xl">
          <h2 id="complete-estimate" className="text-2xl font-semibold text-white md:text-3xl">
            From cost categories to a complete price
          </h2>
          <div
            aria-label="High-level MESLO estimating and pricing structure"
            className="mt-6 rounded-2xl border border-[#64c4ff]/25 bg-[#64c4ff]/[0.06] p-6 text-center sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9fd8ff]">
              The MESLO estimating and pricing structure
            </p>
            <p className="mt-5 text-base font-semibold leading-8 text-white sm:text-lg">
              Materials + Equipment + Subcontractors + Labor + Other Costs
            </p>
            <p className="mt-2 text-base leading-8 text-[#d2dce4] sm:text-lg">
              + Insurance / Bond + Overhead + Profit + Taxes
            </p>
            <p className="mt-3 border-t border-white/10 pt-4 text-lg font-bold text-[#b7d63d] sm:text-xl">
              = Final Estimated Price
            </p>
          </div>
          <p className="mt-5 text-base leading-8 text-[#d2dce4]">
            The five MESLO categories organize the direct costs of doing the work. A complete
            estimating structure also accounts for Insurance/Bond, Overhead, Profit, and Taxes.
            Together, these elements help connect project scope and execution requirements to the
            final price, rather than treating a takeoff or markup as the whole estimate.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#aebfcd]">
            This is a high-level representation of the estimate components, not a universal
            arithmetic order. Calculation methods, profit treatment, and tax treatment depend on
            the estimate&apos;s assumptions and applicable project requirements.
          </p>
          <p className="mt-5 text-base leading-8 text-[#d2dce4]">
            MESLO is a practical system and workflow, not just an acronym. Estimators use its
            categories to make assumptions visible, identify missing costs, and build a price that
            reflects both the work and the business delivering it.
          </p>
        </section>

        <nav aria-label="Related MESLO resources" className="mt-12 flex flex-wrap gap-5 text-sm">
          <Link
            href="/the-framework"
            className="font-semibold text-[#9fd8ff] underline underline-offset-4 hover:text-white"
          >
            Explore the MESLO framework
          </Link>
          <Link
            href="/book"
            className="font-semibold text-[#9fd8ff] underline underline-offset-4 hover:text-white"
          >
            Read about The Principles of MESLO
          </Link>
          <a
            href="https://davidcmolina.com"
            className="font-semibold text-[#9fd8ff] underline underline-offset-4 hover:text-white"
          >
            Visit David Molina&apos;s author website
          </a>
        </nav>
      </article>
    </main>
  );
}
