import type { ReactNode } from 'react';

function stripTrailingPunctuation(url: string): string {
  return url.replace(/[),.;:!?]+$/g, '');
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const tokenPattern = /\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s<]+|mailto:[^\s<]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenPattern.exec(text)) !== null) {
    const [fullMatch, mdLabel, mdHref, bareHref] = match;
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    const href = stripTrailingPunctuation(mdHref || bareHref || '');
    const label = mdLabel || href;
    const external = isExternalHref(href);

    nodes.push(
      <a
        key={`link-${key++}`}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        className="text-[#64c4ff] underline-offset-2 hover:underline"
      >
        {label}
      </a>,
    );

    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function RenderMarkdown({ content }: { content: string }) {
  const sections = content
    .split(/\n\s*\n/)
    .map((section) => section.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4 text-sm leading-7 text-neutral-300">
      {sections.map((section, idx) => {
        if (section.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-xl font-semibold text-white">
              {renderInlineMarkdown(section.replace(/^###\s+/, ''))}
            </h3>
          );
        }
        if (section.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-2xl font-semibold text-white">
              {renderInlineMarkdown(section.replace(/^##\s+/, ''))}
            </h2>
          );
        }
        if (section.startsWith('# ')) {
          return (
            <h1 key={idx} className="text-3xl font-semibold text-white">
              {renderInlineMarkdown(section.replace(/^#\s+/, ''))}
            </h1>
          );
        }
        return (
          <p key={idx} className="whitespace-pre-wrap">
            {renderInlineMarkdown(section)}
          </p>
        );
      })}
    </div>
  );
}
