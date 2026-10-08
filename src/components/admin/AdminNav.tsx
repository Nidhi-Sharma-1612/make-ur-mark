"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Package, Settings, Tag, Type } from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/content", label: "Site Content", icon: Type },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav className="flex h-full flex-col gap-1 p-4">
      <div className="px-2 pb-4">
        <span className="font-serif text-lg text-brand-ink">MakeUrMark Admin</span>
      </div>

      {NAV_ITEMS.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-brand-rose-deep text-brand-white"
                : "text-brand-ink/70 hover:bg-brand-blush-light"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}

      <button
        type="button"
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-brand-ink/70 transition-colors hover:bg-brand-blush-light"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
    </nav>
  );
}
