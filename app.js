const bodyParser 			= require("body-parser"),
	methodOveride 			= require("method-override"),
	express 				= require("express"),
	app 					= express(),
	mongoose 				= require('mongoose'),
	passport 				= require('passport'),
	LocalStrategy         	= require("passport-local"),
    passportLocalMongoose 	= require("passport-local-mongoose"),
	authRoutes 			= require('./routes/auth');	//routes import
	User					= require("./models/User");


// mongoose.connect("mongodb://localhost:27017/PotholeWenApp",{ useNewUrlParser: true })
// 	.then(result=>{
// 		console.log("connected to mongodb");
		
// 	})
// 	.catch(e=>{
// 		console.log("error connecting mongo",e);
		
// 	})
// tell express to use "ejs" as our templating engine
app.set("view engine", "ejs");
//serve public directory
app.use(express.static("public"));
// use body parser to parse req.body into a JS object
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.get("/", function(req, res) {
	res.render("index");
  });
  app.get("/register", function(req, res) {
	res.render("auth/register");
  }); 
  app.get("/login", function(req, res) {
	res.render("auth/login");
  });
 
 
  // use method-override to override form POST request into PUT request
app.use(methodOveride("_method"));
// use expressSanitizer to sanitize the input given by user
//app.use(expressSanitizer());

//app.use("/",authRoutes);

// const ref = database.ref("result/HDL7SJZlZNRbw452zWZclKgTkTu2");
// ref.once("value", function (snapshot) {
// 		const potholes = snapshot.val();
// 		//console.log(potholes);
// 	},
// 	function (errorObject) {
// 		console.log("The read failed: " + errorObject.code);
// 	}
// );


app.listen(3000, function () {
	console.log("Server has started at PORT 3000");
});