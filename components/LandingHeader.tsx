'use client';

import Link from 'next/link';
import HeaderRightControls from '@/components/HeaderRightControls';

export default function LandingHeader() {
  const instagramUrl = 'https://www.instagram.com/principlesofmeslo';
  const amazonUrl = 'https://www.amazon.com/dp/B0HLMLCSYQ';
  const kindleUrl =
    'https://www.amazon.com/Principles-MESLO-Science-Estimate-Book-ebook/dp/B0HLMW7HLX/ref=tmm_kin_swatch_0';
  const launchNavItems = [
    { href: '/library', label: 'Library' },
    { href: '/institutions', label: 'Institutions' },
    { href: amazonUrl, label: 'Paperback' },
    { href: kindleUrl, label: 'Kindle eBook' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f2432]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl border border-[#64c4ff]/25 bg-[#64c4ff]/10 p-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="1" y="17" width="18" height="2" rx="1" fill="#5A82A3" />
              <rect x="3" y="11" width="3" height="6" rx="1" fill="#64C4FF" />
              <rect x="8" y="9" width="3" height="8" rx="1" fill="#64C4FF" />
              <rect x="13" y="6" width="3" height="11" rx="1" fill="#64C4FF" />
              <path
                d="M2 13.5C6.8 13.5 9.8 11 14.5 5.5"
                stroke="#B7D63D"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12.8 5.5H15.8V8.4"
                stroke="#B7D63D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-base font-medium tracking-[0.04em] text-[#e9f0f5] [font-family:'Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Palatino,Georgia,serif]">
            Principles of MESLO
          </p>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-neutral-300 md:flex">
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
    </header>
  );
}
