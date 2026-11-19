# Dream House Cinemas — Premium Cinematic Website

A premium film-production studio website built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Pages
- `/` — Cinematic studio homepage
- `/about` — About the production house
- `/production` — Production services
- `/rental` — Equipment catalogue
- `/works` — Portfolio and category filters
- `/book` — Production and rental enquiry
- `/contact` — Contact information and enquiry form

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
npx playwright install chromium
npm run test:e2e
```

The Playwright suite checks all seven application routes at the agreed desktop, tablet and mobile widths, mobile navigation, catalogue expansion, portfolio filtering, booking selection and price estimates, compact checkbox dimensions, and automated WCAG accessibility rules.

**Enquiry delivery limitation:** the enquiry forms currently hand off to the visitor's email application. They do not persist enquiries to a backend or guarantee email delivery. Server-side delivery requires an approved email provider, credentials, and a persistence destination.
