import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductDetail from "@/components/ProductDetail";
import { getProductBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — MakeUrMark`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto flex max-w-6xl items-center gap-1 px-6 pt-6 text-sm text-brand-ink/60">
          <Link href="/" className="hover:text-brand-rose-deep">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/products" className="hover:text-brand-rose-deep">
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-brand-ink">{product.name}</span>
        </div>
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}
