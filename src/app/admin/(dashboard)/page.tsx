import Link from "next/link";
import { Package, Tag, Type, Settings as SettingsIcon } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
  ]);

  const stats = [
    { label: "Products", value: productCount, icon: Package },
    { label: "Categories", value: categoryCount, icon: Tag },
  ];

  const quickLinks = [
    { href: "/admin/products/new", label: "Add a new product", icon: Package },
    { href: "/admin/content", label: "Edit site text", icon: Type },
    { href: "/admin/settings", label: "Edit WhatsApp number & contact info", icon: SettingsIcon },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-2xl text-brand-ink">Dashboard</h1>
        <p className="text-sm text-brand-ink/60">An overview of your MakeUrMark storefront.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:max-w-md">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-brand-blush bg-brand-white p-5">
            <stat.icon className="h-5 w-5 text-brand-rose-deep" />
            <p className="mt-3 font-serif text-3xl text-brand-ink">{stat.value}</p>
            <p className="text-sm text-brand-ink/60">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-brand-ink/70">Quick links</h2>
        <div className="flex flex-col gap-2 sm:max-w-md">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl border border-brand-blush bg-brand-white px-4 py-3 text-sm font-medium text-brand-ink transition-colors hover:border-brand-rose"
            >
              <link.icon className="h-4 w-4 text-brand-rose-deep" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
