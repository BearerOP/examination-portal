const express = require("express");
const router = express.Router();


const {
  admin_login,
  admin_register,
  admin_logined,
  admin_registered,
} = require("../controllers/admin_validation_controller");

router.get("/admin_login", admin_login);
router.post("/admin_logined", admin_logined);

router.get("/", admin_register);
router.post("/admin_registered", admin_registered);

module.exports = router;
