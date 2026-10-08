import { notFound } from "next/navigation";
import AdminBackLink from "@/components/admin/AdminBackLink";
import CategoryForm from "@/components/admin/CategoryForm";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <AdminBackLink href="/admin/categories" label="Back to Categories" />
        <div>
          <h1 className="font-serif text-2xl text-brand-ink">Edit Category</h1>
          <p className="text-sm text-brand-ink/60">{category.name}</p>
        </div>
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
