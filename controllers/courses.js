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
const getCourseAtrributes = (course)=>{
    const syllabus = course.syllabus;
        const courseName = course.courseName;
        const courseDesc = course.description;
        const modules = [];
        syllabus.forEach((module) => {
            modules.push(module);
        });
        return {
            courseName,
            courseDesc,
            modules
        }

}
exports.getIndividualCourse = (req,res)=>{
    const course_id = req.params.course_id;
    Course.findById(course_id,(err,course)=>{

        const attr = getCourseAtrributes(course);
        console.log(attr);
        res.render('courses/individualCourse',{
            course_id,
            ...attr
        });
    })
}

exports.getSubtopic = (req,res)=>{
    const course_id = req.params.course_id;
    const moduleId = req.params.moduleId;
    const subtopicId = req.params.subtopicId;

    Course.findById(course_id,(err,course)=>{
        if(err){
            console.log(err);
        }
        const subtopicDetails = course.syllabus[moduleId].subtopics[subtopicId];
        console.log(subtopicDetails);
        const attr = getCourseAtrributes(course);
        res.render('courses/subtopicDetails',{
            course_id,
            subtopicDetails,
            ...attr
        })
    })
}