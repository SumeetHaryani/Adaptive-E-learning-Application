const express = require('express');
const StudentController = require('../controllers/student');
const router = express.Router();

router.get("/student", StudentController.getProfile);
module.exports = router;