const mongoose = require("mongoose");
const express = require('express');
const app = express();
mongoose.set("strictQuery", true);
exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI_EXAMINATION);
    // console.log(process.env.DB_URI_EXAMINATION);
    console.log("Examination Database connected successfully");
  } catch (error) {
    console.log("Database not connected", error);
  }
};

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: process.env.DB_URI_EXAMINATION,
  collection: 'sessions' // Name for the sessions collection in MongoDB
});

store.on('error', function (error) {
  console.error(error);
});

// Set up session middleware
app.use(session({
  secret: process.env.your_secret_key_MONGO, // Replace with a secure secret
  resave: false,
  saveUninitialized: false,
  store: store // Use MongoDBStore for session storage
}));

// ... rest of your app configuration
