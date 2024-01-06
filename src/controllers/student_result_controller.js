const { reset } = require("nodemon");
const {

  view_result,
} = require("../services/student_result_service");
 

exports.view_result = async (req, res) => {
  let data = await view_result(req, res);
  if (data.success) {
    res.status(200).send({
        marks:data.marks,
        negative_marks:data.negative_marks,
        not_attempt_question_marks:data.not_attempt_question_marks,
    }
      
    //   data.data,
    )
  } else {
    res.status(401).send({
      message: "Wrong Crediantials",
    })
  }
};