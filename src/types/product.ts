export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  rating: number;
  reviewCount: number;
  salesCount: number;
  searchVolume?: number;
  image: string;
  keyIngredients: string[];
  skinConcerns: string[];
  description: string;
  trending: boolean;
  isNew: boolean;
  discount: number;
  source: string;
  lastUpdated: string;
}

export interface Brand {
  id: number;
  name: string;
  country: string;
  description: string;
  productCount: number;
}
