

import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';

// placing order using code method ----------------
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId, items, address, amount, paymentMethod: "COD", payment: false, date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "order Placed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// placing orders using stripe method ------------------
const placeOrderStripe = async (req, res) => {

}

//plcing order using Razorpay method --------------
const placeOrderRazorpay = async (req, res) => {

}

// all orders datA  for admin pannel --------------
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// user order data for frontend  (my orders are displayed here) --------------
const userOrder = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// updated order status from Admin Pannel  --------------
const updateStatus = async (req, res) => { // admin pannel se jo status update karunga wo frontend me my=orders section me reflect hona chahiye
 try {
       const {orderId, status} = req.body
       await orderModel.findByIdAndUpdate(orderId, {status})
       res.json({success: true, message : "Status Updated"})
 } catch (error) {
    console.log(error);
    res.json({success : false, message : error.message})
    
 }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrder, updateStatus }