import mongoose from "mongoose";

const cartSchema= new mongoose.Schema({
    productos:{
        type: Array,
        required:true
    }
})


export const cartModel = mongoose.model('Carts', cartSchema)



