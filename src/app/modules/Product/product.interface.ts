export interface IProduct {
  name: string;
  description: string;
  
  stock: number;
  category: string;
  images: string[];
  isDeleted: boolean;
  priceBDT: number; 
  priceUSD: number; 
  defaultCurrency: 'BDT' | 'USD';
  }
  