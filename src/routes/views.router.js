import { Router } from "express";
import { productsModel } from "../dao/models/products.model.js";

const router = Router()


router.get('/products', async (req, res) => {
    const products = await productsModel.find()
    res.render('products', products)

})

export default router

