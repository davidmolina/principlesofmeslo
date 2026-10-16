import Image from 'next/image';
import Link from 'next/link';
import LandingHeader from '@/components/LandingHeader';

export default function MesloHomepagePrototype() {
  const amazonUrl =
    'https://www.amazon.com/Principles-MESLO-Art-Science-Estimate/dp/B0HLMLCSYQ/ref=sr_1_1?crid=2Z7UYG16I6TQK&dib=eyJ2IjoiMSJ9.gMHYh-gaUhHUVzDcWoQVhbTPlgMlTv--jvMckL8H1gcJW0kxhVozCP37_9eWbcnzuGPBF7qGvPbAxHIZLiT_nLESbJ4KIyoQaHTiwpb35Fsx0iGjeyZp6yQRPl23Q1gc---1nDSQma5Ejda6ay3nsLOCmTT0UO-4N9gmgoriEcrXZ0N633YzCFB6iB6fEKtjDllg27yt7zy9GPiH5hNDMziGSFymRZweiOT8F7D_M8o.loU3xR8mvN982uz1v4dRUG3A6naD2Vp94HpZIQYW5EQ&dib_tag=se&keywords=The+Principles+of+MESLO&qid=1791176104&sprefix=the+principles+of+meslo%2Caps%2C199&sr=8-1';
  const kindleUrl =
    'https://www.amazon.com/Principles-MESLO-Science-Estimate-Book-ebook/dp/B0HLMW7HLX/ref=tmm_kin_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.gMHYh-gaUhHUVzDcWoQVhbTPlgMlTv--jvMckL8H1gcJW0kxhVozCP37_9eWbcnzuGPBF7qGvPbAxHIZLiT_nLESbJ4KIyoQaHTiwpb35Fsx0iGjeyZp6yQRPl23Q1gc---1nDSQma5Ejda6ay3nsLOCmTT0UO-4N9gmgoriEcrXZ0N633YzCFB6iB6fEKtjDllg27yt7zy9GPiH5hNDMziGSFymRZweiOT8F7D_M8o.loU3xR8mvN982uz1v4dRUG3A6naD2Vp94HpZIQYW5EQ&qid=1791176104&sr=8-1';
  const spotifyAudiobookUrl =
    'https://open.spotify.com/show/1jAWxtaNc0Mb3526y5lF8k?si=c43b07b167c44bd0';
  const audibleAudiobookUrl = 'https://www.amazon.com/dp/B0HMY63TP2';
  const prefaceAudioUrl =
    'https://davidmolina.s3.us-west-2.amazonaws.com/005+-+Preface+-+The+Principles+of+MESLO.mp3';
  const barnesNobleHardcoverUrl =
    'https://www.barnesandnoble.com/w/the-principles-of-meslo-david-molina/1151585871?ean=9798900711706';

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

              <div className="mt-8 max-w-xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#b7d63d]">
                  Free Audio Preview
                </p>
                <h2 id="preface-heading" className="text-2xl font-bold text-white">
                  Listen to the Preface
                </h2>
                <p className="mt-3 text-base leading-7 text-[#d2dce4]">
                  Discover the story that inspired <em>The Principles of MESLO</em>, narrated by
                  author David Molina.
                </p>
                <p className="mt-3 mb-3 text-sm text-[#a9bfd1]">
                  6-minute preview · No signup required
                </p>
                <audio
                  controls
                  preload="metadata"
                  className="w-full"
                  aria-label="The Principles of MESLO audiobook preface"
                >
                  <source src={prefaceAudioUrl} type="audio/mpeg" />
                  Your browser does not support audio playback.
                </audio>
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

        <section
          aria-labelledby="where-to-buy-heading"
          className="border-b border-white/10 bg-[#0d1f2d] px-6 py-16 lg:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="where-to-buy-heading"
              className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-[#b7d63d]"
            >
              Where to Buy
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buy The Principles of MESLO paperback on Amazon"
                className="group flex h-20 w-full max-w-[260px] items-center justify-center rounded-lg border border-white/15 bg-white px-5 text-[#111820] shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-[#ff9900]/80 hover:bg-[#fffaf0]"
              >
                <AmazonLogo />
              </a>
              <a
                href={kindleUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buy The Principles of MESLO Kindle eBook on Amazon"
                className="group flex h-20 w-full max-w-[260px] items-center justify-center rounded-lg border border-white/15 bg-white px-5 text-[#111820] shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-[#ff9900]/80 hover:bg-[#fffaf0]"
              >
                <KindleLogo />
              </a>
              <a
                href={barnesNobleHardcoverUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buy The Principles of MESLO at Barnes & Noble"
                className="group flex h-20 w-full max-w-[260px] items-center justify-center rounded-lg border border-white/15 bg-white px-5 shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-[#3a7567]/80 hover:bg-[#f7fbf8]"
              >
                <Image
                  src="/images/retailers/barnes-and-noble.svg"
                  alt="Barnes & Noble"
                  width={260}
                  height={22}
                  className="h-auto w-full max-w-[220px] object-contain"
                />
              </a>
              <a
                href={spotifyAudiobookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen to The Principles of MESLO on Spotify"
                className="group flex h-20 w-full max-w-[260px] items-center justify-center gap-3 rounded-lg border border-white/15 bg-white px-5 text-[#111820] shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-[#1ed760]/80 hover:bg-[#f3fff6]"
              >
                <SpotifyLogo />
                <span className="text-sm font-semibold">Listen on Spotify</span>
              </a>
              <a
                href={audibleAudiobookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen to The Principles of MESLO audiobook"
                className="group flex h-20 w-full max-w-[260px] items-center justify-center rounded-lg border border-lime-400 bg-white px-5 text-[#111820] shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-lime-50"
              >
                <Image
                  src="/images/retailers/audible.svg"
                  alt=""
                  width={160}
                  height={63}
                  className="h-auto w-[160px] object-contain"
                />
                <span className="sr-only">Listen on Audible, an Amazon company</span>
              </a>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="framework-heading"
          className="border-b border-white/10 bg-[#10283a] px-6 py-16 lg:px-8 lg:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="framework-heading"
              className="mb-8 text-sm font-semibold uppercase tracking-widest text-[#b7d63d]"
            >
              Explore the MESLO framework
            </h2>
            <div className="space-y-8">
              <div>
                <Link
                  href="/library"
                  className="inline-flex items-center gap-2 text-lg font-bold uppercase text-white transition hover:text-[#b7d63d]"
                >
                  Bring MESLO to your library
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <p className="mt-2 text-base leading-7 text-[#d2dce4]">
                  Request The Principles of MESLO for your public library and help local readers
                  access practical estimating and business education.
                </p>
              </div>
              <div>
                <Link
                  href="/institutions"
                  className="inline-flex items-center gap-2 text-lg font-bold uppercase text-white transition hover:text-[#b7d63d]"
                >
                  Institutional adoption
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <p className="mt-2 text-base leading-7 text-[#d2dce4]">
                  Explore MESLO for curriculum, workforce training, entrepreneurship programs, or
                  organization-wide adoption.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

function SpotifyLogo() {
  return (
    <svg
      aria-hidden="true"
      className="h-9 w-9 shrink-0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#1ed760" />
      <path
        d="M5.1 9.2c4.6-1.4 9.9-.9 13.7 1.4M6 12.2c3.8-1.1 8.3-.7 11.5 1.2m-10.3 1.8c3.1-.8 6.6-.5 9.2 1"
        fill="none"
        stroke="#111820"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function AmazonLogo() {
  return (
    <svg
      aria-hidden="true"
      className="h-auto w-full max-w-[170px]"
      fill="none"
      viewBox="0 0 220 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        fill="#111820"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="42"
        fontWeight="700"
        letterSpacing="-1"
        x="10"
        y="42"
      >
        amazon
      </text>
      <path
        d="M61 53c34 14 72 11 105-8"
        stroke="#ff9900"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M151 44c8 0 15 1 22 4-5 4-10 8-16 12"
        stroke="#ff9900"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
    </svg>
  );
}

function KindleLogo() {
  return (
    <svg
      aria-hidden="true"
      className="h-auto w-full max-w-[170px]"
      fill="none"
      viewBox="0 0 220 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        fill="#111820"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="43"
        fontWeight="600"
        letterSpacing="-2"
        x="26"
        y="43"
      >
        kindle
      </text>
      <path
        d="M57 52c34 14 72 11 105-8"
        stroke="#ff9900"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M147 43c8 0 15 1 22 4-5 4-10 8-16 12"
        stroke="#ff9900"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
    </svg>
  );
}
