import mongoose, {Schema} from "mongoose";
const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        category: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        price: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        description: {
            type: String, 
            required: true,
        }
    },
    {
        timestamps: true
    }
)
export const Product = mongoose.model("Product", productSchema)