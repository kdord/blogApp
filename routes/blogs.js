var express    = require("express")
var router 		= express.Router()
var Blog 		= require("../models/blog.js")




router.get("/blogs", function(req, res){
	Blog.find({}, function(err, allBlogs){
		if (err) {
			console.log(err)
		} else {
			res.render("blogs/index", {blogs: allBlogs})
		}
	})

})


module.exports = router