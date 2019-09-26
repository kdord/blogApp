var mongoose = require("mongoose")
var passport = require("passport")
var User 	 = require("../models/user.js")

var userController = {}

//Restrict access to root page
userController.home = function(req, res){
	res.render("index", {user: req.user})
}

// Go to registration page 
userController.register = function(req, res){
	res.render("register")
}

//Post registration
userController.doRegister = function(req, res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			return res.render("register", {user:user})
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/posts")})
	})
}

//Go to login page 
userController.login = function(req, res){
	res.render("login")
}

//Post login
userController.doLogin = function(req, res){
	passport.authenticate("local")(req, res, function(){
		res.redirect("/posts")
	})
}

//Logout
userController.logout = function(req, res){
	req.logout()
	res.redirect("/")
}

module.exports = userController