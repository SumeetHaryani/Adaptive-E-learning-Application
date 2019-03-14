const express = require('express');
const CourseController = require('../controllers/courses');
const router = express.Router();

router.get("/courses", CourseController.getCourses);

router.get("/courses/:course_id", CourseController.getIndividualCourse);

// router.post("/potholes/:uid/:complaint_id",potholeController.changeStatus);
module.exports = router;