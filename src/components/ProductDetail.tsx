"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import DesignUpload from "./DesignUpload";
import WhatsAppButton from "./WhatsAppButton";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/config";
import type { Product } from "@/lib/products";

function OptionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <span className="text-sm font-medium text-brand-ink">{label}</span>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-w-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              value === option
                ? "border-brand-rose-deep bg-brand-rose-deep text-brand-white"
                : "border-brand-blush text-brand-ink/70 hover:border-brand-rose"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const [color, setColor] = useState(product.colors[0]);
  const [printType, setPrintType] = useState(product.printTypes[0]);
  const [printLocation, setPrintLocation] = useState(product.printLocations?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const whatsappLink = useMemo(
    () =>
      buildWhatsAppLink(
        WHATSAPP_MESSAGES.productEnquiry({
          name: product.name,
          size: size || undefined,
          color,
          printType,
          printLocation: printLocation || undefined,
          quantity,
          fileName: file?.name,
        })
      ),
    [product.name, size, color, printType, printLocation, quantity, file]
  );

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 lg:grid-cols-2 lg:items-start lg:py-16">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-brand-blush-light lg:sticky lg:top-28">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 512px, 90vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <span className="text-sm font-medium text-brand-rose-deep">{product.category}</span>
          <h1 className="mt-1 font-serif text-3xl text-brand-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-brand-ink/70">{product.tagline}</p>
        </div>

        <p className="text-sm text-brand-ink/70">{product.description}</p>

        <ul className="flex flex-col gap-1.5 text-sm text-brand-ink/70">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-rose" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5 border-t border-brand-blush pt-6">
          {product.sizes ? (
            <OptionGroup label="Size" options={product.sizes} value={size} onChange={setSize} />
          ) : null}

          <OptionGroup label="Colour" options={product.colors} value={color} onChange={setColor} />

          <OptionGroup label="Print type" options={product.printTypes} value={printType} onChange={setPrintType} />

          {product.printLocations ? (
            <OptionGroup
              label="Print location"
              options={product.printLocations}
              value={printLocation}
              onChange={setPrintLocation}
            />
          ) : null}

          <DesignUpload file={file} onChange={setFile} />

          <div>
            <span className="text-sm font-medium text-brand-ink">Quantity</span>
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-blush text-brand-ink/70 hover:border-brand-rose"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium text-brand-ink">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-blush text-brand-ink/70 hover:border-brand-rose"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-t border-brand-blush pt-6">
          <span className="font-serif text-2xl text-brand-rose-deep">
            ₹{product.startingPrice}
            <span className="ml-2 font-sans text-sm font-normal text-brand-ink/60">
              starting price / piece
            </span>
          </span>
          <span className="text-xs text-brand-ink/50">
            Final price confirmed on WhatsApp based on quantity &amp; customization.
          </span>
        </div>

        <WhatsAppButton href={whatsappLink} className="w-full justify-center sm:w-fit">
          Enquire on WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
