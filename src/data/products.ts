export interface Product {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  image: string;
  category: "Cascos" | "Guantes" | "Intercomunicadores" | "Chaquetas" | "Accesorios";
  isFeatured?: boolean;
}

export const allProducts: Product[] = [
  {
    id: "prod-casco-integral",
    name: "Casco integral negro",
    price: 129,
    priceFormatted: "$129.00 USD",
    image: "/images/prod-casco.jpg",
    category: "Cascos",
    isFeatured: true,
  },
  {
    id: "prod-guantes-ruta",
    name: "Guantes de ruta",
    price: 39,
    priceFormatted: "$39.00 USD",
    image: "/images/prod-guantes.jpg",
    category: "Guantes",
    isFeatured: true,
  },
  {
    id: "prod-intercom",
    name: "Intercomunicador",
    price: 89,
    priceFormatted: "$89.00 USD",
    image: "/images/prod-intercom.jpg",
    category: "Intercomunicadores",
    isFeatured: true,
  },
  {
    id: "prod-chaqueta-touring",
    name: "Chaqueta touring",
    price: 159,
    priceFormatted: "$159.00 USD",
    image: "/images/prod-chaqueta.jpg",
    category: "Chaquetas",
    isFeatured: true,
  },
  {
    id: "prod-casco-adventure",
    name: "Casco adventure",
    price: 149,
    priceFormatted: "$149.00 USD",
    image: "/images/prod-casco-adventure.jpg",
    category: "Cascos",
  },
  {
    id: "prod-guantes-urbanos",
    name: "Guantes urbanos",
    price: 29,
    priceFormatted: "$29.00 USD",
    image: "/images/prod-guantes-urbanos.jpg",
    category: "Guantes",
  },
  {
    id: "prod-bolso-asiento",
    name: "Bolso de asiento",
    price: 59,
    priceFormatted: "$59.00 USD",
    image: "/images/prod-bolso-asiento.jpg",
    category: "Accesorios",
  },
  {
    id: "prod-soporte-celular",
    name: "Soporte para celular",
    price: 25,
    priceFormatted: "$25.00 USD",
    image: "/images/prod-soporte-celular.jpg",
    category: "Accesorios",
  },
  {
    id: "prod-chaqueta-urbana",
    name: "Chaqueta urbana",
    price: 119,
    priceFormatted: "$119.00 USD",
    image: "/images/prod-chaqueta-urbana.jpg",
    category: "Chaquetas",
  },
];
