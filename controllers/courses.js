const mongoose = require("mongoose");
const Course = require("../models/Course");

exports.getCourses = (req, res) => {
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
const getCourseAtrributes = course => {
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
  const course_id = req.params.course_id;
  Course.findById(course_id, (err, course) => {
    const attr = getCourseAtrributes(course);
    console.log(attr);
    res.render("courses/individualCourse", {
      course_id,
      ...attr
    });
  });
};

exports.getSubtopic = (req, res) => {
  const course_id = req.params.course_id;
  const moduleId = req.params.moduleId;
  const subtopicId = req.params.subtopicId;

        const attr = getCourseAtrributes(course);
        console.log(attr);
        res.render('courses/individualCourse',{
            course_id,
            ...attr
        });
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

exports.getQuiz = (req,res)=>{
    const course_id = req.params.course_id;
    const moduleId = req.params.moduleId;

    Course.findById(course_id,(err,course)=>{
        if(err){
            console.log(err);
        }
        const test = course.syllabus[moduleId].test;
        console.log(test);
        const attr = getCourseAtrributes(course);

        res.render('courses/quiz',{
            course_id,
            moduleId,
            ...attr,
            test
        })
    })

}

exports.postQuiz = (req,res)=>{
    console.log("In Post");
    console.log(req.body);
    const course_id = req.params.course_id;
    const moduleId = req.params.moduleId;

    const answers = req.body;
    Course.findById(course_id,(err,course)=>{
        if(err){
            console.log(err);
        }
        result = {};
        const test = course.syllabus[moduleId].test;
        test.forEach((question,index)=>{
            if(question.correctAnswer === answers['question'+index] ){
                console.log("Right");
                result[index+1] = true
            }else{
                result[index+1] = false

            }
        });
        console.log(result)
        res.render("courses/resultAnalysis",{
            result
        });
    })
    
}
