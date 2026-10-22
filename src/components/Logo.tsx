import Image from "next/image";

type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

// Real brand mark, pre-processed into transparent-background PNGs (see
// public/images/makeurmark_logo.jpeg for the original flattened artwork) —
// "dark" is the rose-coloured mark for light backgrounds (navbar, admin),
// "light" is the white mark for dark backgrounds (footer).
export default function Logo({ variant = "dark", className }: LogoProps) {
  const src =
    variant === "light"
      ? "/images/makeurmark-logo-mark-white.png"
      : "/images/makeurmark-logo-mark-rose.png";

  return (
    <Image
      src={src}
      alt="MakeUrMark.in — Make it yours"
      width={356}
      height={260}
      sizes="260px"
      className={`h-14 w-auto self-start ${className ?? ""}`}
    />
  );
}
