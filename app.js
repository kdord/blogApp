var express  		= require("express"),
	app 			= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	methodOverride	= require("method-override"),
	Post 			= require("./models/post.js"),
	seedDB 			= require("./seeds.js")

//require routes
var blogRoutes 		= require("./routes/blogs.js")


// seedDB()

mongoose.connect("mongodb://localhost/blog_app", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))




app.get("/", function(req, res){
	res.render("landing")
})


// Post.create({
// 	title: "Post 1",
// 	author: "kateryna",
// 	text: "this is  first blog"
// })


app.use("/blogs", blogRoutes)


app.listen(3000, function(){
	console.log("Server has started")
})