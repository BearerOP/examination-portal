const { indexOf } = require("lodash")
const questionModel = require("../models/question_model")
const studentModel = require("../models/student_model")

exports.view_result = async (req, res) => {
    try {
        const token = req.headers.token
        const Answer1 = req.body
        if(Answer1){

        
        let Answer=[]
        let question_from_frontend=[]
        console.log(Answer1);
        for(const key in Answer1) {
            if (key.startsWith("q_")) {
                question_from_frontend.push(key.split("_")[1]);
                Answer.push(parseInt(Answer1[key]))
          }
          }
          console.log(question_from_frontend);
          console.log(Answer);
        let marks =0;
        
        let not_attempt_question_marks=0;
        let n_marks=0;
        let student = await studentModel.findOne({auth_key:token});
        const subject = student.subject;
        console.log(student);
        let question_mark= [];
        let qu=[];
        let question=[];
        let correct_question=[];
        let foundUser = await questionModel.findOne({subject: subject});
        console.log(foundUser.questions);
        let negative_marks=foundUser.negativeMarking;
        
        let user_questions = foundUser.questions.find(user_cartt =>{
            qu.push(user_cartt.correctAnswer)
            question_mark.push(user_cartt.marks)
            question.push(user_cartt.question)
            console.log(user_cartt.question);
        }
        )

    function compareArrays(array1, array2) {


    // Check if arrays have the same length
    if (array1.length !== array2.length) {
        console.log("Arrays have different lengths");
        return;
    }

    // Compare each element in a single loop
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] === array2[i]) {
            marks=marks+question_mark[i]
            correct_question.push(question[i])
        }else if(isNaN(array1[i])){
            console.log("null null null");
            not_attempt_question_marks=not_attempt_question_marks+question_mark[i]
        }
         else {
            n_marks = n_marks+negative_marks
        }
    }

    console.log(`Number of equal values: ${marks}`);
    console.log(`Number of different values: ${not_attempt_question_marks}`);
    console.log(`Number of different values: ${n_marks}`);
}

compareArrays(Answer,qu);

marks=marks-n_marks
        console.log(qu.length);
        console.log(question_mark);
        console.log("correct_question",correct_question);

        if (student) {
            return {
              message: "question view",
              success: true,
              marks: marks,
              negative_marks: n_marks,
              not_attempt_question_marks: not_attempt_question_marks,
              status: 200,
            }
          } else {
            return {
              message: "invalid credentials",
              success: false,
              status: 300,
            };
  
        }
    }else{
        return{
            success:false,
            message: "data did not fetch"
        };
    }
    } catch (error) {
        console.log(error);
    }
}