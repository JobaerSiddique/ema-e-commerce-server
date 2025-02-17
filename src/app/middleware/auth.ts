import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';

import { User } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/User/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log({token});
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

   
    const decoded = jwt.verify(
        token,
        config.JWT_TOKEN as string,
    ) as JwtPayload
  console.log(decoded);

    // checking if the user is exist
   
    const user = await User.findById({_id: userId});
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked' || userStatus === 'inactive') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    

    // if (requiredRoles && !requiredRoles.includes(role)) {
    //   throw new AppError(
    //     httpStatus.UNAUTHORIZED,
    //     'You are not authorized  hi!',
    //   );
    // }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;