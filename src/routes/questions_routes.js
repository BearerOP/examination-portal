const express = require("express");
const router = express.Router();
const admin_auth = require("../../middleware/admin_auth")
const {
    add_question,
    add_question_save
} = 
require('../controllers/questions_controller.js');

router.get("/add_question",admin_auth,add_question);
router.post("/add_question_save",admin_auth,add_question_save);

module.exports = router;