var express = require("express")
var router 	= express.Router({mergeParams:true})
var Post 	= require("../models/post.js")
var Comment = require("../models/comment.js")
var middlewareObj = require("../middleware/index.js")


//NEW ROUTE 
router.get("/new",middlewareObj.isLoggedIn , function (req, res) {
	//find post by id
	Post.findById(req.params.id, function (err, foundPost) {
		if (err) {
			console.log(err)
		} else {
			res.render("comments/new", {post: foundPost})
		}
	})
})


//CREATE ROUTE 
router.post("/",middlewareObj.isLoggedIn , function (req, res) {
	//find post using id
	Post.findById(req.params.id, function (err, foundPost) {
		if(err){
			console.log(err)
			redirect("/posts")
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					req.flash("error", "Something went wrong:(")
					console.log(err)
				} else {
					//add username and id to comment
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					//save comment
					comment.save()
					foundPost.comments.push(comment)
					foundPost.save()
					req.flash("success", "Successfully added comment")
					res.redirect("/posts/"+foundPost._id)

				}
			})
		}
	})
})

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit",middlewareObj.checkCommentOwnership , function (req, res) {
	
		
	
		Comment.findById(req.params.comment_id, function (err, foundComment) {
			if (err) {
				res.redirect("back")
			} else {
				
				res.render("comments/edit", {post_id: req.params.id, comment: foundComment})
			}
		})
	
})


//COMMENT UPDATE ROUTE 
router.put("/:comment_id",middlewareObj.checkCommentOwnership , function (req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
		if (err) {
			res.redirect("back")
		} else {
			req.flash("success", "Comment edited")
			res.redirect("/posts/"+req.params.id)
		}
	} )
})


//COMMENT DESTROY ROUTE
router.delete("/:comment_id",middlewareObj.checkCommentOwnership , function (req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function (err) {
		if (err) {
			res.redirect("back")
		} else {
			req.flash("success", "Comment deleted")
			res.redirect("/posts/"+req.params.id)
		}
	})
})


module.exports = router