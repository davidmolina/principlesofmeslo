import type { Metadata } from 'next';
import Link from 'next/link';
import { Geist } from 'next/font/google';
import MesloChatWidget from '@/components/MesloChatWidget';
import GlobalHeader from '@/components/GlobalHeader';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://principlesofmeslo.com';
const shareImage = '/meslo-book-angled.png';
const shareTitle = 'The Principles of MESLO';
const shareDescription = 'Construction estimating, operational clarity, and the Principles of MESLO.';
const shareQuote = 'Construction estimating, operational clarity, and the Principles of MESLO.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: shareTitle,
  description: shareDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    url: siteUrl,
    siteName: shareTitle,
    images: [
      {
        url: shareImage,
        width: 2322,
        height: 2780,
        alt: 'The Principles of MESLO angled book cover',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: shareTitle,
    description: shareDescription,
    images: [shareImage],
  },
  icons: {
    icon: shareImage,
    shortcut: shareImage,
    apple: shareImage,
  },
};

const footerLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/cookie-usage', label: 'Cookie Notice' },
  { href: '/fraud-warning', label: 'Fraud Warning' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const shareText = shareTitle;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(shareQuote)}`;
  const xShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`;
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;
  const instagramUrl = 'https://www.instagram.com/principlesofmeslo';

  return (
    <html lang="en">
      <body className={`${geist.className} bg-[#0d1f2d] text-[#ecf3f8]`}>
        <GlobalHeader />
        {children}
        <MesloChatWidget />

        <section className="border-t border-white/10 bg-[#0d1f2d]">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 text-center lg:px-8">
            <p className="text-sm font-semibold tracking-wide text-[#d7e6f2]">
              Share Principles of MESLO
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href={facebookShare}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Share on Facebook"
                className="rounded-xl border border-white/15 bg-white/5 p-2 text-[#c5d8e8] transition hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
                </svg>
              </a>
              <a
                href={xShare}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Share on X"
                className="rounded-xl border border-white/15 bg-white/5 p-2 text-[#c5d8e8] transition hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M18.9 2H22l-6.8 7.78L23 22h-6.1l-4.78-6.25L6.66 22H3.55l7.27-8.31L1 2h6.25l4.32 5.7L18.9 2Zm-1.07 18.17h1.69L6.33 3.74H4.52l13.3 16.43Z" />
                </svg>
              </a>
              <a
                href={linkedInShare}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Share on LinkedIn"
                className="rounded-xl border border-white/15 bg-white/5 p-2 text-[#c5d8e8] transition hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM5.45 9.73h2.98V19H5.45V9.73Zm4.72 0h2.86v1.26h.04c.4-.75 1.38-1.54 2.84-1.54 3.03 0 3.59 1.99 3.59 4.58V19h-2.99v-4.4c0-1.05-.02-2.4-1.47-2.4-1.48 0-1.7 1.15-1.7 2.33V19h-2.99V9.73Z" />
                </svg>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="rounded-xl border border-white/15 bg-white/5 p-2 text-[#c5d8e8] transition hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.98 1.35a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 0 1 0-2.34ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#0a1824]">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-[#a9bfd1]">© 2026 David Molina - Principles of MESLO</p>
              <div className="flex flex-wrap gap-5 text-sm text-[#a9bfd1]">
                {footerLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
