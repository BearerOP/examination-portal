const { reset } = require("nodemon");
const { view_question } = require("../services/view_question_service");

exports.view_question = async (req, res) => {
  let data = await view_question(req, res);

  let maxMarks = 90;
  let duration = "3 hours";

  if (data.success) {
    res.status(200).json({
      message: data.message,
      subject: data.subject,
      maxMarks,
      duration,
      negativeMarking: data.negativeMarking,
      questions: data.question,
    });
    console.log({
      message: data.message,
      subject: data.subject,
      maxMarks,
      duration,
      negativeMarking: data.negativeMarking,
      questions: data.question,
    });
  } else {
    res.status(401).json({
      message: "Invalid Crediantials",
    });
  }
};
