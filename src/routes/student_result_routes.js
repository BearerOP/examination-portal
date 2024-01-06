const express = require("express");
const router = express.Router();


const {
  

    view_result,
} = require("../controllers/student_result_controller");




router.get("/view_result",view_result )

module.exports = router;