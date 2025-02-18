import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";


const addProducts = catchAsync(async(req,res)=>{
   
    const files = req.files as Express.Multer.File[] | undefined; 
    const data = req.body;
  
   
    if (!files || !Array.isArray(files)) {
      throw new Error("No files uploaded or invalid file format");
    }
  
  
    const filePaths = files.map((file) => file.path);
const result = await ProductService.addProductsIntoDB(data,filePaths)

sendResponse(res,{
    statusCode:httpStatus.CREATED,
    success:true,
    message: "Products created successfully",
    data: result
})
})


const getAllProduct = catchAsync(async(req,res)=>{
    const query = req.query
    const result = await ProductService.getAllProductsFromDB(query);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "Products fetched successfully",
        data: result.result,
        meta:result.meta
    })
    
})

const deleteProduct = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const result = await ProductService.deleteProductDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "Product deleted successfully",
        data: result
    })
})

const getSingleProduct = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const result = await ProductService.getSingleProductIntoDB(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "Product fetched successfully",
        data: result
    })
})
export const ProductController = {
    addProducts,
    getAllProduct,
    deleteProduct,
    getSingleProduct
}