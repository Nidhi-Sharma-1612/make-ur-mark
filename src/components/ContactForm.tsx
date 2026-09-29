"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import DesignUpload from "./DesignUpload";
import SectionHeading from "./SectionHeading";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/config";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Get in touch"
        title="Have a design in mind? Tell us about it"
        subtitle="Share your details and, if you already have artwork ready, attach it here. We'll open WhatsApp with everything filled in — just hit send."
      />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const link = buildWhatsAppLink(
            WHATSAPP_MESSAGES.contactEnquiry({ name, phone, message, fileName: file?.name })
          );
          window.open(link, "_blank", "noopener,noreferrer");
        }}
        className="mt-10 flex flex-col gap-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
            Name
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-rose focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
            Phone / WhatsApp number
            <input
              type="tel"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+91 98765 43210"
              className="rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-rose focus:outline-none"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
          What are you looking for?
          <textarea
            required
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us about the product, quantity, or idea you have in mind..."
            className="resize-none rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-rose focus:outline-none"
          />
        </label>

        <DesignUpload
          file={file}
          onChange={setFile}
          note="We'll open WhatsApp for you — please attach this file to the chat too, since WhatsApp doesn't let us send it automatically."
        />

        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-rose-deep px-6 py-3 text-sm font-medium text-brand-white transition-colors duration-200 hover:bg-brand-ink sm:w-fit"
        >
          <MessageCircle className="h-4 w-4" />
          Send via WhatsApp
        </button>
      </form>
    </section>
  );
}
