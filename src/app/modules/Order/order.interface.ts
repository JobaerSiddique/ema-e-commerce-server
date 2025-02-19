import { Types } from "mongoose";

export interface IOrderProduct {
  product: Types.ObjectId; // Reference to the Product model
  quantity: number;        // Quantity of the product
  price: number;           // Price at the time of order
}

export interface IOrder {
  customer: Types.ObjectId;        // Reference to the User model
  products: IOrderProduct[];       // Array of products in the order
  totalAmount: number;             // Total amount of the order
  shippingAddress: string;         // Shipping address for the order
  paymentMethod: "Online Payment" | "Cash on Delivery"; // Payment method
  status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered"; // Order status
  currency: "BDT" | "USD";         // Currency of the order
  createdAt?: Date;                // Timestamp for order creation
  updatedAt?: Date;                // Timestamp for last update
}
