import httpStatus  from 'http-status';
import AppError from "../../errors/AppError";
import { User } from "../User/user.model"
import { Product } from '../Product/product.model';
import { Types } from 'mongoose';


const addWishlistIntoDB = async (productId:string, userId:string) => {
   
    const user= await User.findById(userId);
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if(user.isDeleted){
        throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
    }
    if(user.status === "inactive" || user.status === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, `User is ${user.status}`);
    }

    const product = await Product.findById({_id: productId});
    if(!product){
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
    }

    if(product.isDeleted){
        throw new AppError(httpStatus.FORBIDDEN, 'Product is deleted');
    }

    if(user.wishlist?.includes(product._id)){
        throw new AppError(httpStatus.CONFLICT, 'Product already in wishlist');
    }
    user.wishlist?.push(product._id);
    await user.save();
    const populatedUser = await User.findById(userId).populate('wishlist');
  return populatedUser?.wishlist;
    
    
  
  };

  const removeWishListIntoDB = async(productId:string,userId:string)=>{
    const user= await User.findById(userId);
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if(user.isDeleted){
        throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
    }
    if(user.status === "inactive" || user.status === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, `User is ${user.status}`);
    }
    user.wishlist = user?.wishlist.filter((item) => item.toString() !== productId);
  await user.save();
  return user?.wishlist; 
  }

  const getWishlistFromDB = async(userId:string)=>{
    const user= await User.findById(userId).populate('wishlist');
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    if(user.isDeleted){
        throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
    }
    if(user.status === "inactive" || user.status === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, `User is ${user.status}`);
    }
    return user?.wishlist;
  }

export const WishListService = {
    addWishlistIntoDB,
    removeWishListIntoDB,
    getWishlistFromDB
}