import  httpStatus  from 'http-status';
import AppError from "../../errors/AppError";
import { Product } from "../Product/product.model";
import { User } from "../User/user.model"



const addToCartIntoDB = async(productId:string,quantity:number,userId:string)=>{
     // Find the user and product
  const user = await User.findById(userId);
  const product = await Product.findById(productId);
  console.log({product});

  // Check if user and product exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (product.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product is Deleted');
  }

  // Check if the product is already in the cart
  const cartItem = user.cart.find((item) => item.product.toString() === productId);
  console.log(cartItem);
  const totalQuantityInCart = cartItem ? cartItem.quantity + quantity : quantity;
console.log(totalQuantityInCart);
  // Check if the requested quantity exceeds the available stock
  if (totalQuantityInCart > product.stock) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock');
  }
  if (cartItem) {
    cartItem.quantity += quantity; 
  } else {
    user.cart.push({ product: productId, quantity }); 
  }

  await user.save();
  const populateCart = await User.findById(userId).populate('cart')
  return populateCart?.cart;
}

const removeCartIntoDB = async(productId:string,userId:string)=>{
    const user = await User.findById(userId).populate('cart');
  const product = await Product.findById(productId);

  // Check if user and product exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // Find the cart item
  const cartItem = user.cart.find((item) => item.product.toString() === productId);
  if (!cartItem) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found in cart');
  }

  // Restore the product stock
  product.stock += cartItem.quantity;
  await product.save();

  // Remove the product from the cart
  user.cart = user.cart.filter((item) => item.product.toString() !== productId);
  await user.save();
  return user.cart;
}

const getCartFromDB =async(userId:string)=>{
    const user = await User.findById(userId).populate('cart');
    console.log(user);
      
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
      }
    if(user?.cart?.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, 'Cart is empty');
    }
     const populateCart= await User.findById(userId).populate({
        path:'cart.product',
        select:'name price images stock'
     })
      return populateCart?.cart;
}
export const CartService = {
    addToCartIntoDB,
    removeCartIntoDB,
    getCartFromDB
}