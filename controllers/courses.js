const mongoose = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/user");
const Content = require("../models/Content");

exports.getCourses = (req, res) => {
  const user = req.user;
  console.log(user);
  Course.find({}, (err, courses) => {
    if (err) {
      console.log(err);
    }

    console.log(courses);
    res.render("courses/allCourses", {
      allCourses: courses
    });
  });
};
const getCourseAtrributes = (course) => {
  console.log("course", course);
  const syllabus = course.syllabus;
  const courseName = course.courseName;
  const courseDesc = course.description;

  const modules = [];
  syllabus.forEach(module => {
    modules.push(module);
  });
  return {
    courseName,
    courseDesc,
    modules
  };
};

exports.getIndividualCourse = (req, res) => {
  console.log("params", req.params);
  const course_id = req.params.course_id;
  console.log("course_id", course_id);
  Course.findById(course_id, (err, course) => {
    if (err) {
      console.log("Individual course error", err);
    }
    const syllabus = course.syllabus;
    const courseName = course.courseName;
    const courseDesc = course.description;
    const user_id = res.locals.currentUser._id;
    let level = ""
    User.findById(user_id, (err, user) => {
      user.survey.forEach(sur => {
        if (sur.id.equals(course._id)) {
          level = sur.level;
          console.log(level)
        }
      })
      const modules = [];
      syllabus.forEach(module => {
        console.log(module.difficulty)
        if (level == 'Beginner' && module.difficulty == '0') {
          modules.push(module);
        } else if (level == 'Intermediate' && (module.difficulty == '0' || module.difficulty == '1')) {
          modules.push(module)
        }
        else if (level == 'Advanced') {
          modules.push(module)
        }
      });
      attr = {
        courseName,
        courseDesc,
        modules
      };
      res.render("courses/individualCourse", {
        course_id,
        ...attr
      });
    })
  });
};


exports.getSubtopic = (req, res) => {
  const course_id = req.params.course_id;
  const moduleId = req.params.moduleId;
  const subtopicId = req.params.subtopicId;


  Course.findById(course_id, (err, course) => {
    if (err) {
      console.log(err);
    }
    const syllabus = course.syllabus;
    const courseName = course.courseName;
    const courseDesc = course.description;
    const subtopicDetails = course.syllabus[moduleId].subtopics[subtopicId];
    console.log(subtopicDetails);
    const user_id = res.locals.currentUser._id;
    let level = ""
    User.findById(user_id, (err, user) => {
      user.survey.forEach(sur => {
        if (sur.id.equals(course._id)) {
          level = sur.level;
          console.log(level)
        }
      })
      const modules = [];
      syllabus.forEach(module => {
        console.log(module.difficulty)
        if (level == 'Beginner' && module.difficulty == '0') {
          modules.push(module);
        } else if (level == 'Intermediate' && (module.difficulty == '0' || module.difficulty == '1')) {
          modules.push(module)
        }
        else if (level == 'Advanced') {
          modules.push(module)
        }
      });
      console.log("Modules", modules)
      attr = {
        courseName,
        courseDesc,
        modules
      };
      res.render('courses/subtopicDetails', {
        course_id,
        subtopicDetails,
        ...attr
      })

    })
  })
}
exports.getQuiz = (req, res) => {
  const course_id = req.params.course_id;
  const moduleId = req.params.moduleId;

  Course.findById(course_id, (err, course) => {
    if (err) {
      console.log(err);
    }
    const test = course.syllabus[moduleId].test;
    console.log(test);
    const attr = getCourseAtrributes(course);

    res.render('courses/quiz', {
      course_id,
      moduleId,
      ...attr,
      test
    })
  })

}

exports.postQuiz = (req, res) => {
  console.log("In Post");
  // console.log(req.body);
  const course_id = req.params.course_id;
  const moduleId = req.params.moduleId;

  const answers = req.body;
  Course.findById(course_id, (err, course) => {
    if (err) {
      console.log(err);
    }
    result = [];
    const test = course.syllabus[moduleId].test;
    // console.log("TEST:");
    // console.log(test);

    test.forEach((question, index) => {
      if (question.correctAnswer === answers["question" + index]) {
        console.log("Right");
        result.push({
          outcome: "true",
          question: question,
          answer: question.options[question.correctAnswer],
          user_answer: question.options[answers["question" + index]]
        });
      } else {
        result.push({
          outcome: "false",
          question: question,
          answer: question.options[question.correctAnswer],
          user_answer: question.options[answers["question" + index]]
        });
      }
    });
    const recommendations = {
      question0: [],
      question1: [],
      question2: []

    }
    Content.find({}, (err, contents) => {
      // console.log("contents",contents);
      contents.forEach(content => {
        if (content.moduleId == moduleId && content.category == 'RF') {
          console.log("Contents", content.recommendations);
          result.forEach((obj, index) => {
            if (obj.outcome == "false") {
              const difficulty = obj.question.difficulty;
              content.recommendations.forEach((r, i) => {
                if (r.difficulty == difficulty) {
                  recommendations['question' + index].push(r.contentURL);
                }
              })
            }
          });
          console.log("recommendations", recommendations);
          // console.log("RESULT:");
          // console.log(result);
          res.render("courses/resultAnalysis", {
            result,
            recommendations
          });
        }
      })

    })


  });
};