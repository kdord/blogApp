var mongoose = require("mongoose")
var Post = require("./models/post.js")
var Comment = require("./models/comment.js")

var data = [
	{
		title: "Post 1",
		author: "Kateryna Dorodko",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		title: "Post 2",
		author: "Kateryna Dorodko",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
	
]

function seedDB(){

	//remove all posts
	Post.deleteMany({}, function(err){
		// if(err){
		// 	console.log(err)
		//  } else {
		// 	console.log("posts removed")
		// 	//add two new posts
		// 	data.forEach(function(seed){
		// 						Post.create(seed, function(err, post){
		// 			if (err) {
		// 				console.log(err)
		// 			} else{
		// 				console.log("added a post")
		// 				Comment.create(
		// 						{text: "comment1",
		// 						 author:"Homer"	
		// 						}, function (err, comment) {
		// 							if (err) {
		// 								console.log(err)
		// 							} else {
		// 								post.comments.push(comment)
		// 								post.save()
		// 								console.log('created a comment')
		// 							}
		// 						}
		// 					)
		// 			}
		// 		})
		// 	})
		// }
	
	})

}


module.exports = seedDB