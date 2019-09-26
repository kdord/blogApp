var mongoose = require("mongoose")

var postSchema = new mongoose.Schema({
	title: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	text: String,
	date: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model("Post", postSchema)