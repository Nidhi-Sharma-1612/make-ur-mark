export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  image: string;
  description: string;
  features: string[];
  startingPrice: number;
  sizes?: string[];
  colors: string[];
  printTypes: string[];
  printLocations?: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "round-neck-tee",
    name: "Round Neck Tee",
    category: "T-Shirts",
    tagline: "Everyday-soft crewneck, printed your way.",
    image: "/images/category-round-neck.jpg",
    description:
      "Our best-selling unisex round neck tee — soft, breathable cotton that holds a crisp, long-lasting print wash after wash.",
    features: ["100% combed cotton, 180 GSM", "Unisex, relaxed fit", "Pre-shrunk fabric"],
    startingPrice: 499,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Grey Melange"],
    printTypes: ["Digital Print", "Print & Cut", "Embroidery"],
    printLocations: ["Front", "Back", "Front & Back"],
  },
  {
    slug: "polo-tee",
    name: "Polo Tee",
    category: "T-Shirts",
    tagline: "Smart-casual polo, printed and personalized.",
    image: "/images/category-polo.jpg",
    description:
      "A collared, smart-casual polo for teams, offices, and everyday wear — printed or embroidered with your design.",
    features: ["100% cotton pique, 220 GSM", "Ribbed collar & cuffs", "Unisex fit"],
    startingPrice: 599,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey", "Maroon"],
    printTypes: ["Digital Print", "Embroidery"],
    printLocations: ["Front", "Back", "Front & Back"],
  },
  {
    slug: "hoodie",
    name: "Hoodie",
    category: "Sweatshirts",
    tagline: "Cozy fleece hoodie, made for your design.",
    image: "/images/category-hoodie.jpg",
    description:
      "A heavyweight fleece hoodie with a relaxed unisex fit — perfect for cooler days, streetwear drops, and team merch.",
    features: ["280 GSM cotton-fleece blend", "Kangaroo pocket", "Adjustable drawstring hood"],
    startingPrice: 899,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey Melange"],
    printTypes: ["Digital Print", "Embroidery"],
    printLocations: ["Front", "Back"],
  },
  {
    slug: "tote-bag",
    name: "Tote Bag",
    category: "Bags",
    tagline: "Everyday canvas tote, printed on demand.",
    image: "/images/category-tote-bag.jpg",
    description:
      "A sturdy canvas tote for groceries, books, or everyday carry — a great low-cost gifting or event giveaway option.",
    features: ["Heavy-duty cotton canvas", "Reinforced handles", "One size"],
    startingPrice: 299,
    colors: ["Natural", "Black"],
    printTypes: ["Digital Print", "Print & Cut"],
    printLocations: ["Front", "Front & Back"],
  },
  {
    slug: "cap",
    name: "Cap",
    category: "Accessories",
    tagline: "Adjustable cap with your logo or design.",
    image: "/images/category-cap.jpg",
    description:
      "An adjustable, structured cap — a popular add-on for uniforms, events, and corporate merch kits.",
    features: ["Cotton twill front panel", "Adjustable strap", "One size fits most"],
    startingPrice: 349,
    colors: ["White", "Black", "Navy"],
    printTypes: ["Embroidery", "Print & Cut"],
    printLocations: ["Front"],
  },
  {
    slug: "printed-pillow",
    name: "Printed Pillow",
    category: "Home",
    tagline: "Turn your favourite design into home decor.",
    image: "/images/category-pillow.jpg",
    description:
      "A soft square cushion cover, printed edge-to-edge with your design — a lovely personalised gift or home accent.",
    features: ["Premium poly-linen cover", "Concealed zip closure", "16 x 16 inch"],
    startingPrice: 449,
    colors: ["As per design"],
    printTypes: ["Digital Print (all-over)"],
    printLocations: ["Front", "Front & Back"],
  },
  {
    slug: "custom-design",
    name: "Custom Design",
    category: "Custom",
    tagline: "Bring your own art — we'll print it on demand.",
    image: "/images/category-custom.jpg",
    description:
      "Not sure what to order? Send us your artwork, photo, or idea and we'll match it to the right product and print method.",
    features: ["Free design consultation", "Digital proof before printing", "Any product in our catalog"],
    startingPrice: 299,
    colors: ["Depends on product"],
    printTypes: ["Digital Print", "Print & Cut", "Embroidery"],
    printLocations: ["Front", "Back", "Front & Back"],
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}
