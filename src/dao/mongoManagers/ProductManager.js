import { productsModel } from "../models/products.model.js";

export default class ProductsManager{
    async getProducts(){
        try {
            const products = await productsModel.find()
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(objProduct){
        try {
            const newProd= await productsModel.create(objProduct)
            return newProd
        } catch (error) {
            console.log(error)
        }
    }
}