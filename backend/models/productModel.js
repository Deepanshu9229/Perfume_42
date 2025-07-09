
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: Array, required:true},
    season: {type: Array, required:true},
    category: {type: Array, required:true},
    size: {type: Array, required:true},
    bestSeller: {type: Boolean},
    date: {type: Number, required:true},
})

//👆🏻 is ischema ka use kr k model banayenge --
const productModel = mongoose.models.product || mongoose.model("product", productSchema); // agar already h toh use karo else make new model named product 

export default productModel