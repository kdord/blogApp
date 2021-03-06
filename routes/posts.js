var express = require("express")
var router = express.Router()
var Post = require("../models/post.js")
var middlewareObj = require("../middleware/index.js")


//INDEX ROUTE
router.get("/", function(req, res) {
    Post.find({"isPrivate" : false}, function(err, allPosts) {
        if (err) {
            console.log(err)
        } else {
            res.render("posts/index", { posts: allPosts })
        }
    })

})


//CREATE ROUTE
router.post("/", middlewareObj.isLoggedIn, function(req, res){
	//get data from forms and add 
	var title = req.body.title
	var author = {
		id:req.user._id,
		username: req.user.username
	}
	var text = req.body.text
	var isPrivate = req.body.inlineRadioOptions

	var newPost = {
		title: title,
		author: author,
		isPrivate: isPrivate,
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
router.get("/new",middlewareObj.isLoggedIn,  function(req, res) {
    res.render("posts/new")
})

//SHOW ROUTES
router.get("/:id", function(req, res){
	//find the post with provided id
	Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
		if (err) {
			console.log(err)
		} else {
			//render show template
			res.render("posts/show", {post: foundPost})
		}
	})

})


//EDIT ROUTE
router.get("/:id/edit", middlewareObj.chekPostOwnership ,function(req, res){
	Post.findById(req.params.id, function(err, foundPost){
		res.render("posts/edit", {post: foundPost})
	})
})
//UPDATE ROUTE

router.put("/:id",middlewareObj.chekPostOwnership , function(req, res){
	//find and update the correct post
	Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
		if (err) {
			console.log(err)
			res.redirect("/post")
		} else {
			req.flash("success", "Post successfully edited")
			res.redirect("/posts/" + req.params.id)
		}
	})
})


//DESTROY ROUTE
router.delete("/:id",middlewareObj.chekPostOwnership , function(req, res){
	Post.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			console.log(err)
			res.redirect("/posts")
		} else {
			req.flash("success", "Post successfully deleted")
			res.redirect("/posts")
		}
	})
})



module.exports = router