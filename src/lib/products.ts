import { prisma } from "./db";
import type { Product as ProductRow } from "@prisma/client";

export type Product = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  tagline: string;
  image: string;
  description: string;
  features: string[];
  startingPrice: number;
  sizes?: string[];
  colors: string[];
  printTypes: string[];
  printLocations?: string[];
};

function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    categorySlug: row.categorySlug,
    tagline: row.tagline,
    image: row.image,
    description: row.description,
    features: row.features,
    startingPrice: row.startingPrice,
    sizes: row.sizes.length ? row.sizes : undefined,
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
