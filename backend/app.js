import express from "express"
import cors from "cors"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//routes import
import productRouter from './routes/product.routes.js'


//routes declaration
app.use("/api/v1/products", productRouter)

export { app }
