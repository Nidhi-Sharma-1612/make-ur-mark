"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/config";

const NAV_LINKS = [
  { label: "Shop", href: "/products" },
  { label: "Custom Print", href: "/#how-it-works" },
  { label: "Bulk Orders", href: "/#bulk-orders" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-brand-cream/95 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/#top" aria-label="MakeUrMark home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-brand-ink/80 transition-colors hover:text-brand-rose-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <WhatsAppButton href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}>
            Order on WhatsApp
          </WhatsAppButton>
        </div>

        <button
          type="button"
          className="text-brand-rose-deep lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-brand-blush bg-brand-cream px-6 pb-6 lg:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-medium text-brand-ink/80"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <WhatsAppButton
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
            className="mt-4 w-full justify-center"
          >
            Order on WhatsApp
          </WhatsAppButton>
        </div>
      ) : null}
    </header>
  );
}
