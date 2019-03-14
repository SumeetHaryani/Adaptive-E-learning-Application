const express = require('express');
const CourseController = require('../controllers/courses');
const router = express.Router();
var app = express();

router.get("/courses", potholeController.getCourses);

// router.get("/potholes/:pothole_id", potholeController.getIndividualPothole);

// router.post("/potholes/:uid/:complaint_id",potholeController.changeStatus);
module.exports = router;