import express, { NextFunction, Request, Response } from 'express';
import { ProductController } from './product.controller';
import { upload } from '../../utils/sendImagetoCloudinary';


const router= express.Router();

router.post('/',
    // upload.single('file'),
    // (req:Request,res:Response,next:NextFunction)=>{
    //     req.body=JSON.parse(req.body.data);
    //     next();
    // },
    ProductController.addProducts)


export const ProductRoutes= router;