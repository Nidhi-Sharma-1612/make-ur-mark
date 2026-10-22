const COLOR_HEX: Record<string, string> = {
  Black: "#111111",
  White: "#FFFFFF",
  Red: "#D3342D",
  Maroon: "#6E1B23",
  Navy: "#1B2A4A",
  "Grey Melange": "#9B9B9B",
  Natural: "#E8DFCB",
  "Light Blue": "#A9C9E6",
};

export function getColorSwatch(name: string): { hex: string; isLiteral: boolean } {
  const hex = COLOR_HEX[name];
  return hex ? { hex, isLiteral: true } : { hex: "#D9D9D9", isLiteral: false };
}
