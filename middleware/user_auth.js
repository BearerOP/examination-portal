require("dotenv").config();
const jwt = require("jsonwebtoken");
const studentModel = require("../src/models/student_model");

// Middleware for handling auth
async function user_auth(req, res, next) {
  // Implement user auth logic
  try {
    const token = req.cookies.token;
    // const token = req.headers["token"];
    // console.log(token);
    // const tokenHead = req.headers['token'];
    // const token = tokenHead.split(" ")[1];

    const jwtPassword = process.env.your_secret_key_user;
    const decode = jwt.verify(token, jwtPassword);
    console.log(decode.id);
    let user = await studentModel.findOne({ _id: decode.id });
    if (!user) return res.status(403).json({ msg: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      error: "Invalid token",
      message: err.message,
    });
  }
}

module.exports = user_auth;
