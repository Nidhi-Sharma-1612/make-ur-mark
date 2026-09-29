import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products — MakeUrMark",
  description:
    "Browse MakeUrMark's full catalog of printed tees, hoodies, bags, caps, pillows, and custom designs.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Full catalog"
            title="Everything you can print with us"
            subtitle="From everyday tees to bulk merch for your business — pick a product, choose your size and print, and we'll take it from there."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group flex flex-col gap-4 rounded-3xl border border-brand-blush bg-brand-white p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-brand-rose hover:shadow-xl hover:shadow-brand-rose/15"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-blush-light">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <span className="text-xs font-medium tracking-wide text-brand-rose-deep uppercase">
                    {product.category}
                  </span>
                  <h3 className="mt-1 font-serif text-lg text-brand-ink">{product.name}</h3>
                  <p className="mt-1 text-sm text-brand-ink/70">{product.tagline}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-brand-rose-deep">
                    From ₹{product.startingPrice}
                  </span>
                  {product.sizes ? (
                    <span className="text-xs text-brand-ink/50">{product.sizes.join(" / ")}</span>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
