"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import type { Category } from "@/lib/categories";

type ShopCategoriesClientProps = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  categories: Category[];
};

export default function ShopCategoriesClient({
  eyebrow,
  heading,
  subtitle,
  categories,
}: ShopCategoriesClientProps) {
  return (
    <section id="shop" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow={eyebrow} title={heading} subtitle={subtitle} />

      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            whileHover={{ y: -6 }}
          >
            <Link
              href={`/products?category=${category.slug}`}
              className="group flex flex-col gap-4 rounded-3xl border border-brand-blush bg-brand-white p-5 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-brand-rose hover:shadow-xl hover:shadow-brand-rose/15"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-blush-light">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 32vw, 48vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-serif text-base text-brand-ink sm:text-lg">{category.name}</h3>
                <p className="mt-1 text-xs text-brand-ink/70 sm:text-sm">{category.description}</p>
              </div>
              <span className="mt-auto flex items-center gap-1 text-xs font-medium text-brand-rose-deep sm:text-sm">
                Shop now
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </motion.div>
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
