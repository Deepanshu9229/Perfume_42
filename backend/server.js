
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//-----------App Config
const app = express() //instance of express server
const port = process.env.PORT || 4000

//----------middleware
app.use(express.json())//whatever req we get passesd by json
app.use(cors())// now we can access backend from any ip

//------------api endpoints
app.get('/', (req,res) => {
    res.send("API Working")
} )

app.listen(port, ()=> console.log('Server running on PORT : ' + port)) //---Start express server
