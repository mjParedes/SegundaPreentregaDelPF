import { Router } from "express";
// import ProductsManager from '../dao/fileManagers/MessageManager.js'
import ProductsManager from '../dao/mongoManagers/ProductManager.js'

const productsManager = new ProductsManager()

const router = Router()

router.get('/',async (req, res) => {
    const products = await productsManager.getProducts()
    if(!products){
        res.json({message:'Error'})
    } else {
        res.json({message:'Success', products})
    }
})

router.post('/',async (req, res) => {
    const { title,description,code,price,stock,category,}= req.body
    if(!title || !description || !code || !price || !stock || !category){
        res.json({message:'Values required'})
    } else {
        const newProduct = productsManager.addProduct({
            title,
            description,
            code,
            price,
            stock,
            category
        })
        if(!newProduct){
            res.json({message:'Error'})
        } else {
            res.json({message:'Success', product: newProduct})
        }
    }
})

export default router



