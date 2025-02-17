import { Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: "customer" | "admin"; 
isDeleted: boolean;
status: "active"|"inactive"|"blocked"
  wishlist?: Types.ObjectId[]; 
  cart?: Array<{
    product: Types.ObjectId; 
    quantity: number; 
  }>;
}

export  type TUserRole = keyof typeof USER_ROLE