"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MessageCircle, Minus, Plus } from "lucide-react";
import DesignUpload from "./DesignUpload";
import { useWhatsAppNumber } from "./WhatsAppNumberProvider";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/config";
import { getColorSwatch } from "@/lib/colors";
import type { Product } from "@/lib/products";

function OptionGroup({
  label,
  options,
  disabledOptions = [],
  value,
  onChange,
}: {
  label: string;
  options: string[];
  disabledOptions?: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <span className="text-sm font-medium text-brand-ink">{label}</span>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const disabled = disabledOptions.includes(option);
          return (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => onChange(option)}
              className={`min-w-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                disabled
                  ? "cursor-not-allowed border-brand-blush/50 text-brand-ink/30 line-through"
                  : value === option
                    ? "border-brand-rose-deep bg-brand-rose-deep text-brand-white"
                    : "border-brand-blush text-brand-ink/70 hover:border-brand-rose"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ColorSwatchGroup({
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
      <div className="mt-2 flex flex-wrap gap-4">
        {options.map((option) => {
          const { hex, isLiteral } = getColorSwatch(option);
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                style={{ backgroundColor: hex }}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-shadow ${
                  !isLiteral || hex === "#FFFFFF" ? "border-brand-ink/20" : "border-transparent"
                } ${selected ? "ring-2 ring-brand-rose-deep ring-offset-2" : ""}`}
              >
                {!isLiteral ? <span className="text-[10px] font-semibold text-brand-ink/50">?</span> : null}
              </span>
              <span className="text-xs text-brand-ink/70">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const firstAvailableSize = product.sizes?.find((s) => !product.outOfStockSizes.includes(s)) ?? product.sizes?.[0] ?? "";
  const [size, setSize] = useState(firstAvailableSize);
  const [color, setColor] = useState(product.colors[0]);
  const [printType, setPrintType] = useState(product.printTypes[0]);
  const [printLocation, setPrintLocation] = useState(product.printLocations?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const whatsappNumber = useWhatsAppNumber();
  const displayImage = product.colorImages[color] || product.image;

  const whatsappLink = useMemo(
    () =>
      buildWhatsAppLink(
        whatsappNumber,
        WHATSAPP_MESSAGES.productEnquiry({
          name: product.name,
          size: size || undefined,
          color,
          printType,
          printLocation: printLocation || undefined,
          quantity,
          fileName: file?.name,
          customerName,
          phone,
        })
      ),
    [whatsappNumber, product.name, size, color, printType, printLocation, quantity, file, customerName, phone]
  );

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 lg:grid-cols-2 lg:items-start lg:py-16">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-brand-blush-light lg:sticky lg:top-28">
        <Image
          key={displayImage}
          src={displayImage}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 512px, 90vw"
          className="object-cover"
          priority
        />
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          window.open(whatsappLink, "_blank", "noopener,noreferrer");
        }}
        className="flex flex-col gap-6"
      >
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
            <OptionGroup
              label="Size"
              options={product.sizes}
              disabledOptions={product.outOfStockSizes}
              value={size}
              onChange={setSize}
            />
          ) : null}

          <ColorSwatchGroup label="Colour" options={product.colors} value={color} onChange={setColor} />

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

        <div className="grid gap-5 border-t border-brand-blush pt-6 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
            Name
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
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
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="rounded-xl border border-brand-blush bg-brand-white px-4 py-2.5 text-sm font-normal text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-rose focus:outline-none"
            />
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-serif text-2xl text-brand-rose-deep">
            ₹{product.priceMin}
            {product.priceMax !== product.priceMin ? ` – ₹${product.priceMax}` : ""}
            <span className="ml-2 font-sans text-sm font-normal text-brand-ink/60">
              {product.priceMax !== product.priceMin ? "price range / piece" : "price / piece"}
            </span>
          </span>
          <span className="text-xs text-brand-ink/50">
            Final price confirmed on WhatsApp based on quantity &amp; customization.
          </span>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-rose-deep px-6 py-3 text-sm font-medium text-brand-white transition-colors duration-200 hover:bg-brand-ink sm:w-fit"
        >
          <MessageCircle className="h-4 w-4" />
          Place Your Order
        </button>
      </form>
    </div>
  );
}
