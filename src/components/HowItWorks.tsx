import HowItWorksClient from "./HowItWorksClient";
import { getSiteContent } from "@/lib/content";

const DEFAULT_STEPS = [
  { title: "Tell us your idea", description: "Message us on WhatsApp with your design, photo, or vibe." },
  { title: "We craft the print", description: "Our team preps your artwork for a clean, lasting print." },
  { title: "Printed on demand", description: "Your tee or pillow is printed fresh — only after you order." },
  { title: "Delivered to you", description: "Packed with care and shipped anywhere in India." },
];

export default async function HowItWorks() {
  const content = await getSiteContent("howItWorks");

  return (
    <HowItWorksClient
      eyebrow={(content.eyebrow as string) ?? "How it works"}
      heading={(content.heading as string) ?? "From your idea to your doorstep"}
      subtitle={(content.subtitle as string) ?? ""}
      steps={(content.steps as { title: string; description: string }[] | undefined) ?? DEFAULT_STEPS}
    />
  );
}
