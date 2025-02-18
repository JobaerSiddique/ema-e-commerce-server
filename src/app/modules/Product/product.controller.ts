import catchAsync from "../../utils/catchAsync";
import { ProductService } from "./product.service";


const addProducts = catchAsync(async(req,res)=>{
   

    // const result = await ProductService.addProductsIntoDB(data,req.files)
    console.log(JSON.parse(req.body.data));
})

export const ProductController = {
    addProducts
}