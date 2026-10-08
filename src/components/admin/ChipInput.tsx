"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

type ChipInputProps = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

export default function ChipInput({ label, values, onChange, placeholder }: ChipInputProps) {
  const [draft, setDraft] = useState("");

  function addChip() {
    const trimmed = draft.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setDraft("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addChip();
    } else if (event.key === "Backspace" && draft === "" && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  }

  return (
    <div>
      <span className="text-sm font-medium text-brand-ink">{label}</span>
      <div className="mt-2 flex flex-wrap items-center gap-2 rounded-xl border border-brand-blush bg-brand-white p-2">
        {values.map((value, index) => (
          <span
            key={`${value}-${index}`}
            className="flex items-center gap-1 rounded-full bg-brand-blush-light px-3 py-1 text-xs font-medium text-brand-ink"
          >
            {value}
            <button
              type="button"
              onClick={() => onChange(values.filter((_, i) => i !== index))}
              aria-label={`Remove ${value}`}
              className="text-brand-ink/50 hover:text-brand-rose-deep"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addChip}
          placeholder={placeholder ?? "Type and press Enter"}
          className="min-w-[8rem] flex-1 border-none bg-transparent px-1 py-1 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:outline-none"
        />
      </div>
    </div>
  );
}
