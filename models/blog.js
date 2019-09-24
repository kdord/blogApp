var mongoose = require("mongoose")

var blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	text: String,
	date: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model("Blog", blogSchema)