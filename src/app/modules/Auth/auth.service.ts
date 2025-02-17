import  httpStatus  from 'http-status';
import AppError from "../../errors/AppError"
import { User } from "../User/user.model"
import bcrypt from 'bcrypt'
import { createToken } from './auth.utils';
import config from '../../config';
import { IUser } from '../User/user.interface';

const loginUserfromDB = async(payload:IUser)=>{
    console.log(payload);
    const user = await User.findOne({
        email:payload.email
    })
    console.log(user);
    if(!user){
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid  credentials")
    }
    if(user.isDeleted){
        throw new AppError(httpStatus.FORBIDDEN, "User is deleted")
    }
    if(user.status === "inactive" || user.status === "blocked"){
        throw new AppError(httpStatus.FORBIDDEN, `User is ${user.status}`)
    }

    const isMatch = await bcrypt.compare(payload.password,user.password );
    if(!isMatch){
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials")
    }

    const jwtPayload = {
        userId: user._id.toString(),
        role: user.role,
      };
    
      const accessToken = createToken(
        jwtPayload,
        config.ACCESS_TOKEN as string,
        config.ACCESS_TOKEN_EXPIRE as string
      );
      const refreshToken = createToken(
        jwtPayload,
        config.REFRESH_TOKEN as string,
        config.REFRESH_TOKEN_EXPIRE as string
      );
    
      return { accessToken, refreshToken };
 
}


export const AuthService={
    loginUserfromDB
}