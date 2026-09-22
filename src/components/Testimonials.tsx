"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";

const TESTIMONIALS = [
  {
    name: "Ananya R.",
    initials: "AR",
    quote:
      "Ordered a custom polo for my brother's birthday — the print quality was better than I expected and the WhatsApp process was so easy.",
  },
  {
    name: "Karan M.",
    initials: "KM",
    quote:
      "We got 40 tees printed for our college fest. MakeUrMark kept us updated the whole time and delivered right on schedule.",
  },
  {
    name: "Priya S.",
    initials: "PS",
    quote:
      "The printed pillow I ordered as a gift turned out beautifully. Loved that it felt personal, not mass-produced.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Loved by customers"
        title="What people are saying"
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="flex flex-col gap-4 rounded-3xl border border-brand-blush bg-brand-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-rose/15"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-1 text-brand-rose">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <Quote
                className="h-6 w-6 shrink-0 text-brand-blush"
                strokeWidth={0}
                fill="currentColor"
              />
            </div>
            <p className="text-sm text-brand-ink/80">{testimonial.quote}</p>
            <div className="mt-auto flex items-center gap-3 pt-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blush-light text-xs font-semibold text-brand-rose-deep">
                {testimonial.initials}
              </div>
              <span className="text-sm font-medium text-brand-ink">
                {testimonial.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
