'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeaderRightControls from '@/components/HeaderRightControls';

export default function GlobalHeader() {
  const pathname = usePathname();
  const instagramUrl = 'https://www.instagram.com/principlesofmeslo';
  const amazonUrl =
    'https://www.amazon.com/Principles-MESLO-Art-Science-Estimate/dp/B0HLMLCSYQ/ref=sr_1_1?crid=2Z7UYG16I6TQK&dib=eyJ2IjoiMSJ9.gMHYh-gaUhHUVzDcWoQVhbTPlgMlTv--jvMckL8H1gcJW0kxhVozCP37_9eWbcnzuGPBF7qGvPbAxHIZLiT_nLESbJ4KIyoQaHTiwpb35Fsx0iGjeyZp6yQRPl23Q1gc---1nDSQma5Ejda6ay3nsLOCmTT0UO-4N9gmgoriEcrXZ0N633YzCFB6iB6fEKtjDllg27yt7zy9GPiH5hNDMziGSFymRZweiOT8F7D_M8o.loU3xR8mvN982uz1v4dRUG3A6naD2Vp94HpZIQYW5EQ&dib_tag=se&keywords=The+Principles+of+MESLO&qid=1791176104&sprefix=the+principles+of+meslo%2Caps%2C199&sr=8-1';
  const barnesNobleHardcoverUrl =
    'https://www.barnesandnoble.com/w/the-principles-of-meslo-david-molina/1151585871?ean=9798900711706';
  const kindleUrl =
    'https://www.amazon.com/Principles-MESLO-Science-Estimate-Book-ebook/dp/B0HLMW7HLX/ref=tmm_kin_swatch_0';
  const launchNavItems =
    pathname === '/what-is-meslo'
      ? [
          { href: '/what-is-meslo', label: 'What is MESLO' },
          { href: '/#preface-heading', label: 'Free Audio Preview' },
        ]
      : [
          { href: '/library', label: 'Library' },
          { href: '/institutions', label: 'Institutions' },
          { href: barnesNobleHardcoverUrl, label: 'Hardcover' },
          { href: amazonUrl, label: 'Paperback' },
          { href: kindleUrl, label: 'Kindle eBook' },
        ];

  if (pathname === '/') {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f2432]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl border border-[#64c4ff]/25 bg-[#64c4ff]/10 px-3 py-2 text-[#e9f0f5] transition hover:bg-[#64c4ff]/20"
        >
          <span className="rounded-lg border border-[#64c4ff]/25 bg-[#64c4ff]/10 p-1.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="1" y="17" width="18" height="2" rx="1" fill="#5A82A3" />
              <rect x="3" y="11" width="3" height="6" rx="1" fill="#64C4FF" />
              <rect x="8" y="9" width="3" height="8" rx="1" fill="#64C4FF" />
              <rect x="13" y="6" width="3" height="11" rx="1" fill="#64C4FF" />
              <path d="M2 13.5C6.8 13.5 9.8 11 14.5 5.5" stroke="#B7D63D" strokeWidth="2" strokeLinecap="round" />
              <path d="M12.8 5.5H15.8V8.4" stroke="#B7D63D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-base font-medium tracking-[0.04em] [font-family:'Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Palatino,Georgia,serif]">
            Principles of MESLO
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-sm text-[#d2dce4] md:flex">
            {launchNavItems.map((item) =>
              item.href.startsWith('/') ? (
                <Link key={item.label} href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <HeaderRightControls
            instagramUrl={instagramUrl}
            navItems={launchNavItems}
          />
        </div>
      </div>
    </header>
  );
}
