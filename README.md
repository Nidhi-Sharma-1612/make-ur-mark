# MakeUrMark

Landing page for **MakeUrMark** — an Indian, woman-owned, unisex print-on-demand brand selling printed round-neck & polo tees and printed pillows, with bulk-order support for businesses. Orders don't go through in-site checkout; every CTA deep-links to WhatsApp Business with a pre-filled message.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (theme tokens defined in `src/app/globals.css`, no `tailwind.config.ts`)
- [Framer Motion](https://www.framer.com/motion/) for entrance/scroll animations
- [lucide-react](https://lucide.dev) for icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Before Launch

- **WhatsApp number**: set the real business number in `src/lib/config.ts` (`WHATSAPP_NUMBER`) — it's currently a placeholder (`91XXXXXXXXXX`).
- **Product photography**: swap the stock images in `public/images/` (`hero-tee.jpg`, `category-*.jpg`, `founder.jpg`) for real product/brand photos.

## Project Structure

- `src/app/` — root layout, global styles, and the single-page route (`page.tsx`)
- `src/components/` — one component per landing page section (`Hero`, `ShopCategories`, `HowItWorks`, `BulkOrders`, `Testimonials`, `AboutFounder`, `CtaBanner`, `Footer`, etc.)
- `src/lib/config.ts` — central WhatsApp number + pre-filled message templates used by every CTA
- `public/images/` — product and brand imagery

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```
