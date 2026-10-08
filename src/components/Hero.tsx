import HeroClient from "./HeroClient";
import { getSiteContent } from "@/lib/content";

export default async function Hero() {
  const content = await getSiteContent("hero");

  return (
    <HeroClient
      headline={(content.headline as string) ?? "Custom printed tees and pillows, made your way."}
      subtext={(content.subtext as string) ?? ""}
      image={(content.image as string) ?? "/images/products/hero-king-lion.png"}
      imageAlt={(content.imageAlt as string) ?? "MakeUrMark printed tee"}
    />
  );
}
