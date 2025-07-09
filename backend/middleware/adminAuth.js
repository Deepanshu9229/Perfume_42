
// jaha bhi admin permission chahiye access krne k liye wo logic is here

import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers
        if(!token) return res.json({success : false, message : "Not Authorized Login Again..."})
        
        const token_decoder = jwt.verify(token, process.env.JWT_SECRET);

        if(token_decoder !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success : false, message : "Not Authorized Login Again"})
        }
        next() //callback

    } catch (error) {
        console.log(error);
        res.json({success:  false, message : error.message})
    }
}
export default adminAuth
