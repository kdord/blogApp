var express = require("express")
var router = express.Router()
var Post = require("../models/post.js")
var passport = require("passport")
var User = require("../models/user.js")
var auth = require("../controller/AuthController.js")


//root route
router.get("/", function(req, res){
	res.render("landing")
})


//route to register page 
router.get("/register", auth.register)

//route for register action
router.post("/register", auth.doRegister)

//route to login page
router.get("/login", auth.login )

//route for login action
router.post("/login", auth.doLogin)

//route for logout action
router.get("/logout", auth.logout)

module.exports = router
