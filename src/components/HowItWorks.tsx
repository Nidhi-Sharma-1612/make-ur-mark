"use client";

import { motion } from "framer-motion";
import { MessageSquareText, PackageCheck, Palette, Truck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    icon: MessageSquareText,
    title: "Tell us your idea",
    description: "Message us on WhatsApp with your design, photo, or vibe.",
  },
  {
    icon: Palette,
    title: "We craft the print",
    description: "Our team preps your artwork for a clean, lasting print.",
  },
  {
    icon: PackageCheck,
    title: "Printed on demand",
    description: "Your tee or pillow is printed fresh — only after you order.",
  },
  {
    icon: Truck,
    title: "Delivered to you",
    description: "Packed with care and shipped anywhere in India.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-brand-blush-light/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From your idea to your doorstep"
          subtitle="No minimums, no guesswork — just a simple chat on WhatsApp to make it yours."
        />

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute top-8 right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-brand-rose/30 lg:block"
          />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center gap-3 text-center"
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-white shadow-md ring-4 ring-brand-blush-light">
                <step.icon strokeWidth={1.25} className="h-7 w-7 text-brand-rose-deep" />
                <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-rose-deep text-xs font-semibold text-brand-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-serif text-lg text-brand-ink">{step.title}</h3>
              <p className="text-sm text-brand-ink/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
