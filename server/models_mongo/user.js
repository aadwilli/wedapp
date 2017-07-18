var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

module.exports = function(mongoose){
  
  var UserSchema = new mongoose.Schema({
    username: String,
    password: String
  });
//building a model
	var User = mongoose.model('User', UserSchema);

	var registerCallback = function(err) {
	    if (err) {
	      return console.log(err);
	    };
	    return console.log('Account was created');
	  };

	  var register = function(username, password) {
	    var user = new User({
	      username: username,
	      password: bcrypt.hashSync(password, 10)
	    });
	    user.save(registerCallback);
	    console.log('Save command was sent');
	  };

	 var login = function(username, password) {
	 		var user = User.findOne({ where: { username:req.body.user.username } }).then(
					function(user){
						if (user){
							bcrypt.compare(req.body.user.password, 
										   user.passwordhash, 
										   function(err, matches){
								if(matches){
									var token = jwt.sign({id: user.id}, 
														  process.env.JWT_SECRET, 
														  {expiresIn: 60*60*24});
												res.json({
													user: user,
													message: "successfully authenticated",
													sessionToken: token
												});
								} else {
									res.status(500).send({error: "failed to authenticate"});
								}
							});
						} else {
							res.status(500).send({error:"failed to authenticate"});
						}
					},
					function(err) {
						res.json(err);
					}
			)
	 }

	  return {
	    User: User,
	    register: register,
	    login: login
	  }
}

	  






