"use client";

import { motion } from "framer-motion";
import { Building2, CheckCircle2 } from "lucide-react";
import FloralAccent from "./FloralAccent";
import WhatsAppButton from "./WhatsAppButton";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/config";

const BENEFITS = [
  "Custom branding & logo printing for your team or event",
  "Flexible order sizes — from small teams to large corporates",
  "Consistent quality across every unisex tee or pillow",
  "Pan-India delivery, tracked and on schedule",
];

export default function BulkOrders() {
  return (
    <section
      id="bulk-orders"
      className="relative overflow-hidden bg-brand-rose-deep py-20 text-brand-white sm:py-28"
    >
      <FloralAccent className="pointer-events-none absolute -top-6 -right-6 h-40 w-32 rotate-12 text-brand-white/10 sm:h-56 sm:w-44" />
      <FloralAccent className="pointer-events-none absolute -bottom-8 left-8 h-40 w-32 -rotate-12 text-brand-white/10 sm:h-56 sm:w-44" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <Building2 strokeWidth={1.5} className="h-8 w-8 text-brand-blush-light" />
            <span className="font-script text-2xl text-brand-blush-light">
              For businesses
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl">
            Bulk orders, made simple
          </h2>
          <p className="max-w-md text-brand-blush-light">
            Corporate merch, event tees, or gifting at scale — MakeUrMark
            handles bulk printing for businesses across India with the same
            care as a single custom piece.
          </p>
          <WhatsAppButton
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.bulkOrder)}
            variant="inverse"
            className="w-fit"
          >
            Enquire for Bulk Orders
          </WhatsAppButton>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4 rounded-3xl bg-brand-white/10 p-8"
        >
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <CheckCircle2
                strokeWidth={1.5}
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-blush-light"
              />
              <span className="text-sm text-brand-white/90 sm:text-base">
                {benefit}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
