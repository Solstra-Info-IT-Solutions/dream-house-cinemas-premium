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
npm run test:unit
npm run build
npx playwright install chromium
npm run test:e2e
```

The Vitest suite covers equipment catalogue integrity, item pricing, estimate calculations, duplicate selections and Indian currency formatting.

The Playwright suite checks all seven application routes at the 15 agreed desktop, tablet and mobile widths, landscape layouts, mobile navigation, catalogue expansion, portfolio filtering, booking selection and price estimates, 16px checkbox dimensions, enquiry form semantics, baseline security headers, key imagery and axe-core WCAG checks. It also captures full-page mobile and desktop screenshots for visual review; CI uploads screenshots, traces and the HTML report as artifacts.

The portfolio now uses free-to-use Pexels production stills instead of placeholder graphics. Pexels permits website use without mandatory attribution; source image URLs remain in the portfolio data. See https://www.pexels.com/license/ for current license terms.

**Enquiry delivery limitation:** the enquiry forms currently hand off to the visitor's email application. They do not persist enquiries to a backend or guarantee email delivery. Server-side delivery requires an approved email provider, credentials, and a persistence destination.
