// var express = require('express');
// var router = express.Router();
// module.exports = router;
// var fs = require('fs');
// var User = require('./models').User;
// var Tweet = require('./models').Tweet;
// var Sequelize = require('sequelize');
// //var tweetBank = require('./tweetbank')

// /*router.get('/', function(req, res, next) {
//   // res.json(tweetBank.list())
//   res.render('index', {
//     tweets: Tweet.list()
//   })
// })*/

// router.get('/', function(req, res, next) {
// /*  Tweet.findAll().then(function(tweets){
//   	console.log(JSON.stringify(tweets))
//   		res.render('index', { tweets: JSON.stringify(tweets) })
//   })*/
//   Tweet.findAll({
//   	include: [{model: User, required: true}] 
//   }).then(function(tweets){
//   	var tweetsArr = [];
//   	for(var i = 0; i < tweets.length; i++){
//   		tweetsArr.push((tweets[i].get({plain: true})));
//   	}
//   	console.log(tweetsArr)
//   	//res.render('index', { tweets: JSON.stringify(tweets), user: JSON.stringify(tweets[0].User)})
//   	res.render('index',{tweets: tweetsArr})
//   })
// })

// /*router.post('/', function(req, res, next) {
//   tweetBank.add(req.body.name, req.body.tweet)
//   res.status(201).end()
// })*/

// router.get('/users/:user', function(req, res, next) {
//   User.findAll({ 
//  	include: [{model: Tweet, where: {name: req.params.user}, required: true}]
//   	}).then(function(tweets){
//   		res.render('index', { tweets: JSON.stringify(tweets) })
//   	})
// })

//REVIEW
var express = require('express');
var router = express.Router();
module.exports = router;
var fs = require('fs');
var models = require('./models');

router.get('/', function(req, res, next) {
	var tweetsPromise = models.Tweet.findAll({ include: [models.User]})

	tweetsPromise.then(function(tweets){
		//console.log(JSON.stringify(tweets, null, 2));
		res.render('index', {
			//tweets: JSON.stringify(tweets, null, 2)
			tweets: tweets,
			showForm: true
		})
	})
})


router.post('/', function(req, res, next) {
	var savedUser; 
  	models.User
  		.find({where: {name: req.body.name}})
  		.then(function(user){
  			if(user){
  			// return a user object
  				console.log("found user:", user);
  				return user;
  			}else{
  				// returns a promise for a new user
  				console.log("new user:", user);
  				return models.User.create({name: req.body.name});
  			}
  		})
	  	// this gets a user object
	  	.then(function(user){
	  		savedUser = user;
	  		return models.Tweet.create({tweet: req.body.text});
	  		//addTweet method comes from sequelize 

	  	})
	  	.then(function(tweet){
	  		return savedUser.addTweet(tweet);
	  	})
	  	.then(function(tweet){
	  		res.redirect('/');
	  	})
	  	.catch(next);
})


router.get('/users/:user', function(req, res, next) {
  models.User
  	.find({ where: {name: req.params.user}})
  	.then(function(user){
  		return user.getTweets({include: [models.User]});
  	})
  	.then(function(tweets){
  		res.render('index', { tweets: tweets })
  	})
})

router.get('/users/:user/:id', function(req, res, next) {
  models.Tweet
  	.findAll({ where: {id: Number(req.params.id)}, 
  		include: [models.User]})
  	.then(function(tweets){
  		res.render('index', { tweets: tweets })
  	})
})







