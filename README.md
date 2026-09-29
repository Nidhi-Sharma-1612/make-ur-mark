# MakeUrMark

Website for **MakeUrMark** — an Indian, woman-owned, unisex print-on-demand brand selling printed round-neck & polo tees, hoodies, tote bags, caps, and printed pillows, with bulk-order support for businesses. There's no in-site checkout; every CTA (product enquiries, bulk orders, the contact form) deep-links to WhatsApp Business with a pre-filled message.

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

## Pages

- `/` — the landing page: hero, trust strip, shop categories, how-it-works, bulk orders, testimonials, about, and a contact form
- `/products` — full product catalog
- `/products/[slug]` — product detail page with size/colour/print-type/quantity selection, a design-upload field, and a "Enquire on WhatsApp" CTA that carries the selected options into the message

## Before Launch

- **WhatsApp number**: set the real business number in `src/lib/config.ts` (`WHATSAPP_NUMBER`) — it's currently a placeholder (`91XXXXXXXXXX`).
- **Product photography**: swap the stock images in `public/images/` (`hero-tee.jpg`, `category-*.jpg`, `founder.jpg`) for real product/brand photos.
- **File uploads**: the design-upload fields (product page, contact form) attach the filename to the WhatsApp message text, but `wa.me` links can't carry the file itself — customers still need to attach it manually in the chat. If real file delivery is needed later, that requires a backend upload endpoint.

## Project Structure

- `src/app/` — root layout, global styles, the homepage route, and the `products` routes
- `src/components/` — one component per landing page section (`Hero`, `ShopCategories`, `HowItWorks`, `BulkOrders`, `Testimonials`, `AboutFounder`, `CtaBanner`, `ContactForm`, `Footer`, etc.), plus `ProductDetail` and the shared `DesignUpload` field
- `src/lib/config.ts` — central WhatsApp number + pre-filled message templates (product enquiries, bulk orders, contact form) used by every CTA
- `src/lib/products.ts` — the product catalog (name, category, price, sizes, colours, print options) that powers `/products` and `/products/[slug]`
- `public/images/` — product and brand imagery

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```
