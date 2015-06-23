var express = require('express')
var logger = require('morgan')
var swig = require('swig')
var bodyParser = require('body-parser')
var app = express()
module.exports = app

swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './views');

// console.log(logger.toString())
app.use(logger('dev'))

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: false }))


app.use(require('./routes'))

/*var User = require('./models').User;
User.findById(6).then(function(user) {
    user.getTweets().then(function(tweets) {
        console.log(tweets);
  });
});*/

var User = require('./models').User;
var Tweet = require('./models').Tweet;
/*User.findById(6).then(function(user) {
    user.getTweets().then(function(tweets) {
        console.log(JSON.stringify(tweets));
  });
});*/

/*Tweet.findAll({
	include: [User]
}).then(function(tweets){
	console.log(JSON.stringify(tweets))
})*/

app.listen(3000)