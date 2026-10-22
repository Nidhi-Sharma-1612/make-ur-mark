import PlaceOrderClient from "./PlaceOrderClient";
import { getAllCategories } from "@/lib/categories";
import { getSiteContent } from "@/lib/content";

export default async function PlaceOrder() {
  const [content, categories] = await Promise.all([
    getSiteContent("placeOrder"),
    getAllCategories(),
  ]);

  return (
    <PlaceOrderClient
      eyebrow={(content.eyebrow as string) ?? "Order with ease"}
      heading={(content.heading as string) ?? "Place your order"}
      subtitle={(content.subtitle as string) ?? ""}
      description={
        (content.description as string) ??
        "Pick a category to see what's available, choose your product, and send us your details on WhatsApp — no payment needed upfront, we'll confirm everything with you directly."
      }
      categories={categories}
    />
  );
}
