import { Router } from "express";
import { addproduct,getproduct } from "../controllers/product.controllers.js";


const router = Router()

router.route("/add").post(addproduct)
router.route("/get").get(getproduct)


export default router