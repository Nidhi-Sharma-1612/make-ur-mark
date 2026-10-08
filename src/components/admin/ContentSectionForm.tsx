"use client";

import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import AdminImageUpload from "./AdminImageUpload";
import ChipInput from "./ChipInput";
import type { ContentField } from "@/lib/content-schema";

// Note: deliberately not the full ContentSectionSchema — that type carries a
// Lucide icon component (a function), which can't cross the server/client
// boundary as a prop. The sidebar nav already shows the icon per section, so
// this form only needs the plain, serializable parts.
type ContentSectionFormProps = {
  schema: { section: string; label: string; fields: ContentField[] };
  initialValues: Record<string, unknown>;
};

export default function ContentSectionForm({ schema, initialValues }: ContentSectionFormProps) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(key: string, value: unknown) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${schema.section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-brand-blush bg-brand-white p-6">
      <h2 className="font-serif text-lg text-brand-ink">{schema.label}</h2>

      {schema.fields.map((field) => {
        if (field.type === "text") {
          return (
            <label key={field.key} className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
              {field.label}
              <input
                type="text"
                value={(values[field.key] as string) ?? ""}
                onChange={(e) => update(field.key, e.target.value)}
                className="rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink focus:border-brand-rose focus:outline-none"
              />
            </label>
          );
        }

        if (field.type === "textarea") {
          return (
            <label key={field.key} className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
              {field.label}
              <textarea
                rows={3}
                value={(values[field.key] as string) ?? ""}
                onChange={(e) => update(field.key, e.target.value)}
                className="resize-none rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink focus:border-brand-rose focus:outline-none"
              />
            </label>
          );
        }

        if (field.type === "image") {
          return (
            <AdminImageUpload
              key={field.key}
              label={field.label}
              value={(values[field.key] as string) ?? ""}
              onChange={(url) => update(field.key, url)}
            />
          );
        }

        if (field.type === "list") {
          return (
            <ChipInput
              key={field.key}
              label={field.label}
              values={(values[field.key] as string[]) ?? []}
              onChange={(v) => update(field.key, v)}
            />
          );
        }

        if (field.type === "repeatable" && field.itemFields) {
          const items = (values[field.key] as Record<string, string>[]) ?? [];
          const itemFields = field.itemFields;
          return (
            <div key={field.key}>
              <span className="text-sm font-medium text-brand-ink">{field.label}</span>
              <div className="mt-2 flex flex-col gap-3">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-2 rounded-xl border border-brand-blush p-3">
                    <div className="flex flex-1 flex-col gap-2">
                      {itemFields.map((sub) => (
                        <label key={sub.key} className="flex flex-col gap-1 text-xs font-medium text-brand-ink/70">
                          {sub.label}
                          {sub.type === "textarea" ? (
                            <textarea
                              rows={2}
                              value={item[sub.key] ?? ""}
                              onChange={(e) => {
                                const next = [...items];
                                next[index] = { ...next[index], [sub.key]: e.target.value };
                                update(field.key, next);
                              }}
                              className="resize-none rounded-lg border border-brand-blush px-3 py-1.5 text-sm text-brand-ink focus:border-brand-rose focus:outline-none"
                            />
                          ) : (
                            <input
                              type="text"
                              value={item[sub.key] ?? ""}
                              onChange={(e) => {
                                const next = [...items];
                                next[index] = { ...next[index], [sub.key]: e.target.value };
                                update(field.key, next);
                              }}
                              className="rounded-lg border border-brand-blush px-3 py-1.5 text-sm text-brand-ink focus:border-brand-rose focus:outline-none"
                            />
                          )}
                        </label>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => update(field.key, items.filter((_, i) => i !== index))}
                      aria-label="Remove item"
                      className="h-fit text-brand-ink/40 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const blank = Object.fromEntries(itemFields.map((f) => [f.key, ""]));
                    update(field.key, [...items, blank]);
                  }}
                  className="flex w-fit items-center gap-1.5 rounded-full border border-dashed border-brand-blush px-3 py-1.5 text-xs font-medium text-brand-ink/60 hover:border-brand-rose"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add item
                </button>
              </div>
            </div>
          );
        }

        return null;
      })}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-brand-rose-deep px-5 py-2 text-sm font-medium text-brand-white transition-colors duration-200 hover:bg-brand-ink disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save
        </button>
        {saved ? <span className="text-sm text-green-700">Saved</span> : null}
      </div>
    </form>
  );
}
