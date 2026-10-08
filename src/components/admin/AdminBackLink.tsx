import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AdminBackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand-ink/60 transition-colors hover:text-brand-rose-deep"
    >
      <ChevronLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
