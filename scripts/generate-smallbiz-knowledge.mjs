import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'content', 'knowledge', 'smallbiz');

const entries = [
  {
    slug: 'how-to-start-a-small-business',
    title: 'How to Start a Small Business',
    tags: ['small business', 'startup', 'business basics', 'entrepreneurship'],
    question: 'How do I start a small business?',
    answer:
      'Start with one clear offer, one clear customer, and one simple way to get paid. Do not build a complicated company before you prove demand.',
    bullets: [
      'Define the problem you solve and who will pay for it.',
      'Choose a legal structure, open a business bank account, and separate finances.',
      'Set a simple price, start selling, and track every lead and sale.',
    ],
  },
  {
    slug: 'how-to-validate-a-business-idea',
    title: 'How to Validate a Business Idea',
    tags: ['business idea', 'validation', 'startup', 'market research'],
    question: 'How can I validate a business idea before I invest too much money?',
    answer:
      'Validation means real buyers show interest before you build too much. The goal is proof of demand, not compliments.',
    bullets: [
      'Interview potential customers and listen for repeated pain points.',
      'Offer a simple version of the service or product first.',
      'Measure replies, calls, deposits, and purchases instead of opinions.',
    ],
  },
  {
    slug: 'how-to-write-a-simple-business-plan',
    title: 'How to Write a Simple Business Plan',
    tags: ['business plan', 'small business planning', 'startup'],
    question: 'What should go into a simple business plan?',
    answer:
      'A useful small-business plan is short. It should explain what you sell, who you sell to, how you make money, and what numbers matter.',
    bullets: [
      'Include your offer, customer, pricing, marketing, and operating costs.',
      'List startup costs, monthly expenses, and monthly revenue targets.',
      'Review the plan every month and update it with real results.',
    ],
  },
  {
    slug: 'do-i-need-an-llc',
    title: 'Do I Need an LLC',
    tags: ['llc', 'legal structure', 'small business formation'],
    question: 'Do I need an LLC to start a business?',
    answer:
      'Not every business needs an LLC on day one, but many owners choose one to separate personal and business liability. The right structure depends on risk, taxes, and growth plans.',
    bullets: [
      'Compare sole proprietor, LLC, and corporation options with a CPA or attorney.',
      'Consider contracts, liability, hiring plans, and tax treatment.',
      'Separate your banking and bookkeeping even if you start small.',
    ],
  },
  {
    slug: 'how-to-pick-a-business-name',
    title: 'How to Pick a Business Name',
    tags: ['business name', 'branding', 'startup'],
    question: 'How should I choose a business name?',
    answer:
      'Choose a name that is clear, easy to say, easy to spell, and available online. A simple name usually beats a clever one.',
    bullets: [
      'Check state registration, domain name, and social handle availability.',
      'Make sure customers can understand and remember it quickly.',
      'Avoid names that limit future growth if you may expand services later.',
    ],
  },
  {
    slug: 'how-to-price-a-service-business',
    title: 'How to Price a Service Business',
    tags: ['pricing', 'service business', 'small business finance'],
    question: 'How should I price my service business?',
    answer:
      'Price from your real costs, required profit, and market position. Guessing low to win work often creates cash problems later.',
    bullets: [
      'Calculate labor, materials, software, travel, taxes, and overhead.',
      'Add a target profit margin instead of pricing from emotion.',
      'Review jobs monthly to see which services are actually profitable.',
    ],
  },
  {
    slug: 'how-to-price-a-product',
    title: 'How to Price a Product',
    tags: ['product pricing', 'retail pricing', 'small business'],
    question: 'How do I price a physical product?',
    answer:
      'Your product price needs to cover product cost, shipping, packaging, payment fees, marketing, and profit. Low pricing without margin discipline creates volume with no cash.',
    bullets: [
      'Know your landed cost before setting retail price.',
      'Test price points with real buyers, not only friends.',
      'Protect margin so discounts do not erase profit.',
    ],
  },
  {
    slug: 'what-licenses-do-i-need',
    title: 'What Licenses Do I Need',
    tags: ['business license', 'permits', 'compliance', 'startup'],
    question: 'What business licenses or permits do I need?',
    answer:
      'Licenses depend on your city, state, industry, and whether you sell products or regulated services. Start local and confirm requirements before you open.',
    bullets: [
      'Check city, county, and state rules for your exact business type.',
      'Ask whether sales tax permits, health permits, or professional licenses apply.',
      'Track renewal dates so you do not fall out of compliance.',
    ],
  },
  {
    slug: 'how-to-open-a-business-bank-account',
    title: 'How to Open a Business Bank Account',
    tags: ['business banking', 'startup', 'finance'],
    question: 'When should I open a business bank account?',
    answer:
      'Open it as soon as you form the business or start taking money. Mixed personal and business spending makes taxes, bookkeeping, and trust harder.',
    bullets: [
      'Use a separate account for income, expenses, and owner pay.',
      'Ask about monthly fees, minimum balances, and online tools.',
      'Connect the account to bookkeeping software from the start.',
    ],
  },
  {
    slug: 'do-i-need-bookkeeping-software',
    title: 'Do I Need Bookkeeping Software',
    tags: ['bookkeeping', 'accounting software', 'small business finance'],
    question: 'Do I need bookkeeping software for a small business?',
    answer:
      'Yes, if you want clean records, faster tax prep, and better decisions. Spreadsheets can work briefly, but they become weak once transactions grow.',
    bullets: [
      'Track income, expenses, invoices, and bank reconciliations in one place.',
      'Categorize transactions weekly, not at tax time.',
      'Use reports to watch cash flow, profit, and unpaid invoices.',
    ],
  },
  {
    slug: 'how-to-manage-cash-flow',
    title: 'How to Manage Cash Flow',
    tags: ['cash flow', 'small business finance', 'working capital'],
    question: 'How can a small business manage cash flow better?',
    answer:
      'Cash flow improves when you collect faster, spend with discipline, and plan ahead. Profit on paper does not protect you from running out of cash.',
    bullets: [
      'Invoice quickly and follow up on receivables every week.',
      'Know your fixed costs, variable costs, and low-cash threshold.',
      'Build a reserve so one slow month does not break operations.',
    ],
  },
  {
    slug: 'how-to-calculate-break-even',
    title: 'How to Calculate Break Even',
    tags: ['break even', 'small business finance', 'pricing'],
    question: 'How do I calculate my business break-even point?',
    answer:
      'Break even is the sales level where revenue covers all fixed and variable costs. It tells you the minimum performance required to stay open.',
    bullets: [
      'List monthly fixed costs like rent, payroll, software, and insurance.',
      'Estimate gross profit per sale or per job.',
      'Divide total fixed costs by gross profit per unit to find break even.',
    ],
  },
  {
    slug: 'how-much-money-do-i-need-to-start',
    title: 'How Much Money Do I Need to Start',
    tags: ['startup costs', 'small business startup', 'business finance'],
    question: 'How much money do I need to start a business?',
    answer:
      'You need enough to launch, sell, and survive the first slow period. Many founders underestimate working capital more than startup tools.',
    bullets: [
      'Separate one-time startup costs from monthly operating costs.',
      'Estimate at least a few months of cash needs before stable sales.',
      'Start lean and delay nonessential spending until demand is proven.',
    ],
  },
  {
    slug: 'should-i-bootstrap-or-borrow',
    title: 'Should I Bootstrap or Borrow',
    tags: ['bootstrap', 'business loans', 'startup funding'],
    question: 'Should I bootstrap my business or take a loan?',
    answer:
      'Bootstrap if you can prove demand with low cost and low risk. Borrow when capital clearly creates revenue and repayment is realistic.',
    bullets: [
      'Do not borrow to cover confusion or weak pricing.',
      'Use debt for equipment, inventory, or growth with visible return.',
      'Stress test repayment with conservative sales assumptions.',
    ],
  },
  {
    slug: 'how-to-prepare-for-a-small-business-loan',
    title: 'How to Prepare for a Small Business Loan',
    tags: ['small business loan', 'funding', 'sba loan'],
    question: 'How do I prepare for a small-business loan application?',
    answer:
      'Lenders want proof that the business can repay the loan. Preparation is usually more important than the pitch itself.',
    bullets: [
      'Gather financial statements, tax returns, ownership documents, and use of funds.',
      'Show historical revenue or a realistic forecast tied to demand.',
      'Explain how the loan will improve sales, margin, or capacity.',
    ],
  },
  {
    slug: 'what-credit-score-do-i-need-for-a-business-loan',
    title: 'What Credit Score Do I Need for a Business Loan',
    tags: ['business credit', 'small business loan', 'funding'],
    question: 'What credit score do I need for a business loan?',
    answer:
      'Lenders look at personal credit, business performance, debt, and cash flow together. There is no single universal score cutoff for every loan.',
    bullets: [
      'Check both personal credit and business credit before applying.',
      'Improve payment history and reduce unnecessary debt if possible.',
      'Ask lenders what minimums they use for the specific product.',
    ],
  },
  {
    slug: 'how-to-build-business-credit',
    title: 'How to Build Business Credit',
    tags: ['business credit', 'small business finance', 'funding'],
    question: 'How can a small business build business credit?',
    answer:
      'Business credit builds through structure, reporting accounts, and consistent on-time payments. It takes repetition, not one big move.',
    bullets: [
      'Form the business, get an EIN, and use the business name consistently.',
      'Open vendor or credit accounts that report to business bureaus.',
      'Pay on time and keep balances controlled.',
    ],
  },
  {
    slug: 'how-to-create-a-monthly-budget',
    title: 'How to Create a Monthly Budget',
    tags: ['budget', 'small business finance', 'planning'],
    question: 'How should a small business build a monthly budget?',
    answer:
      'A monthly budget should tell you what you expect to earn, spend, and keep. It becomes useful when you compare plan versus actual every month.',
    bullets: [
      'List fixed costs, variable costs, debt payments, and owner pay.',
      'Set realistic sales targets based on current pipeline and seasonality.',
      'Review misses early so you can adjust before cash gets tight.',
    ],
  },
  {
    slug: 'how-to-pay-yourself-as-a-business-owner',
    title: 'How to Pay Yourself as a Business Owner',
    tags: ['owner pay', 'small business finance', 'compensation'],
    question: 'How should I pay myself as a business owner?',
    answer:
      'Pay yourself with a clear method instead of random withdrawals. Consistent owner pay improves planning and protects business cash.',
    bullets: [
      'Ask your CPA whether salary, draw, or distributions fit your entity.',
      'Separate owner compensation from business expense categories.',
      'Do not drain operating cash just because revenue came in this week.',
    ],
  },
  {
    slug: 'how-to-prepare-for-business-taxes',
    title: 'How to Prepare for Business Taxes',
    tags: ['business taxes', 'tax planning', 'small business'],
    question: 'How can I prepare for business taxes all year?',
    answer:
      'Tax prep works best as a weekly bookkeeping habit, not an annual scramble. Clean records reduce stress and mistakes.',
    bullets: [
      'Track income and expenses accurately every week.',
      'Save money for taxes as revenue comes in.',
      'Meet with a CPA before year end to avoid preventable surprises.',
    ],
  },
  {
    slug: 'how-to-track-business-expenses',
    title: 'How to Track Business Expenses',
    tags: ['expense tracking', 'bookkeeping', 'small business'],
    question: 'What is the best way to track business expenses?',
    answer:
      'Track expenses by category and attach proof while the details are still fresh. Good expense tracking supports taxes, pricing, and decision making.',
    bullets: [
      'Use one card or account for business spending whenever possible.',
      'Capture receipts and notes quickly with a repeatable process.',
      'Review categories monthly so waste and leaks become visible.',
    ],
  },
  {
    slug: 'what-insurance-does-a-small-business-need',
    title: 'What Insurance Does a Small Business Need',
    tags: ['business insurance', 'risk management', 'small business'],
    question: 'What insurance should a small business have?',
    answer:
      'Insurance depends on your work, location, contracts, employees, and assets. The right coverage protects cash flow when something goes wrong.',
    bullets: [
      'Review general liability, professional liability, property, auto, and workers compensation.',
      'Ask what clients or landlords require in contracts.',
      'Update coverage as revenue, equipment, and staffing grow.',
    ],
  },
  {
    slug: 'how-to-find-my-ideal-customer',
    title: 'How to Find My Ideal Customer',
    tags: ['ideal customer', 'target market', 'marketing'],
    question: 'How do I identify my ideal customer?',
    answer:
      'Your ideal customer is the buyer with a real problem, the budget to solve it, and a reason to act now. Clarity here improves marketing and sales.',
    bullets: [
      'Study your best current customers and look for shared traits.',
      'Define industry, location, budget, urgency, and buying behavior.',
      'Build messaging around the problem they already feel.',
    ],
  },
  {
    slug: 'how-to-do-basic-market-research',
    title: 'How to Do Basic Market Research',
    tags: ['market research', 'small business planning', 'customer research'],
    question: 'How can I do market research for a small business?',
    answer:
      'Good market research is simple: talk to buyers, watch competitors, and study what people actually purchase. Start with real conversations.',
    bullets: [
      'Interview customers about current problems, not just product ideas.',
      'Review competitor websites, pricing, and reviews for patterns.',
      'Use findings to sharpen your offer instead of copying others.',
    ],
  },
  {
    slug: 'how-to-analyze-competitors',
    title: 'How to Analyze Competitors',
    tags: ['competitor analysis', 'small business strategy', 'marketing'],
    question: 'How should a small business analyze competitors?',
    answer:
      'Competitor analysis should reveal gaps, not trigger panic. The goal is to understand positioning, pricing, and where you can be more useful.',
    bullets: [
      'Compare offer, pricing, speed, reviews, and customer experience.',
      'Notice what buyers praise and what they complain about.',
      'Compete on clarity, trust, and execution instead of copying everything.',
    ],
  },
  {
    slug: 'how-to-create-a-unique-value-proposition',
    title: 'How to Create a Unique Value Proposition',
    tags: ['value proposition', 'messaging', 'marketing'],
    question: 'What is a good value proposition for a small business?',
    answer:
      'A value proposition should say who you help, what result you deliver, and why your offer is different or easier to trust.',
    bullets: [
      'Use plain language instead of vague marketing words.',
      'Focus on one main outcome the buyer wants.',
      'Test whether customers understand it in a few seconds.',
    ],
  },
  {
    slug: 'how-to-build-a-simple-brand',
    title: 'How to Build a Simple Brand',
    tags: ['branding', 'small business marketing', 'brand identity'],
    question: 'How can I build a simple brand without overthinking it?',
    answer:
      'A small-business brand starts with consistency, not complexity. Buyers should quickly recognize your name, promise, and style.',
    bullets: [
      'Use one clear logo, one short message, and one consistent voice.',
      'Match your website, social profiles, signage, and proposals.',
      'Keep the brand aligned with the customer you want most.',
    ],
  },
  {
    slug: 'how-to-build-a-basic-website',
    title: 'How to Build a Basic Website',
    tags: ['small business website', 'online presence', 'marketing'],
    question: 'What should a basic small-business website include?',
    answer:
      'A basic website should help people understand your offer and contact you fast. It is a sales tool, not just an online brochure.',
    bullets: [
      'Include who you help, what you do, pricing cues, and contact action.',
      'Add testimonials, service area, and clear next steps.',
      'Make the site fast, mobile friendly, and easy to update.',
    ],
  },
  {
    slug: 'what-pages-should-my-website-have',
    title: 'What Pages Should My Website Have',
    tags: ['website pages', 'seo', 'small business website'],
    question: 'Which website pages should a small business have first?',
    answer:
      'Start with the pages that answer the most common buyer questions. More pages do not help if the basics are weak.',
    bullets: [
      'Build a homepage, service page, about page, contact page, and FAQ.',
      'Add location pages only if they reflect real service areas.',
      'Use each page to answer one clear buyer intent.',
    ],
  },
  {
    slug: 'how-to-set-up-google-business-profile',
    title: 'How to Set Up Google Business Profile',
    tags: ['google business profile', 'local seo', 'small business marketing'],
    question: 'How do I set up Google Business Profile for local marketing?',
    answer:
      'Google Business Profile is one of the fastest ways to appear in local searches. Complete profiles tend to earn more calls and direction requests.',
    bullets: [
      'Use your real business name, correct category, phone, and hours.',
      'Add photos, service areas, and a short keyword-relevant description.',
      'Ask happy customers for reviews and reply to them consistently.',
    ],
  },
  {
    slug: 'how-to-get-google-reviews',
    title: 'How to Get Google Reviews',
    tags: ['google reviews', 'local seo', 'reputation marketing'],
    question: 'How can a small business get more Google reviews?',
    answer:
      'The best review strategy is to ask at the right moment with a simple process. Happy customers often need a direct reminder.',
    bullets: [
      'Ask after a positive result, delivery, or completed service.',
      'Send a direct review link by text or email.',
      'Train the team to ask consistently instead of occasionally.',
    ],
  },
  {
    slug: 'how-to-improve-local-seo',
    title: 'How to Improve Local SEO',
    tags: ['local seo', 'small business marketing', 'search visibility'],
    question: 'How can I improve local SEO for my business?',
    answer:
      'Local SEO improves when your business information is consistent and your website clearly matches local search intent.',
    bullets: [
      'Keep your name, address, phone, and hours consistent across listings.',
      'Create service pages that mention real locations and customer problems.',
      'Earn reviews, local links, and branded searches over time.',
    ],
  },
  {
    slug: 'what-should-i-post-on-social-media',
    title: 'What Should I Post on Social Media',
    tags: ['social media', 'content marketing', 'small business'],
    question: 'What should a small business post on social media?',
    answer:
      'Post content that answers buyer questions, shows proof, and builds trust. Do not post only promotions.',
    bullets: [
      'Share before-and-after work, customer wins, tips, and behind-the-scenes moments.',
      'Use simple educational posts tied to the service you sell.',
      'End posts with one clear next step like call, message, or book.',
    ],
  },
  {
    slug: 'how-often-should-a-small-business-post',
    title: 'How Often Should a Small Business Post',
    tags: ['social media strategy', 'content calendar', 'small business marketing'],
    question: 'How often should a small business post on social media?',
    answer:
      'Consistency matters more than volume. A simple posting schedule you can sustain beats bursts of activity followed by silence.',
    bullets: [
      'Choose a realistic cadence like two to four quality posts per week.',
      'Reuse common questions as recurring content themes.',
      'Track which posts create inquiries, not only likes.',
    ],
  },
  {
    slug: 'how-to-use-email-marketing',
    title: 'How to Use Email Marketing',
    tags: ['email marketing', 'lead nurturing', 'small business'],
    question: 'Is email marketing still useful for small businesses?',
    answer:
      'Yes, email works well when it delivers useful reminders, education, and offers to people who already know you. It supports repeat business and referrals.',
    bullets: [
      'Collect email addresses with permission from customers and prospects.',
      'Send short updates, offers, seasonal reminders, and practical tips.',
      'Measure opens, clicks, replies, and conversions over time.',
    ],
  },
  {
    slug: 'how-to-start-a-simple-newsletter',
    title: 'How to Start a Simple Newsletter',
    tags: ['newsletter', 'email list', 'small business marketing'],
    question: 'How do I start a simple newsletter for my business?',
    answer:
      'A simple newsletter should help customers remember you and trust you. Start small with one useful email a month.',
    bullets: [
      'Use a short format with one tip, one proof point, and one call to action.',
      'Write for real customers, not for generic internet traffic.',
      'Keep the signup promise clear so people know what they will get.',
    ],
  },
  {
    slug: 'should-i-run-facebook-or-instagram-ads',
    title: 'Should I Run Facebook or Instagram Ads',
    tags: ['facebook ads', 'instagram ads', 'paid social'],
    question: 'Should a small business run Facebook or Instagram ads?',
    answer:
      'Paid social can work, but only after your offer, landing page, and follow-up process are clear. Ads amplify weak systems as fast as strong ones.',
    bullets: [
      'Test one offer and one audience before scaling budget.',
      'Send traffic to a focused page with one action to take.',
      'Track leads and sales, not just impressions or clicks.',
    ],
  },
  {
    slug: 'how-to-run-google-ads-on-a-small-budget',
    title: 'How to Run Google Ads on a Small Budget',
    tags: ['google ads', 'small business advertising', 'lead generation'],
    question: 'How can I run Google Ads with a small budget?',
    answer:
      'Small budgets work best when keywords are narrow and intent is high. Broad campaigns waste money quickly.',
    bullets: [
      'Target buyer-ready searches tied to one service or one location.',
      'Use negative keywords to block irrelevant clicks.',
      'Review search terms weekly and adjust based on results.',
    ],
  },
  {
    slug: 'how-to-create-a-marketing-plan',
    title: 'How to Create a Marketing Plan',
    tags: ['marketing plan', 'small business growth', 'strategy'],
    question: 'What should a small-business marketing plan include?',
    answer:
      'A simple marketing plan should connect audience, message, channels, budget, and measurement. It should fit your current capacity.',
    bullets: [
      'Choose a small number of channels you can manage well.',
      'Define monthly lead targets and the activities tied to them.',
      'Review results each month and double down on what works.',
    ],
  },
  {
    slug: 'how-to-get-first-customers',
    title: 'How to Get First Customers',
    tags: ['first customers', 'customer acquisition', 'startup sales'],
    question: 'How can I get my first customers quickly?',
    answer:
      'Your first customers usually come from direct outreach, warm contacts, and local visibility. Early traction often comes from hustle more than automation.',
    bullets: [
      'Start with people who already know your work or trust you.',
      'Reach out directly with a clear offer and a fast call to action.',
      'Ask every early customer for referrals and proof.',
    ],
  },
  {
    slug: 'how-to-get-more-referrals',
    title: 'How to Get More Referrals',
    tags: ['referrals', 'word of mouth marketing', 'small business'],
    question: 'How do I get more referrals for my business?',
    answer:
      'Referrals increase when results are strong and the ask is easy. Most businesses under-ask even when customers are happy.',
    bullets: [
      'Ask directly after a good outcome or compliment.',
      'Tell people exactly who you want introductions to.',
      'Thank referral sources and keep them updated.',
    ],
  },
  {
    slug: 'how-to-sell-without-being-pushy',
    title: 'How to Sell Without Being Pushy',
    tags: ['sales', 'small business selling', 'customer conversations'],
    question: 'How can I sell my service without sounding pushy?',
    answer:
      'Good sales sounds like clear diagnosis, not pressure. Buyers respond better when you help them understand their problem and next step.',
    bullets: [
      'Ask questions before presenting a solution.',
      'Explain the cost of delay and the value of fixing the problem.',
      'Close with a simple option instead of a long speech.',
    ],
  },
  {
    slug: 'how-to-handle-sales-objections',
    title: 'How to Handle Sales Objections',
    tags: ['sales objections', 'small business sales', 'closing deals'],
    question: 'How should I handle common sales objections?',
    answer:
      'Most objections come from price, timing, trust, or confusion. Treat objections as missing clarity, not personal rejection.',
    bullets: [
      'Clarify what the buyer really means before responding.',
      'Use proof, examples, and simple options to reduce uncertainty.',
      'Document repeated objections so you can improve your offer.',
    ],
  },
  {
    slug: 'how-to-write-a-sales-script',
    title: 'How to Write a Sales Script',
    tags: ['sales script', 'sales process', 'small business'],
    question: 'Do I need a sales script for customer calls?',
    answer:
      'A simple script helps you stay consistent and ask the right questions. It should guide the conversation, not make you sound robotic.',
    bullets: [
      'Open with the problem, goals, budget, and timeline questions.',
      'Use the same core structure across calls for better learning.',
      'Refine the script based on real conversations and outcomes.',
    ],
  },
  {
    slug: 'how-to-write-a-good-proposal',
    title: 'How to Write a Good Proposal',
    tags: ['business proposal', 'sales proposal', 'small business'],
    question: 'What makes a good proposal for a small business?',
    answer:
      'A strong proposal removes confusion. It should explain scope, price, timeline, assumptions, and next steps in plain language.',
    bullets: [
      'Write the problem, solution, deliverables, and payment terms clearly.',
      'Avoid vague promises that create disputes later.',
      'End with a direct approval step so momentum is not lost.',
    ],
  },
  {
    slug: 'how-fast-should-i-follow-up-on-leads',
    title: 'How Fast Should I Follow Up on Leads',
    tags: ['lead follow up', 'sales process', 'small business marketing'],
    question: 'How fast should I respond to new leads?',
    answer:
      'Fast follow-up wins more business because buyer intent fades quickly. Delay creates room for competitors and second thoughts.',
    bullets: [
      'Respond the same day whenever possible.',
      'Use a standard reply process for calls, forms, and messages.',
      'Track response time as a real business metric.',
    ],
  },
  {
    slug: 'do-i-need-a-crm',
    title: 'Do I Need a CRM',
    tags: ['crm', 'lead management', 'small business sales'],
    question: 'Does a small business need a CRM?',
    answer:
      'Yes, once leads start slipping through the cracks or follow-up becomes inconsistent. A CRM helps you remember, track, and close.',
    bullets: [
      'Use it to track lead source, status, next step, and close rate.',
      'Keep the setup simple so the team actually uses it.',
      'Review the pipeline weekly to keep opportunities moving.',
    ],
  },
  {
    slug: 'how-to-organize-leads-and-customers',
    title: 'How to Organize Leads and Customers',
    tags: ['lead management', 'crm', 'customer tracking'],
    question: 'How should I organize leads and customer information?',
    answer:
      'Organize contacts by stage and next action. A messy contact list hides revenue opportunities.',
    bullets: [
      'Separate new leads, active proposals, current customers, and past customers.',
      'Store notes, estimates, contracts, and follow-up dates in one place.',
      'Use tags or categories so you can market to the right people later.',
    ],
  },
  {
    slug: 'how-to-build-a-sales-funnel',
    title: 'How to Build a Sales Funnel',
    tags: ['sales funnel', 'lead conversion', 'small business'],
    question: 'What does a simple sales funnel look like for a small business?',
    answer:
      'A simple sales funnel moves people from awareness to inquiry to proposal to sale. It helps you find where leads stall.',
    bullets: [
      'Map the stages from first contact to paid customer.',
      'Measure how many people move from one stage to the next.',
      'Fix the biggest drop-off before adding more marketing.',
    ],
  },
  {
    slug: 'how-to-close-more-sales',
    title: 'How to Close More Sales',
    tags: ['closing sales', 'small business growth', 'sales'],
    question: 'How can I close more sales without discounting everything?',
    answer:
      'Higher close rates usually come from better qualification, clearer offers, and better follow-up. Discounting is often a shortcut for weak sales process.',
    bullets: [
      'Focus on buyers with real need, budget, and timing.',
      'Make your proposal easier to understand and easier to approve.',
      'Follow up with discipline until the deal is won or lost.',
    ],
  },
  {
    slug: 'how-to-hire-your-first-employee',
    title: 'How to Hire Your First Employee',
    tags: ['first employee', 'hiring', 'small business operations'],
    question: 'When should I hire my first employee?',
    answer:
      'Hire when work is consistent enough to support payroll and you know exactly what outcomes the role should produce.',
    bullets: [
      'Write down the tasks, hours, and skills the role actually needs.',
      'Make sure pricing can support wages, taxes, and supervision time.',
      'Hire to solve a repeatable need, not a temporary panic.',
    ],
  },
  {
    slug: 'how-to-write-a-job-description',
    title: 'Writing a Job Description',
    tags: ['hiring', 'hr'],
    question: 'Writing a Job Description',
    answer:
      'A job description outlines responsibilities, required skills, and performance expectations.',
    bullets: [
      'Clear job descriptions help candidates understand the role and help employers evaluate applicants more effectively.',
    ],
  },
  {
    slug: 'where-to-post-small-business-jobs',
    title: 'Where to Post Small Business Jobs',
    tags: ['job boards', 'hiring', 'small business recruiting'],
    question: 'Where should a small business post jobs?',
    answer:
      'Post where your ideal workers already look, and use your own network too. Better applicants often come from trusted referrals and local communities.',
    bullets: [
      'Use job boards, local colleges, trade groups, and community networks.',
      'Ask employees, customers, and partners for referrals.',
      'Write a clear posting so the right people self-select in.',
    ],
  },
  {
    slug: 'how-to-interview-candidates',
    title: 'How to Interview Candidates',
    tags: ['interviewing', 'hiring process', 'small business'],
    question: 'How should a small business interview candidates?',
    answer:
      'Use a repeatable interview process so you compare applicants fairly. The goal is fit, reliability, and coachability, not only confidence.',
    bullets: [
      'Ask the same core questions for every candidate.',
      'Use work examples or scenarios tied to the actual job.',
      'Check references before making a final offer.',
    ],
  },
  {
    slug: 'how-to-onboard-new-employees',
    title: 'How to Onboard New Employees',
    tags: ['employee onboarding', 'training', 'small business'],
    question: 'What does good employee onboarding look like?',
    answer:
      'Good onboarding reduces confusion and gets people productive faster. It should cover expectations, tools, training, and early feedback.',
    bullets: [
      'Prepare access, schedule, and materials before the first day.',
      'Explain standards, communication, and how work is checked.',
      'Use a simple checklist for the first week and first month.',
    ],
  },
  {
    slug: 'how-to-train-employees-consistently',
    title: 'How to Train Employees Consistently',
    tags: ['employee training', 'standard operating procedures', 'small business'],
    question: 'How can I train employees more consistently?',
    answer:
      'Consistent training comes from documented steps and repeated examples. If training lives only in your head, quality will vary.',
    bullets: [
      'Document key tasks with short checklists or videos.',
      'Pair training with real work and clear quality standards.',
      'Update training materials when the process changes.',
    ],
  },
  {
    slug: 'how-to-delegate-as-an-owner',
    title: 'How to Delegate as an Owner',
    tags: ['delegation', 'small business leadership', 'operations'],
    question: 'How do I delegate better as a business owner?',
    answer:
      'Delegation works when the expected result is clear, not just the task. Owners often delegate too late and too vaguely.',
    bullets: [
      'Explain outcome, deadline, quality standard, and decision limits.',
      'Start with repeatable work before delegating complex judgment calls.',
      'Review work early so mistakes do not multiply.',
    ],
  },
  {
    slug: 'how-to-create-standard-operating-procedures',
    title: 'How to Create Standard Operating Procedures',
    tags: ['sop', 'standard operating procedures', 'small business operations'],
    question: 'Do small businesses need standard operating procedures?',
    answer:
      'Yes, if you want consistent quality and easier training. SOPs reduce dependence on memory and make growth less chaotic.',
    bullets: [
      'Document the most repeated tasks first.',
      'Keep each SOP short, specific, and easy to find.',
      'Assign an owner to update the SOP when the process changes.',
    ],
  },
  {
    slug: 'how-to-document-recurring-processes',
    title: 'How to Document Recurring Processes',
    tags: ['process documentation', 'operations', 'small business systems'],
    question: 'Which business processes should I document first?',
    answer:
      'Document the processes that happen often, cause mistakes, or slow the team down. Start where confusion costs the most.',
    bullets: [
      'Prioritize sales, onboarding, invoicing, customer service, and delivery steps.',
      'Write the current process first before trying to perfect it.',
      'Use checklists so people can follow the process under pressure.',
    ],
  },
  {
    slug: 'how-to-improve-customer-service',
    title: 'How to Improve Customer Service',
    tags: ['customer service', 'customer experience', 'small business'],
    question: 'How can a small business improve customer service?',
    answer:
      'Customer service improves when communication is fast, expectations are clear, and problems are resolved without drama.',
    bullets: [
      'Set response standards for calls, email, and text messages.',
      'Tell customers what happens next and when.',
      'Review complaints for patterns and fix the root cause.',
    ],
  },
  {
    slug: 'how-to-handle-customer-complaints',
    title: 'How to Handle Customer Complaints',
    tags: ['customer complaints', 'reputation management', 'customer service'],
    question: 'What is the best way to handle customer complaints?',
    answer:
      'Handle complaints fast, calmly, and with clear next steps. A good recovery can preserve trust better than silence or defensiveness.',
    bullets: [
      'Listen fully before defending the business.',
      'Clarify the issue, timeline, and what resolution is realistic.',
      'Document the complaint so the team can prevent repeat issues.',
    ],
  },
  {
    slug: 'how-to-increase-customer-retention',
    title: 'How to Increase Customer Retention',
    tags: ['customer retention', 'repeat business', 'small business growth'],
    question: 'How can I keep customers coming back?',
    answer:
      'Retention grows when customers get consistent value, clear communication, and a reason to return. Repeat customers are usually cheaper than new ones.',
    bullets: [
      'Follow up after delivery and look for ways to stay useful.',
      'Create recurring offers, reminders, or maintenance services.',
      'Study why customers leave and fix that before buying more ads.',
    ],
  },
  {
    slug: 'how-to-raise-prices-without-losing-everyone',
    title: 'How to Raise Prices Without Losing Everyone',
    tags: ['raising prices', 'pricing strategy', 'small business'],
    question: 'How can I raise prices without losing all my customers?',
    answer:
      'Raise prices with clear reasoning, stronger positioning, and better service discipline. Price increases are easier when value is visible.',
    bullets: [
      'Increase prices on new customers first if needed.',
      'Explain changes around quality, cost, or service improvements.',
      'Do not apologize for pricing that keeps the business healthy.',
    ],
  },
  {
    slug: 'when-should-i-fire-a-customer',
    title: 'When Should I Fire a Customer',
    tags: ['customer fit', 'client management', 'small business'],
    question: 'When should a small business stop working with a customer?',
    answer:
      'End the relationship when the customer repeatedly destroys margin, violates boundaries, or hurts the team more than the revenue helps.',
    bullets: [
      'Look for late payment, scope creep, abuse, or impossible demands.',
      'Set boundaries and document issues before ending the relationship.',
      'Protect the business from customers who create recurring damage.',
    ],
  },
  {
    slug: 'how-to-create-better-invoices',
    title: 'How to Create Better Invoices',
    tags: ['invoicing', 'accounts receivable', 'small business finance'],
    question: 'How can I create invoices that get paid faster?',
    answer:
      'Invoices get paid faster when they are clear, prompt, and easy to act on. Confusing invoices create excuses and delays.',
    bullets: [
      'Send invoices immediately after the agreed milestone or delivery.',
      'Include scope reference, due date, payment options, and contact info.',
      'Use consistent numbering so questions can be resolved fast.',
    ],
  },
  {
    slug: 'how-to-get-paid-faster',
    title: 'How to Get Paid Faster',
    tags: ['cash flow', 'collections', 'invoicing'],
    question: 'How can a small business get paid faster?',
    answer:
      'Faster payment comes from better terms, faster invoicing, and disciplined follow-up. Waiting quietly is not a collection strategy.',
    bullets: [
      'Set payment expectations before work begins.',
      'Offer easy payment methods and automated reminders.',
      'Call on overdue balances before they become old news.',
    ],
  },
  {
    slug: 'should-i-require-deposits',
    title: 'Should I Require Deposits',
    tags: ['deposits', 'cash flow', 'service business'],
    question: 'Should I require a deposit before starting work?',
    answer:
      'Deposits reduce risk, improve cash flow, and confirm buyer commitment. Many small businesses wait too long to use them.',
    bullets: [
      'Use deposits for custom work, scheduling blocks, or large material exposure.',
      'State deposit terms clearly in proposals and invoices.',
      'Make deposit collection part of the sales process, not an afterthought.',
    ],
  },
  {
    slug: 'how-to-choose-payment-processors',
    title: 'How to Choose Payment Processors',
    tags: ['payment processing', 'merchant services', 'small business'],
    question: 'How should I choose a payment processor?',
    answer:
      'Choose a processor based on reliability, fees, payout speed, and fit with how customers pay you. Convenience and clarity matter.',
    bullets: [
      'Compare in-person, online, invoice, and recurring payment options.',
      'Review fees for cards, transfers, and chargebacks.',
      'Make sure it integrates with your bookkeeping or point-of-sale tools.',
    ],
  },
  {
    slug: 'how-to-reduce-chargebacks',
    title: 'How to Reduce Chargebacks',
    tags: ['chargebacks', 'payment disputes', 'small business risk'],
    question: 'How can a small business reduce chargebacks?',
    answer:
      'Chargebacks drop when billing is clear and proof is easy to produce. Confusion often creates disputes as much as fraud does.',
    bullets: [
      'Use recognizable billing names and send clear receipts.',
      'Keep signed agreements, delivery proof, and communication records.',
      'Address complaints early before the bank gets involved.',
    ],
  },
  {
    slug: 'how-to-manage-inventory',
    title: 'How to Manage Inventory',
    tags: ['inventory management', 'small business operations', 'retail'],
    question: 'How can a small business manage inventory better?',
    answer:
      'Good inventory management protects cash and avoids stockouts. Too much inventory and too little inventory both create problems.',
    bullets: [
      'Track best sellers, slow movers, and reorder points.',
      'Count inventory regularly instead of trusting memory.',
      'Buy based on demand patterns, not only supplier pressure.',
    ],
  },
  {
    slug: 'how-to-forecast-sales',
    title: 'How to Forecast Sales',
    tags: ['sales forecast', 'planning', 'small business growth'],
    question: 'How should a small business forecast sales?',
    answer:
      'Forecast from real pipeline, seasonality, and historical performance. A useful forecast is conservative enough to guide decisions.',
    bullets: [
      'Separate committed sales from expected opportunities.',
      'Use recent data, not wishful targets, as your starting point.',
      'Update the forecast every month as reality changes.',
    ],
  },
  {
    slug: 'what-kpis-should-a-small-business-track',
    title: 'What KPIs Should a Small Business Track',
    tags: ['kpis', 'business metrics', 'small business dashboard'],
    question: 'What key metrics should a small business track?',
    answer:
      'Track the few metrics that show demand, delivery, cash, and profit. Too many numbers can hide the important ones.',
    bullets: [
      'Watch leads, conversion rate, average sale, gross margin, and cash balance.',
      'Add overdue invoices, repeat customer rate, and response time if relevant.',
      'Review metrics on a weekly or monthly rhythm with action attached.',
    ],
  },
  {
    slug: 'how-to-read-a-profit-and-loss-statement',
    title: 'How to Read a Profit and Loss Statement',
    tags: ['profit and loss', 'financial statements', 'small business finance'],
    question: 'How do I read a profit and loss statement as a business owner?',
    answer:
      'A profit and loss statement shows revenue, costs, and profit over a period. Owners should use it to spot margin problems early.',
    bullets: [
      'Compare sales, direct costs, overhead, and net profit month to month.',
      'Look for expense categories growing faster than revenue.',
      'Use the report to guide pricing and cost control decisions.',
    ],
  },
  {
    slug: 'how-to-read-a-balance-sheet',
    title: 'How to Read a Balance Sheet',
    tags: ['balance sheet', 'financial literacy', 'small business finance'],
    question: 'Why should a small-business owner understand the balance sheet?',
    answer:
      'The balance sheet shows what the business owns, owes, and keeps. It gives context that the profit and loss statement cannot show by itself.',
    bullets: [
      'Review cash, receivables, debt, and owner equity regularly.',
      'Use it to understand liquidity and leverage, not just profit.',
      'Discuss unusual changes with your bookkeeper or CPA.',
    ],
  },
  {
    slug: 'how-to-control-overhead',
    title: 'How to Control Overhead',
    tags: ['overhead', 'cost control', 'small business finance'],
    question: 'How can a small business control overhead better?',
    answer:
      'Control overhead by knowing which costs are essential, useful, or wasteful. Small leaks become major problems when revenue softens.',
    bullets: [
      'Review subscriptions, rent, admin costs, and owner habits monthly.',
      'Match overhead growth to real demand, not optimism.',
      'Remove costs that do not improve revenue, margin, or delivery.',
    ],
  },
  {
    slug: 'how-to-lower-business-expenses',
    title: 'How to Lower Business Expenses',
    tags: ['business expenses', 'cost reduction', 'small business'],
    question: 'How can I lower business expenses without hurting quality?',
    answer:
      'Start by cutting waste, not capability. Good cost reduction improves focus instead of weakening the business.',
    bullets: [
      'Audit recurring expenses and renegotiate where possible.',
      'Standardize purchasing so spending is not random.',
      'Protect the tools, labor, and marketing that actually drive results.',
    ],
  },
  {
    slug: 'how-to-decide-what-to-outsource',
    title: 'How to Decide What to Outsource',
    tags: ['outsourcing', 'operations', 'small business efficiency'],
    question: 'What should a small business outsource first?',
    answer:
      'Outsource specialized work, low-leverage admin, or tasks you consistently mishandle. Keep core customer value close.',
    bullets: [
      'Consider bookkeeping, payroll, design, or technical support first.',
      'Compare cost, speed, and quality before handing work off.',
      'Document expectations so outsourced work stays aligned.',
    ],
  },
  {
    slug: 'when-should-i-rent-office-space',
    title: 'When Should I Rent Office Space',
    tags: ['office space', 'overhead', 'small business growth'],
    question: 'When should a small business rent office or retail space?',
    answer:
      'Rent space when it clearly improves sales, operations, or credibility enough to justify the ongoing overhead.',
    bullets: [
      'Model rent, utilities, furniture, and setup costs before signing.',
      'Match space decisions to customer behavior and workflow needs.',
      'Avoid long leases if demand is still uncertain.',
    ],
  },
  {
    slug: 'how-to-pick-business-software',
    title: 'How to Pick Business Software',
    tags: ['business software', 'operations', 'small business tools'],
    question: 'How should I choose software for my business?',
    answer:
      'Choose software that solves a specific operational problem and is easy for the team to use. More tools can create more confusion.',
    bullets: [
      'Start with the workflow you need to improve.',
      'Check price, support, integrations, and ease of adoption.',
      'Review whether the tool saves time or simply adds another login.',
    ],
  },
  {
    slug: 'how-to-choose-a-point-of-sale-system',
    title: 'How to Choose a Point of Sale System',
    tags: ['point of sale', 'retail operations', 'small business'],
    question: 'What should I look for in a point-of-sale system?',
    answer:
      'Your POS should fit how you sell, collect payment, and track inventory. A cheap system that creates friction is expensive in practice.',
    bullets: [
      'Check payment speed, reporting, inventory tools, and hardware needs.',
      'Make sure staff can learn it quickly.',
      'Confirm how it connects to accounting and ecommerce systems.',
    ],
  },
  {
    slug: 'how-to-use-ai-in-a-small-business',
    title: 'How to Use AI in a Small Business',
    tags: ['ai for small business', 'productivity', 'operations'],
    question: 'How can a small business use AI in practical ways?',
    answer:
      'Use AI to save time on repetitive thinking and drafting, not to replace judgment. Start where time is wasted often.',
    bullets: [
      'Use AI for drafts, summaries, FAQs, marketing ideas, and internal documentation.',
      'Always review outputs for accuracy, tone, and risk.',
      'Keep sensitive data control and human judgment in the loop.',
    ],
  },
  {
    slug: 'how-to-use-ai-for-marketing-content',
    title: 'How to Use AI for Marketing Content',
    tags: ['ai marketing', 'content creation', 'small business'],
    question: 'Can AI help a small business create marketing content?',
    answer:
      'Yes, AI can speed up content drafts, but the business still needs clear positioning and human editing. Fast content is useless if it sounds generic.',
    bullets: [
      'Use AI to turn customer questions into posts, emails, and FAQs.',
      'Edit for local relevance, accuracy, and real examples.',
      'Use one brand voice so content still feels consistent.',
    ],
  },
  {
    slug: 'how-to-use-ai-for-customer-support',
    title: 'How to Use AI for Customer Support',
    tags: ['ai customer support', 'faq', 'small business automation'],
    question: 'How can AI help with customer support?',
    answer:
      'AI can help answer repeated questions and organize information, but it should not create confusion in sensitive situations.',
    bullets: [
      'Use AI for common questions, intake, and internal knowledge lookup.',
      'Escalate billing issues, complaints, and exceptions to humans fast.',
      'Train the system on your actual policies and answers.',
    ],
  },
  {
    slug: 'how-to-protect-customer-data',
    title: 'How to Protect Customer Data',
    tags: ['data privacy', 'cybersecurity', 'small business risk'],
    question: 'How can a small business protect customer data better?',
    answer:
      'Protecting data starts with simple controls and good habits. Small businesses get exposed more by weak basics than advanced attacks.',
    bullets: [
      'Use strong passwords, multi-factor authentication, and limited access.',
      'Store only the data you truly need.',
      'Train staff on phishing, scams, and safe handling of customer information.',
    ],
  },
  {
    slug: 'how-to-prevent-fraud-in-a-small-business',
    title: 'How to Prevent Fraud in a Small Business',
    tags: ['fraud prevention', 'internal controls', 'small business risk'],
    question: 'How can a small business prevent fraud?',
    answer:
      'Fraud drops when money movement has checks, visibility, and separation of duties. Trust is not a control system by itself.',
    bullets: [
      'Separate payment approval, bookkeeping, and bank reconciliation when possible.',
      'Review statements and unusual transactions regularly.',
      'Require documentation for refunds, purchases, and vendor changes.',
    ],
  },
  {
    slug: 'how-to-create-basic-internal-controls',
    title: 'How to Create Basic Internal Controls',
    tags: ['internal controls', 'financial controls', 'small business'],
    question: 'What basic internal controls should a small business have?',
    answer:
      'Basic internal controls protect cash, reduce mistakes, and make fraud harder. Start with the money process first.',
    bullets: [
      'Use approval steps for spending and payments.',
      'Reconcile bank accounts monthly and review by someone responsible.',
      'Document who can do what in bookkeeping and payment systems.',
    ],
  },
  {
    slug: 'how-to-build-a-vendor-list',
    title: 'How to Build a Vendor List',
    tags: ['vendors', 'supplier management', 'small business operations'],
    question: 'How should I manage vendors and suppliers?',
    answer:
      'A good vendor list improves speed, pricing, and reliability. Supplier relationships are part of operational resilience.',
    bullets: [
      'Keep contact info, pricing terms, lead times, and backup options in one place.',
      'Review supplier performance on quality and responsiveness.',
      'Avoid relying on one vendor when the category is critical.',
    ],
  },
  {
    slug: 'how-to-negotiate-with-suppliers',
    title: 'How to Negotiate With Suppliers',
    tags: ['supplier negotiation', 'purchasing', 'small business'],
    question: 'How can a small business negotiate better with suppliers?',
    answer:
      'Negotiation improves when you know your volume, timing, alternatives, and payment history. Preparation matters more than pressure.',
    bullets: [
      'Ask about price breaks, payment terms, and delivery flexibility.',
      'Compare offers from multiple suppliers before committing.',
      'Build good relationships by paying on time and communicating clearly.',
    ],
  },
  {
    slug: 'how-to-manage-a-small-team',
    title: 'How to Manage a Small Team',
    tags: ['team management', 'leadership', 'small business'],
    question: 'How should a small-business owner manage a small team?',
    answer:
      'Manage a small team with clarity, rhythm, and accountability. Most team problems are really expectation problems.',
    bullets: [
      'Set priorities weekly so everyone knows what matters most.',
      'Use short check-ins instead of waiting for major issues.',
      'Address performance gaps directly and early.',
    ],
  },
  {
    slug: 'how-to-run-a-good-team-meeting',
    title: 'How to Run a Good Team Meeting',
    tags: ['team meetings', 'operations', 'small business leadership'],
    question: 'What makes a small-business team meeting useful?',
    answer:
      'A useful meeting creates alignment and decisions. If a meeting does not change action, it should probably be shorter or removed.',
    bullets: [
      'Use a fixed agenda with priorities, numbers, blockers, and decisions.',
      'Keep meetings short and assign owners to next steps.',
      'Document decisions so the team is not relying on memory later.',
    ],
  },
  {
    slug: 'how-to-improve-employee-accountability',
    title: 'How to Improve Employee Accountability',
    tags: ['accountability', 'team performance', 'small business'],
    question: 'How can I improve accountability on my team?',
    answer:
      'Accountability improves when expectations, deadlines, and ownership are visible. It weakens when work is assigned vaguely.',
    bullets: [
      'Define who owns what and when it is due.',
      'Review results on a regular rhythm, not only when things fail.',
      'Correct missed commitments quickly and consistently.',
    ],
  },
  {
    slug: 'how-to-keep-employees-motivated',
    title: 'How to Keep Employees Motivated',
    tags: ['employee motivation', 'team culture', 'leadership'],
    question: 'How can a small business keep employees motivated?',
    answer:
      'Motivation grows when people see purpose, progress, and fairness. It drops when work feels chaotic or unseen.',
    bullets: [
      'Give clear goals and show how the role matters.',
      'Recognize good work specifically, not vaguely.',
      'Fix operational friction that makes good people frustrated.',
    ],
  },
  {
    slug: 'how-to-build-a-strong-culture',
    title: 'How to Build a Strong Culture',
    tags: ['company culture', 'small business leadership', 'team building'],
    question: 'How does a small business build a strong company culture?',
    answer:
      'Culture is how people behave when pressure shows up. It comes from repeated standards, not posters or slogans.',
    bullets: [
      'Define the behaviors you want to see and reinforce them consistently.',
      'Hire and promote people who match those standards.',
      'Make leadership behavior match what the company says it values.',
    ],
  },
  {
    slug: 'how-to-manage-time-better-as-an-owner',
    title: 'How to Manage Time Better as an Owner',
    tags: ['time management', 'entrepreneur productivity', 'small business'],
    question: 'How can I manage my time better as a business owner?',
    answer:
      'Owner time improves when priorities are few and repeatable work is systemized. Constant context switching destroys momentum.',
    bullets: [
      'Block time for sales, operations, and review instead of reacting all day.',
      'Write down recurring tasks and delegate what others can do well.',
      'Protect high-value work from unnecessary interruptions.',
    ],
  },
  {
    slug: 'how-to-avoid-burnout-as-a-founder',
    title: 'How to Avoid Burnout as a Founder',
    tags: ['founder burnout', 'entrepreneur wellness', 'small business'],
    question: 'How can a business owner avoid burnout?',
    answer:
      'Burnout often comes from unclear priorities, weak systems, and carrying too much alone for too long. Rest matters, but structure matters too.',
    bullets: [
      'Reduce repeated chaos by documenting and delegating recurring work.',
      'Watch workload, sleep, cash stress, and boundary problems honestly.',
      'Build support through peers, advisors, or trusted operators.',
    ],
  },
  {
    slug: 'how-to-balance-working-in-and-on-the-business',
    title: 'How to Balance Working In and On the Business',
    tags: ['owner role', 'business strategy', 'operations'],
    question: 'How do I balance working in the business and on the business?',
    answer:
      'Owners need time for delivery and time for strategy. If all your time goes into daily work, the business stays dependent on you.',
    bullets: [
      'Schedule weekly time for numbers, systems, and growth planning.',
      'Capture repetitive problems so you can solve them structurally.',
      'Delegate execution where possible so thinking time can exist.',
    ],
  },
  {
    slug: 'how-to-set-goals-for-a-small-business',
    title: 'How to Set Goals for a Small Business',
    tags: ['goal setting', 'small business planning', 'growth'],
    question: 'How should a small business set goals?',
    answer:
      'Set a few goals tied to revenue, cash, customer acquisition, and operations. Goals work when they connect to weekly actions.',
    bullets: [
      'Choose goals that are measurable and time bound.',
      'Assign ownership and review dates for each one.',
      'Break big goals into monthly and weekly moves.',
    ],
  },
  {
    slug: 'how-to-plan-quarterly',
    title: 'How to Plan Quarterly',
    tags: ['quarterly planning', 'small business strategy', 'execution'],
    question: 'Why should a small business plan quarterly?',
    answer:
      'Quarterly planning creates a manageable execution window. It is long enough to move something meaningful and short enough to stay real.',
    bullets: [
      'Review last quarter results before setting new priorities.',
      'Limit the number of major initiatives running at once.',
      'Use weekly reviews to keep quarterly goals alive.',
    ],
  },
  {
    slug: 'how-to-expand-to-a-second-location',
    title: 'How to Expand to a Second Location',
    tags: ['expansion', 'second location', 'small business growth'],
    question: 'When is a business ready for a second location?',
    answer:
      'A second location makes more sense when the first location is stable, profitable, and documented enough to repeat.',
    bullets: [
      'Confirm leadership, staffing, and cash can support expansion.',
      'Document the customer experience and core operating processes first.',
      'Test demand in the new market before signing major commitments.',
    ],
  },
  {
    slug: 'how-to-scale-without-chaos',
    title: 'How to Scale Without Chaos',
    tags: ['scaling', 'operations', 'small business systems'],
    question: 'How can a small business scale without creating chaos?',
    answer:
      'Scaling requires systems, not just more effort. Growth without process usually multiplies mistakes.',
    bullets: [
      'Standardize sales, delivery, and reporting before adding volume.',
      'Watch where the business depends too heavily on one person.',
      'Add capacity only after you can measure current performance clearly.',
    ],
  },
  {
    slug: 'when-to-add-a-new-service',
    title: 'When to Add a New Service',
    tags: ['service expansion', 'product strategy', 'small business'],
    question: 'When should a small business add a new service?',
    answer:
      'Add a new service when current demand is understood and the new offer fits the same customer well. Extra services can dilute focus if added too early.',
    bullets: [
      'Look for repeated customer requests and strong margin potential.',
      'Test the offer before building a large process around it.',
      'Make sure the new service does not confuse your main positioning.',
    ],
  },
  {
    slug: 'how-to-decide-which-services-to-stop-offering',
    title: 'How to Decide Which Services to Stop Offering',
    tags: ['service mix', 'profitability', 'small business strategy'],
    question: 'How do I know which services to stop offering?',
    answer:
      'Stop offering services that drain time, confuse the brand, or consistently underperform financially.',
    bullets: [
      'Review margin, stress level, repeat demand, and fit with your best customers.',
      'Notice which services create the most operational drag.',
      'Focus on the offers that produce strong results and easier execution.',
    ],
  },
  {
    slug: 'how-to-create-packages-or-bundles',
    title: 'How to Create Packages or Bundles',
    tags: ['service packages', 'bundling', 'pricing strategy'],
    question: 'Should a small business create packages or bundles?',
    answer:
      'Packages help buyers choose faster and can increase average sale size. They also make your offer easier to understand.',
    bullets: [
      'Bundle services that naturally solve one customer problem together.',
      'Create simple tier names and clear differences between levels.',
      'Protect margin by pricing bundles intentionally, not randomly.',
    ],
  },
  {
    slug: 'how-to-launch-a-new-product',
    title: 'How to Launch a New Product',
    tags: ['product launch', 'small business marketing', 'offer launch'],
    question: 'How should a small business launch a new product?',
    answer:
      'A good launch starts before release with audience buildup, clear messaging, and simple proof. Launching to silence is usually a planning problem.',
    bullets: [
      'Build interest early through email, social, or direct outreach.',
      'Explain the problem, result, and who the product is for.',
      'Collect customer feedback quickly after launch and adjust.',
    ],
  },
  {
    slug: 'how-to-test-a-new-offer',
    title: 'How to Test a New Offer',
    tags: ['offer testing', 'market validation', 'small business'],
    question: 'How can I test a new offer before a full launch?',
    answer:
      'Test the offer with a small audience and a simple sales process first. You want learning, not a polished campaign.',
    bullets: [
      'Use a pilot, waitlist, limited run, or beta group.',
      'Measure demand, objections, and profitability early.',
      'Refine the offer before you scale promotion.',
    ],
  },
  {
    slug: 'how-to-create-a-customer-faq',
    title: 'How to Create a Customer FAQ',
    tags: ['faq', 'customer communication', 'small business website'],
    question: 'Why should a small business create a customer FAQ?',
    answer:
      'An FAQ saves time, reduces friction, and improves trust by answering repeated buyer questions clearly.',
    bullets: [
      'Start with the questions customers already ask most often.',
      'Write short answers in plain language.',
      'Use the FAQ on your website, in sales calls, and in support responses.',
    ],
  },
  {
    slug: 'how-to-turn-workshop-questions-into-content',
    title: 'How to Turn Workshop Questions Into Content',
    tags: ['content strategy', 'faq content', 'seo'],
    question: 'How can I turn common workshop questions into useful content?',
    answer:
      'Repeated questions are strong content topics because they reflect real intent. They work well for SEO, sales, and customer education.',
    bullets: [
      'Write one page or post for each recurring question.',
      'Answer clearly, briefly, and with an action step.',
      'Reuse the content in email, social, and customer support.',
    ],
  },
  {
    slug: 'how-to-network-at-chamber-events',
    title: 'How to Network at Chamber Events',
    tags: ['networking', 'chamber of commerce', 'small business growth'],
    question: 'How should I network at chamber or entrepreneur events?',
    answer:
      'Network by being useful, curious, and clear about who you help. Good networking creates follow-up, not just handshakes.',
    bullets: [
      'Prepare a short introduction focused on the problem you solve.',
      'Ask others about their business challenges and listen for overlap.',
      'Follow up within a day or two while the conversation is fresh.',
    ],
  },
  {
    slug: 'how-to-follow-up-after-networking-events',
    title: 'How to Follow Up After Networking Events',
    tags: ['networking follow up', 'business development', 'small business'],
    question: 'What is the best follow-up after a networking event?',
    answer:
      'Follow-up should be short, specific, and timely. Most networking value is lost in the days after the event.',
    bullets: [
      'Reference the actual conversation so the message feels real.',
      'Offer one next step such as coffee, call, or resource share.',
      'Track contacts so relationships do not disappear into your inbox.',
    ],
  },
  {
    slug: 'how-to-create-a-good-elevator-pitch',
    title: 'How to Create a Good Elevator Pitch',
    tags: ['elevator pitch', 'networking', 'messaging'],
    question: 'What makes a good elevator pitch for a small business?',
    answer:
      'A good pitch is short, clear, and focused on the customer problem you solve. It should invite conversation, not end it.',
    bullets: [
      'Say who you help, what you help them do, and what makes your approach useful.',
      'Avoid industry jargon and long origin stories.',
      'Test whether people understand it quickly and ask follow-up questions.',
    ],
  },
  {
    slug: 'how-to-partner-with-other-local-businesses',
    title: 'How to Partner With Other Local Businesses',
    tags: ['partnerships', 'local business', 'small business growth'],
    question: 'How can I partner with other local businesses?',
    answer:
      'Partnerships work best when both sides serve similar customers without competing directly. The value exchange should be obvious.',
    bullets: [
      'Look for referral, co-marketing, or bundled service opportunities.',
      'Start small and measure actual results.',
      'Work with partners who are responsive and trustworthy.',
    ],
  },
  {
    slug: 'how-to-sponsor-community-events',
    title: 'How to Sponsor Community Events',
    tags: ['community marketing', 'event sponsorship', 'small business'],
    question: 'Should a small business sponsor community events?',
    answer:
      'Sponsorship can help if the audience matches your customer and you have a follow-up plan. Visibility alone is not enough.',
    bullets: [
      'Ask who attends, what exposure is included, and how leads can be captured.',
      'Use sponsorships where trust and local presence matter.',
      'Measure outcomes instead of treating every event as branding by default.',
    ],
  },
  {
    slug: 'how-to-prepare-for-a-pop-up-or-market',
    title: 'How to Prepare for a Pop Up or Market',
    tags: ['pop up market', 'events', 'small business sales'],
    question: 'How can I prepare for a pop-up market or vendor event?',
    answer:
      'Good event prep improves sales and reduces stress. The basics are product mix, payments, signage, and customer capture.',
    bullets: [
      'Bring best sellers, clear pricing, and easy payment options.',
      'Use signage that explains what you sell fast.',
      'Collect contact info so event traffic can become repeat business.',
    ],
  },
  {
    slug: 'how-to-sell-at-farmers-markets',
    title: 'How to Sell at Farmers Markets',
    tags: ['farmers market', 'local sales', 'small business'],
    question: 'What helps a small business sell well at farmers markets?',
    answer:
      'Farmers markets reward clarity, presentation, and repetition. Buyers decide fast, so your setup matters.',
    bullets: [
      'Use clear displays, easy pricing, and a fast payment process.',
      'Offer samples or demos if the product fits.',
      'Invite buyers to follow you online or visit after the event.',
    ],
  },
  {
    slug: 'how-to-start-selling-online',
    title: 'How to Start Selling Online',
    tags: ['ecommerce', 'online sales', 'small business'],
    question: 'How can a small business start selling online?',
    answer:
      'Online selling starts with a clear product, good photos, and a simple checkout. Remove friction before adding traffic.',
    bullets: [
      'Choose a simple ecommerce platform and keep setup manageable.',
      'Write product descriptions that answer buyer concerns clearly.',
      'Test checkout on mobile and desktop before promoting the site.',
    ],
  },
  {
    slug: 'how-to-write-product-descriptions-that-sell',
    title: 'How to Write Product Descriptions That Sell',
    tags: ['product descriptions', 'ecommerce copy', 'small business marketing'],
    question: 'How should I write product descriptions that help sales?',
    answer:
      'Good product descriptions answer what the item is, who it is for, and why it matters. They reduce hesitation.',
    bullets: [
      'Lead with the main benefit, then support with key details.',
      'Use plain language instead of filler words.',
      'Include sizing, materials, care, shipping, or usage information as needed.',
    ],
  },
  {
    slug: 'how-to-take-better-product-photos',
    title: 'How to Take Better Product Photos',
    tags: ['product photography', 'ecommerce', 'small business'],
    question: 'How can a small business improve product photos?',
    answer:
      'Better photos increase trust because buyers can see what they are paying for. Clear images usually matter more than fancy equipment.',
    bullets: [
      'Use natural light, clean backgrounds, and multiple angles.',
      'Show scale, details, and product use when helpful.',
      'Keep your image style consistent across the store.',
    ],
  },
  {
    slug: 'how-to-ship-products-efficiently',
    title: 'How to Ship Products Efficiently',
    tags: ['shipping', 'ecommerce operations', 'small business'],
    question: 'How can a small business ship products more efficiently?',
    answer:
      'Shipping improves when packing materials, labels, and workflow are standardized. Delay and confusion are usually process problems.',
    bullets: [
      'Use standard packaging sizes when possible.',
      'Set a fixed pick-pack-ship routine for the team.',
      'Track shipping cost and damage issues to improve over time.',
    ],
  },
  {
    slug: 'how-to-reduce-product-returns',
    title: 'How to Reduce Product Returns',
    tags: ['returns', 'ecommerce', 'customer experience'],
    question: 'How can I reduce product returns?',
    answer:
      'Returns often drop when product expectations are more accurate before purchase. Clear communication matters as much as product quality.',
    bullets: [
      'Use accurate photos, sizing, and product descriptions.',
      'Explain care, fit, or usage instructions upfront.',
      'Study return reasons and fix the repeated causes.',
    ],
  },
  {
    slug: 'what-should-my-return-policy-say',
    title: 'What Should My Return Policy Say',
    tags: ['return policy', 'customer policy', 'small business'],
    question: 'What should a small-business return policy include?',
    answer:
      'A return policy should be clear, fair, and easy to understand before purchase. Hidden policy details create complaints.',
    bullets: [
      'State return window, item condition rules, and refund method.',
      'Clarify who pays return shipping if that applies.',
      'Keep the policy visible on the website and receipts.',
    ],
  },
  {
    slug: 'how-to-build-a-customer-list',
    title: 'How to Build a Customer List',
    tags: ['customer list', 'crm', 'marketing database'],
    question: 'Why should a small business build a customer list?',
    answer:
      'A customer list gives you a direct way to follow up, sell again, and ask for referrals. It becomes a business asset over time.',
    bullets: [
      'Collect names, emails, phones, and purchase history with permission.',
      'Keep the list organized so messages stay relevant.',
      'Use the list for repeat offers, reminders, and service follow-up.',
    ],
  },
  {
    slug: 'how-to-run-seasonal-promotions',
    title: 'How to Run Seasonal Promotions',
    tags: ['seasonal marketing', 'promotions', 'small business sales'],
    question: 'How should a small business plan seasonal promotions?',
    answer:
      'Seasonal promotions work best when they are planned early and tied to customer timing. Last-minute promotions usually feel random.',
    bullets: [
      'Map major seasons, deadlines, and buying periods in advance.',
      'Choose one offer and one clear audience for each promotion.',
      'Review results so next season gets better.',
    ],
  },
  {
    slug: 'how-to-create-loyalty-programs',
    title: 'How to Create Loyalty Programs',
    tags: ['loyalty program', 'repeat customers', 'small business'],
    question: 'Do loyalty programs work for small businesses?',
    answer:
      'They can work when they are simple, relevant, and easy to redeem. If the reward is confusing, customers ignore it.',
    bullets: [
      'Tie rewards to repeat behavior you want more of.',
      'Keep the structure easy to explain and track.',
      'Measure whether it increases visit frequency or average sale.',
    ],
  },
  {
    slug: 'how-to-ask-customers-better-questions',
    title: 'How to Ask Customers Better Questions',
    tags: ['customer research', 'feedback', 'small business growth'],
    question: 'How can I ask customers better questions?',
    answer:
      'Better questions uncover decisions, frustrations, and expectations. Generic feedback requests usually produce generic answers.',
    bullets: [
      'Ask what almost stopped them from buying.',
      'Ask what mattered most in their decision.',
      'Ask what would have made the experience better or faster.',
    ],
  },
  {
    slug: 'how-to-use-customer-feedback',
    title: 'How to Use Customer Feedback',
    tags: ['customer feedback', 'continuous improvement', 'small business'],
    question: 'What should I do with customer feedback once I collect it?',
    answer:
      'Feedback is useful only when it changes something. Organize it into patterns and act on the highest-value issues first.',
    bullets: [
      'Separate one-off opinions from repeated patterns.',
      'Use feedback to improve offer, operations, or communication.',
      'Tell customers when their input helped shape a change.',
    ],
  },
  {
    slug: 'how-to-create-better-customer-experience',
    title: 'How to Create Better Customer Experience',
    tags: ['customer experience', 'operations', 'small business'],
    question: 'How can a small business create a better customer experience?',
    answer:
      'Customer experience is the full path from first contact to follow-up. Friction at any step weakens trust.',
    bullets: [
      'Map the customer journey and find slow, unclear, or awkward moments.',
      'Standardize communication and handoff points.',
      'Make it easy for customers to understand what happens next.',
    ],
  },
  {
    slug: 'how-to-use-video-for-small-business-marketing',
    title: 'How to Use Video for Small Business Marketing',
    tags: ['video marketing', 'social media', 'small business'],
    question: 'How can a small business use video in marketing?',
    answer:
      'Video builds trust quickly because people can hear and see how you explain your work. It works especially well for services and education.',
    bullets: [
      'Create short videos answering common customer questions.',
      'Show process, proof, and simple before-and-after examples.',
      'Keep production simple so you can stay consistent.',
    ],
  },
  {
    slug: 'how-to-create-faq-videos',
    title: 'How to Create FAQ Videos',
    tags: ['faq videos', 'video content', 'small business marketing'],
    question: 'What kinds of FAQ videos should a small business make?',
    answer:
      'Start with videos that answer the same questions you hear every week. FAQ videos work because they solve real uncertainty.',
    bullets: [
      'Cover pricing, process, timing, preparation, and common mistakes.',
      'Keep each video focused on one question.',
      'Reuse the videos on your site, email, and social channels.',
    ],
  },
  {
    slug: 'how-to-use-testimonials',
    title: 'How to Use Testimonials',
    tags: ['testimonials', 'social proof', 'small business marketing'],
    question: 'How should a small business use testimonials?',
    answer:
      'Testimonials work best when they are specific and close to the buying decision. Generic praise is weaker than detailed proof.',
    bullets: [
      'Ask customers to describe the problem, result, and experience.',
      'Place testimonials near proposals, service pages, and landing pages.',
      'Use text, photos, or short video when customers allow it.',
    ],
  },
  {
    slug: 'how-to-collect-case-studies',
    title: 'How to Collect Case Studies',
    tags: ['case studies', 'proof', 'small business marketing'],
    question: 'Do case studies help a small business win more work?',
    answer:
      'Yes, case studies show what changed because of your work. They help buyers see the value in a concrete way.',
    bullets: [
      'Document the starting problem, your approach, and the result.',
      'Use numbers and specifics when possible.',
      'Keep case studies short enough for busy buyers to scan quickly.',
    ],
  },
  {
    slug: 'how-to-make-a-referral-partnership-pitch',
    title: 'How to Make a Referral Partnership Pitch',
    tags: ['referral partners', 'partnerships', 'business development'],
    question: 'How do I approach another business about referrals?',
    answer:
      'Lead with mutual benefit, not a vague request for help. Strong referral partnerships solve a real problem for both sides.',
    bullets: [
      'Explain who you serve and which referrals are a good fit.',
      'Show how you will make the partner look good to their customers.',
      'Start with a simple test before building a formal arrangement.',
    ],
  },
  {
    slug: 'how-to-plan-for-slow-seasons',
    title: 'How to Plan for Slow Seasons',
    tags: ['seasonality', 'cash flow planning', 'small business'],
    question: 'How can I prepare for a slow season in business?',
    answer:
      'Plan for slow periods before they arrive. Seasonality is a known risk, not a surprise.',
    bullets: [
      'Use historical patterns to forecast low months.',
      'Build cash reserves and reduce nonessential spending ahead of time.',
      'Create offers or outreach campaigns to fill predictable gaps.',
    ],
  },
  {
    slug: 'how-to-handle-inconsistent-revenue',
    title: 'How to Handle Inconsistent Revenue',
    tags: ['revenue swings', 'cash flow', 'small business'],
    question: 'How can a small business deal with inconsistent revenue?',
    answer:
      'Inconsistent revenue gets easier when forecasting, reserves, and recurring sales improve. You may not remove volatility, but you can manage it.',
    bullets: [
      'Track trends by month, channel, and service line.',
      'Build recurring offers where possible.',
      'Lower dependency on one customer or one sales source.',
    ],
  },
  {
    slug: 'how-to-diversify-revenue',
    title: 'How to Diversify Revenue',
    tags: ['revenue diversification', 'risk management', 'small business'],
    question: 'Should a small business diversify revenue streams?',
    answer:
      'Yes, but carefully. Diversification helps when the new revenue stream fits your customer and can be operated well.',
    bullets: [
      'Expand from current strengths instead of chasing random ideas.',
      'Look for add-on services, repeat offers, or complementary products.',
      'Protect focus so diversification does not become distraction.',
    ],
  },
  {
    slug: 'how-to-build-recurring-revenue',
    title: 'How to Build Recurring Revenue',
    tags: ['recurring revenue', 'subscriptions', 'small business growth'],
    question: 'How can a small business create recurring revenue?',
    answer:
      'Recurring revenue improves predictability and customer lifetime value. It works best when the customer has an ongoing need.',
    bullets: [
      'Offer maintenance plans, retainers, subscriptions, or repeat delivery.',
      'Make renewal simple and the value easy to understand.',
      'Track churn so recurring revenue stays healthy.',
    ],
  },
  {
    slug: 'how-to-decide-when-to-quit-a-side-hustle-job',
    title: 'How to Decide When to Quit a Side Hustle Job',
    tags: ['side hustle', 'full time business', 'entrepreneurship'],
    question: 'When is it safe to leave my job for my business?',
    answer:
      'Leaving a job is less risky when revenue is consistent, reserves exist, and the business has a real sales process. Excitement alone is not a plan.',
    bullets: [
      'Watch monthly revenue, margin, and demand stability over time.',
      'Build personal and business reserves before making the jump.',
      'Know what income level you actually need to replace.',
    ],
  },
  {
    slug: 'how-to-balance-family-and-business',
    title: 'How to Balance Family and Business',
    tags: ['family business', 'work life balance', 'entrepreneurship'],
    question: 'How can a business owner balance family and business better?',
    answer:
      'Balance improves with boundaries, planning, and honest expectations. Business growth should not require permanent chaos at home.',
    bullets: [
      'Use schedules and communication so family knows pressure points.',
      'Protect a few non-negotiable personal priorities each week.',
      'Build systems so the business is not always dependent on your presence.',
    ],
  },
  {
    slug: 'how-to-work-with-a-spouse-in-business',
    title: 'How to Work With a Spouse in Business',
    tags: ['family business', 'spouse business', 'small business leadership'],
    question: 'What helps when spouses run a business together?',
    answer:
      'Shared businesses work better when roles, decisions, and boundaries are explicit. Informal assumptions create friction fast.',
    bullets: [
      'Define responsibilities and who owns which decisions.',
      'Separate personal conflict from business process discussions.',
      'Use regular check-ins instead of solving everything in the moment.',
    ],
  },
  {
    slug: 'how-to-prepare-for-sbdc-meetings',
    title: 'How to Prepare for SBDC Meetings',
    tags: ['sbdc', 'small business advising', 'entrepreneur support'],
    question: 'How should I prepare for an SBDC or advisor meeting?',
    answer:
      'Preparation helps you use advisory time well. Bring numbers, questions, and a clear picture of the business stage you are in.',
    bullets: [
      'Bring revenue, expenses, pricing, and current challenges.',
      'List the decisions you need help making.',
      'Leave with action steps and deadlines, not only ideas.',
    ],
  },
  {
    slug: 'what-questions-should-i-ask-a-business-advisor',
    title: 'What Questions Should I Ask a Business Advisor',
    tags: ['business advisor', 'sbdc', 'small business coaching'],
    question: 'What are good questions to ask a business advisor?',
    answer:
      'Ask questions that improve decisions, not just confidence. Good advisory conversations focus on priorities, numbers, and tradeoffs.',
    bullets: [
      'Ask where the business model is weakest right now.',
      'Ask which metrics matter most at your current stage.',
      'Ask what one or two changes would create the biggest improvement.',
    ],
  },
  {
    slug: 'how-to-use-chamber-membership-well',
    title: 'How to Use Chamber Membership Well',
    tags: ['chamber of commerce', 'networking', 'small business'],
    question: 'How can I get more value from chamber membership?',
    answer:
      'Membership creates value when you show up consistently and follow up intentionally. Passive membership rarely changes much.',
    bullets: [
      'Attend events where your customers or referral partners gather.',
      'Volunteer or contribute so people remember your business.',
      'Track which relationships and opportunities come from chamber activity.',
    ],
  },
  {
    slug: 'how-to-pitch-your-business-at-events',
    title: 'How to Pitch Your Business at Events',
    tags: ['event pitching', 'networking', 'small business marketing'],
    question: 'How should I talk about my business at community events?',
    answer:
      'Keep your event pitch focused on the buyer problem you solve. Event conversations should open doors, not deliver a full presentation.',
    bullets: [
      'Use a short, memorable explanation tied to a real outcome.',
      'Ask follow-up questions so the conversation stays two-way.',
      'Offer a practical next step after the conversation.',
    ],
  },
  {
    slug: 'how-to-choose-which-customers-to-target-first',
    title: 'How to Choose Which Customers to Target First',
    tags: ['target customer', 'go to market', 'small business growth'],
    question: 'Which customers should a new small business target first?',
    answer:
      'Target the customers you can reach, serve well, and get paid by fastest. Early focus beats broad ambition.',
    bullets: [
      'Choose a niche with urgent need and reachable decision makers.',
      'Look for buyers who already spend money on similar solutions.',
      'Tight focus helps messaging, sales, and referrals work faster.',
    ],
  },
  {
    slug: 'how-to-create-a-service-area-strategy',
    title: 'How to Create a Service Area Strategy',
    tags: ['service area', 'local business strategy', 'operations'],
    question: 'How should a local business define its service area?',
    answer:
      'A service area should balance customer opportunity with travel time, labor efficiency, and marketing focus.',
    bullets: [
      'Map where your best customers already come from.',
      'Calculate whether farther jobs or clients still make financial sense.',
      'Use the service area in your website and outreach messaging clearly.',
    ],
  },
  {
    slug: 'how-to-use-simple-dashboards',
    title: 'How to Use Simple Dashboards',
    tags: ['dashboard', 'business metrics', 'small business systems'],
    question: 'Does a small business need a dashboard?',
    answer:
      'A simple dashboard helps owners spot problems faster. It should highlight only the metrics that drive decisions.',
    bullets: [
      'Track sales, cash, pipeline, and delivery metrics in one place.',
      'Update the dashboard on a fixed schedule.',
      'Use it in team or owner reviews so it drives action.',
    ],
  },
  {
    slug: 'how-to-prepare-for-a-business-pivot',
    title: 'How to Prepare for a Business Pivot',
    tags: ['business pivot', 'strategy', 'small business change'],
    question: 'When should a small business pivot?',
    answer:
      'Pivot when the market signal is clear that your current offer is weak or less viable than a nearby opportunity. Pivoting is not random reinvention.',
    bullets: [
      'Study demand, profitability, and customer feedback before changing direction.',
      'Keep what still works and change what repeatedly fails.',
      'Communicate the shift clearly to customers and partners.',
    ],
  },
  {
    slug: 'how-to-know-if-a-business-is-working',
    title: 'How to Know if a Business Is Working',
    tags: ['business viability', 'small business metrics', 'entrepreneurship'],
    question: 'How do I know if my business is actually working?',
    answer:
      'A business is working when demand is real, cash is improving, and operations are becoming more repeatable. Activity alone is not traction.',
    bullets: [
      'Look at repeat customers, conversion rate, margin, and cash flow.',
      'Notice whether the business depends on luck or a repeatable process.',
      'Be honest about what the numbers are saying, not what you hope.',
    ],
  },
];

function renderEntry(entry) {
  const tags = ['smallbiz', ...entry.tags].join(', ');
  const support = entry.bullets.join(' ');

  return `---
title: ${entry.title}
tags: [${tags}]
---

## ${entry.question}

${entry.answer}

${support}
`;
}

await mkdir(outDir, { recursive: true });

const selectedEntries = entries.slice(0, 100);

await Promise.all(
  selectedEntries.map((entry) =>
    writeFile(path.join(outDir, `${entry.slug}.mdx`), renderEntry(entry), 'utf8'),
  ),
);

console.log(`Wrote ${selectedEntries.length} small business knowledge entries to ${outDir}`);
