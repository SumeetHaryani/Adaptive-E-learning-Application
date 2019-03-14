const express = require("express");
const CourseController = require("../controllers/courses");
const SurveyController = require("../controllers/survey");
const router = express.Router();

router.get("/courses", CourseController.getCourses);

router.get("/courses/:course_id", CourseController.getIndividualCourse);

<<<<<<< HEAD
router.get("/courses/:course_id/survey", SurveyController.survey);
router.post("/courses/:course_id/survey", SurveyController.submit);
=======
router.get("/courses/:course_id/:moduleId/subtopic/:subtopicId",CourseController.getSubtopic);

>>>>>>> 35178484a51ce1f234e4a6b863ff979fd2847dda
// router.post("/potholes/:uid/:complaint_id",potholeController.changeStatus);
module.exports = router;
