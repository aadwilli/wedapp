// var router = require('express').Router();
// var mongoose = require('mongoose');
// var mongodb = require('./db_mongo');
// var User = require('./models_mongo/user');
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');


// router.post('/', function(req, res){
	
// 	var username = req.body.user.username;
// 	var pass = req.body.user.password;
// 	//User object
// 	User.create({
// 		username: username,
// 		password: bcrypt.hashSync(pass,10)
// 	}).then(
// 			function createSuccess(user){
				
// 				var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

// 				res.json({
// 					user: user,
// 					message: 'created',
// 					sessionToken: token
// 				});
// 			},
// 			function createError(err){
// 				res.send(500, err.message);
// 			}
// 		);
// });

// module.exports = router;