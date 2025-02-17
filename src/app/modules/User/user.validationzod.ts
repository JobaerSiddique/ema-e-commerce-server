import { z } from "zod";

const ProductRefSchema = z.object({
    product: z.string(), 
    quantity: z.number().default(1), 
  });
  
  
  const UserSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    role: z.enum(["customer", "admin"]).default("customer"),
    wishlist: z.array(z.string()).default([]), 
    cart: z.array(ProductRefSchema).default([]),
  });


  export const UserValidation={
    UserSchema
  }