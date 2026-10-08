"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import AdminImageUpload from "./AdminImageUpload";
import ChipInput from "./ChipInput";

export type ProductFormValues = {
  id?: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  tagline: string;
  image: string;
  description: string;
  features: string[];
  startingPrice: number;
  sizes: string[];
  colors: string[];
  printTypes: string[];
  printLocations: string[];
};

const EMPTY_PRODUCT: ProductFormValues = {
  slug: "",
  name: "",
  category: "",
  categorySlug: "",
  tagline: "",
  image: "",
  description: "",
  features: [],
  startingPrice: 0,
  sizes: [],
  colors: [],
  printTypes: [],
  printLocations: [],
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type ProductFormProps = {
  initial?: ProductFormValues;
  categories: { slug: string; name: string }[];
};

export default function ProductForm({ initial, categories }: ProductFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>(initial ?? EMPTY_PRODUCT);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(initial?.id);

  function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    update("name", name);
    if (!slugTouched) {
      update("slug", slugify(name));
    }
  }

  function handleCategoryChange(categorySlug: string) {
    const category = categories.find((c) => c.slug === categorySlug);
    update("categorySlug", categorySlug);
    update("category", category?.name ?? "");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const url = isEditing ? `/api/admin/products/${initial!.id}` : "/api/admin/products";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.formErrors?.[0] ?? data.error ?? "Failed to save product");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!initial?.id) return;
    if (!confirm(`Delete "${values.name}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${initial.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
          Name
          <input
            type="text"
            required
            value={values.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink focus:border-brand-rose focus:outline-none"
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
            className="rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink focus:border-brand-rose focus:outline-none"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
        Category
        <select
          required
          value={values.categorySlug}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink focus:border-brand-rose focus:outline-none"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
        Tagline
        <input
          type="text"
          required
          value={values.tagline}
          onChange={(e) => update("tagline", e.target.value)}
          className="rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink focus:border-brand-rose focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
        Description
        <textarea
          required
          rows={4}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          className="resize-none rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink focus:border-brand-rose focus:outline-none"
        />
      </label>

      <ChipInput
        label="Features"
        values={values.features}
        onChange={(v) => update("features", v)}
        placeholder="e.g. 100% combed cotton, 200 GSM"
      />

      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink sm:max-w-xs">
        Starting price (₹)
        <input
          type="number"
          required
          min={0}
          value={values.startingPrice}
          onChange={(e) => update("startingPrice", Number(e.target.value))}
          className="rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink focus:border-brand-rose focus:outline-none"
        />
      </label>

      <ChipInput label="Sizes" values={values.sizes} onChange={(v) => update("sizes", v)} placeholder="e.g. S, M, L" />
      <ChipInput label="Colours" values={values.colors} onChange={(v) => update("colors", v)} placeholder="e.g. Black" />
      <ChipInput
        label="Print types"
        values={values.printTypes}
        onChange={(v) => update("printTypes", v)}
        placeholder="e.g. Digital Print"
      />
      <ChipInput
        label="Print locations"
        values={values.printLocations}
        onChange={(v) => update("printLocations", v)}
        placeholder="e.g. Front"
      />

      <AdminImageUpload value={values.image} onChange={(url) => update("image", url)} label="Product image" />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || !values.image}
          className="inline-flex items-center gap-2 rounded-full bg-brand-rose-deep px-6 py-3 text-sm font-medium text-brand-white transition-colors duration-200 hover:bg-brand-ink disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isEditing ? "Save changes" : "Create product"}
        </button>

        {isEditing ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
