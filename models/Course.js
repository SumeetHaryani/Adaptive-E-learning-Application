var mongoose = require("mongoose");

var CourseSchema = new mongoose.Schema({
    courseName: String,
    description : String,
    syllabus : [
        {
            moduleId: String,
            subtopics : [
                {
                    subtopicName : String,
                    videoLink : String,
                    content : String
                }

            ],
            tests : [
                {

                }
            ]
        }
    ]
});


module.exports = mongoose.model("Course", CourseSchema);