import { Router } from "express";
import CartManager  from '../dao/mongoManagers/CartManager.js'
import {cartModel}  from "../dao/models/carts.model.js";

const cartManager = new CartManager()

const router = Router()

router.get('/:cid', async(req, res) => {
    const {cid} = req.params
    const cart = await cartModel.findById(cid)
    res.json({cart})
})

router.get('/', async(req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.json(carts)
    } catch (error) {
        console.log(error)
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

router.post('/addProducts',async(req,res)=>{
    const {cartId, productId} = req.body
    const cart = await cartModel.findById(cartId)
    cart.products.push(productId)
    cart.save()
    res.json({message: 'producto agregado'})
})

router.put('/:cid/product/:_id', async(req,res)=>{
    const { cid, _id} = req.params
    const {quantity} = req.body
    const cart = await cartManager.updateQuantity(cid,_id,quantity)
    res.json({message: 'Carrito actualizado con exito', carrito: cart})
})


export default router
