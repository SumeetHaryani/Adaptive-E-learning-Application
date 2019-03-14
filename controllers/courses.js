const mongoose = require('mongoose');
const Course = require('../models/Course');

exports.getCourses = (req,res)=>{
    Course.find({},(err,courses)=>{
        if(err){
            console.log(err);
        }
        console.log(courses);
    })
}