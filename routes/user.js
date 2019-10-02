var express = require("express")
var router = express.Router()
var Post = require("../models/post.js")
var middlewareObj = require("../middleware/index.js")

//... ROUTE
router.get("/:user_id/posts", middlewareObj.isLoggedIn, function (req, res) {
	Post.find({"author.id": req.params.user_id}, function (err, allPosts) {
		if (err) {
			console.log(err)
		} else {
			res.render("users/index", {posts:allPosts})
		}
	})
	
})


module.exports = router