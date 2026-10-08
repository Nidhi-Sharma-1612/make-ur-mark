import BulkOrdersClient from "./BulkOrdersClient";
import { getSiteContent } from "@/lib/content";

const DEFAULT_BENEFITS = [
  "Custom branding & logo printing for your team or event",
  "Flexible order sizes — from small teams to large corporates",
  "Consistent quality across every unisex tee or pillow",
  "Pan-India delivery, tracked and on schedule",
];

export default async function BulkOrders() {
  const content = await getSiteContent("bulkOrders");

  return (
    <BulkOrdersClient
      eyebrow={(content.eyebrow as string) ?? "For businesses"}
      heading={(content.heading as string) ?? "Bulk orders, made simple"}
      body={(content.body as string) ?? ""}
      benefits={(content.benefits as string[] | undefined) ?? DEFAULT_BENEFITS}
    />
  );
}
