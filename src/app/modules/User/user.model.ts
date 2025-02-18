import mongoose, { model, Schema } from "mongoose";
import { IUser } from "./user.interface";


const UserSchema = new Schema(
    {
      name: { 
        type: String, 
        required: true 
    },
      email: { 
        type: String, 
        required: true, 
        unique: true 
    },
      phone: { 
        type: String, 
        required: true 
    },
      password: { 
        type: String, 
        required: true,
       
    },
      role: { 
        type: String, 
        enum: ["customer", "admin"], 
        default: "customer" 
    },
    isDeleted:{
        type: Boolean,
        default: false,
       
    },
    status:{
        type: String,
        enum: ["active", "inactive",'blocked'],
        default: "active"  
    },
      wishlist: [{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: "Product" }], 
      cart: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, 
          quantity: { type: Number, default: 1 }, 
        },
      ],
    },
    { timestamps: true } 
  );

  UserSchema.set("toJSON", {
    transform: (doc, ret) => {
      delete ret.password; 
      return ret;
    },
  });

 export  const User = model<IUser>('User',UserSchema)