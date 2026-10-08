import Link from "next/link";
import { ArrowUpRight, ExternalLink, Package, Plus, Settings as SettingsIcon, Tag, Type } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
  ]);

  const stats = [
    { label: "Products", value: productCount, icon: Package, href: "/admin/products" },
    { label: "Categories", value: categoryCount, icon: Tag, href: "/admin/categories" },
  ];

  const quickLinks = [
    { href: "/admin/products/new", label: "Add a new product", description: "Create a product with photos, pricing, and print options.", icon: Plus },
    { href: "/admin/content", label: "Edit site text", description: "Update the hero, testimonials, and every other section's copy.", icon: Type },
    { href: "/admin/settings", label: "Edit WhatsApp number & contact info", description: "Change the number every order/enquiry button links to.", icon: SettingsIcon },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl text-brand-ink">Dashboard</h1>
          <p className="text-sm text-brand-ink/60">An overview of your MakeUrMark storefront.</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-blush px-4 py-2 text-sm font-medium text-brand-ink transition-colors hover:border-brand-rose hover:text-brand-rose-deep"
        >
          <ExternalLink className="h-4 w-4" />
          View live site
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group flex flex-col gap-3 rounded-2xl border border-brand-blush bg-brand-white p-5 transition-colors hover:border-brand-rose"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blush-light">
                <stat.icon className="h-5 w-5 text-brand-rose-deep" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-brand-ink/30 transition-colors group-hover:text-brand-rose-deep" />
            </div>
            <div>
              <p className="font-serif text-3xl text-brand-ink">{stat.value}</p>
              <p className="text-sm text-brand-ink/60">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-brand-ink/70">Quick links</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col gap-2 rounded-2xl border border-brand-blush bg-brand-white p-5 transition-colors hover:border-brand-rose"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blush-light">
                <link.icon className="h-4 w-4 text-brand-rose-deep" />
              </div>
              <span className="font-medium text-brand-ink group-hover:text-brand-rose-deep">
                {link.label}
              </span>
              <span className="text-xs text-brand-ink/60">{link.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
