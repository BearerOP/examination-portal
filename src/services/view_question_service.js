const studentModel = require("../models/student_model")
const questionModel = require("../models/question_model")

exports.view_question = async (req, res) => {



    try {
      // console.log(req.user)
      const subject = req.user.subject;
        let question= [];
        let foundUser = await questionModel.findOne({ subject });
        // console.log(foundUser);
        let user_questions = foundUser.questions.find(user_cartt =>{
            // question.question=user_cartt.question
            question.push({question:user_cartt.question,marks:user_cartt.marks,options:user_cartt.options})
            // question.marks=user_cartt.marks
            // question.option=user_cartt.options
        }
        )
        if (question) {
            return {
              message: "Viewing Questions Successfully!",
              success: true,
              question,
              negativeMarking:foundUser.negativeMarking,
              subject,
              status: 200,
            }
          } else {
            return {
              message: "invalid credentials",
              success: false,
              status: 300,
            };
  
        }
        console.log(question);
    } catch (error) {
        console.log(error);
    }
}
