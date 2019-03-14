const mongoose = require("mongoose");
const User = require("../models/user");

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
  const data = {
    id: course_id,
    level: level,
    goal: goal,
    workExperience: workExperience
  };
  console.log("Here" + course_id);
  User.findById(user_id, (err, user) => {
    user.survey.push(data);
    user.save();
    res.redirect("/courses/" + course_id);
  });
};
