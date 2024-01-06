const questionModel = require("../models/question_model");
const adminModel = require("../models/admin_model");
const studentModel = require("../models/student_model");

exports.add_question_save = async (req, res) => {
  let { questions, subject, negativeMarking } = req.body;
  console.log(req.body);
  try {
    const parsedQuestions = questions.map((q) => {
      const correctAnswerArray = q.correctAnswer
        .split(",")
        .map((index) => parseInt(index.trim()));
      return {
        question: q.question,
        marks: q.marks,
        options: q.options,
        correctAnswer: parseInt(correctAnswerArray[0]),
      };
    });

    let existingSubject = await questionModel.findOne({ subject });

    if (existingSubject) {
      existingSubject.questions.push(...parsedQuestions);
      existingSubject.negativeMarking = negativeMarking;
      const updatedSubject = await existingSubject.save();
      if (updatedSubject) {
        return {
          message: "Question added to existing subject",
          success: true,
          updatedSubject:parseFloat(updatedSubject),
          negativeMarking,
        };
      } else {
        return {
          message: "Failed to add question to existing subject",
          success: false,
          updatedSubject: null,
        };
      }
    } else {
      const newQuestion = new questionModel({
        subject,
        questions: parsedQuestions,
        negativeMarking,
      });
      let addedQuestion = await newQuestion.save();
      if (addedQuestion) {
        return {
          message: "New subject and question added",
          success: true,
          addedQuestion,
          
        };
      } else {
        return {
          message: "Failed to add new subject and question",
          success: false,
          addedQuestion: null,
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Error occurred",
      success: false,
      error,
    };
  }
};
