var express  		= require("express"),
	app 			= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	methodOverride	= require("method-override"),
	Post 			= require("./models/post.js"),
	seedDB 			= require("./seeds.js"),
	passport 		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	session 		= require("express-session"),
	User 			= require("./models/user.js"),
	Comment 		= require("./models/comment.js"),
	flash 			= require("connect-flash")

//require routes
var postRoutes 		= require("./routes/posts.js")
var indexRoutes 	= require("./routes/index.js")
var commentRoutes 	= require("./routes/comments.js")
var userRoutes 		= require("./routes/user.js")

// const log = require('simple-node-logger').createSimpleFileLogger('project.log');


// var DBPASS = process.env.DBPASS 
// var DBUSERNAME = process.env.DBUSERNAME
// seedDB() //seed the database
// log.info(process.env.DBPASS)
// console.log(DBUSERNAME)

mongoose.connect(`mongodb+srv://${DBUSERNAME}:${DBPASS})@cluster0-lwmoa.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
	.then(() => console.log("connection succesful"))
	.catch((err) => console.error(err))
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(flash()) //for flash messages




//PASSPORT CONFIG
app.use(session({
	secret: "secret text",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
	res.locals.currentUser = req.user
	res.locals.error = req.flash("error")
	res.locals.success = req.flash("success")
	next()
})




// Post.create({
// 	title: "Post 1",
// 	author: "kateryna",
// 	text: "this is  first blog"
// })

app.use("/", indexRoutes)
app.use("/posts", postRoutes)
app.use("/posts/:id/comments", commentRoutes)
app.use(userRoutes)

app.listen(process.env.PORT, function(){
	console.log("Server has started")
})