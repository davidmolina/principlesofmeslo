import fs from 'node:fs';
import path from 'node:path';

type Entry = {
  title: string;
  tags: string[];
  body: string;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function writeEntry(outputDir: string, entry: Entry) {
  const slug = slugify(entry.title);
  const filePath = path.join(outputDir, `${slug}.mdx`);

  if (fs.existsSync(filePath)) return { filePath, written: false };

  const fm = `---\ntitle: ${entry.title}\ntags: ${JSON.stringify(entry.tags)}\n---\n\n`;
  const mdx = fm + entry.body.trim() + '\n';

  fs.writeFileSync(filePath, mdx, 'utf8');
  return { filePath, written: true };
}

function main() {
  const outputDir = path.join(process.cwd(), 'content', 'back-office');
  fs.mkdirSync(outputDir, { recursive: true });

  const entries: Entry[] = [
    // Infrastructure (9)
    {
      title: 'Back Office Infrastructure',
      tags: ['back-office', 'infrastructure', 'operations'],
      body: `
## Back Office Infrastructure

Back office infrastructure is the set of systems that keep work moving when nobody is watching. It includes file storage, calendars, communication tools, templates, and the routines that make them usable.

### Why It Matters

If infrastructure is weak, teams spend time searching, redoing work, or waiting for decisions.

### Prompt

What are the minimum systems we need to run the back office reliably?

### Key Steps

- Standardize your folder map and naming conventions.
- Use one calendar system for deadlines and recurring tasks.
- Define who owns each system and who can change it.
      `.trim(),
    },
    {
      title: 'Tool Stack Standardization',
      tags: ['back-office', 'infrastructure', 'technology'],
      body: `
## Tool Stack Standardization

Tool stack standardization means choosing a small set of tools and using them consistently across the company. The goal is not more software. The goal is fewer handoffs and less friction.

### Why It Matters

When every person uses different tools, information fragments and training never ends.

### Prompt

Which tools should we standardize first?

### Key Steps

- Pick one system of record for documents, tasks, and messaging.
- Document the "approved tools" list and what each tool is for.
- Remove duplicate tools that create parallel workflows.
      `.trim(),
    },
    {
      title: 'File Map and Naming Conventions',
      tags: ['back-office', 'infrastructure', 'documentation'],
      body: `
## File Map and Naming Conventions

A file map is the structure of folders that your team uses to store and retrieve information. Naming conventions ensure files sort and search cleanly, especially under time pressure.

### Why It Matters

Good estimating and operations depend on fast retrieval of the latest version of the truth.

### Prompt

How should we name files so anyone can find them quickly?

### Key Steps

- Use a consistent prefix format: date, client, project, document type.
- Avoid "final" and "v2" and rely on clear versioning.
- Assign one owner to maintain and audit the structure.
      `.trim(),
    },
    {
      title: 'Calendar and Deadline Management',
      tags: ['back-office', 'infrastructure', 'planning'],
      body: `
## Calendar and Deadline Management

Calendar discipline is how the back office prevents missed deadlines. It includes bid due dates, internal review meetings, procurement lead times, and billing cycles.

### Why It Matters

Deadlines drive workload. If they are not visible, teams become reactive.

### Prompt

What deadlines should be on the calendar by default?

### Key Steps

- Create a shared calendar for company-critical deadlines.
- Add reminder rules: 7 days, 3 days, 1 day, same day.
- Tie calendar events to the source document and owner.
      `.trim(),
    },
    {
      title: 'Access and Permissions Model',
      tags: ['back-office', 'infrastructure', 'security'],
      body: `
## Access and Permissions Model

An access model defines who can view, edit, and share company information. It should be simple enough to follow and strict enough to reduce risk.

### Why It Matters

Loose permissions create security exposure. Overly strict permissions slow teams down.

### Prompt

How should we set access without creating bottlenecks?

### Key Steps

- Use role-based access (estimating, operations, admin).
- Restrict financial and HR folders by default.
- Review access quarterly and remove unused accounts.
      `.trim(),
    },
    {
      title: 'Reliable Backups',
      tags: ['back-office', 'infrastructure', 'risk-management'],
      body: `
## Reliable Backups

Backups are your insurance policy against accidental deletion, ransomware, or account loss. A backup strategy is not complete until you test it.

### Why It Matters

If you cannot restore, you do not have a backup. You have a hope.

### Prompt

How do we make sure our files are recoverable?

### Key Steps

- Enable version history in your primary storage tool.
- Maintain an offline or separate-account backup for critical folders.
- Test restoring a file monthly and document the process.
      `.trim(),
    },
    {
      title: 'Device and Hardware Standards',
      tags: ['back-office', 'infrastructure', 'technology'],
      body: `
## Device and Hardware Standards

Hardware standards keep teams productive and reduce IT firefighting. Standard laptops, printers, and scanners also make training and support predictable.

### Why It Matters

Underpowered devices slow estimating and documentation, and delays compound across projects.

### Prompt

What should we standardize for office and field devices?

### Key Steps

- Define a baseline device spec for office roles and field roles.
- Replace devices on a predictable cycle.
- Keep one documented process for setup and security.
      `.trim(),
    },
    {
      title: 'Software License Management',
      tags: ['back-office', 'infrastructure', 'cost-control'],
      body: `
## Software License Management

License management ensures you pay for what you use and can onboard new hires without delays. It also reduces security risk from orphaned accounts.

### Why It Matters

Unused licenses quietly drain cash and create access risk.

### Prompt

How do we track and control software subscriptions?

### Key Steps

- Maintain a license register with owners and renewal dates.
- Cancel unused seats monthly.
- Centralize billing under one admin account.
      `.trim(),
    },
    {
      title: 'System Ownership and Maintenance',
      tags: ['back-office', 'infrastructure', 'accountability'],
      body: `
## System Ownership and Maintenance

Every system needs an owner. Ownership means keeping it current, training others, and improving it based on real workflow.

### Why It Matters

If everyone owns it, no one owns it.

### Prompt

Who should own our key systems and templates?

### Key Steps

- Assign an owner for each system: files, tasks, billing, estimating templates.
- Document what "good" looks like for each system.
- Review systems monthly and log improvements.
      `.trim(),
    },

    // Communications (8)
    {
      title: 'Asynchronous Communication',
      tags: ['back-office', 'communications', 'operations'],
      body: `
## Asynchronous Communication

Asynchronous communication is a workflow where tasks, updates, and decisions can move forward without requiring everyone to be online at the same time.

### Why It Matters

It reduces meeting load and keeps work moving across time zones and jobsite schedules.

### Prompt

What should be asynchronous versus a meeting?

### Key Steps

- Use written updates for status, decisions, and requests.
- Reserve meetings for conflicts, tradeoffs, and complex alignment.
- Document decisions in a shared place after they are made.
      `.trim(),
    },
    {
      title: 'Meeting Hygiene',
      tags: ['back-office', 'communications', 'productivity'],
      body: `
## Meeting Hygiene

Meeting hygiene is the practice of running fewer meetings, with clearer agendas and better outcomes. A meeting should produce decisions or action items.

### Why It Matters

Bad meetings create decision drag and reduce focus time for estimating and operations.

### Prompt

How do we reduce meetings without losing alignment?

### Key Steps

- Require an agenda and owner for recurring meetings.
- End with decisions, owners, and deadlines.
- Cancel meetings when updates can be written.
      `.trim(),
    },
    {
      title: 'Internal Status Updates',
      tags: ['back-office', 'communications', 'project-management'],
      body: `
## Internal Status Updates

Status updates are short, consistent summaries of what changed, what is blocked, and what is next. They work best when they follow the same format every time.

### Why It Matters

Leaders can make better decisions when the information is current and comparable.

### Prompt

What format should our weekly status update use?

### Key Steps

- Use a standard template: wins, risks, next steps, asks.
- Link to source documents instead of rewriting them.
- Keep updates short and send them on a schedule.
      `.trim(),
    },
    {
      title: 'Decision Logging',
      tags: ['back-office', 'communications', 'documentation'],
      body: `
## Decision Logging

A decision log records what was decided, when, and by whom, plus the rationale. It prevents repeat debates and protects context when teams change.

### Why It Matters

Without a log, decisions get revisited and teams lose trust in the process.

### Prompt

Where should decisions be recorded so they are easy to find?

### Key Steps

- Keep one shared decision log per company or per project.
- Record the decision, owner, date, and the tradeoffs considered.
- Link to supporting docs and follow-up tasks.
      `.trim(),
    },
    {
      title: 'Handoff Communication',
      tags: ['back-office', 'communications', 'operations'],
      body: `
## Handoff Communication

Handoff communication is how information moves from estimating to operations, and from operations to billing and closeout. It must include assumptions and scope clarifications.

### Why It Matters

Most profit leaks come from unclear handoffs, not math errors.

### Prompt

What must be included in every estimating-to-operations handoff?

### Key Steps

- Include scope clarifications, exclusions, and production assumptions.
- Identify risks and the plan to manage them.
- Link the handoff to the Master Takeoff and supporting files.
      `.trim(),
    },
    {
      title: 'Client Communication Standards',
      tags: ['back-office', 'communications', 'customer-experience'],
      body: `
## Client Communication Standards

Client communication standards define how quickly you respond, how you document changes, and how you confirm decisions. Consistency builds trust.

### Why It Matters

Clear communication reduces change order disputes and accelerates approvals.

### Prompt

What should our default response and documentation standard be?

### Key Steps

- Set a response-time standard for emails and RFIs.
- Confirm changes in writing before executing.
- Store key client communications in the project folder.
      `.trim(),
    },
    {
      title: 'Escalation Paths',
      tags: ['back-office', 'communications', 'leadership'],
      body: `
## Escalation Paths

Escalation paths define who to contact when decisions are blocked or risk increases. They help teams act fast without confusion or politics.

### Why It Matters

Blocked work becomes schedule risk, then cost risk.

### Prompt

When a decision is stuck, who owns the escalation?

### Key Steps

- Define escalation owners by topic: safety, schedule, money, client.
- Set time limits: escalate after 24 hours for critical issues.
- Log the outcome so the pattern improves over time.
      `.trim(),
    },
    {
      title: 'Communication Channels by Topic',
      tags: ['back-office', 'communications', 'workflow'],
      body: `
## Communication Channels by Topic

Channel discipline means each topic has a home. When everything happens everywhere, nothing can be found later.

### Why It Matters

Teams waste time searching and re-asking questions, especially on repeat work.

### Prompt

Which topics should have dedicated channels?

### Key Steps

- Separate channels for estimating, operations, billing, and leadership.
- Keep decisions and documents linked in the channel thread.
- Close or archive inactive channels to reduce noise.
      `.trim(),
    },

    // Security (8)
    {
      title: 'Two-Factor Authentication (2FA)',
      tags: ['back-office', 'security', 'risk-management'],
      body: `
## Two-Factor Authentication (2FA)

2FA adds a second step to logins, reducing the risk of account takeovers. It should be mandatory for email, file storage, and finance systems.

### Why It Matters

Account compromise can lead to wire fraud, data loss, and downtime.

### Prompt

Which accounts must have 2FA enabled?

### Key Steps

- Require 2FA for admins and finance roles first.
- Use an authenticator app instead of SMS when possible.
- Document recovery procedures for lost devices.
      `.trim(),
    },
    {
      title: 'Password Manager Policy',
      tags: ['back-office', 'security', 'infrastructure'],
      body: `
## Password Manager Policy

A password manager reduces password reuse and helps teams share credentials safely when needed.

### Why It Matters

Weak password practices are one of the most common causes of breaches.

### Prompt

How should teams store and share passwords?

### Key Steps

- Require a password manager for company accounts.
- Use unique passwords for every system.
- Remove shared logins and create role-based accounts.
      `.trim(),
    },
    {
      title: 'Vendor and Subcontractor Access',
      tags: ['back-office', 'security', 'subcontractors'],
      body: `
## Vendor and Subcontractor Access

External access should be granted intentionally, with limits. Vendors may need drawings or schedules, but not full internal folders.

### Why It Matters

Over-sharing increases legal, security, and reputational risk.

### Prompt

What should we share externally by default?

### Key Steps

- Share only what is needed, for a specific purpose, for a limited time.
- Use read-only links when possible.
- Track external shares and review them monthly.
      `.trim(),
    },
    {
      title: 'Phishing and Wire Fraud Prevention',
      tags: ['back-office', 'security', 'fraud-prevention'],
      body: `
## Phishing and Wire Fraud Prevention

Phishing attempts target invoices, payment instructions, and credentials. Wire fraud prevention is a workflow, not a training slide.

### Why It Matters

One fake invoice can cost more than a year of software.

### Prompt

How should we verify payment and banking changes?

### Key Steps

- Verify banking changes by phone using a known number.
- Require two-person approval for large payments.
- Train teams to report suspicious messages immediately.
      `.trim(),
    },
    {
      title: 'Account Offboarding Checklist',
      tags: ['back-office', 'security', 'operations'],
      body: `
## Account Offboarding Checklist

Offboarding is the process of removing access when someone leaves the company. It must be fast and consistent.

### Why It Matters

Old accounts are a common entry point for breaches and data leakage.

### Prompt

What should happen on the day someone leaves?

### Key Steps

- Disable email and file access immediately.
- Transfer ownership of shared docs and calendars.
- Rotate shared credentials and review vendor access.
      `.trim(),
    },
    {
      title: 'Least Privilege Access',
      tags: ['back-office', 'security', 'governance'],
      body: `
## Least Privilege Access

Least privilege means people get only the access they need to do their job, and no more.

### Why It Matters

It limits the blast radius of mistakes and compromised accounts.

### Prompt

How do we implement least privilege without slowing work?

### Key Steps

- Create role-based access groups.
- Default new users to minimal access.
- Review permissions quarterly and adjust.
      `.trim(),
    },
    {
      title: 'Data Retention',
      tags: ['back-office', 'security', 'documentation'],
      body: `
## Data Retention

Data retention defines what you keep, for how long, and where it lives. It should align with legal needs and operational reality.

### Why It Matters

Keeping everything forever increases risk and makes search harder.

### Prompt

What should we retain versus archive?

### Key Steps

- Define retention rules for contracts, billing, HR, and email.
- Archive closed projects into read-only storage.
- Delete what is no longer needed when legally permitted.
      `.trim(),
    },
    {
      title: 'Incident Response Basics',
      tags: ['back-office', 'security', 'risk-management'],
      body: `
## Incident Response Basics

Incident response is the plan for what you do when something goes wrong: lost device, compromised account, or data leak.

### Why It Matters

Speed and clarity reduce damage.

### Prompt

Who does what during a security incident?

### Key Steps

- Assign an incident owner and backups.
- Document steps: isolate, reset, communicate, restore.
- Practice a tabletop scenario once per quarter.
      `.trim(),
    },

    // Documentation (9)
    {
      title: 'Standard Operating Procedures (SOPs)',
      tags: ['back-office', 'documentation', 'operations'],
      body: `
## Standard Operating Procedures (SOPs)

SOPs describe how work is done, step by step, with clear owners and quality checks. SOPs turn tribal knowledge into a repeatable system.

### Why It Matters

Without SOPs, performance depends on memory and heroics.

### Prompt

Which SOPs should we write first?

### Key Steps

- Start with recurring work: billing, closeout, procurement, onboarding.
- Keep SOPs short and linked to templates.
- Update SOPs after every process improvement.
      `.trim(),
    },
    {
      title: 'Template Library',
      tags: ['back-office', 'documentation', 'infrastructure'],
      body: `
## Template Library

A template library is a central folder of approved documents: emails, checklists, logs, and forms. Templates reduce variance and speed up execution.

### Why It Matters

Templates prevent rework and keep the company voice consistent.

### Prompt

What belongs in our template library?

### Key Steps

- Store templates in a read-only folder with an owner.
- Name templates by use case and workflow step.
- Review quarterly and retire outdated versions.
      `.trim(),
    },
    {
      title: 'Project Folder Setup',
      tags: ['back-office', 'documentation', 'project-management'],
      body: `
## Project Folder Setup

Folder setup is the first step of project discipline. A consistent folder map makes handoffs easier and keeps documentation complete.

### Why It Matters

If setup is inconsistent, closeout becomes painful and billing gets delayed.

### Prompt

What folders should every project include?

### Key Steps

- Create a standard set: admin, drawings, subs, RFIs, billing, closeout.
- Automate folder creation when possible.
- Make one person accountable for setup quality.
      `.trim(),
    },
    {
      title: 'Version Control for Documents',
      tags: ['back-office', 'documentation', 'quality-control'],
      body: `
## Version Control for Documents

Version control prevents teams from pricing or executing from outdated information. It includes naming, change logs, and access control.

### Why It Matters

Wrong versions create expensive mistakes.

### Prompt

How do we prevent old drawings or scopes from being used?

### Key Steps

- Store "current" docs in one place and archive old versions.
- Use dates and revision numbers in filenames.
- Announce updates in the project communication channel.
      `.trim(),
    },
    {
      title: 'Documentation Quality Checks',
      tags: ['back-office', 'documentation', 'accountability'],
      body: `
## Documentation Quality Checks

Quality checks ensure documents are complete, readable, and stored correctly. This is how the back office stays reliable under load.

### Why It Matters

Missing documents create billing delays and dispute risk.

### Prompt

What should we check before a document is considered complete?

### Key Steps

- Confirm owner, date, and correct project folder.
- Verify links work and attachments are included.
- Add a quick checklist to each workflow.
      `.trim(),
    },
    {
      title: 'Onboarding Documentation',
      tags: ['back-office', 'documentation', 'training'],
      body: `
## Onboarding Documentation

Onboarding docs teach new team members how the business runs: tools, workflow, file map, and expectations. Good onboarding reduces ramp time.

### Why It Matters

Every week of faster ramp time is real margin.

### Prompt

What should a new hire read in their first week?

### Key Steps

- Provide a one-page overview of systems and channels.
- Include role-specific checklists and templates.
- Assign a mentor and track progress.
      `.trim(),
    },
    {
      title: 'Training Playbooks',
      tags: ['back-office', 'documentation', 'training'],
      body: `
## Training Playbooks

Playbooks combine SOPs, examples, and checklists into a repeatable training path. They work best when they are short and updated frequently.

### Why It Matters

Training should be a system, not a one-time event.

### Prompt

Which role needs a playbook first?

### Key Steps

- Start with high-impact roles: estimator, PM, admin.
- Include example artifacts from real projects.
- Track common questions and update the playbook.
      `.trim(),
    },
    {
      title: 'Knowledge Base for FAQs',
      tags: ['back-office', 'documentation', 'operations'],
      body: `
## Knowledge Base for FAQs

A knowledge base captures answers to repeated questions: processes, tool usage, and common decisions. It should be searchable and easy to update.

### Why It Matters

Every repeated question is hidden cost.

### Prompt

What questions should we document immediately?

### Key Steps

- Capture the top 25 repeated questions from the last month.
- Link answers to the SOP or template.
- Assign an owner to keep the knowledge base current.
      `.trim(),
    },
    {
      title: 'Closeout Documentation',
      tags: ['back-office', 'documentation', 'project-closeout'],
      body: `
## Closeout Documentation

Closeout documentation includes warranties, as-builts, inspections, final invoices, and sign-offs. A consistent closeout package reduces disputes and speeds final payment.

### Why It Matters

Late closeout is often the reason retainage drags out.

### Prompt

What should our closeout package include by default?

### Key Steps

- Create a closeout checklist by project type.
- Store all closeout files in one folder with a clear owner.
- Schedule a closeout review meeting before final billing.
      `.trim(),
    },

    // Operations (8)
    {
      title: 'Operationalizing the Back Office',
      tags: ['back-office', 'operations', 'workflow'],
      body: `
## Operationalizing the Back Office

Operationalizing the back office means turning administrative work into a reliable system. The goal is repeatable outcomes: fewer misses, faster billing, cleaner handoffs.

### Why It Matters

Operations is the product. The back office is how you deliver it consistently.

### Prompt

Where should we start if everything feels messy?

### Key Steps

- Map your workflows: estimating, procurement, billing, closeout.
- Add templates and checklists to reduce variance.
- Assign owners and measurable standards for each workflow.
      `.trim(),
    },
    {
      title: 'Billing Workflow Discipline',
      tags: ['back-office', 'operations', 'billing'],
      body: `
## Billing Workflow Discipline

Billing discipline is a repeatable process for getting paid on time. It includes documentation, approvals, submission timing, and follow-up.

### Why It Matters

Cash flow is operational oxygen.

### Prompt

What steps prevent late or rejected invoices?

### Key Steps

- Collect backup documents before the billing cycle ends.
- Use a standard checklist for each submission.
- Track approvals and follow up on a schedule.
      `.trim(),
    },
    {
      title: 'Accounts Receivable Follow-Up',
      tags: ['back-office', 'operations', 'cash-flow'],
      body: `
## Accounts Receivable Follow-Up

AR follow-up is a system for ensuring invoices do not disappear into someone else's inbox. It requires cadence and clear responsibility.

### Why It Matters

Most AR problems are process problems, not client problems.

### Prompt

How should we run AR follow-up weekly?

### Key Steps

- Review AR weekly with an owner and a list of next actions.
- Separate "awaiting approval" from "past due" statuses.
- Keep all follow-up notes in one place.
      `.trim(),
    },
    {
      title: 'Job Cost Coding Basics',
      tags: ['back-office', 'operations', 'job-costing'],
      body: `
## Job Cost Coding Basics

Cost codes categorize expenses so you can compare estimate vs actual and understand where profit is made or lost.

### Why It Matters

If costs are not coded correctly, reports become noise.

### Prompt

What cost codes do we need to start?

### Key Steps

- Use a simple, consistent code set across projects.
- Train the team on how to code common expenses.
- Audit coding weekly during the first month of adoption.
      `.trim(),
    },
    {
      title: 'Procurement and Purchasing Controls',
      tags: ['back-office', 'operations', 'procurement'],
      body: `
## Procurement and Purchasing Controls

Purchasing controls define who can buy, what approval is required, and where receipts and documentation live.

### Why It Matters

Uncontrolled purchasing creates cost overruns and missing documentation.

### Prompt

How do we control purchases without slowing crews down?

### Key Steps

- Define approval thresholds by dollar amount.
- Require receipts and job coding for every purchase.
- Track open purchase orders and delivery status.
      `.trim(),
    },
    {
      title: 'Inventory and Materials Tracking',
      tags: ['back-office', 'operations', 'materials'],
      body: `
## Inventory and Materials Tracking

Inventory tracking ensures materials are available when needed and reduces waste. It is a simple system: what we have, what we need, and when it arrives.

### Why It Matters

Material delays become labor waste and schedule risk.

### Prompt

What is the minimum viable inventory system?

### Key Steps

- Track critical materials with lead times.
- Tie deliveries to the schedule and the responsible owner.
- Reconcile usage and update future estimates.
      `.trim(),
    },
    {
      title: 'Operational Checklists',
      tags: ['back-office', 'operations', 'quality-control'],
      body: `
## Operational Checklists

Checklists turn best practices into default behavior. They prevent misses in high-pressure moments and support training.

### Why It Matters

Consistency beats memory.

### Prompt

Which checklists create the most value fast?

### Key Steps

- Start with bid submission, mobilization, billing, and closeout.
- Keep checklists short and role-specific.
- Review and improve checklists monthly.
      `.trim(),
    },
    {
      title: 'After Action Reviews (AARs)',
      tags: ['back-office', 'operations', 'continuous-improvement'],
      body: `
## After Action Reviews (AARs)

After Action Reviews are structured discussions after a project or milestone. They capture what worked, what failed, and what to change.

### Why It Matters

Learning must be intentional or it disappears.

### Prompt

How should we run an AAR in 30 minutes?

### Key Steps

- Ask four questions: plan, actual, why, next time.
- Assign owners to implement improvements.
- Update SOPs and templates based on the findings.
      `.trim(),
    },

    // Strategy (8)
    {
      title: 'Back Office Strategy',
      tags: ['back-office', 'strategy', 'operations'],
      body: `
## Back Office Strategy

Back office strategy is the deliberate design of systems that support the business plan. It aligns tools, workflows, and roles with how you win and deliver work.

### Why It Matters

If the back office is misaligned, growth increases chaos instead of profit.

### Prompt

What outcomes should our back office optimize for?

### Key Steps

- Define your primary constraints: time, cash, capacity, risk.
- Align workflows to reduce those constraints.
- Review quarterly and adjust as the business evolves.
      `.trim(),
    },
    {
      title: 'Capacity Planning',
      tags: ['back-office', 'strategy', 'resource-planning'],
      body: `
## Capacity Planning

Capacity planning ensures you do not sell more work than you can deliver. It connects pipeline, staffing, and schedule.

### Why It Matters

Over-commitment is a common cause of quality issues and burnout.

### Prompt

How do we know if we have capacity to take on a new job?

### Key Steps

- Track current workload, backlog, and staffing.
- Identify bottlenecks by role and by equipment.
- Build a simple capacity dashboard reviewed weekly.
      `.trim(),
    },
    {
      title: 'Process Metrics That Matter',
      tags: ['back-office', 'strategy', 'metrics'],
      body: `
## Process Metrics That Matter

Process metrics measure the health of workflows: speed, accuracy, and reliability. They are different from financial outcomes, but they influence them.

### Why It Matters

You cannot improve what you do not measure.

### Prompt

Which back office metrics should we track monthly?

### Key Steps

- Track billing cycle time and rejection rate.
- Track estimating cycle time and win rate.
- Track closeout cycle time and retainage age.
      `.trim(),
    },
    {
      title: 'Standardization vs Flexibility',
      tags: ['back-office', 'strategy', 'workflow'],
      body: `
## Standardization vs Flexibility

Standardization makes work repeatable. Flexibility handles exceptions. A strong back office defines standards first, then defines how exceptions are handled.

### Why It Matters

Too much flexibility turns into chaos. Too much standardization turns into friction.

### Prompt

Where do we need strict standards versus judgment?

### Key Steps

- Standardize recurring workflows and templates.
- Allow flexibility at the decision points, with documentation.
- Review exceptions and update standards over time.
      `.trim(),
    },
    {
      title: 'Quarterly Operations Review',
      tags: ['back-office', 'strategy', 'leadership'],
      body: `
## Quarterly Operations Review

A quarterly review is a leadership ritual to evaluate what is working, what is breaking, and what to improve next.

### Why It Matters

Without review cycles, problems compound quietly.

### Prompt

What should we cover in a quarterly operations review?

### Key Steps

- Review metrics: billing, AR, estimating, closeout.
- Review the top 3 workflow failures and root causes.
- Commit to a short list of improvements for next quarter.
      `.trim(),
    },
    {
      title: 'Client Selection and Risk Appetite',
      tags: ['back-office', 'strategy', 'risk-management'],
      body: `
## Client Selection and Risk Appetite

Client selection is strategy. Payment terms, contract structure, and communication habits determine how hard the back office has to work to get paid.

### Why It Matters

Bad clients create operational drag and cash flow risk.

### Prompt

How do we screen clients from a back office perspective?

### Key Steps

- Evaluate payment history and approval process.
- Set contract terms that match your risk appetite.
- Document red flags and update your go/no-go criteria.
      `.trim(),
    },
    {
      title: 'Profit Protection Systems',
      tags: ['back-office', 'strategy', 'profit'],
      body: `
## Profit Protection Systems

Profit protection is the set of controls that prevent margin leakage: documentation, approvals, change management, and job costing discipline.

### Why It Matters

Most margin loss comes from unmanaged scope and weak follow-through.

### Prompt

What systems protect profit on every project?

### Key Steps

- Require written change approval before executing.
- Track estimate vs actual weekly and act on variances.
- Run closeout and retainage as a workflow, not a hope.
      `.trim(),
    },
    {
      title: 'Scaling Without Chaos',
      tags: ['back-office', 'strategy', 'scaling'],
      body: `
## Scaling Without Chaos

Scaling without chaos means adding work or people without breaking workflows. It requires clear roles, training, and standards.

### Why It Matters

Growth without systems increases rework and reduces profitability.

### Prompt

What should we standardize before hiring more people?

### Key Steps

- Standardize the top workflows and templates.
- Create onboarding and training playbooks.
- Assign owners and improve systems continuously.
      `.trim(),
    },
  ];

  // Add remaining entries to reach 50 total (the list above is 50 exactly).
  if (entries.length !== 50) {
    throw new Error(`Expected 50 entries, got ${entries.length}`);
  }

  let written = 0;
  for (const entry of entries) {
    // Ensure at least two tags for SEO/retrieval.
    if (entry.tags.length < 2) {
      throw new Error(`Entry "${entry.title}" must have at least 2 tags.`);
    }
    const result = writeEntry(outputDir, entry);
    if (result.written) written++;
  }

  console.log(`Back-office entries: wrote ${written} files to ${outputDir}`);
}

main();
