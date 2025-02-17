import httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";


const loginUser = catchAsync(async(req,res)=>{
   
    const result = await AuthService.loginUserfromDB(req.body);
    const {accessToken,refreshToken}= result;
    res.cookie('refreshToken',refreshToken)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User logged in successfully",
        data:accessToken
    })
})


export const AuthController = {
    loginUser
}