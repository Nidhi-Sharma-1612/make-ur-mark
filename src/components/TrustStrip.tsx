import { MapPinned, PackageCheck, Shirt, Sparkles } from "lucide-react";

const ITEMS = [
  { icon: Sparkles, label: "Premium Print Quality" },
  { icon: Shirt, label: "Unisex, All-Fit Sizing" },
  { icon: MapPinned, label: "Made to Order in India" },
  { icon: PackageCheck, label: "Cash on Delivery Available" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-brand-blush bg-brand-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left"
          >
            <Icon className="h-5 w-5 shrink-0 text-brand-rose-deep" strokeWidth={1.5} />
            <span className="text-xs font-medium text-brand-ink/80 sm:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
