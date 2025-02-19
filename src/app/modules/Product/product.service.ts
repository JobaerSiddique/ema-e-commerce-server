import  httpStatus  from 'http-status';
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImagetoCloudinary";
import { IProduct } from "./product.interface"
import { Product } from "./product.model";
import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constants';


const addProductsIntoDB = async(data:IProduct,file:string[])=>{
    const existingProduct = await Product.findOne({ name: data.name });
    if (existingProduct) {
      throw new AppError(httpStatus.BAD_REQUEST,"A product with the same name already exists.");
    }
    if (file && file.length > 0) {
        // Process and upload images to Cloudinary
        const uploadedImages = await Promise.all(
          file.map(async (filePath, index) => {
            const imageName = `${data?.name}_image_${index + 1}`; // Generate unique names
            const { secure_url } = await sendImageToCloudinary(imageName, filePath);
            console.log(secure_url);
            return secure_url; // Return the uploaded image URL
          })
        );
        console.log(uploadedImages);
    const newProduct = {
        ...data,
        images:uploadedImages
    }

    const product = await Product.create(newProduct)
    return product
}
}

const getAllProductsFromDB = async(query: Record<string, unknown>)=>{
    const ProductModel = new QueryBuilder(
        Product.find({isDeleted:false}),query
    )
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

    const meta = await ProductModel.countTotal();
    const result = await ProductModel.modelQuery;
  
    return {
      meta,
      result,
    };
}

const deleteProductDB = async(id:string)=>{
    console.log(id);
    const product = await Product.findById({_id:id})
    console.log(product);

    if(product?.isDeleted){
        throw new AppError(httpStatus.BAD_REQUEST,"Product is already deleted.");
    }
    await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return product
}

const getSingleProductIntoDB = async(id:string)=>{
    const product = await Product.findById({_id:id});

    if(product?.isDeleted){
        throw new AppError(httpStatus.NOT_FOUND,"product not found")
    }
    return product
}
export const ProductService = {
    addProductsIntoDB,
    getAllProductsFromDB,
    deleteProductDB,
    getSingleProductIntoDB
}