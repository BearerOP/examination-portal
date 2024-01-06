let adminModel = require("../models/admin_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.admin_login = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
exports.admin_logined = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return { message: "Admin not found", success: false };
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return { message: "Invalid password", success: false };
    }

    const token = jwt.sign(
      { id: admin._id },
      `${process.env.your_secret_key_admin}`,
      {}
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure:true,
    });

    const authKeyInsertion = await adminModel.findOneAndUpdate(
      { _id: admin._id },
      { auth_key: token },
      { new: true }
    );

    if (authKeyInsertion) {
      return {
        success: true,
        message: "Admin logged in successfully",
        token,
      };
    } else {
      return {
        message: "Admin logging in failed",
        success: false,
      };
    }
  } catch (error) {
    console.error(error);
    return { message: "Internal server error",success:false };
  }
};
exports.admin_register = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

exports.admin_registered = async (req, res) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let mobile = req.body.mobile;

    // Check if the email is already registered
    const existingAdmin = await adminModel.findOne({ email: email });
    if (existingAdmin) {
      return { message: "Email is already registered" };
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance
    const admin = await adminModel.create({
      name,
      mobile,
      email,
      password: hashedPassword, // Store the hashed password
    });

    if (admin) {
      return { message: "Admin registered successfully", admin, success: true };
    } else {
      return {
        message: "Admin registration failed",
        admin: [],
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Admin registration failed",
      admin: [],
      success: false,
    };
  }
};
