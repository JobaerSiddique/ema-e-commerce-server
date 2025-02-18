import mongoose, { model } from "mongoose";
import { IProduct } from "./product.interface";


const productSchema = new mongoose.Schema(
    {
      name: { 
        type: String, 
        required: true 
    },
      description: { 
        type: String,
         required: true 
    },
      price: { 
        type: Number, 
        required: true 
    },
      stock: { 
        type: Number, 
        required: true, 
        default: 0 
    }, 
      category: {
         type: String, 
         required: true 
        }, 
      images: { 
        type: [String], 
        required: true 
    }, 
    },
    { timestamps: true }
  );

export const Product = model<IProduct>('product', productSchema)