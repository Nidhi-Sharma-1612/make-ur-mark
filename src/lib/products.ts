import { prisma } from "./db";
import type { Product as ProductRow } from "@prisma/client";

export type Product = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  tagline: string;
  image: string;
  colorImages: Record<string, string>;
  description: string;
  features: string[];
  startingPrice: number;
  priceMin: number;
  priceMax: number;
  sizes?: string[];
  outOfStockSizes: string[];
  colors: string[];
  printTypes: string[];
  printLocations?: string[];
};

export function toColorImages(value: ProductRow["colorImages"]): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const entries = Object.entries(value as Record<string, unknown>).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string"
  );
  return Object.fromEntries(entries);
}

function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    categorySlug: row.categorySlug,
    tagline: row.tagline,
    image: row.image,
    colorImages: toColorImages(row.colorImages),
    description: row.description,
    features: row.features,
    startingPrice: row.startingPrice,
    priceMin: row.priceMin,
    priceMax: row.priceMax,
    sizes: row.sizes.length ? row.sizes : undefined,
    outOfStockSizes: row.outOfStockSizes,
    colors: row.colors,
    printTypes: row.printTypes,
    printLocations: row.printLocations.length ? row.printLocations : undefined,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? toProduct(row) : undefined;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { categorySlug },
    orderBy: { sortOrder: "asc" },
  });
  return rows.map(toProduct);
}
