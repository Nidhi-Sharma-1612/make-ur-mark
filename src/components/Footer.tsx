import { AtSign, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/config";
import { getAllSettings, getSiteContent } from "@/lib/content";

const QUICK_LINKS = [
  { label: "Shop", href: "/products" },
  { label: "Custom Print", href: "/#how-it-works" },
  { label: "Bulk Orders", href: "/#bulk-orders" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default async function Footer() {
  const [content, settings] = await Promise.all([getSiteContent("footer"), getAllSettings()]);
  const tagline = (content.tagline as string) ?? "Unisex printed tees & pillows, made on demand from India.";
  const instagramHandle = (content.instagramHandle as string) ?? "@makeurmark.in";
  const instagramUrl = settings.instagramUrl ?? "https://instagram.com";

  return (
    <footer className="bg-brand-ink py-14 text-brand-blush-light">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Logo variant="light" />
          <p className="max-w-xs text-sm text-brand-blush-light/80">{tagline}</p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-serif text-base text-brand-white">Quick links</span>
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-brand-blush-light/80 hover:text-brand-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-serif text-base text-brand-white">Get in touch</span>
          <a
            href={buildWhatsAppLink(settings.whatsappNumber, WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-brand-white"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Business
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-brand-white"
          >
            <AtSign className="h-4 w-4" /> {instagramHandle}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-4 border-t border-brand-blush-light/20 px-6 pt-6 text-xs text-brand-blush-light/60 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} MakeUrMark.in — Make it yours.</span>
        <span className="flex items-center gap-2">
          Design and Developed by
          <Image
            src="/images/company_logo.png"
            alt="Design by Dial"
            width={90}
            height={20}
            className="h-5 w-auto"
          />
        </span>
      </div>
    </footer>
  );
}
