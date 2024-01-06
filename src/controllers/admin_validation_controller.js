const {
  admin_login,
  admin_logined,
  admin_register,
  admin_registered,
} = require("../services/admin_validation_service");

exports.admin_login = async (req, res) => {
  // const data = await admin_login(req, res);
  res.render("admin_register");
};
exports.admin_logined = async (req, res) => {
  const data = await admin_logined(req, res);
  if (data.success) {
    // res.json({ message: data.message, token: data.token });
    res.redirect("/add_question");
  } else {
    res.json({ message: data.message });
  }
};

exports.admin_register = async (req, res) => {
  // const data = await admin_register(req, res);
  res.render("admin_register");
};
exports.admin_registered = async (req, res) => {
  const data = await admin_registered(req, res);
  if (data.success) {
    res.redirect("/");
  }
  // res.json(data);
};
