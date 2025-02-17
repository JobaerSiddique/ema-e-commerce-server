import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";


const createUser = catchAsync(async(req,res)=>{
    const data = req.body;
    const result = await UserService.createUserIntoDB(data);
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message: "User created successfully",
        data: result
    })
})

const createAdmin = catchAsync(async(req,res)=>{
    const data= req.body;
    const result = await UserService.createAdminIntoDB(data);
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message: "Admin created successfully",
        data: result
    })
})


export const UserController = {
    createUser,
    createAdmin
}