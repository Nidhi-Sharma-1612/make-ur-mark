export function buildWhatsAppLink(number: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export const WHATSAPP_MESSAGES = {
  shop: "Hi MakeUrMark! I'd love to see your latest printed tees & pillows.",
  customTee: "Hi MakeUrMark! I want to design my own custom printed tee.",
  category: (name: string) =>
    `Hi MakeUrMark! I'm interested in your ${name}. Could you share more details?`,
  bulkOrder:
    "Hi MakeUrMark! I'd like to enquire about a bulk order for my business/event.",
  general: "Hi MakeUrMark! I have a question about your products.",
  productEnquiry: (details: {
    name: string;
    size?: string;
    color?: string;
    printType?: string;
    printLocation?: string;
    quantity: number;
    fileName?: string;
  }) => {
    const lines = [
      `Hi MakeUrMark! I'd like to order the ${details.name}.`,
      details.size ? `Size: ${details.size}` : null,
      details.color ? `Colour: ${details.color}` : null,
      details.printType ? `Print type: ${details.printType}` : null,
      details.printLocation ? `Print location: ${details.printLocation}` : null,
      `Quantity: ${details.quantity}`,
      details.fileName ? `I have a design file ready to share: ${details.fileName} — attaching it here.` : null,
    ].filter(Boolean);
    return lines.join("\n");
  },
  contactEnquiry: (details: { name: string; phone: string; message: string; fileName?: string }) => {
    const lines = [
      `Hi MakeUrMark! My name is ${details.name} (${details.phone}).`,
      details.message,
      details.fileName ? `I have a design file ready to share: ${details.fileName} — attaching it here.` : null,
    ].filter(Boolean);
    return lines.join("\n");
  },
} as const;
