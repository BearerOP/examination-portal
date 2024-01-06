const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
    default: "",
  },
  password: {
    type: String,
    default: null,
  },
  mobile: {
    type: Number,
    default: null,
  },
  auth_key: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('admin', adminSchema);
