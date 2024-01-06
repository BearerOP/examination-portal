const {
  student_login,
  student_logined,
  add_student,
  add_student_save,
} = require("../services/student_validation_service");


exports.student_login = async (req, res) => {
  res.render("student_login");
};

exports.student_logined = async (req, res) => {
  let data = await student_logined(req, res);
  if (data.success) {
    // res.json({ message: data.message });
    res.json({ message: data.message, token: data.token });
  } else {
    res.json({ message: data.message });
  }
};

exports.add_student = async (req, res) => {
  res.render("add_student");
};

exports.add_student_save = async (req, res) => {
  let data = await add_student_save(req, res);
  if (data.success) {
    res.redirect("/add_student");
  } else {
    console.log("Error Occured");
  }
};
