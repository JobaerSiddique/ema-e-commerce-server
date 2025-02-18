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
    priceBDT: { // Price in BDT
      type: Number,
  },
  priceUSD: { // Price in USD
      type: Number,
  },
   defaultCurrency: { 
      type: String,
      enum: ['BDT', 'USD'], 
      default: 'BDT' 
  },
    isDeleted:{
      type: Boolean,
      default: false,
      
    }
    },
    { timestamps: true }
  );

export const Product = model<IProduct>('Product', productSchema)