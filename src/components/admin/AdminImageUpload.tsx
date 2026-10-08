"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, UploadCloud, X } from "lucide-react";

type AdminImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function AdminImageUpload({ value, onChange, label = "Image" }: AdminImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="text-sm font-medium text-brand-ink">{label}</span>

      {value ? (
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-brand-blush bg-brand-blush-light/40 p-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-brand-white">
            <Image src={value} alt="" fill className="object-cover" unoptimized />
          </div>
          <span className="min-w-0 flex-1 truncate text-xs text-brand-ink/60">{value}</span>
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove image"
            className="shrink-0 text-brand-ink/50 hover:text-brand-rose-deep"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="mt-2 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-brand-blush bg-brand-white px-4 py-3 text-sm text-brand-ink/60 transition-colors hover:border-brand-rose">
          {uploading ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-brand-rose-deep" />
          ) : (
            <UploadCloud className="h-4 w-4 shrink-0 text-brand-rose-deep" />
          )}
          {uploading ? "Uploading…" : "Choose an image (PNG, JPEG, WebP, max 5MB)"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      )}

      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
