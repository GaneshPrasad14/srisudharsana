export interface Product {
  id: string;
  name: string;
  category: "sarees" | "veshti" | "thundu";
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  fabric: string;
  description: string;
  details: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7050";

export const mapApiProduct = (p: any): Product => ({
  id: p._id,
  name: p.name,
  category: p.category,
  price: p.price,
  originalPrice: p.originalPrice,
  image: p.image?.startsWith('http') ? p.image : `${API_URL}${p.image}`,
  images: (p.images || [p.image]).map((img: string) => img?.startsWith('http') ? img : `${API_URL}${img}`),
  fabric: p.fabric || "Handloom Silk",
  description: p.description || "",
  details: p.details || [],
  rating: p.rating || 0,
  reviews: p.reviews || 0,
  inStock: p.inStock !== undefined ? p.inStock : true,
  badge: p.badge,
});

export const products: Product[] = [];
