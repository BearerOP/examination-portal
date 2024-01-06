const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required:true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  dateOfBirth: {
    type: Date,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
    required:true,
  },
  studentClass:{
    type: String,
    required: true,
  },
  subject:{
    type:String,
    required:true,
  },
  auth_key:{
    type:String,
    default:null,
  }

}, { timestamps: true });


module.exports = mongoose.model('student', studentSchema);
