var express = require("express")
var router = express.Router()
var Post = require("../models/post.js")



//INDEX ROUTE
router.get("/", function(req, res) {
    Post.find({}, function(err, allPosts) {
        if (err) {
            console.log(err)
        } else {
            res.render("posts/index", { posts: allPosts })
        }
    })

})


//CREATE ROUTE
router.post("/", function(req, res){
	//get data from forms and add 
	var title = req.body.title
	var author = req.body.author
	var text = req.body.text

	var newPost = {
		title: title,
		author: author,
		text: text
	}

	//create new
	Post.create(newPost, function(err, newlyCreated){
		if (err) {
			console.log(err)
		} else {
			res.redirect("/posts")
		}
	} )
})

//NEW ROUTE
router.get("/new", function(req, res) {
    res.render("posts/new")
})

//EDIT ROUTE


//DESTROY ROUTE




module.exports = router