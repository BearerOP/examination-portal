const { add_question,
    add_question_save,
 } = require("../services/question_service.js")

exports.add_question = async(req,res)=>{
    res.render("add_question");

    // const data = await add_question(req,res)
    // if(data.success){
    //     res.render("add_question");
    // }
    // else{
    //     console.log("error");
    // }
}
exports.add_question_save = async(req,res)=>{
    const data = await add_question_save(req,res)
    if(data.success){
        res.redirect("/add_question")
    }
    else{
        console.log(data.message);
    }
}
