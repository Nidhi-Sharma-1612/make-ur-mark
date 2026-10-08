import Link from "next/link";
import { CONTENT_SCHEMA } from "@/lib/content-schema";

export default function ContentSectionNav({ active }: { active: string }) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1 lg:sticky lg:top-6 lg:w-56 lg:shrink-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
      {CONTENT_SCHEMA.map((schema) => {
        const Icon = schema.icon;
        const isActive = schema.section === active;
        return (
          <Link
            key={schema.section}
            href={`/admin/content?section=${schema.section}`}
            className={`flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors lg:border-0 ${
              isActive
                ? "border-brand-rose-deep bg-brand-rose-deep text-brand-white"
                : "border-brand-blush bg-brand-white text-brand-ink/70 hover:border-brand-rose lg:bg-transparent lg:hover:bg-brand-blush-light"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {schema.label}
          </Link>
        );
      })}
    </nav>
  );
}
