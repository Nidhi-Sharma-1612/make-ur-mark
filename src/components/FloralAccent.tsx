type FloralAccentProps = {
  className?: string;
};

// Fine-line tulip illustration echoing the MakeUrMark logo mark.
export default function FloralAccent({ className }: FloralAccentProps) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M60 155 L58 70" />
      <path d="M58 100 C40 100 30 85 32 65 C50 70 58 82 58 100Z" />
      <path d="M58 115 C72 112 82 100 80 82 C64 88 58 100 58 115Z" />
      <path d="M45 30 C45 15 55 6 60 2 C65 6 75 15 75 30 C75 42 68 50 60 50 C52 50 45 42 45 30Z" />
      <path d="M50 22 C50 34 55 42 60 46" />
      <path d="M70 22 C70 34 65 42 60 46" />
    </svg>
  );
}
