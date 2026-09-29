"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/config";

const CATEGORIES = [
  {
    name: "Round Neck Tees",
    description: "Everyday-soft crewnecks with prints that pop.",
    image: "/images/category-round-neck.jpg",
  },
  {
    name: "Polo Tees",
    description: "Smart-casual polos, printed and personalized.",
    image: "/images/category-polo.jpg",
  },
  {
    name: "Printed Pillows",
    description: "Turn your favourite design into home decor.",
    image: "/images/category-pillow.jpg",
  },
  {
    name: "Custom Design",
    description: "Bring your own art — we'll print it on demand.",
    image: "/images/category-custom.jpg",
  },
];

export default function ShopCategories() {
  return (
    <section id="shop" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Shop the range"
        title="Everyday pieces, made just for you"
        subtitle="Every item is printed on demand after you order — no overstock, no waste, just your design on soft, unisex-fit essentials."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category, index) => (
          <motion.a
            key={category.name}
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.category(category.name))}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col gap-4 rounded-3xl border border-brand-blush bg-brand-white p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-brand-rose hover:shadow-xl hover:shadow-brand-rose/15"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-blush-light">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <h3 className="font-serif text-lg text-brand-ink">{category.name}</h3>
              <p className="mt-1 text-sm text-brand-ink/70">{category.description}</p>
            </div>
            <span className="mt-auto flex items-center gap-1 text-sm font-medium text-brand-rose-deep">
              View on WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </motion.a>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-brand-rose-deep px-6 py-3 text-sm font-medium text-brand-rose-deep transition-colors duration-200 hover:bg-brand-rose-deep hover:text-brand-white"
        >
          View All Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
