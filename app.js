var express  		= require("express"),
	app 			= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	methodOverride	= require("method-override"),
	Blog 			= require("./models/blog.js")


mongoose.connect("mongodb://localhost/blog_app", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))

//require routes
var blogRoutes 		= require("./routes/blogs.js")


app.get("/", function(req, res){
	res.render("landing")
})


// Blog.create({
// 	title: "Blog 1",
// 	author: "kateryna",
// 	text: "this is  first blog"
// })


app.use(blogRoutes)


app.listen(3000, function(){
	console.log("Server has started")
})