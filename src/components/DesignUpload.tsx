"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { FileText, UploadCloud, X } from "lucide-react";

type DesignUploadProps = {
  file: File | null;
  onChange: (file: File | null) => void;
  label?: string;
  note?: string;
};

export default function DesignUpload({
  file,
  onChange,
  label = "Upload your design (optional)",
  note = "We'll open WhatsApp for you — please attach this file to the chat too.",
}: DesignUploadProps) {
  const previewUrl = useMemo(() => {
    if (!file || !file.type.startsWith("image/")) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div>
      <span className="text-sm font-medium text-brand-ink">{label}</span>
      {file ? (
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-brand-blush bg-brand-blush-light/60 px-4 py-2.5">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-brand-white">
            {previewUrl ? (
              <Image src={previewUrl} alt={file.name} fill className="object-cover" unoptimized />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <FileText className="h-5 w-5 text-brand-rose-deep" />
              </div>
            )}
          </div>
          <span className="min-w-0 flex-1 truncate text-sm text-brand-ink">{file.name}</span>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove file"
            className="shrink-0 text-brand-ink/50 hover:text-brand-rose-deep"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="mt-2 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-brand-blush bg-brand-white px-4 py-3 text-sm text-brand-ink/60 transition-colors hover:border-brand-rose">
          <UploadCloud className="h-4 w-4 shrink-0 text-brand-rose-deep" />
          Choose a file (image or PDF)
          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          />
        </label>
      )}
      <span className="mt-1.5 block text-xs text-brand-ink/50">{note}</span>
    </div>
  );
}
