import validator from 'validator';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

//---------------------------------------- route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; //-matlab ye body(frontend, input) se milega
        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "User Doesn't Exists" })
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true, token})
        } else {
            res.json({ success: false, message: "Incorrect Password" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

};

//---------------------------------------- route for user Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ 1. Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) return res.json({ success: false, message: "User already exists" });

        // ✅ 2. Validate email
        if (!validator.isEmail(email)) return res.json({ success: false, message: "Invalid email format" });

        // ✅ 3. Validate password
        if (!password || password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // ✅ 4. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ 5. Create and save user
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // ✅ 6. Create and send token
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

//---------------------------------------- route for admin login
const adminLogin = async (req, res) => {
    // To be implemented
};

export { loginUser, registerUser, adminLogin };
