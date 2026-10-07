"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FloralAccent from "./FloralAccent";

export default function AboutFounder() {
  return (
    <section id="about" className="relative overflow-hidden bg-brand-blush-light/60 py-20 sm:py-28">
      <FloralAccent className="pointer-events-none absolute -right-8 top-8 h-48 w-36 text-brand-blush" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full bg-brand-blush/50 ring-4 ring-brand-white"
        >
          <Image
            src="/images/products/about-story.png"
            alt="A MakeUrMark printed tee, styled in the studio"
            fill
            sizes="(min-width: 1024px) 384px, 90vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <span className="font-script text-2xl text-brand-rose">Our story</span>
          <h2 className="font-serif text-3xl text-brand-ink sm:text-4xl">
            Built by hand, one print at a time
          </h2>
          <p className="text-brand-ink/70">
            MakeUrMark started with a simple idea: everyone deserves clothing
            and home pieces that feel personal. As a woman-owned studio based
            in India, we design and print every tee and pillow on demand —
            no mass production, just thoughtful pieces made when you order
            them.
          </p>
          <p className="text-brand-ink/70">
            From a single custom tee to a bulk order for your business, we
            treat every piece with the same care — because it&apos;s not just
            merchandise, it&apos;s your mark.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
