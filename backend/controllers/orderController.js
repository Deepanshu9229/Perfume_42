

import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';
import razorpay from 'razorpay'
const currency = 'inr'
const deliveryCharge = 49

// payment gateway initialization ------------ now we can use this id, secret anywhere
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

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


//plcing order using Razorpay method --------------
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        // const { origin } = req.headers;
        const orderData = {
            userId, items, address, amount, paymentMethod: "Razorpay", payment: false, date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }
        // making order from razorpay
        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error.message })
            }
            res.json({ success: true, order })
        }
        )

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        // console.log(orderInfo);
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: "Payment Successful" })
        } else res.json({ success: false, message: 'Payment Failed' })

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}


// all orders datA  for admin pannel --------------
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
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
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

export { placeOrder, placeOrderRazorpay, allOrders, userOrder, updateStatus, verifyRazorpay }