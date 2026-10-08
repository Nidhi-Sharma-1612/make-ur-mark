import AdminBackLink from "@/components/admin/AdminBackLink";
import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <AdminBackLink href="/admin/categories" label="Back to Categories" />
        <div>
          <h1 className="font-serif text-2xl text-brand-ink">New Category</h1>
          <p className="text-sm text-brand-ink/60">Add a new category card to the homepage.</p>
        </div>
      </div>
      <CategoryForm />
    </div>
  );
}
