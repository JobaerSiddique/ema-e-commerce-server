import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().nonempty("Product name is required"), 
  description: z.string().nonempty("Product description is required"), 
  price: z.number().min(0, "Price must be a positive number"), 
  stock: z.number().min(0).default(0), 
  category: z.string().nonempty("Category is required"), 
  images: z.array(z.string().url("Each image must be a valid URL")), 
});
