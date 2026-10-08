import ShopCategoriesClient from "./ShopCategoriesClient";
import { getAllCategories } from "@/lib/categories";
import { getSiteContent } from "@/lib/content";

export default async function ShopCategories() {
  const [content, categories] = await Promise.all([
    getSiteContent("shopCategories"),
    getAllCategories(),
  ]);

  return (
    <ShopCategoriesClient
      eyebrow={(content.eyebrow as string) ?? "Shop the range"}
      heading={(content.heading as string) ?? "Shop by category"}
      subtitle={(content.subtitle as string) ?? ""}
      categories={categories}
    />
  );
}
