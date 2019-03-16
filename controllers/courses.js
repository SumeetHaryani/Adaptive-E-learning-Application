const mongoose = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/user");
const Content = require("../models/Content");
const question = require("../models/Question");

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
        mId: { m_id: moduleId },
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
exports.putSubtopicProgress = (req, res) => {
  const course_id = req.params.course_id;
  const moduleId = req.params.moduleId;
  const subtopicId = req.params.subtopicId;
  const percent = req.body.percent;
  const user_id = res.locals.currentUser._id;

  const progress = {
    course_id: course_id,
    module_id: moduleId,
    subtopic_id: subtopicId,
    percent: percent
  };
  User.findById(user_id, (err, user) => {
    user.progress.push(progress);
    user.save();
  });
  Course.findById(course_id, (err, course) => {
    if (err) {
      console.log(err);
    }
    const subtopicDetails = course.syllabus[moduleId].subtopics[subtopicId];
    console.log(subtopicDetails);
    const attr = getCourseAtrributes(course);
    res.render('courses/subtopicDetails', {
      course_id,
      subtopicDetails,
      mId: { m_id: moduleId },
      ...attr
    })
  })
}


exports.postQuiz = (req, res) => {
  console.log("In Post");
  // console.log(req.body);
  const course_id = req.params.course_id;
  const moduleId = req.params.moduleId;
  const user_id = req.user._id;

  const answers = req.body;
  Course.findById(course_id, (err, course) => {
    if (err) {
      console.log(err);
    }
    result = [];
    const test = course.syllabus[moduleId].test;
    // console.log("TEST:");
    // console.log(test);
    let cnt = 0;
    test.forEach((question, index) => {
      if (question.correctAnswer === answers["question" + index]) {
        console.log("Right");
        result.push({
          outcome: "true",
          question: question,
          answer: question.options[question.correctAnswer],
          user_answer: question.options[answers["question" + index]]
        });
        cnt += 1;
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
    const titles = {
      question0: [],
      question1: [],
      question2: []
    }
    Content.find({}, (err, contents) => {
      // console.log("contents",contents);
      contents.forEach(content => {
        if (content.moduleId == moduleId && content.category == 'RF') {
          // console.log("Contents", content.recommendations);
          result.forEach((obj, index) => {
            if (obj.outcome == "false") {
              const difficulty = obj.question.difficulty;
              content.recommendations.forEach((r, i) => {
                if (r.difficulty == difficulty) {
                  recommendations['question' + index].push(r.contentURL);
                  titles['question' + index].push(r.desc);
                }
              })
            }
          });
          // console.log("recommendations", recommendations);
          // console.log("RESULT:");
          // console.log(result);
          console.log("Current User", req.user);
          User.findById(user_id, (err, user) => {
            console.log(user);
            let level = "";
            user.testResults.push({
              courseId: course_id,
              moduleId: moduleId,
              result: result

            });
            if (result.length == cnt) {
              user.survey.forEach(sur => {
                if (sur.id.equals(course._id)) {
                  level = sur.level;
                  if (level == 'Beginner') {
                    sur.level = 'Intermediate';
                  } else if (level == 'Intermediate') {
                    sur.level = 'Advanced';
                  }
                }
              })
            }
            user.save()

          });
          res.render("courses/resultAnalysis", {
            result,
            recommendations,
            titles,
            course_id,
            moduleId
          });


        }
      })

    })

  });
};

exports.getQuizAnalysis = (req, res) => {
  const courseId = req.params.course_id;
  const moduleId = req.params.moduleId;
  const qid = req.params.qid;
  let result;

  User.findById(req.user._id, (err, user) => {
    const resultarr = user.testResults;

    resultarr.forEach(r => {
      if (r.courseId.equals(courseId) && r.moduleId == moduleId) {
        result = r;
      }
    });
    let practiceQs = []
    result.result.forEach((r, index) => {
      const difficulty = r.question.difficulty;
      // console.log("real q difficult", difficulty);
      // console.log("result q obj",r);
      // console.log("qid", qid);
      // const accuracy = r.question.accuracy;
      if (qid == index && r.outcome == "true") {
        question.find({}, (err, qs) => {

          // console.log("comapring qid and index",index);
          // console.log("outcome",r.outcome);
          // console.log("question db result",qs[0]);
          qs[0].questions.forEach((q) => {
            // console.log("comparing q difficulty", q.difficulty);

            if (q.difficulty == difficulty) {
              practiceQs.push(q);
            }
          })
          console.log("Questions Recommended", practiceQs);
          res.render("courses/quizAnalysis", {
            practiceQs
          })

        })
      } else if (qid == index && r.outcome == "false") {
        question.find({}, (err, qs) => {
          qs[0].questions.forEach((q) => {
            if (q.difficulty == difficulty) {
              practiceQs.push(q);
            }
          })
          console.log("Questions Recommended", practiceQs);

          res.render("courses/quizAnalysis", {
            practiceQs
          })
        })
      }
    })

  })


}