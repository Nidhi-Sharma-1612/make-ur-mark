import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { prisma } from "@/lib/db";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" }, select: { slug: true, name: true } }),
  ]);

  if (!product) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-brand-ink">Edit Product</h1>
        <p className="text-sm text-brand-ink/60">{product.name}</p>
      </div>
      <ProductForm
        categories={categories}
        initial={{
          id: product.id,
          slug: product.slug,
          name: product.name,
          category: product.category,
          categorySlug: product.categorySlug,
          tagline: product.tagline,
          image: product.image,
          description: product.description,
          features: product.features,
          startingPrice: product.startingPrice,
          sizes: product.sizes,
          colors: product.colors,
          printTypes: product.printTypes,
          printLocations: product.printLocations,
        }}
      />
    </div>
  );
}
