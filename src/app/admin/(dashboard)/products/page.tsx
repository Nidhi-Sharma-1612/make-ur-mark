import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Package, Plus } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl text-brand-ink">Products</h1>
          <p className="text-sm text-brand-ink/60">{products.length} products in the catalog.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-rose-deep px-5 py-2.5 text-sm font-medium text-brand-white transition-colors hover:bg-brand-ink"
        >
          <Plus className="h-4 w-4" />
          New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-brand-blush bg-brand-white p-12 text-center">
          <Package className="h-8 w-8 text-brand-ink/30" />
          <p className="text-sm text-brand-ink/60">No products yet.</p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-full bg-brand-rose-deep px-5 py-2.5 text-sm font-medium text-brand-white transition-colors hover:bg-brand-ink"
          >
            <Plus className="h-4 w-4" />
            Add your first product
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile: card list */}
          <div className="flex flex-col gap-3 sm:hidden">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}`}
                className="flex items-center gap-3 rounded-2xl border border-brand-blush bg-brand-white p-3"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-brand-blush-light">
                  <Image src={product.image} alt="" fill className="object-cover" unoptimized />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-brand-ink">{product.name}</p>
                  <p className="truncate text-xs text-brand-ink/60">
                    {product.category} · ₹{product.startingPrice}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-brand-ink/30" />
              </Link>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden overflow-hidden rounded-2xl border border-brand-blush bg-brand-white sm:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-blush bg-brand-blush-light/40 text-xs font-medium text-brand-ink/60 uppercase">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="group border-b border-brand-blush last:border-0">
                    <td className="px-4 py-3">
                      <Link href={`/admin/products/${product.id}`} className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-brand-blush-light">
                          <Image src={product.image} alt="" fill className="object-cover" unoptimized />
                        </div>
                        <span className="font-medium text-brand-ink group-hover:text-brand-rose-deep">
                          {product.name}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-brand-ink/70">
                      <Link href={`/admin/products/${product.id}`} className="block">
                        {product.category}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-brand-ink/70">
                      <Link href={`/admin/products/${product.id}`} className="block">
                        ₹{product.startingPrice}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/products/${product.id}`}>
                        <ChevronRight className="ml-auto h-4 w-4 text-brand-ink/30 transition-colors group-hover:text-brand-rose-deep" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
