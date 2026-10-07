export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "round-tshirt",
    name: "Round T-Shirt",
    description: "Everyday crewnecks with bold, unique prints.",
    image: "/images/products/tshirt.png",
  },
  {
    slug: "polo-tshirt",
    name: "Polo T-Shirt",
    description: "Smart-casual polos, printed and personalized.",
    image: "/images/products/polo-tshirt.png",
  },
  {
    slug: "shirt",
    name: "Shirt",
    description: "Collared button-up shirts for a smarter look.",
    image: "/images/category-shirt.jpg",
  },
  {
    slug: "hoodie",
    name: "Hoodie",
    description: "Cozy fleece hoodies, made for your design.",
    image: "/images/category-hoodie.jpg",
  },
  {
    slug: "bag",
    name: "Bag",
    description: "Everyday canvas totes, printed on demand.",
    image: "/images/products/bag-tote.jpg",
  },
  {
    slug: "mug",
    name: "Mug",
    description: "Ceramic mugs, printed with your design.",
    image: "/images/category-mug.jpg",
  },
  {
    slug: "pillow",
    name: "Pillow",
    description: "Turn your favourite design into home decor.",
    image: "/images/category-pillow.jpg",
  },
];
