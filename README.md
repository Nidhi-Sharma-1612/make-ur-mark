# MakeUrMark

Website for **MakeUrMark** — an Indian, woman-owned, unisex print-on-demand brand selling printed round-neck & polo tees, hoodies, tote bags, caps, and printed pillows, with bulk-order support for businesses. There's no in-site checkout; every CTA (product enquiries, bulk orders, the contact form) deep-links to WhatsApp Business with a pre-filled message.

Every product, category, and piece of marketing copy on the site is editable from a built-in admin panel at `/admin` — no code changes or redeploys needed for day-to-day content updates.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (theme tokens defined in `src/app/globals.css`, no `tailwind.config.ts`)
- [Framer Motion](https://www.framer.com/motion/) for entrance/scroll animations
- [lucide-react](https://lucide.dev) for icons
- [PostgreSQL](https://www.postgresql.org) + [Prisma](https://www.prisma.io) for products, categories, site content, and settings
- A custom signed-cookie admin session (via [`jose`](https://github.com/panva/jose) + [`bcryptjs`](https://github.com/dcodeIO/bcrypt.js)) — single admin user, no third-party auth provider

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Have a local PostgreSQL server running, and create a database (e.g. `createdb makeurmark`).
3. Copy `.env.example` to `.env` and fill in every value:
   ```bash
   cp .env.example .env
   ```
   **Important:** the bcrypt hash in `ADMIN_PASSWORD_HASH` contains literal `$` characters, which Next.js's `.env` loader treats as variable-expansion syntax. Escape every `$` as `\$` or the hash will be silently corrupted and login will fail with "Admin account is not configured." Generate the hash and a session secret with:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
4. Run the initial migration and seed the database with the current catalog + site copy:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) for the public site, or [http://localhost:3000/admin/login](http://localhost:3000/admin/login) to manage content.

## Pages

- `/` — the landing page: hero, trust strip, shop categories, how-it-works, bulk orders, testimonials, about, and a contact form — every section's text and images are fetched from the database on every request
- `/products` — full product catalog, filterable by category
- `/products/[slug]` — product detail page with size/colour/print-type/quantity selection, a design-upload field, and an "Enquire on WhatsApp" CTA that carries the selected options into the message
- `/admin` — the admin panel: dashboard, product CRUD, category CRUD, a generic editor for every site-text section, and settings (WhatsApp number, contact email, Instagram URL)

## Admin Panel

- **Products** (`/admin/products`) — create, edit, and delete products, including image upload and the size/colour/print-type/print-location chip fields.
- **Categories** (`/admin/categories`) — the 7 homepage category cards (Round T-Shirt, Polo T-Shirt, Shirt, Hoodie, Bag, Mug, Pillow).
- **Site Content** (`/admin/content`) — every text block and image across Hero, Trust Strip, Shop Categories heading, How It Works, Bulk Orders, Testimonials, About, CTA Banner, and Footer, grouped into one form per section.
- **Settings** (`/admin/settings`) — the WhatsApp number used by every order/enquiry button site-wide, plus contact email and Instagram URL.

Changes save immediately to Postgres and appear on the public site the next time a page loads — there's no caching layer to invalidate and no rebuild required.

**File uploads**: the design-upload fields on the product page and contact form let customers attach a file, but since those flows hand off to WhatsApp (`wa.me` links can't carry file attachments), customers still need to attach the file manually in the chat — the filename is included in the pre-filled message as a reminder. Admin image uploads (product/category photos, content images) work differently: they upload immediately to the server and are served back from disk.

## Deploying (Coolify on a VPS)

1. **Create a Postgres resource** in Coolify and copy its connection string into the app's `DATABASE_URL` env var.
2. **Add a persistent volume** to the app resource, mounted at `/data/uploads` (or wherever `UPLOADS_DIR` points) — without this, uploaded images are lost on every redeploy, since anything written to the container's filesystem outside a mounted volume doesn't survive a new build.
3. **Set env vars** on the app resource: `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` (escaped as above), `SESSION_SECRET`, `UPLOADS_DIR=/data/uploads`, `NODE_ENV=production`. Mark the hash and secret as sensitive.
4. The build runs `prisma generate` automatically via the `postinstall` script.
5. Set the app's start command to run migrations before starting:
   ```bash
   npx prisma migrate deploy && next start
   ```
6. Redeploy, then verify `/admin/login` works and that an uploaded test image survives a manual redeploy (confirms the volume is mounted correctly).

## Project Structure

- `src/app/` — the public routes (`page.tsx`, `products/`), the admin routes (`admin/`), and API routes (`api/admin/**` for CRUD + auth, `api/uploads/[...path]` for serving uploaded images)
- `src/components/` — one pair of components per landing-page section: an async Server Component (e.g. `Hero.tsx`) that fetches its content from the database, and a `*Client.tsx` companion that holds the Framer Motion/interactive UI and receives that content as props
- `src/components/admin/` — the admin panel's UI: `AdminNav`, `ProductForm`, `CategoryForm`, `ContentSectionForm` (a generic form renderer driven by `content-schema.ts`), `AdminImageUpload`, `ChipInput`, `SettingsForm`
- `src/lib/db.ts` — the Prisma client singleton
- `src/lib/products.ts` / `src/lib/categories.ts` — typed, DB-backed data-access functions (`getAllProducts`, `getProductBySlug`, `getAllCategories`, etc.) consumed by both the public site and the admin panel
- `src/lib/content.ts` / `src/lib/content-schema.ts` — the generic site-content key/value store and the field schema that drives the admin content editor
- `src/lib/config.ts` — WhatsApp link builder and message templates used by every CTA
- `src/lib/auth.ts` — admin session token creation/verification
- `src/middleware.ts` — protects `/admin/*` and `/api/admin/*` behind the session cookie
- `prisma/schema.prisma` — the database schema (`Product`, `Category`, `SiteContent`, `Settings`)
- `prisma/seed.ts` + `prisma/seed-data/` — seeds the database with the full starting catalog and copy
- `public/images/` — product and brand imagery bundled with the app (admin-uploaded images are served separately, from `UPLOADS_DIR`)

## Scripts

```bash
npm run dev         # start the dev server
npm run build       # production build
npm run start       # serve the production build
npm run lint         # run ESLint
npm run db:migrate   # run Prisma migrations (dev)
npm run db:seed      # seed/reseed the database
```
