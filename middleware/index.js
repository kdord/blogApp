var Post = require("../models/post.js")
var Comment = require("../models/comment.js")


var middlewareObj = {

}

middlewareObj.chekPostOwnership = function (req, res, next) {
	//if user logged in 
	if (req.isAuthenticated()) {
		Post.findById(req.params.id, function (err, foundPost) {
			if (err) {
				res.redirect("back")
			} else {
				//does user own the post
				if (foundPost.author.id.equals(req.user._id)) {
					next()
				} else {
					req.flash("error", "You don't have permission to do that")
					res.redirect("back")
				}
			}
		})
	} else {
		req.flash("error", "You need to be login to do this")
		res.redirect("back")
	}
}



middlewareObj.checkCommentOwnership = function (req, res, next) {
	//if user logged in 
	if (req.isAuthenticated()) {
		Comment.findById(req.params.id, function (err, foundComment) {
			if (err) {
				res.redirect("back")
			} else {
				//does user own the post
				if (foundComment.author.id.equals(req.user.id)) {
					next()
				} else {
					req.flash("error", "You don't have permission to do that")

					res.redirect("back")
				}
			}
		})
	} else {
		req.flash("error", "You need to be login to do this")
		res.redirect("back")
	}
}


middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	req.flash("error", "Please Login First!")
	res.redirect("/login")
}


module.exports = middlewareObj