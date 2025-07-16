
import express from 'express'
import {placeOrder, placeOrderRazorpay, allOrders, userOrder, updateStatus, verifyRazorpay } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin Feature
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//payment feature
orderRouter.post('/place', authUser, placeOrder)
// orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// user feature
orderRouter.post('/userorders', authUser, userOrder)

//verify payment
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default orderRouter;