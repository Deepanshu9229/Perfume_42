
import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()

// cartRouter.post('/get', getUserCart) // ---- before middleware
// cartRouter.post('/add', addToCart)
// cartRouter.post('/update', updateCart)
// when user hits the end points (/get, /add, /update), user get autherised and we get id (happening in authUser middleware) - then that funtion is executed like getUserCart, addCart etc. 
cartRouter.post('/get', authUser, getUserCart) // ---- after middleware
cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateCart)

export default cartRouter