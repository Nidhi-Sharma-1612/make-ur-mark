import AboutFounderClient from "./AboutFounderClient";
import { getSiteContent } from "@/lib/content";

export default async function AboutFounder() {
  const content = await getSiteContent("aboutFounder");

  return (
    <AboutFounderClient
      eyebrow={(content.eyebrow as string) ?? "Our story"}
      heading={(content.heading as string) ?? "Built by hand, one print at a time"}
      paragraph1={(content.paragraph1 as string) ?? ""}
      paragraph2={(content.paragraph2 as string) ?? ""}
      image={(content.image as string) ?? "/images/products/about-story.png"}
    />
  );
}
