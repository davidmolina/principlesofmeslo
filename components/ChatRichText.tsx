import type { ReactNode } from 'react';

function stripTrailingPunctuation(url: string): string {
  return url.replace(/[),.;:!?]+$/g, '');
}

function renderLinkTokens(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const tokenPattern = /\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s<]+|mailto:[^\s<]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenPattern.exec(text)) !== null) {
    const [fullMatch, markdownLabel, markdownHref, bareHref] = match;
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    const href = stripTrailingPunctuation(markdownHref || bareHref || '');
    const label = markdownLabel || href;
    const external = /^https?:\/\//i.test(href);

    nodes.push(
      <a
        key={`link-${key++}`}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        className="text-sky-600 underline underline-offset-2 hover:text-sky-500"
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

export default function ChatRichText({ text }: { text: string }) {
  return <div className="whitespace-pre-wrap">{renderLinkTokens(text)}</div>;
}
