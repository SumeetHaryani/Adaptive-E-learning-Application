const mongoose = require("mongoose");
const User = require("../models/user");
const Course= require("../models/Course"); 
// console.log(req.currentUser);
// const user_id = res.locals.currentUser._id;
exports.survey = (req, res) => {
  res.render("survey/survey", {});
};

exports.submit = (req, res) => {
  const course_id = req.params.course_id;
  const user_id = res.locals.currentUser._id;
  const level = req.body.level;
  const goal = req.body.goal;
  const workExperience = req.body.workExperience;
  const data_survey = {
    id: course_id,
    level: level,
    goal: goal,
    workExperience: workExperience
  };
  let courseName;
  Course.findById(course_id, (err, course) => {
    if(err){
      console.log("course error",err);
    }
     courseName=course.courseName;
    //console.log("Cour",course.courseName);
     });
  const data_courses = {
    id: course_id,
    courseName:courseName,
    status: "Enrolled",
    isSurveyComplete: true
  };
  console.log("Here" + course_id);
  User.findById(user_id, (err, user) => {
    user.survey.push(data_survey);
    user.courses.push(data_courses);
    user.save();
  });
  res.redirect("/courses/" + course_id);
};
// TODO Make Enroll button Disappear @saketoz
exports.checkIfSurveyComplete = (req, res, next) => {
  const course_id = req.params.course_id;
  const user_id = res.locals.currentUser._id;
  console.log("In checkIfSurveyComplete", user_id);

  User.findById(user_id, (err, user) => {
    user.courses.forEach(element => {
      console.log(element.id, element.isSurveyComplete);

      if (element.id == course_id && element.isSurveyComplete == true) {
        res.redirect("/courses/" + course_id);
      }
    });
    res.redirect("/courses/" + course_id + "/survey");
  });
};
