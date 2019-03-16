var mongoose = require("mongoose");

var ContentSchema = new mongoose.Schema({
    moduleId: Number,
    category: String,
    recommendations: [
        {
            difficulty: String,
            contentURL: String,
            desc: String
        }
    ]
});


module.exports = mongoose.model("Content", ContentSchema); 