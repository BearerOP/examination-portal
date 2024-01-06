require("dotenv").config();
const jwt = require("jsonwebtoken");
const adminModel = require('../src/models/admin_model')

// Middleware for handling auth
async function admin_auth(req, res, next) {
    // Implement admin auth logic
    try{
        const token = req.cookies.token;
        // console.log(token);
        // const token = req.headers['token'];
        // const tokenHead = req.headers['token'];
        // const token = tokenHead.split(" ")[1];
        
        const jwtPassword = process.env.your_secret_key_admin;
        const decode = jwt.verify(token, jwtPassword);
        let admin = await adminModel.findOne({ _id: decode.id });
        if (!admin) return res.status(403).json({ msg: "Admin not found"});
        req.admin = admin;
        next();
    }catch(err){
        res.status(500).json({
            error: "Invalid token",
            message: err.message,
        })
    }
}

module.exports = admin_auth;