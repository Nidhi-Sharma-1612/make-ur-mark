"use client";

import { motion } from "framer-motion";
import { MessageSquareText, PackageCheck, Palette, Truck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const ICONS = [MessageSquareText, Palette, PackageCheck, Truck];

type Step = { title: string; description: string };

type HowItWorksClientProps = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  steps: Step[];
};

export default function HowItWorksClient({ eyebrow, heading, subtitle, steps }: HowItWorksClientProps) {
  return (
    <section id="how-it-works" className="bg-brand-blush-light/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={eyebrow} title={heading} subtitle={subtitle} />

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute top-8 right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-brand-rose/30 lg:block"
          />

          {steps.map((step, index) => {
            const Icon = ICONS[index] ?? MessageSquareText;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center gap-3 text-center"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-white shadow-md ring-4 ring-brand-blush-light">
                  <Icon strokeWidth={1.25} className="h-7 w-7 text-brand-rose-deep" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-rose-deep text-xs font-semibold text-brand-white">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-brand-ink">{step.title}</h3>
                <p className="text-sm text-brand-ink/70">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
