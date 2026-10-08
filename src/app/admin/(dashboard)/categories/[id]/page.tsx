import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import { prisma } from "@/lib/db";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-brand-ink">Edit Category</h1>
        <p className="text-sm text-brand-ink/60">{category.name}</p>
      </div>
      <CategoryForm
        initial={{
          id: category.id,
          slug: category.slug,
          name: category.name,
          description: category.description,
          image: category.image,
        }}
      />
    </div>
  );
}
