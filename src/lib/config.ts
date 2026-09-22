// TODO: replace with the real MakeUrMark WhatsApp Business number (with country code, no + or spaces)
// e.g. "919876543210" for +91 98765 43210
export const WHATSAPP_NUMBER = "91XXXXXXXXXX";

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export const WHATSAPP_MESSAGES = {
  shop: "Hi MakeUrMark! I'd love to see your latest printed tees & pillows.",
  customTee: "Hi MakeUrMark! I want to design my own custom printed tee.",
  category: (name: string) =>
    `Hi MakeUrMark! I'm interested in your ${name}. Could you share more details?`,
  bulkOrder:
    "Hi MakeUrMark! I'd like to enquire about a bulk order for my business/event.",
  general: "Hi MakeUrMark! I have a question about your products.",
} as const;
