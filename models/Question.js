var mongoose = require("mongoose");

var QuestionSchema = new mongoose.Schema({
    moduleId : Number,
    questions : [
        {
            category: String,
            difficulty : String,
            accuracy : Number,
            questionDescription: String,
            options: [],
            correctAnswer: String
        
        }
    ]
    });


module.exports = mongoose.model("Question", QuestionSchema); 