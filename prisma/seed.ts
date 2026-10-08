import { PrismaClient } from "@prisma/client";
import { CATEGORIES_SEED } from "./seed-data/categories";
import { PRODUCTS_SEED } from "./seed-data/products";

const prisma = new PrismaClient();

const CONTENT_SEED: { section: string; key: string; value: unknown }[] = [
  { section: "hero", key: "headline", value: "Custom printed tees and pillows, made your way." },
  {
    section: "hero",
    key: "subtext",
    value:
      "Pick a design, tell us your idea, or send your own artwork — we print it on soft, unisex-fit tees and pillows and ship it straight to your door.",
  },
  { section: "hero", key: "image", value: "/images/products/hero-king-lion.png" },
  { section: "hero", key: "imageAlt", value: "Model wearing a printed King of Hearts lion graphic tee" },

  {
    section: "trustStrip",
    key: "items",
    value: [
      { label: "Premium Print Quality" },
      { label: "Unisex, All-Fit Sizing" },
      { label: "Made to Order in India" },
      { label: "Cash on Delivery Available" },
    ],
  },

  { section: "shopCategories", key: "eyebrow", value: "Shop the range" },
  { section: "shopCategories", key: "heading", value: "Shop by category" },
  {
    section: "shopCategories",
    key: "subtitle",
    value:
      "Every item is printed on demand after you order — no overstock, no waste, just your design on soft, unisex-fit essentials.",
  },

  { section: "howItWorks", key: "eyebrow", value: "How it works" },
  { section: "howItWorks", key: "heading", value: "From your idea to your doorstep" },
  {
    section: "howItWorks",
    key: "subtitle",
    value: "No minimums, no guesswork — just a simple chat on WhatsApp to make it yours.",
  },
  {
    section: "howItWorks",
    key: "steps",
    value: [
      { title: "Tell us your idea", description: "Message us on WhatsApp with your design, photo, or vibe." },
      { title: "We craft the print", description: "Our team preps your artwork for a clean, lasting print." },
      {
        title: "Printed on demand",
        description: "Your tee or pillow is printed fresh — only after you order.",
      },
      { title: "Delivered to you", description: "Packed with care and shipped anywhere in India." },
    ],
  },

  { section: "bulkOrders", key: "eyebrow", value: "For businesses" },
  { section: "bulkOrders", key: "heading", value: "Bulk orders, made simple" },
  {
    section: "bulkOrders",
    key: "body",
    value:
      "Corporate merch, event tees, or gifting at scale — MakeUrMark handles bulk printing for businesses across India with the same care as a single custom piece.",
  },
  {
    section: "bulkOrders",
    key: "benefits",
    value: [
      "Custom branding & logo printing for your team or event",
      "Flexible order sizes — from small teams to large corporates",
      "Consistent quality across every unisex tee or pillow",
      "Pan-India delivery, tracked and on schedule",
    ],
  },

  { section: "testimonials", key: "heading", value: "What people are saying" },
  {
    section: "testimonials",
    key: "items",
    value: [
      {
        name: "Ananya R.",
        initials: "AR",
        quote:
          "Ordered a custom polo for my brother's birthday — the print quality was better than I expected and the WhatsApp process was so easy.",
      },
      {
        name: "Karan M.",
        initials: "KM",
        quote:
          "We got 40 tees printed for our college fest. MakeUrMark kept us updated the whole time and delivered right on schedule.",
      },
      {
        name: "Priya S.",
        initials: "PS",
        quote:
          "The printed pillow I ordered as a gift turned out beautifully. Loved that it felt personal, not mass-produced.",
      },
    ],
  },

  { section: "aboutFounder", key: "eyebrow", value: "Our story" },
  { section: "aboutFounder", key: "heading", value: "Built by hand, one print at a time" },
  {
    section: "aboutFounder",
    key: "paragraph1",
    value:
      "MakeUrMark started with a simple idea: everyone deserves clothing and home pieces that feel personal. As a woman-owned studio based in India, we design and print every tee and pillow on demand — no mass production, just thoughtful pieces made when you order them.",
  },
  {
    section: "aboutFounder",
    key: "paragraph2",
    value:
      "From a single custom tee to a bulk order for your business, we treat every piece with the same care — because it's not just merchandise, it's your mark.",
  },
  { section: "aboutFounder", key: "image", value: "/images/products/about-story.png" },

  { section: "ctaBanner", key: "heading", value: "Ready to" },
  { section: "ctaBanner", key: "headingAccent", value: "make it yours" },
  {
    section: "ctaBanner",
    key: "body",
    value: "Chat with us on WhatsApp to start your custom order — tees, polos, pillows, or a bulk order for your business.",
  },

  { section: "footer", key: "tagline", value: "Unisex printed tees & pillows, made on demand from India." },
  { section: "footer", key: "instagramHandle", value: "@makeurmark.in" },
];

async function main() {
  for (const category of CATEGORIES_SEED) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log(`Seeded ${CATEGORIES_SEED.length} categories.`);

  for (const [index, product] of PRODUCTS_SEED.entries()) {
    const data = {
      ...product,
      features: [...product.features],
      sizes: product.sizes ? [...product.sizes] : [],
      colors: [...product.colors],
      printTypes: [...product.printTypes],
      printLocations: product.printLocations ? [...product.printLocations] : [],
      sortOrder: index,
    };
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: data,
      create: data,
    });
  }
  console.log(`Seeded ${PRODUCTS_SEED.length} products.`);

  for (const row of CONTENT_SEED) {
    await prisma.siteContent.upsert({
      where: { section_key: { section: row.section, key: row.key } },
      update: { value: row.value as object },
      create: { section: row.section, key: row.key, value: row.value as object },
    });
  }
  console.log(`Seeded ${CONTENT_SEED.length} content rows.`);

  await prisma.settings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      whatsappNumber: "91XXXXXXXXXX",
      contactEmail: null,
      instagramUrl: "https://instagram.com",
    },
  });
  console.log("Seeded settings.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
