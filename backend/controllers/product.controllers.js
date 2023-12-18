import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js"

const addproduct = asyncHandler(async (req, res) => {

    // get product details from frontend

    const { title, price, category, description } = req.body.data
    

    if (
        [title, price, category, description].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
  // check if product already exists:
    const existedproduct = await Product.findOne({
        $or: [{ title }]
    })

    if (existedproduct) {
        throw new ApiError(409, "User with email or username already exists")
    }
    // create product object - create entry in db
    const product = await Product.create({
        title,
        price,
        description,
        category: category.toLowerCase()
    })

    const createdProduct = await Product.findById(product._id).select(
        "-password -refreshToken"
    )
    // check for user creation

    if (!createdProduct) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    // return res
    return res.status(201).json(
        new ApiResponse(200, createdProduct, "User registered Successfully")
    )

});

const getproduct = asyncHandler(async (req, res) => {
    const products = await Product.find()
    return res.status(201).json(
        new ApiResponse(200, products, "Data fetch success")
    )
});
export {
    addproduct,
    getproduct
}
