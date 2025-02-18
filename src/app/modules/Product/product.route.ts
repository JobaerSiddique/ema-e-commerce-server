import express, { NextFunction, Request, Response } from 'express';
import { ProductController } from './product.controller';
import { upload } from '../../utils/sendImagetoCloudinary';


const router= express.Router();

router.post('/',
    upload.array('files',5),
    (req:Request,res:Response,next:NextFunction)=>{
        try {
            // Parse JSON text data sent as a string in `data` field
            if (req.body.data) {
              req.body = JSON.parse(req.body.data);
            }
            next();
          } catch (error) {
            res.status(400).json({ success: false, message: "Invalid JSON data" });
          }
    },
    ProductController.addProducts)

    router.get('/',ProductController.getAllProduct)
    router.get('/:id',ProductController.getSingleProduct)
    router.delete('/:id',ProductController.deleteProduct)


export const ProductRoutes= router;