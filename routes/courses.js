const express = require("express");
const CourseController = require("../controllers/courses");
const SurveyController = require("../controllers/survey");
const router = express.Router();

router.get("/courses", CourseController.getCourses);

router.get("/courses/:course_id", CourseController.getIndividualCourse);

router.get("/courses/:course_id/survey", SurveyController.survey);
router.post("/courses/:course_id/survey", SurveyController.submit);
router.get(
  "/courses/:course_id/:moduleId/subtopic/:subtopicId",
  CourseController.getSubtopic
);
 router.post(
     "/courses/:course_id/:moduleId/subtopic/:subtopicId",
   CourseController.putSubtopicProgress
 );
router.get("/courses/:course_id/:moduleId/quiz",CourseController.getQuiz);

router.post("/courses/:course_id/:moduleId/quiz",CourseController.postQuiz);

// router.post("/potholes/:uid/:complaint_id",potholeController.changeStatus);
module.exports = router;

