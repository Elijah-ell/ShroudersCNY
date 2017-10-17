var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Player = mongoose.model('Player');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testform', function(req, res){
	res.render('testform');
})

router.post('/create-data', function(req, res, next){
	var user = new User({username: req.body.username, password: req.body.password});

	// user.save(function(err, user){
	// 	//nores.json(user);

	// 	User.find (function (err, model){
	// 		if(err) return next(err);
	// 		res.json(model);
	// 	})
	// });
	user.save();
	res.send("success");
})


router.get('/getall-data', function(req, res){
	// User.find (function (err, model){
	// 	if(err) return next(err);
	// 	res.send({"model": model});
	// })
	Player.find({}).sort({timing: 'ascending'}).limit(5).exec(function(err, docs) { res.json({"model": docs}); });
	
})

router.get('/create-product',function(req, res){
	var product = new Product({productName: "Orange Juice", productId: 1});
	product.save(function(err, product){
		if(err) return next(err);
		res.send(JSON.stringify(product));
	})

})

router.get('/get-tomato', function(req, res, next){
	Product.find({productName: "Tomato Juice"}, function(err, product){
		if(err) return next(err);

		res.json(product);
	})
})

router.post('/create-player', function(req , res, next){
	var player = new Player({playername: req.body.playername, timing: req.body.timing});
	player.save();
	res.send("success");

})




router.get('/get-data', function(req, res, next){
	var resultArray = [];
	mongo.connect(url,function(err, db){
		assert.equal(null, err);
		var cursor = db.collection('testers').find();
		cursor.forEach(function(doc, err){
			assert.equal(null, err);
			resultArray.push(doc);
		}, function(){
			db.close();
			res.render('index', {testers: resultArray});
		});
	});



})
module.exports = router;
