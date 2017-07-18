require('dotenv').config();

var express = require('express'); //importing the express module
var app = express(); //calling the express function in the app variable
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodb = require('./db_mongo');
var User = require('./models_mongo/user')(mongoose);

//saying mongodb, grab me that url
mongoose.connect(mongodb.databaseUrl);

mongoose.connection.on('connected', function(){
	console.log('connected to db' + mongodb.databaseUrl)
});

app.use(bodyParser.json());

app.use(require('./middleware/headers')); //importing the header file
app.use(require('./middleware/validate-session'));
app.use('/api/user', require('./models_mongo/user')); //creating a user
app.post('/api/user', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;

	User.register(username, pass);
	res.send(200);
});

//login route
// app.use('/api/login', require('./models_mongo/user'));
app.post('/api/login', function (req, res) {
    var username = req.body.user.username;
    var pass = req.body.user.password;
    var loggingIn = User.login(username, pass)
    loggingIn.then(function(data){
         res.json({
             user: data.user,
             token: data.token
         })
     })
});

app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("Magic on 3000");
});








