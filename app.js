var express  		= require("express"),
	app 			= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	methodOverride	= require("method-override")


mongoose.connect("mongodb://localhost/blog_app", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))


app.get("/", function(req, res){
	res.render("landing")
})

app.get("/blogs", function(req, res){
	res.render("blogs.ejs")
})

app.listen(3000, function(){
	console.log("Server has started")
})