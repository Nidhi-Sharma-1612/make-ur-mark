"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import AdminNav from "./AdminNav";
import Logo from "@/components/Logo";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-cream lg:flex">
      <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:border-r lg:border-brand-blush lg:bg-brand-white">
        <AdminNav />
      </aside>

      <header className="flex items-center justify-between border-b border-brand-blush bg-brand-white px-4 py-3 lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-brand-rose-deep"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-brand-white shadow-xl">
            <div className="flex items-center justify-end px-4 py-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-brand-ink/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <AdminNav onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
