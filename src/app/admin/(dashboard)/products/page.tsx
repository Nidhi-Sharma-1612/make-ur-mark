import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-brand-ink">Products</h1>
          <p className="text-sm text-brand-ink/60">{products.length} products in the catalog.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand-rose-deep px-5 py-2.5 text-sm font-medium text-brand-white transition-colors hover:bg-brand-ink"
        >
          <Plus className="h-4 w-4" />
          New Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-brand-blush bg-brand-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-brand-blush bg-brand-blush-light/40 text-xs font-medium text-brand-ink/60 uppercase">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-brand-blush last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${product.id}`} className="flex items-center gap-3 group">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-brand-blush-light">
                      <Image src={product.image} alt="" fill className="object-cover" unoptimized />
                    </div>
                    <span className="font-medium text-brand-ink group-hover:text-brand-rose-deep">
                      {product.name}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-brand-ink/70">{product.category}</td>
                <td className="px-4 py-3 text-brand-ink/70">₹{product.startingPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
