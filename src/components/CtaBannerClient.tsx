"use client";

import { motion } from "framer-motion";
import FloralAccent from "./FloralAccent";
import WhatsAppButton from "./WhatsAppButton";
import { useWhatsAppNumber } from "./WhatsAppNumberProvider";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/config";

type CtaBannerClientProps = {
  heading: string;
  headingAccent: string;
  body: string;
};

export default function CtaBannerClient({ heading, headingAccent, body }: CtaBannerClientProps) {
  const whatsappNumber = useWhatsAppNumber();

  return (
    <section className="relative overflow-hidden bg-brand-blush py-16 sm:py-20">
      <FloralAccent className="pointer-events-none absolute -top-4 left-10 h-32 w-24 -rotate-12 text-brand-white/30 sm:h-44 sm:w-32" />
      <FloralAccent className="pointer-events-none absolute -bottom-6 right-10 h-32 w-24 rotate-12 text-brand-white/30 sm:h-44 sm:w-32" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center"
      >
        <h2 className="font-serif text-3xl text-brand-ink sm:text-4xl">
          {heading} <span className="font-script text-brand-rose-deep">{headingAccent}</span>?
        </h2>
        <p className="max-w-xl text-brand-ink/70">{body}</p>
        <WhatsAppButton href={buildWhatsAppLink(whatsappNumber, WHATSAPP_MESSAGES.general)}>
          Start Your Order
        </WhatsAppButton>
      </motion.div>
    </section>
  );
}
