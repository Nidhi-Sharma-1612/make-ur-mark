import { z } from "zod";

export const productSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  name: z.string().min(1),
  category: z.string().min(1),
  categorySlug: z.string().min(1),
  tagline: z.string().min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  features: z.array(z.string().min(1)).default([]),
  startingPrice: z.number().int().nonnegative(),
  sizes: z.array(z.string().min(1)).default([]),
  colors: z.array(z.string().min(1)).default([]),
  printTypes: z.array(z.string().min(1)).default([]),
  printLocations: z.array(z.string().min(1)).default([]),
  sortOrder: z.number().int().default(0),
});

export const categorySchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  sortOrder: z.number().int().default(0),
});

export const settingsSchema = z.object({
  whatsappNumber: z.string().min(1),
  contactEmail: z.string().email().nullable().optional(),
  instagramUrl: z.string().url().nullable().optional(),
});

// A SiteContent section update: { [key]: value }, values can be strings or JSON arrays.
export const contentSectionSchema = z.record(z.string(), z.unknown());
