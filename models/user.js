var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  gender: String,
  mobile: String,
  skill: String,
  courses: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      },
      courseName:String,
      status: String,
      isSurveyComplete: Boolean
    }
  ],

  survey: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      },
      level: String,
      goal: String,
      workExperience: String
    }
  ],progress :[{
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },
    module_id:String,
    subtopic_id: String,
    percent: { type: String, default: 0 }
  }],

  testResults : [
    {
      courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Course"
      },
      moduleId : Number,
      result : []
    }
  ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
