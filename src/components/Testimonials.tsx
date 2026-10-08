import TestimonialsClient from "./TestimonialsClient";
import { getSiteContent } from "@/lib/content";

const DEFAULT_ITEMS = [
  {
    name: "Ananya R.",
    initials: "AR",
    quote:
      "Ordered a custom polo for my brother's birthday — the print quality was better than I expected and the WhatsApp process was so easy.",
  },
  {
    name: "Karan M.",
    initials: "KM",
    quote:
      "We got 40 tees printed for our college fest. MakeUrMark kept us updated the whole time and delivered right on schedule.",
  },
  {
    name: "Priya S.",
    initials: "PS",
    quote: "The printed pillow I ordered as a gift turned out beautifully. Loved that it felt personal, not mass-produced.",
  },
];

export default async function Testimonials() {
  const content = await getSiteContent("testimonials");

  return (
    <TestimonialsClient
      heading={(content.heading as string) ?? "What people are saying"}
      items={
        (content.items as { name: string; initials: string; quote: string }[] | undefined) ?? DEFAULT_ITEMS
      }
    />
  );
}
