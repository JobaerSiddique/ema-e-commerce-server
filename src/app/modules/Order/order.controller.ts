import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderService } from "./order.service";


const createOrder = catchAsync(async(req,res)=>{
    const userId = req.user.userId;
    const {products,shippingAddress,paymentMethod,currency}=req.body;
    const result = await OrderService.createOrderIntoDB(userId,products,shippingAddress,paymentMethod,currency)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message: "Order created successfully",
        data:result
    })
})

const getAllOrder = catchAsync(async(req,res)=>{
    const order = await OrderService.getAllOrderFromDB(req.query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "All order fetched successfully",
        data: order
    })
})
export const OrderController = {
    createOrder,
    getAllOrder
}