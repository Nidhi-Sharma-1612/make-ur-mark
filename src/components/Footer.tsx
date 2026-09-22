import { AtSign, MessageCircle } from "lucide-react";
import Image from "next/image";
import Logo from "./Logo";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/config";

const QUICK_LINKS = [
  { label: "Shop", href: "#shop" },
  { label: "Custom Print", href: "#how-it-works" },
  { label: "Bulk Orders", href: "#bulk-orders" },
  { label: "About", href: "#about" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-ink py-14 text-brand-blush-light">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Logo variant="light" />
          <p className="max-w-xs text-sm text-brand-blush-light/80">
            Unisex printed tees &amp; pillows, made on demand from India.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-serif text-base text-brand-white">Quick links</span>
          {QUICK_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-brand-blush-light/80 hover:text-brand-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-serif text-base text-brand-white">Get in touch</span>
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-brand-white"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Business
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-brand-white"
          >
            <AtSign className="h-4 w-4" /> @makeurmark.in
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
