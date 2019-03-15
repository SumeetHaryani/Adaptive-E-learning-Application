const bodyParser = require("body-parser"),
	methodOveride = require("method-override"),
	express = require("express"),
	app = express(),
	mongoose = require('mongoose'),
	courseRoutes = require('./routes/courses');
	studentRoutes = require('./routes/student');
	passport = require('passport'),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	authRoutes = require('./routes/auth'); //routes import
	User = require("./models/user");


mongoose.connect("mongodb+srv://sam:abcd123@cluster0-1uhjw.mongodb.net/syrus", {
		useNewUrlParser: true
	})
	.then(result => {
		console.log("connected to mongodb");

	})
	.catch(e => {
		console.log("error connecting mongo", e);

	});
app.use(require("express-session")({
	secret: "Rusty is the best and cutest dog in the world",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	console.log(req.user);
	next();
});


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
app.get("/", function (req, res) {
	res.render("index");
});
// app.get("/register", function (req, res) {
// 	res.render("auth/register");
// });
// app.get("/login", function (req, res) {
// 	res.render("auth/login");
// });


// use method-override to override form POST request into PUT request
app.use(methodOveride("_method"));
// use expressSanitizer to sanitize the input given by user
//app.use(expressSanitizer());
// app.use("/",(req,res,next)=>{
// 	res.redirect('/courses');
// });
app.use("/", courseRoutes);
app.use("/", studentRoutes);

app.use("/", authRoutes);

app.listen(3000, function () {
	console.log("Server has started at PORT 3000");
});