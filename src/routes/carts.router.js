import { Router } from "express";
import CartManager  from '../dao/mongoManagers/CartManager.js'

const cartManager = new CartManager()

const router = Router()

router.get('/', async(req, res) => {
    const carts = await cartManager.getCarts()
    if(!carts){
        res.json({message:'Error'})
    } else {
        res.json({message:'Success', carts})
    }
})

router.post('/',async (req, res) => {
    const { products }= req.body
    if(!products){
        res.json({message:'Values required'})
    } else {
        const newCart = cartManager.addCart({
            products
        })
        if(!newCart){
            res.json({message:'Error'})
        } else {
            res.json({message:'Success', product: newCart})
        }
    }
})


export default router
