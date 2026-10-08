import ProductForm from "@/components/admin/ProductForm";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    select: { slug: true, name: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-brand-ink">New Product</h1>
        <p className="text-sm text-brand-ink/60">Add a new design to the catalog.</p>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
