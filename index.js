const cookiparser = require("cookie-parser");
const express = require("express");
let dotenv = require("dotenv");
let path = require("path");
const cors = require("cors");

dotenv.config();
const app = express();
const session = require("express-session");

app.use(express.json());

app.use(cookiparser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

let { connectDB } = require("./db/dbconnection");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
const flash = require("connect-flash");
app.use(flash());
exports.session = app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000,
    },
  })
);

// Define a route for the root URL ("/")
app.use("/", require("./src/routes/admin_validation_routes"));
app.use("/", require("./src/routes/student_validation_routes"));

app.use("/", require("./src/routes/view_question_routes"));
app.use("/", require("./src/routes/questions_routes"));
app.use("/", require("./src/routes/student_result_routes"));

app.use("/public", express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "src/views"));

app.set("view engine", "ejs");

// Start the Express server
connectDB();
app.listen(process.env.port, () => {
  console.log(
    `app listening on http://localhost:${process.env.port}/`
  );
});
