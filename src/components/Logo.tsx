import FloralAccent from "./FloralAccent";

type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

// Text-based wordmark matching the brand logo (serif "MAKEURMARK.IN" + script tagline).
// Swap for the real logo image asset (public/logo.png via next/image) once the file is available.
export default function Logo({ variant = "dark", className }: LogoProps) {
  const inkColor = variant === "light" ? "text-brand-white" : "text-brand-rose-deep";
  const scriptColor = variant === "light" ? "text-brand-blush-light" : "text-brand-rose";

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <FloralAccent className={`h-8 w-6 ${scriptColor}`} />
      <div className="leading-tight">
        <div className={`font-serif text-lg tracking-wide ${inkColor}`}>
          MAKEURMARK<span className={scriptColor}>.IN</span>
        </div>
        <div className={`-mt-1 font-script text-sm ${scriptColor}`}>Make it yours</div>
      </div>
    </div>
  );
}
