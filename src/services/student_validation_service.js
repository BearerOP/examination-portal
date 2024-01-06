const studentModel = require("../models/student_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.add_student_save = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth,
      mobile,
      address,
      studentClass,
      subject,
    } = req.body;
    console.log(req.body);
    // Check if the user already exists in the database
    const existingStudent = await studentModel.findOne({ email });
    if (existingStudent) {
      return {
        message: "Student already exists",
        success: false,
      };
    }
    // Default Password is : '1234'
    const password = await bcrypt.hash("1234", 10);

    // If not, create a new user and save it to the database
    const newUser = await studentModel.create({
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth,
      mobile,
      address,
      studentClass,
      subject,
      password,
    });
    console.log(newUser);
    if (newUser) {
      return {
        message: "User created successfully",
        success: true,
        newUser,
      };
    } else {
      return {
        message: "User creation failed",
        success: false,
        newUser: [],
      };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.student_logined = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const existingStudent = await studentModel.findOne({ email });

    if (!existingStudent) {
      throw new Error("Student not found");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingStudent.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { id: existingStudent._id },
      process.env.your_secret_key_user
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    if (!token) {
      throw new Error("Token generation failed");
    }

    const authKeyInsertion = await studentModel.findOneAndUpdate(
      { _id: existingStudent._id },
      { auth_key: token },
      { new: true }
    );

    if (!authKeyInsertion) {
      throw new Error("Token updation failed");
    }

    return {
      message: "Student logged in successfully",
      success: true,
      token,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error.message || "Internal server error",
      success: false,
    };
  }
};
