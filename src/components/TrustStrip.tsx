import { MapPinned, PackageCheck, Shirt, Sparkles } from "lucide-react";
import { getSiteContent } from "@/lib/content";

const ICONS = [Sparkles, Shirt, MapPinned, PackageCheck];
const DEFAULT_LABELS = [
  "Premium Print Quality",
  "Unisex, All-Fit Sizing",
  "Made to Order in India",
  "Cash on Delivery Available",
];

export default async function TrustStrip() {
  const content = await getSiteContent("trustStrip");
  const items = (content.items as { label: string }[] | undefined) ?? DEFAULT_LABELS.map((label) => ({ label }));

  return (
    <section className="border-y border-brand-blush bg-brand-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
        {items.map((item, index) => {
          const Icon = ICONS[index] ?? Sparkles;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left"
            >
              <Icon className="h-5 w-5 shrink-0 text-brand-rose-deep" strokeWidth={1.5} />
              <span className="text-xs font-medium text-brand-ink/80 sm:text-sm">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
