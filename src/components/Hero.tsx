"use client";

import { motion } from "framer-motion";
import { Palette, ShoppingBag } from "lucide-react";
import Image from "next/image";
import FloralAccent from "./FloralAccent";
import WhatsAppButton from "./WhatsAppButton";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/config";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-brand-blush-light via-brand-cream to-brand-cream pt-24 pb-16"
    >
      <FloralAccent className="pointer-events-none absolute -left-6 top-24 hidden h-40 w-32 text-brand-blush sm:block sm:h-56 sm:w-44" />
      <FloralAccent className="pointer-events-none absolute -right-4 bottom-4 hidden h-32 w-24 rotate-12 text-brand-blush sm:block sm:h-48 sm:w-36" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <h1 className="font-serif text-4xl leading-tight text-brand-ink sm:text-5xl lg:text-6xl">
            Custom printed tees and pillows, made your way.
          </h1>
          <p className="max-w-md text-base text-brand-ink/70 sm:text-lg">
            Pick a design, tell us your idea, or send your own artwork — we
            print it on soft, unisex-fit tees and pillows and ship it
            straight to your door.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <WhatsAppButton
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.shop)}
              icon={ShoppingBag}
            >
              Shop Designs
            </WhatsAppButton>
            <WhatsAppButton
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.customTee)}
              variant="outline"
              icon={Palette}
            >
              Start Customizing
            </WhatsAppButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] bg-brand-blush/60 shadow-xl shadow-brand-rose/10"
        >
          <Image
            src="/images/hero-tee.jpg"
            alt="Printed tee with an embroidered graphic design"
            fill
            sizes="(min-width: 1024px) 448px, 90vw"
            className="object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-brand-white/60" />
        </motion.div>
      </div>
    </section>
  );
}
