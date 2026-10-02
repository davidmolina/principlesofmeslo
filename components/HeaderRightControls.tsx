'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

type NavItem = { href: string; label: string };

function isExternalUrl(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

function getSiteUrlFallback() {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env;
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin;
  return 'https://principlesofmeslo.com';
}

function useScrolled(threshold = 18) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

function IconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="rounded-xl border border-white/15 bg-white/5 p-2 text-[#c5d8e8] transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function HeaderRightControls({
  instagramUrl,
  navItems,
}: {
  instagramUrl: string;
  navItems?: NavItem[];
}) {
  const scrolled = useScrolled(18);
  const [followOpen, setFollowOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const followRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const siteUrl = getSiteUrlFallback();
  const shareText = 'The Principles of MESLO';
  const shareQuote = 'Construction estimating, operational clarity, and the Principles of MESLO.';

  const shareLinks = useMemo(() => {
    const encodedUrl = encodeURIComponent(siteUrl);
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(shareQuote)}`,
      x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };
  }, [shareQuote, shareText, siteUrl]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node | null;
      if (target && followRef.current && !followRef.current.contains(target)) setFollowOpen(false);
      if (target && menuRef.current && !menuRef.current.contains(target)) setMenuOpen(false);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setFollowOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-end gap-2">
      {scrolled ? (
        <div className="flex items-center justify-end gap-2">
          <IconButton href={shareLinks.facebook} label="Share on Facebook">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
            </svg>
          </IconButton>
          <IconButton href={shareLinks.x} label="Share on X">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M18.9 2H22l-6.8 7.78L23 22h-6.1l-4.78-6.25L6.66 22H3.55l7.27-8.31L1 2h6.25l4.32 5.7L18.9 2Zm-1.07 18.17h1.69L6.33 3.74H4.52l13.3 16.43Z" />
            </svg>
          </IconButton>
          <IconButton href={shareLinks.linkedin} label="Share on LinkedIn">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM5.45 9.73h2.98V19H5.45V9.73Zm4.72 0h2.86v1.26h.04c.4-.75 1.38-1.54 2.84-1.54 3.03 0 3.59 1.99 3.59 4.58V19h-2.99v-4.4c0-1.05-.02-2.4-1.47-2.4-1.48 0-1.7 1.15-1.7 2.33V19h-2.99V9.73Z" />
            </svg>
          </IconButton>
          <IconButton href={instagramUrl} label="Instagram">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.98 1.35a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 0 1 0-2.34ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
            </svg>
          </IconButton>
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-2">
        <div ref={followRef} className="relative">
          <button
            type="button"
            onClick={() => setFollowOpen((v) => !v)}
            aria-expanded={followOpen}
            className="inline-flex items-center gap-2 rounded-xl bg-[#b7d63d] px-4 py-2 text-sm font-semibold text-[#0f2432] transition hover:bg-[#caea4f]"
          >
            Follow
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <path
                d="M5 7.5L10 12.5L15 7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {followOpen ? (
            <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0f2432] shadow-2xl">
              <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Follow / Share
              </div>
              <div className="border-t border-white/10">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between px-4 py-3 text-sm text-neutral-200 hover:bg-white/5"
                >
                  Instagram
                  <span className="text-xs text-neutral-400">@principlesofmeslo</span>
                </a>
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between px-4 py-3 text-sm text-neutral-200 hover:bg-white/5"
                >
                  Share on Facebook
                </a>
                <a
                  href={shareLinks.x}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between px-4 py-3 text-sm text-neutral-200 hover:bg-white/5"
                >
                  Share on X
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between px-4 py-3 text-sm text-neutral-200 hover:bg-white/5"
                >
                  Share on LinkedIn
                </a>
              </div>
            </div>
          ) : null}
        </div>

        {navItems?.length ? (
          <div ref={menuRef} className="relative md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Open menu"
              className="rounded-xl border border-white/15 bg-white/5 p-2 text-neutral-100 transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {menuOpen ? (
              <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0f2432] shadow-2xl">
                <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Menu
                </div>
                <div className="border-t border-white/10">
                  {navItems.map((item) =>
                    isExternalUrl(item.href) ? (
                      <a
                        key={`${item.label}-${item.href}`}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-sm text-neutral-200 hover:bg-white/5"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : item.href.startsWith('#') ? (
                      <a
                        key={`${item.label}-${item.href}`}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-neutral-200 hover:bg-white/5"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={`${item.label}-${item.href}`}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-neutral-200 hover:bg-white/5"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
