import  httpStatus  from 'http-status';
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface"
import { User } from "./user.model"
import bcrypt from 'bcrypt'
import config from '../../config';

const createUserIntoDB = async(payload:IUser)=>{
    const emailExists = await User.findOne({ 
        email: payload.email
    });

    if(emailExists){
        throw new AppError(httpStatus.BAD_REQUEST,"Email already exists")
    }

    const hashpassword = await bcrypt.hash(payload.password,Number(config.SALT))

   

    const newUser = await User.create({
        ...payload, // Spread the payload to include all fields
        password: hashpassword, // Override the password with the hashed one
      });
      return newUser
}

const createAdminIntoDB =async(payload:IUser)=>{
    const emailExists = await User.findOne({
        email: payload.email
    })
    if(emailExists){
        throw new AppError(httpStatus.BAD_REQUEST,"Email already exists")
    }

    const hashpassword = await bcrypt.hash(payload.password,Number(config.SALT))

    const newUser = await User.create({
       ...payload, // Spread the payload to include all fields
        password: hashpassword, // Override the password with the hashed one
        role: "admin" // Set the role to admin
      });
      return newUser
}

export const UserService ={
    createUserIntoDB
}