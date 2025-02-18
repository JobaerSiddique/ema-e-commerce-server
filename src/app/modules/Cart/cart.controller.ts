import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";
import { CartService } from "./cart.service";


const addToCart = catchAsync(async(req,res)=>{
    const {productId,quantity} = req.body;
    const userId = req.user.userId;
    const result = await CartService.addToCartIntoDB(productId,quantity,userId);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "Product added to cart successfully",
        data: result
    })
})
const removeCart = catchAsync(async(req,res)=>{
    const {productId} = req.body;
    const userId = req.user.userId;
    const result = await CartService.removeCartIntoDB(productId,userId);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "Product removed to cart successfully",
        data: result
    })
})

const getCartUser = catchAsync(async(req,res)=>{
    const userId =req.user.userId;
    const result = await CartService.getCartFromDB(userId);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "Cart fetched successfully",
        data: result
    })
})
export const CartController = {
    addToCart,
    removeCart,
    getCartUser
}