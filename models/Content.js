var mongoose = require("mongoose");

var ContentSchema = new mongoose.Schema({
    moduleId: Number,
    category:String,
    recommendations : [
        {
            difficulty : String,
            contentURL : String
        }
    ]
});


module.exports = mongoose.model("Content", ContentSchema); 