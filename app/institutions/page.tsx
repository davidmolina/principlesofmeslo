import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MESLO for Institutions',
  description:
    'Institutional adoption information for colleges, workforce programs, entrepreneurship programs, technical assistance organizations, and libraries.',
};

const audiences = [
  'Colleges and continuing education programs',
  'Workforce and apprenticeship programs',
  'Entrepreneurship and small-business programs',
  'Technical assistance organizations',
  'Libraries and community learning organizations',
];

const adoptionUses = [
  'Estimating, pricing, and cost-structure workshops',
  'Small-business owner training cohorts',
  'Construction business readiness programs',
  'Mentorship programs for contractors and estimators',
  'Library or community education collections',
];

export default function InstitutionsPage() {
  return (
    <main className="bg-[#0f2432] text-[#ecf3f8]">
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[minmax(0,1fr)_360px] md:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#64c4ff]">
              Institutional adoption
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Teach, deploy, or adopt MESLO in your organization.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c6d4dd]">
              This page is for organizations evaluating MESLO as a framework for estimating,
              pricing discipline, operational clarity, and contractor development.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-[#b7d63d] px-5 py-3 text-sm font-bold text-[#0f2432] transition hover:bg-[#caea4f]"
              >
                Discuss Adoption
              </Link>
              <Link
                href="/library"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Library Request Page
              </Link>
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
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-white">Who This Is For</h2>
            <div className="mt-5 grid gap-3">
              {audiences.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">How Programs Can Use MESLO</h2>
            <div className="mt-5 grid gap-3">
              {adoptionUses.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f2432]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8eb8d5]">
                Path
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Program adoption</h2>
            </div>
            <p className="text-base leading-7 text-[#c6d4dd] md:col-span-2">
              Use this page when the conversation is larger than one patron request: curriculum,
              training delivery, organizational deployment, program partnerships, or technical
              assistance. Individual library purchase requests should go through the public library
              page, where readers can share public proof with #principlesofmeslo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
