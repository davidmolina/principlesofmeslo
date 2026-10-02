import Image from 'next/image';
import LandingHeader from '@/components/LandingHeader';

export default function MesloHomepagePrototype() {
  const amazonUrl = 'https://www.amazon.com/dp/B0HLMLCSYQ';
  const kindleUrl =
    'https://www.amazon.com/Principles-MESLO-Science-Estimate-Book-ebook/dp/B0HLMW7HLX/ref=tmm_kin_swatch_0';

  const purchaseCards = [
    {
      format: 'PAPERBACK',
      label: 'Paperback',
      detail: '$24.95 · Amazon',
      cta: 'Buy Paperback →',
      href: amazonUrl,
      primary: true,
      icon: 'book',
    },
    {
      format: 'KINDLE EBOOK',
      label: 'Kindle eBook',
      detail: '$9.99 · Amazon',
      cta: 'Read on Kindle →',
      href: kindleUrl,
      primary: false,
      icon: 'reader',
    },
  ];

  return (
    <div className="bg-[#0f2432] text-neutral-100">
      <LandingHeader />

      <main>
        <section className="relative min-h-[calc(100svh-73px)] overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,214,61,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(100,196,255,0.15),transparent_30%)]" />
          <div className="mx-auto grid min-h-[calc(100svh-73px)] max-w-7xl gap-8 px-6 py-8 md:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.9fr)] md:items-center md:py-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,1fr)] lg:gap-12 lg:px-8 xl:gap-14">
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] text-neutral-300">
                Product Pricing Strategy • Service Pricing Strategy
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-[3.35rem] xl:text-[3.75rem]">
                Construction estimating, operational clarity, and{' '}
                <span className="text-[#b7d63d]">Principles of MESLO</span>.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-7 text-[#d6e2ea] md:text-xl">
                The Principles of MESLO is available now.
              </p>
              <p className="mt-2 max-w-2xl text-base leading-6 text-[#c6d4dd] md:text-lg md:leading-7">
                From mentorship and modern estimating to pricing strategy and back-office systems,
                MESLO is a practical framework for knowing your number and building a business that
                can operate beyond the owner.
              </p>

              <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
                {purchaseCards.map((card) => (
                  <a
                    key={card.format}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      card.primary
                        ? 'group flex items-center justify-between gap-3 rounded-2xl border border-[#b7d63d]/70 bg-[#b7d63d] p-3.5 text-[#0f2432] shadow-xl shadow-[#b7d63d]/10 transition hover:-translate-y-0.5 hover:bg-[#caea4f]'
                        : 'group flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-3.5 text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-[#64c4ff]/50 hover:bg-white/[0.09]'
                    }
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={
                          card.primary
                            ? 'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0f2432]/10 text-[#0f2432]'
                            : 'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#64c4ff]/15 text-[#64c4ff]'
                        }
                      >
                        {card.icon === 'book' ? <BookIcon /> : <ReaderIcon />}
                      </span>
                      <div>
                        <h2 className="text-base font-semibold leading-5 sm:text-lg">{card.label}</h2>
                        <p
                          className={
                            card.primary
                              ? 'mt-1 text-sm font-medium text-[#263719]'
                              : 'mt-1 text-sm font-medium text-[#c6d4dd]'
                          }
                        >
                          {card.detail}
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        card.primary
                          ? 'shrink-0 text-sm font-bold leading-5 text-[#0f2432]'
                          : 'shrink-0 text-sm font-bold leading-5 text-white'
                      }
                    >
                      {card.cta}
                    </div>
                  </a>
                ))}
              </div>

            </div>

            <div className="relative z-10 flex items-center justify-center md:min-h-[520px] lg:min-h-[620px]">
              <div className="relative flex h-full w-full items-center justify-center">
                <div className="absolute -inset-8 rounded-[2rem] bg-[#64c4ff]/15 blur-3xl" />
                <Image
                  src="/meslo-book-angled.png"
                  alt="The Principles of MESLO angled book cover"
                  width={900}
                  height={1400}
                  priority
                  className="relative h-auto max-h-[520px] w-auto max-w-full object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.5)] md:max-h-[min(68svh,620px)] lg:max-h-[min(74svh,700px)]"
                />
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

function BookIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
      <path d="M8 6h8" />
    </svg>
  );
}

function ReaderIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect height="18" rx="2" width="14" x="5" y="3" />
      <path d="M9 7h6" />
      <path d="M9 11h6" />
      <path d="M9 15h4" />
      <path d="M12 19h.01" />
    </svg>
  );
}
