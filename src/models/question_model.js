const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    negativeMarking: {
      type: Number,
      default: 0,
    },
    questions:[
      {
        question: {
          type: String,
          required: true,
        },
        marks:{
          type: Number,
          required: true,
        },
        options: [
          {
            type: String,
            required: true,}
        ],
        // options: [
        //   {
        //     optionText: [{
        //       type: String,
        //       required: true,}
        //     ],
        //   },
        // ],
        correctAnswer: {
          type: Number, // Array of indices representing correct options (e.g., [0, 2] for options 1 and 3)
          required: true,
        },
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("question", questionSchema);
