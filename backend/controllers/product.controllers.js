import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js"

const addproduct = asyncHandler(async (req, res) => {

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { title, price, category, description } = req.body.data
    // console.log("price: ", price);

    if (
        [title, price, category, description].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedproduct = await Product.findOne({
        $or: [{ title }]
    })

    if (existedproduct) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const product = await Product.create({
        title,
        price,
        description,
        category: category.toLowerCase()
    })

    const createdProduct = await Product.findById(product._id).select(
        "-password -refreshToken"
    )

    if (!createdProduct) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

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