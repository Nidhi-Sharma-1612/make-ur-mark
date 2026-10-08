import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-brand-ink">New Category</h1>
        <p className="text-sm text-brand-ink/60">Add a new category card to the homepage.</p>
      </div>
      <CategoryForm />
    </div>
  );
}
