
import express from 'express'
import { addProduct, listProduct, removeProduct, singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth, upload.fields([{name:'image1', maxCount:1}, {name:'image2', maxCount:1}, {name:'image3', maxCount:1}]), addProduct);
//productRouter.post('/remove', removeProduct); phle aisa that, but we want if user admin authenticated, only then it able to remove product, so added adminAuth middleware.
productRouter.post('/remove',adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProduct)

export default productRouter