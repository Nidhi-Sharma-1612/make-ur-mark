import Image from "next/image";
import Link from "next/link";
import { Plus, Tag } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl text-brand-ink">Categories</h1>
          <p className="text-sm text-brand-ink/60">{categories.length} categories shown on the homepage.</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-rose-deep px-5 py-2.5 text-sm font-medium text-brand-white transition-colors hover:bg-brand-ink"
        >
          <Plus className="h-4 w-4" />
          New Category
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-brand-blush bg-brand-white p-12 text-center">
          <Tag className="h-8 w-8 text-brand-ink/30" />
          <p className="text-sm text-brand-ink/60">No categories yet.</p>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 rounded-full bg-brand-rose-deep px-5 py-2.5 text-sm font-medium text-brand-white transition-colors hover:bg-brand-ink"
          >
            <Plus className="h-4 w-4" />
            Add your first category
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/admin/categories/${category.id}`}
              className="group flex flex-col gap-2 rounded-2xl border border-brand-blush bg-brand-white p-3 transition-colors hover:border-brand-rose"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-brand-blush-light">
                <Image src={category.image} alt="" fill className="object-cover" unoptimized />
              </div>
              <span className="text-sm font-medium text-brand-ink group-hover:text-brand-rose-deep">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
