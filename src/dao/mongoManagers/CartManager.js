import { cartModel } from "../models/carts.model.js";

export default class CartManager {
    async getCarts() {
        try {
            const carts= await cartModel.find()
            if(!carts){
                return `No existen carts en el sistema`
            } else {
                return carts
            }            
        } catch (error) {
            return error
        }
    }

    async addCart(arrProducts) {
        try {
            const newCart= await cartModel.create(arrProducts)
            return newCart
        } catch (error) {
            return error
        }
    }

}