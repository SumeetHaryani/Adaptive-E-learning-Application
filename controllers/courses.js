const mongoose = require('mongoose');
const Course = require('../models/Course');

exports.getCourses = (req,res)=>{
    
    Course.find({},(err,courses)=>{
        if(err){
            console.log(err);
        }
        console.log(courses);
        res.render('courses/allCourses',{
            allCourses : courses 
        });
    })
}

exports.getIndividualCourse = (req,res)=>{
    const course_id = req.params.course_id;
    Course.findById(course_id,(err,course)=>{

        const syllabus = course.syllabus;
        const courseName = course.courseName;
        const courseDesc = course.description;
        const modules = [];
        syllabus.forEach((module) => {
            modules.push(module);
        });
        // console.log(modules[0].moduleName);
        res.render('courses/individualCourse',{
            courseName,
            courseDesc,
            modules 
        });
    })
}

