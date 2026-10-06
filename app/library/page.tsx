import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bring The Principles of MESLO to Your Library',
  description:
    'Request The Principles of MESLO at your local library with book metadata and copy-paste request language.',
};

const bookMetadata = [
  ['Title', 'The Principles of MESLO'],
  ['Author', 'David Molina'],
  ['Publisher', 'Luminare Press'],
  ['ISBN', '979-8-90071-170-6'],
  ['Paperback ASIN', 'B0HLMLCSYQ'],
  ['Kindle ASIN', 'B0HLMW7HLX'],
];

const requestCopy = `Hello,

I would like to request that the library add The Principles of MESLO by David Molina to the collection.

This book is a practical guide to construction estimating, operational clarity, and pricing discipline for contractors, estimators, small-business owners, and workforce learners.

Book details:
Title: The Principles of MESLO
Author: David Molina
Publisher: Luminare Press
ISBN: 979-8-90071-170-6
Paperback ASIN: B0HLMLCSYQ
Kindle ASIN: B0HLMW7HLX

Thank you for considering this request.`;

export default function LibraryPage() {
  return (
    <main className="bg-[#0f2432] text-[#ecf3f8]">
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[minmax(0,1fr)_360px] md:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b7d63d]">
              Library request
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Bring <span className="italic">The Principles of MESLO</span> to your local library.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c6d4dd]">
              This page is for readers, contractors, students, and community members who want their
              local library to carry MESLO. Find your library, send the request, and help make the
              requests visible with <span className="font-semibold text-white">#principlesofmeslo</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.worldcat.org/libraries"
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-xl bg-[#b7d63d] px-5 py-3 text-sm font-bold text-[#0f2432] transition hover:bg-[#caea4f]"
              >
                Find My Library
              </a>
              <a
                href="#request-copy"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Copy Request Language
              </a>
              <a
                href="#share"
                className="rounded-xl border border-[#64c4ff]/35 bg-[#64c4ff]/10 px-5 py-3 text-sm font-semibold text-[#dff3ff] transition hover:bg-[#64c4ff]/15"
              >
                Share #principlesofmeslo
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src="/meslo-book-angled.png"
              alt="The Principles of MESLO angled book cover"
              width={420}
              height={650}
              className="h-auto max-h-[460px] w-auto object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.42)]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#102b3d]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-white">Book Metadata</h2>
            <p className="mt-3 text-[#c6d4dd]">
              Use these details in your library purchase request. They match the publisher metadata
              shown on the book jacket.
            </p>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {bookMetadata.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8eb8d5]">
                  {label}
                </dt>
                <dd className="mt-2 text-base font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="request-copy" className="border-b border-white/10 bg-[#0f2432]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-white">Copy-Paste Request</h2>
            <p className="mt-3 text-[#c6d4dd]">
              Paste this into your library&apos;s purchase suggestion form or email it to your local
              branch.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#071620]">
            <pre className="whitespace-pre-wrap p-5 text-sm leading-6 text-[#d7e6f2]">
              {requestCopy}
            </pre>
          </div>
        </div>
      </section>

      <section id="share" className="bg-[#102b3d]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b7d63d]">
              Requested MESLO?
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Share it.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#c6d4dd]">
              After submitting your library request, take a screenshot of the confirmation and share
              it on Instagram or Facebook with{' '}
              <span className="font-semibold text-white">#principlesofmeslo</span>.
            </p>
            <p className="mt-3 text-base leading-7 text-[#c6d4dd]">
              Help us see where <span className="italic">The Principles of MESLO</span> is being
              requested across the country.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <a
              href="https://www.instagram.com/explore/tags/principlesofmeslo/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex w-full justify-center rounded-xl bg-[#b7d63d] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#0f2432] transition hover:bg-[#caea4f] sm:w-auto"
            >
              Share #principlesofmeslo
            </a>
            <div className="mt-5 rounded-lg border border-[#64c4ff]/25 bg-[#64c4ff]/10 p-4">
              <p className="text-sm font-semibold text-[#dff3ff]">Privacy note</p>
              <p className="mt-2 text-sm leading-6 text-[#c6d4dd]">
                Before posting, crop or cover your library card number, email address, address, or
                other personal information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#102b3d]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Working with a school or program?</h2>
            <p className="mt-2 text-[#c6d4dd]">
              Adoption by colleges, workforce programs, and technical assistance organizations lives
              on the institutions page.
            </p>
          </div>
          <Link
            href="/institutions"
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Go to Institutions
          </Link>
        </div>
      </section>
    </main>
  );
}
