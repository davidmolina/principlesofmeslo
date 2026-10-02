'use client';

import { useState } from 'react';

export type ResourceKey =
  | 'business-plan'
  | 'operations-handbook'
  | 'bid-log'
  | 'parent-folders'
  | 'naming-conventions'
  | 'master-takeoff-worksheet'
  | 'markup-vs-margin-calculator';

export const RESOURCE_TEXT: Record<ResourceKey, string> = {
  'business-plan': `BUSINESS PLAN

Business Plan: Chapters and Detail

1. Executive Summary
A one- to two-page overview describing the company, its history, the founder, and short-, intermediate-, and long-term objectives. By the end of this section, the reader should clearly understand what the business is and where it is headed.

2. Economic Outlook
A one-page snapshot of industry trends: growth, decline, risks, and opportunities. This section helps surface blind spots and is closely scrutinized by lenders. A simple graph goes a long way.

3. Target Area of Work
A two-page description of the company’s products and services. If you have multiple revenue streams, list and explain them here.

4. Branding
A one- to two-page branding guide covering your logo, how it was developed, and how you plan to use your website and social channels to drive awareness and demand.

5. Office Outlook
One to two pages describing your headquarters, any regional offices, or a remote/decentralized structure. If you plan to operate virtually, explain why. Loan officers care where your attention and spending will be focused.

6. Revenue Forecast
An outline of current and projected products and services, supported by basic graphs. Lenders know forecasts are estimates; what they are assessing is whether you have done your homework.

7. Organizational Charts
A visual showing leadership structure and roles. Early-stage companies are typically flat. Larger organizations add layers as they scale.

8. Implementation Strategy
A concise plan explaining how you will execute. Be honest. If this is a revised plan, highlight what you learned, what did not work, and how you will adjust to become profitable and grow.`,
  'operations-handbook': `OPERATIONS HANDBOOK

Operations Handbook, Associated Chapters, and Chapter Detail

1. Preface
Includes a few paragraphs on the company, where to find it on Drive, and how to internally communicate with each other, including the usernames and hashtags to be used.

2. Principles
A list of your ten principles that guide your company. Search the web for the ten Nike company principles for a solid example.

3. Introduction
A few paragraphs about the company, company history, the founder, and our short-, intermediate-, and long-term-plan responsibilities.

4. Company Procedures
Includes overview, file map, calendar year, taskers, and naming conventions.

5. Procurement
Includes overview, role of bid log, go/no-go process, role of bid meeting, master takeoff, submitting bid, and lost award procedures.

6. Staffing
Includes recruiting, preparing for interviews, conducting interviews, selection process, onboarding and training, retention and mentorship, continuous education and performance reviews, and bonus and compensation.

7. Billing
Includes pay application and progress invoicing, statement of intent, payroll proofreading and verification, submitting invoice, net terms, QuickBooks input and accounts receivable report, cash projections, and accounts payable by job.

8. Audit
Overview and expectations, cost coding, P&L by Job reports, and oversight and feedback integrations.

9. Project Closeout
Includes client walk-through, punch list, permit closeout, final clean, retainage, and final billing.

10. Best Practices
Includes QC/QA procedures and issue/discussion/recommendation reports.

11. Addenda
Includes job descriptions and performance reviews.`,
  'bid-log': `BID LOG

The Making of the Bid Log

The second tool in every estimator's toolbox is the bid log. Prior to using software, I used a massive whiteboard with blue painter's tape and paper calendars with special dates.

Today, it is a spreadsheet that lives online, has specific naming conventions, and at minimum includes the following columns, from left to right:

1. Bid Due
This date tells everyone on your team when the opportunity is due. Organized by year, month, and date, you can quickly sort by due date (e.g., 20231007 for October 7, 2023). Now you can sort from the latest and greatest and never miss a bid deadline.

2. Solicitation #
This cell will have the solicitation number for future referencing (e.g., W9127N11Q0099).

3. Project Name
This includes the name of the opportunity. Some will copy/paste the name exactly from the opportunity website, but yield to specificity (e.g., Spoils Removal - 3,000 CY Annually), which tells us the what, the quantities, and the frequency without second-guessing.

4. Bid Contact
This includes the exact email address of the COR and for the most part it will mirror this format: first.last@agency.gov. Whenever you have to email that point of contact you do not have to go around digging for it. This way you just copy/paste that COR's email directly from your bid log into your email system, upload bid documents, and hit the send button.

5. FOB
Short for FOB destination/origin, it should list exactly where the place of performance is, including the city and state at a minimum. I have had contracts for both FOB/destination, meaning shipped to that location, and FOB/origin, where freight picks up the items at the manufacturing site. Use this section for wherever the project delivery or project location is.

6. URL
One singular website address line where the original contract opportunity lies. Every second counts in a bid meeting with your team when it comes to researching and submitting bids.

7. Drive
One singular website address line where the plans/specs, drawings, and attachments live. This should be done only after you have decided it is a go in your go/no-go process. At this stage, a cloud storage place is key in avoiding lots of filing cabinets in your office.`,
  'parent-folders': `PARENT FOLDERS

Parent Folders and Folder Descriptions

1 Accounting - Everything from accounts payable to accounts receivable, bank reconciling and taxes. If you have an outside bookkeeper, access to this Drive folder via your accounting@ email is key.
2 Branding - All things related to the capability statement, logos, and digital assets.
3 Company - All state incorporation documents, from Secretary of State filings to business licenses and company certifications.
4 HR - All things related to your people, including employees, onboarding forms, offer letters, resumes, and safety.
5 Projects - All folders and files related to business development, bidding, and your master takeoff. If you have an outside estimator, access to this Drive folder via your bids@ or estimating@ email is key.`,
  'naming-conventions': `NAMING CONVENTIONS

Contracting Naming Conventions and Use Cases

1 Invoices - [YYYYMMDD] [Company] [Invoice No.] [Type] [Amount] or 20221022 Comcast 12345 G&A $306.33. The G&A denotes it's a general and administrative expense.
2 Statements - [YYYYMMDD] [Company] [STATEMENT] [Amount] or 20220331 United Rentals STATEMENT $3,399.00. The uppercase statement quickly denotes it's a statement that's tied to invoices.
3 Direct/Indirect Expense Receipt - [YYYYMMDD] [Cost Code Type] [Type][3-letters of client name in caps] [Amount] or 20220629 Paint Materials DIRECT CLA $47.59. The three letters CLA denote Clarklewis, a client. All direct/indirect expenses use the first letters of the clients name in capital letters to make it easy to identify and job cost.
4 G&A Expense Receipts - [YYYYMMDD] [Company] [Type] [Amount] or 20220601 Parking G&A $12.00.
5 Deposits - [YYYYMMDD] [Customer or Agency] [Type] [Amount] 20220613 Wash. Industrial Insurance DEPOSIT $50.10. The uppercase deposit denotes deposit versus an expense or statement. In Drive, it's good to highlight the difference when you are reconciling your books.`,
  'master-takeoff-worksheet': `MASTER TAKEOFF WORKSHEET

Template Placeholder

Paste your Master Takeoff Worksheet source content here.`,
  'markup-vs-margin-calculator': `MARKUP VS MARGIN CALCULATOR

Template Placeholder

Paste your Markup vs Margin Calculator source content here.`,
};

export const RESOURCE_LABEL: Record<ResourceKey, string> = {
  'business-plan': 'Business Plan Template',
  'operations-handbook': 'Operations Handbook Template',
  'bid-log': 'Bid Log Template',
  'parent-folders': 'Parent Folders',
  'naming-conventions': 'Naming Conventions',
  'master-takeoff-worksheet': 'Master Takeoff Worksheet',
  'markup-vs-margin-calculator': 'Markup vs Margin Calculator',
};

export function detectToolkitResources(text: string): ResourceKey[] {
  const normalized = text.toLowerCase();
  const resources: ResourceKey[] = [];

  if (/(business plan|business plan template)/i.test(normalized)) {
    resources.push('business-plan');
  }

  if (/(operations handbook|operations handbook template)/i.test(normalized)) {
    resources.push('operations-handbook');
  }

  if (/(bid log|bid log template)/i.test(normalized)) {
    resources.push('bid-log');
  }

  if (/(naming conventions|file naming|name files)/i.test(normalized)) {
    resources.push('naming-conventions');
  }

  return [...new Set(resources)];
}

export default function ResourcesCopyPanel() {
  const [openResource, setOpenResource] = useState<ResourceKey | null>(null);
  const [copyStatus, setCopyStatus] = useState<string>('');

  const activeCode = openResource ? RESOURCE_TEXT[openResource] : '';
  const activeLabel = openResource ? RESOURCE_LABEL[openResource] : '';

  async function onCopy() {
    if (!openResource) return;
    await navigator.clipboard.writeText(RESOURCE_TEXT[openResource]);
    setCopyStatus('Copied.');
    setTimeout(() => setCopyStatus(''), 1400);
  }

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => setOpenResource('business-plan')}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Business Plan Template
        </button>
        <button
          type="button"
          onClick={() => setOpenResource('operations-handbook')}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Operations Handbook Template
        </button>
        <button
          type="button"
          onClick={() => setOpenResource('bid-log')}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Bid Log Template
        </button>
        <button
          type="button"
          onClick={() => setOpenResource('master-takeoff-worksheet')}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Master Takeoff Worksheet
        </button>
        <button
          type="button"
          onClick={() => setOpenResource('parent-folders')}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Parent Folders
        </button>
        <button
          type="button"
          onClick={() => setOpenResource('naming-conventions')}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Naming Conventions
        </button>
      </div>

      {openResource ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-[#0f2432] p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-white">{activeLabel}</h3>
              <button
                type="button"
                onClick={() => setOpenResource(null)}
                className="rounded-xl border border-white/20 px-3 py-2 text-sm text-white transition hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <p className="mt-3 text-sm text-[#c6d4dd]">
              Copy this source block. I can replace this placeholder with your exact source code.
            </p>
            <pre className="mt-4 max-h-[55vh] overflow-auto rounded-2xl border border-white/10 bg-[#0a1e2a] p-4 text-sm text-[#e6edf3]">
              <code>{activeCode}</code>
            </pre>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  void onCopy();
                }}
                className="rounded-xl bg-[#64c4ff] px-4 py-2 text-sm font-semibold text-[#0f2432] transition hover:bg-[#81cfff]"
              >
                Copy Source
              </button>
              {copyStatus ? <span className="text-sm text-[#b7d63d]">{copyStatus}</span> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
