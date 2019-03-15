var mongoose = require("mongoose");

var ContentSchema = new mongoose.Schema({
    moduleId: Number,
    category:String,
    difficulty: Number,
    contentURL : String
});


module.exports = mongoose.model("Content", ContentSchema);