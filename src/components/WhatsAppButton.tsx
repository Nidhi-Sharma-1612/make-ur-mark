import { MessageCircle, type LucideIcon } from "lucide-react";

type WhatsAppButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost" | "inverse";
  icon?: LucideIcon;
  className?: string;
};

export default function WhatsAppButton({
  href,
  children,
  variant = "solid",
  icon: Icon = MessageCircle,
  className,
}: WhatsAppButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200";

  const variants: Record<string, string> = {
    solid: "bg-brand-rose-deep text-brand-white hover:bg-brand-ink",
    outline:
      "border border-brand-rose-deep text-brand-rose-deep hover:bg-brand-rose-deep hover:text-brand-white",
    ghost: "text-brand-rose-deep hover:text-brand-ink",
    inverse: "bg-brand-white text-brand-rose-deep hover:bg-brand-blush-light",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className ?? ""}`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </a>
  );
}
