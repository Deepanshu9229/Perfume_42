
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

//---------------------------App Config
const app = express() //instance of express server
const port = process.env.PORT || 4000
connectDB() //call the db connection here
connectCloudinary() //call clouinay function here


//---------------------------middleware
app.use(express.json())//whatever req we get passesd by json
app.use(cors())// now we can access backend from any ip


//---------------------------api endpoints
// app.get('/', (req,res) => {
//     res.send("API Working")
// } )
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)


app.listen(port, ()=> console.log('Server running on PORT : ' + port)) //---Start express server
