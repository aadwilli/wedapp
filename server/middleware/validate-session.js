var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var mongodb = require('../db_mongo');
var User = require('../models_mongo/user');

module.exports = function(req, res, next){
	var sessionToken = req.headers.authorization;

	if(!req.body.user && sessionToken){
		jwt.verify(sessionToken, process.env.JWT_SECRET, function(err, decoded){
			if(decoded){
					User.findOne({where: { id: decoded.id}}).then(
							function(user){
								req.user = user;
								next();
							},
							function(){
								res.status(401).send({error: 'Not authorized'});
							}
						);
			} else {
				res.status(401).send({error: 'Not authorized'});
			}
		});
	} else {
		next();
	}
}