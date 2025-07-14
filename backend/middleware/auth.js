
// convert user token to id, only authenticated people can ...
// ⚠️   take our token and will verify it, usinf that token it generate id in req.body
import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

    const {token} = req.headers //getting token from headers of body

    if(!token) return res.json({access:false, message : "Not Authorized Login Again" })

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id //body me ye token_decode add kr do, so it can use in future in place order etc
        next()
    } catch (error) {
        console.log("Token verification failed:", error);
        res.json({success:false, message:error.message})
        
    }
}

export default authUser