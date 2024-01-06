const express = require("express");
const router = express.Router();
const admin_auth = require("../../middleware/admin_auth");

const {
  student_login,
  add_student,
  student_logined,
  add_student_save,
} = require("../controllers/student_validation_controller");

// router.get("/student_login", student_login);
router.get("/student_login", student_login);
router.post("/student_logined", student_logined);

router.get("/add_student", admin_auth, add_student);
router.post("/add_student_save", admin_auth, add_student_save);

module.exports = router;
