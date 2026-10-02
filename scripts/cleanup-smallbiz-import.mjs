import { promises as fs } from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'content', 'smallbiz');

const CATEGORY_RULES = [
  {
    min: 1,
    max: 25,
    tags: ['smallbiz', 'hiring', 'workforce'],
    intro: (title) => `${title} shapes how a business hires, trains, and retains the right people.`,
    detail:
      'Clear expectations, documented policies, and consistent follow-up make this area easier to manage well.',
  },
  {
    min: 26,
    max: 30,
    tags: ['smallbiz', 'sales', 'customers'],
    intro: (title) => `${title} affects how prospects move from first contact to signed customer.`,
    detail:
      'Simple stages, clear messaging, and steady follow-up usually outperform improvised selling.',
  },
  {
    min: 31,
    max: 35,
    tags: ['smallbiz', 'marketing', 'growth'],
    intro: (title) => `${title} influences how a business attracts attention, builds trust, and generates demand.`,
    detail:
      'Small businesses get better results when the message matches the customer and the offer is easy to act on.',
  },
  {
    min: 36,
    max: 40,
    tags: ['smallbiz', 'operations', 'scaling'],
    intro: (title) => `${title} matters when a business is expanding capacity without losing control.`,
    detail:
      'Growth works better when systems, delegation, and cash planning mature with the business.',
  },
  {
    min: 41,
    max: 50,
    tags: ['smallbiz', 'finance', 'cash-flow'],
    intro: (title) => `${title} affects access to capital, cash flow, and financial risk.`,
    detail:
      'Owners should understand the tradeoffs, costs, and repayment pressure before using these tools.',
  },
  {
    min: 51,
    max: 60,
    tags: ['smallbiz', 'digital', 'website'],
    intro: (title) => `${title} strengthens online visibility, credibility, and lead capture.`,
    detail:
      'The best results come from fast pages, clear messaging, and a direct path to contact or conversion.',
  },
  {
    min: 61,
    max: 70,
    tags: ['smallbiz', 'operations', 'customers'],
    intro: (title) => `${title} helps owners run work more consistently and make better day-to-day decisions.`,
    detail:
      'Documented steps, clear owners, and regular review keep this from becoming reactive or inconsistent.',
  },
  {
    min: 71,
    max: 75,
    tags: ['smallbiz', 'legal', 'compliance'],
    intro: (title) => `${title} reduces preventable legal, insurance, and contract risk.`,
    detail:
      'Policies, records, and professional advice help businesses avoid preventable mistakes here.',
  },
  {
    min: 76,
    max: 80,
    tags: ['smallbiz', 'software', 'automation'],
    intro: (title) => `${title} can improve efficiency when tools match the actual workflow.`,
    detail:
      'The right tool should simplify work, not add another layer of confusion or duplicate data.',
  },
  {
    min: 81,
    max: 90,
    tags: ['smallbiz', 'strategy', 'community'],
    intro: (title) =>
      `${title} supports positioning, planning, and outside relationships that create long-term advantage.`,
    detail:
      'This area works best when decisions are intentional and tied to a clear business model.',
  },
  {
    min: 91,
    max: 100,
    tags: ['smallbiz', 'leadership', 'resilience'],
    intro: (title) => `${title} helps owners lead with more clarity, resilience, and long-range thinking.`,
    detail:
      'Strong habits, communication, and regular reflection make this more practical and sustainable.',
  },
];

function parseTitle(raw) {
  const match = raw.match(/^title:\s*(.+)$/m);
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : null;
}

function findRule(index) {
  return CATEGORY_RULES.find((rule) => index >= rule.min && index <= rule.max);
}

const files = (await fs.readdir(dir))
  .filter((file) => file.endsWith('.mdx'))
  .sort((a, b) => a.localeCompare(b));

for (const file of files) {
  const match = file.match(/^(\d+)-/);
  if (!match) continue;

  const index = Number(match[1]);
  const rule = findRule(index);
  if (!rule) continue;

  const abs = path.join(dir, file);
  const raw = await fs.readFile(abs, 'utf8');
  const title = parseTitle(raw) ?? file.replace(/^\d+-/, '').replace(/\.mdx$/, '').replace(/-/g, ' ');

  const content = `---
title: ${title}
tags: [${rule.tags.join(', ')}]
---

## ${title}

${rule.intro(title)}

${rule.detail}
`;

  await fs.writeFile(abs, content, 'utf8');
}

console.log(`Cleaned ${files.length} smallbiz MDX entries in ${dir}`);
