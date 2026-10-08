"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FloralAccent from "./FloralAccent";

type AboutFounderClientProps = {
  eyebrow: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
};

export default function AboutFounderClient({
  eyebrow,
  heading,
  paragraph1,
  paragraph2,
  image,
}: AboutFounderClientProps) {
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
            src={image}
            alt="MakeUrMark — our story"
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
          <span className="font-script text-2xl text-brand-rose">{eyebrow}</span>
          <h2 className="font-serif text-3xl text-brand-ink sm:text-4xl">{heading}</h2>
          <p className="text-brand-ink/70">{paragraph1}</p>
          <p className="text-brand-ink/70">{paragraph2}</p>
        </motion.div>
      </div>
    </section>
  );
}
