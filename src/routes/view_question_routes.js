const express = require("express");
const router = express.Router();
const user_auth = require("../../middleware/user_auth")

const {
  

    view_question,
} = require("../controllers/view_question_controllers");




router.get("/view_question",user_auth,view_question )

module.exports = router;