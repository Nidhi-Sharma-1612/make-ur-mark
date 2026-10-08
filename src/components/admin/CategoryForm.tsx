"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Info, Loader2, Tag, Trash2 } from "lucide-react";
import AdminImageUpload from "./AdminImageUpload";

export type CategoryFormValues = {
  id?: string;
  slug: string;
  name: string;
  description: string;
  image: string;
};

const EMPTY_CATEGORY: CategoryFormValues = { slug: "", name: "", description: "", image: "" };

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const inputClass =
  "rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink focus:border-brand-rose focus:outline-none";

export default function CategoryForm({ initial }: { initial?: CategoryFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<CategoryFormValues>(initial ?? EMPTY_CATEGORY);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(initial?.id);

  function update<K extends keyof CategoryFormValues>(key: K, value: CategoryFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    update("name", name);
    if (!slugTouched) update("slug", slugify(name));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const url = isEditing ? `/api/admin/categories/${initial!.id}` : "/api/admin/categories";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.formErrors?.[0] ?? data.error ?? "Failed to save category");
      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!initial?.id) return;
    if (!confirm(`Delete "${values.name}"? Products in this category will keep their category label but it will no longer appear as a homepage card.`))
      return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/categories/${initial.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete category");
      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete category");
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error ? (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <Info className="h-4 w-4 shrink-0" />
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        <div className="flex flex-col gap-5 rounded-2xl border border-brand-blush bg-brand-white p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-brand-rose-deep" />
            <h2 className="font-serif text-lg text-brand-ink">Category details</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
              Name
              <input
                type="text"
                required
                value={values.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
              Slug
              <input
                type="text"
                required
                value={values.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", slugify(e.target.value));
                }}
                className={inputClass}
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
            Description
            <textarea
              required
              rows={3}
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              className={`resize-none ${inputClass}`}
            />
          </label>
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-6">
          <div className="flex flex-col gap-5 rounded-2xl border border-brand-blush bg-brand-white p-6">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-brand-rose-deep" />
              <h2 className="font-serif text-lg text-brand-ink">Image</h2>
            </div>
            <AdminImageUpload value={values.image} onChange={(url) => update("image", url)} label="Category image" />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={saving || !values.image}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-rose-deep px-6 py-3 text-sm font-medium text-brand-white transition-colors duration-200 hover:bg-brand-ink disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isEditing ? "Save changes" : "Create category"}
            </button>

            {isEditing ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete category
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
}
