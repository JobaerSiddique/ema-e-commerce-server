import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { WishListService } from "./wishlist.service";



const addWishlist = catchAsync(async(req,res)=>{
    try {
       const {productId} = req.body;
        const user = req.user.userId
        
        const result = await WishListService.addWishlistIntoDB(productId,user)
       sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "Product added to wishlist successfully",
        data: result
       })
    } catch (error:any) {
        throw new Error(error?.message)
    }
})
const removeWishList = catchAsync(async(req,res)=>{
    const {productId} = req.body;
    const userId = req.user.userId;
    const result = await WishListService.removeWishListIntoDB(productId, userId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "Product removed from wishlist successfully",
        data: result
 
    })
})

 const getWishlist = catchAsync(async(req,res)=>{
        const userId = req.user.userId;
        const result = await WishListService.getWishlistFromDB(userId);
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: "Wishlist fetched successfully",
            data: result
        })
 })
export const WishlistController = {
    addWishlist,
    removeWishList,
    getWishlist
}