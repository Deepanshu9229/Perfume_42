
import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"

// ------------------------------------function to add product
const addProduct = async (req, res) => {
    console.log("Received files:", req.files);

    try {

        const { name, description, price, category, season, size, bestSeller } = req.body

        const image1 = req.files.image1 && req?.files?.image1?.[0]; // agar file hoga toh && uska index0 wala img
        const image2 = req.files.image2 && req?.files?.image2?.[0];
        const image3 = req.files.image3 && req?.files?.image3?.[0];

        const images = [image1, image2, image3].filter((item)=> item !== undefined) // array me sare images store karo, but they should be valid, filter undefined

        // imagesUrl array store path of all images uploaded in cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url
            })
        )

        // console.log(name, description, price, category, season, size, bestSeller);
        // // console.log(image1, image2, image3);
        // console.log("imageUrl is :" + imagesUrl);
        const productData = {
            name,
            description,
            category,
            price: Number(price), // come in string, so converting into number
            season: JSON.parse(season), // come in string , but we store in array
            bestSeller: bestSeller === "true" ? true : false, // string se boolean me convert kr rahe
            size: JSON.parse(size),
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData);
        const products = new productModel(productData);
        await products.save()

        res.json({success: true, message: "Product Added"})

    } catch (error) {
        console.error("❌ Add Product Error:", error);
        res.json({ success: false, message: error.message })
    }
}

// --------------------------------------function to list product
const listProduct = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true, products})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

// ----------------------------------------function to remove product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message : "Product Removed"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// ----------------------------------------function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true, product})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


export { listProduct, addProduct, removeProduct, singleProduct }