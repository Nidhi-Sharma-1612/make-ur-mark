type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const eyebrowColor = light ? "text-brand-blush-light" : "text-brand-rose";
  const titleColor = light ? "text-brand-white" : "text-brand-ink";
  const subtitleColor = light ? "text-brand-blush-light" : "text-brand-ink/70";

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {eyebrow ? (
        <span
          className={`font-script text-2xl ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`font-serif text-3xl sm:text-4xl ${titleColor}`}>{title}</h2>
      {subtitle ? (
        <p className={`max-w-2xl text-base ${subtitleColor}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
