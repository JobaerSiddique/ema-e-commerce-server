const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // Price at the time of order
      },
    ],
    totalAmount: { 
        type: Number, 
        required: true 
    },
    shippingAddress: { 
        type: String, 
        required: true 
    },
    paymentMethod: {
      type: String,
      enum: ['Online Payment', 'COD'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
    paymentStatus:{
        type:String,
        enum: ['Unpaid', 'Paid'],
        default: 'Unpaid'
    },
    currency: { type: String, enum: ['BDT', 'USD'], required: true }, 
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);