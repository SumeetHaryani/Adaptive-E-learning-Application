var mongoose = require("mongoose");

var CourseSchema = new mongoose.Schema({
  courseName: String,
  description: String,
  syllabus: [
    {
      moduleId: String,
      moduleName: String,
      subtopics: [
        {
          subtopicName: String,
          videolink: String,
          content: String
        }
      ],
      test: [
        {
          questionId: String,
          questionDescription: String,
          difficulty: String,
          accuracy: Number,
          options: [],
          correctAnswer: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Course", CourseSchema);
