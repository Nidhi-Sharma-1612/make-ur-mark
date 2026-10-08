import CtaBannerClient from "./CtaBannerClient";
import { getSiteContent } from "@/lib/content";

export default async function CtaBanner() {
  const content = await getSiteContent("ctaBanner");

  return (
    <CtaBannerClient
      heading={(content.heading as string) ?? "Ready to"}
      headingAccent={(content.headingAccent as string) ?? "make it yours"}
      body={(content.body as string) ?? ""}
    />
  );
}
