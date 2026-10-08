import { prisma } from "./db";
import type { Category as CategoryRow } from "@prisma/client";

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

function toCategory(row: CategoryRow): Category {
  return { slug: row.slug, name: row.name, description: row.description, image: row.image };
}

export async function getAllCategories(): Promise<Category[]> {
  const rows = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(toCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const row = await prisma.category.findUnique({ where: { slug } });
  return row ? toCategory(row) : undefined;
}
