import  httpStatus  from 'http-status';
import AppError from "../../errors/AppError";
import { User } from '../User/user.model';
import { Product } from '../Product/product.model';
import { Order } from './order.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { OrderSearchableFields } from './order.constants';


const createOrderIntoDB = async(userId:string,products:string,shippingAddress:string,paymentMethod:string,currency:string)=>{
    console.log(userId,products,shippingAddress,paymentMethod,currency);
    const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

 
  if (!Array.isArray(products) || products.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Products are required");
  }

 
  let totalAmount = 0;
  const orderProducts = [];

  for (const item of products) {
    const productId = item.product || item.products; 
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Product not found: ${productId}`
      );
    }

   
    if (item.quantity > product.stock) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Insufficient stock for product: ${product.name}`
      );
    }

  
    let priceInSelectedCurrency;
    if (currency === "BDT") {
      priceInSelectedCurrency = product.priceBDT;
    } else if (currency === "USD") {
      priceInSelectedCurrency = product.priceUSD;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid currency");
    }
    if (!priceInSelectedCurrency) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Price is missing for product: ${product.name}`
        );
      }
    
    
    orderProducts.push({
      product: productId,
      quantity: item.quantity,
      price: priceInSelectedCurrency, 
    });

   
    totalAmount += priceInSelectedCurrency * item.quantity;

   
    product.stock -= item.quantity;
    await product.save();
  }

  
  const order = new Order({
    customer: userId,
    products: orderProducts,
    totalAmount,
    shippingAddress,
    paymentMethod,
    currency,
    paymentStatus: paymentMethod === "COD" ? "Unpaid" : "Paid", 
  });

  await order.save();
  return order;
}

const getAllOrderFromDB = async(query:Record<any,unknown>)=>{
    const OrderModel = await new QueryBuilder(
        Order.find().populate({
            path: 'customer',
            select: 'name email'
        }),query
    ).
    search(OrderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    
        const meta = await OrderModel.countTotal();
        const result = await OrderModel.modelQuery;

        return {meta,result}
}

export const OrderService={
    createOrderIntoDB,
    getAllOrderFromDB
}