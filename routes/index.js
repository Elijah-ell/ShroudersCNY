var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Player = mongoose.model('Player');
var nodemailer = require('nodemailer');
var Temp = mongoose.model('Temp');
var Temp_int = mongoose.model('Temp_int');
var Player_int = mongoose.model('Player_int');
var Player_event = mongoose.model('Player_event');
var Temp_event = mongoose.model('Temp_event');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    tls: {
        rejectUnauthorized:false
    },
  auth: {
    user: 'elijahgsh@gmail.com',
    pass: 'furyoku1350'
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testform', function(req, res){
	res.render('testform');
})
router.post('/ibm-email', function(req,res,next){
        if(req.body.emailPost){
                console.log('req.body is ',req.body)

                var mailOptions = {
                        from: 'elijahgsh@gmail.com',
                        to: req.body.emailPost,
                        subject: 'ibm picture',
                        attachments: [
                        {
                                filename: 'image.png',
                                path:req.body.imgPost
                        },
                        ]
                };
        transporter.sendMail(mailOptions, function(error, info){
                if(error){
                        console.log(error);
                }else{
                        console.log('Email sent: ' + info.response);
                        res.json({status: "success"})
                }
                });
        } else {
                res.json({status:"nothing 222"})
        }
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
router.post('/create-data2', function(req, res, next){
	var user = new User({username: req.body.username, password: req.body.password});

	// user.save(function(err, user){
	// 	//nores.json(user);

	// 	User.find (function (err, model){
	// 		if(err) return next(err);
	// 		res.json(model);
	// 	})
	// });
	User.find({username: "tester123"}, function(err, product){
		if(err) return next(err)
			res.json(product)
	})

	user.save();
	res.send("success");
})

router.get('/getall-data', function(req, res){

	// User.find (function (err, model){
	// 	if(err) return next(err);
	// 	res.send({"model": model});
	// })
	//Player.find({}).sort({timing: 'ascending'}).limit(5).exec(function(err, docs) { res.json({"model": docs}); });
	Player.find({}).sort({timing: 'ascending'}).limit(20).exec(function(err, docs) { res.json(docs); });
})
router.get('/getall-data-int', function(req, res){
	Player_int.find({}).sort({timing: 'ascending'}).limit(20).exec(function(err, docs) { res.json(docs); });
})
router.get('/getall-data-event', function(req, res){
	Player_event.find({}).sort({timing: 'ascending'}).limit(20).exec(function(err, docs) { res.json(docs); });
})
router.get('/create-product',function(req, res){
	var product = new Product({productName: "Orange Juice", productId: 1});
	product.save(function(err, product){
		if(err) return next(err);
		res.send(JSON.stringify(product));
	})

})
router.get('/create-product2',function(req, res,next){
	var empty = false;
	var product = new Product({productName: "Mongo Juice", productId: 1});
	Product.find({productName: "mango Juice"}).exec(function(err,docs){
		if(docs.length){

		}
		else{
			product.save();
		}
	})

	//res.send("NICE ONE");
	//res.send(JSON.stringify(product));
	// var product = new Product({productName: "Mango Juice", productId: 1});
})

router.get('/get-tomato', function(req, res, next){
	Product.find({productName: "Orange Juice"}, function(err, product){
		if(err) return next(err);

		if(!product.length)
			res.send("null");
		else
			res.send("success");
	})
})

router.post('/create-player', function(req , res, next){
	var player = new Player({playername: req.body.playername, timing: req.body.timing});
	player.save();
	res.send("success");

})

router.post('/create-player2', function(req,res,next){
	if(!req.body.playername.length)
		return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
	if(!req.body.playeremail.length)
		return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
	var player = new Player({playername: req.body.playername.toString().toUpperCase(), timing: req.body.timing, playeremail: req.body.playeremail});
	Player.find({playeremail: req.body.playeremail}).exec(function(err,docs){
		if(docs.length){
			if(docs[0].timing.localeCompare(req.body.timing) == 1){
				// res.send("edited");
				// Player.find({playername: req.body.playername}).remove().exec();
				// player.save();	
				Player.findOneAndUpdate(
					{playername: req.body.playername},
					{$set:{
						//todo2 - update the fields to be same as parameter
						playername: req.body.playername,
						timing: req.body.timing,
					}},
					function (err, updatedModel){
						if(err) return next(err);
						//res.send(updatedModel);
					}

				)
				return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
			}
			else{
				//res.send("no edit");
				return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
			}
		}	
		else{
			player.save();
			return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
		}
	})
	//player.save();
	//res.send("success");
	

})
router.post('/create-player2-int', function(req,res,next){
	if(!req.body.playername.length)
		return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
	if(!req.body.playeremail.length)
		return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
	var player = new Player_int({playername: req.body.playername, timing: req.body.timing, playeremail: req.body.playeremail});
	Player_int.find({playeremail: req.body.playeremail}).exec(function(err,docs){
		if(docs.length){
			if(docs[0].timing.localeCompare(req.body.timing) == 1){
				// res.send("edited");
				// Player.find({playername: req.body.playername}).remove().exec();
				// player.save();	
				Player_int.findOneAndUpdate(
					{playername: req.body.playername},
					{$set:{
						//todo2 - update the fields to be same as parameter
						playername: req.body.playername,
						timing: req.body.timing,
					}},
					function (err, updatedModel){
						if(err) return next(err);
						//res.send(updatedModel);
					}

				)
				return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
			}
			else{
				//res.send("no edit");
				return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
			}
		}	
		else{
			player.save();
			return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
		}
	})
	//player.save();
	//res.send("success");
	

})
router.post('/create-player2-event', function(req,res,next){
	if(!req.body.playername.length)
		return res.redirect('http://www.runpuppyrun.sg/mycny/leaderboard2.html');
	if(!req.body.playeremail.length)
		return res.redirect('http://www.runpuppyrun.sg/mycny/leaderboard2.html');
	var player = new Player_event({playername: req.body.playername, timing: req.body.timing, playeremail: req.body.playeremail});
	Player_event.find({playeremail: req.body.playeremail}).exec(function(err,docs){
		if(docs.length){
			if(docs[0].timing.localeCompare(req.body.timing) == 1){
				// res.send("edited");
				// Player.find({playername: req.body.playername}).remove().exec();
				// player.save();	
				Player_event.findOneAndUpdate(
					{playername: req.body.playername},
					{$set:{
						//todo2 - update the fields to be same as parameter
						playername: req.body.playername,
						timing: req.body.timing,
					}},
					function (err, updatedModel){
						if(err) return next(err);
						//res.send(updatedModel);
					}

				)
				return res.redirect('http://www.runpuppyrun.sg/mycny/leaderboard2.html');
			}
			else{
				//res.send("no edit");
				return res.redirect('http://www.runpuppyrun.sg/mycny/leaderboard2.html');
			}
		}	
		else{
			player.save();
			return res.redirect('http://www.runpuppyrun.sg/mycny/leaderboard2.html');
		}
	})
	//player.save();
	//res.send("success");
	

})
router.post('/store-temp',function(req,res, next){
	var temp = new Temp({playername: "migo", timing: req.body.timing, playeremail: "test@gmail.com"});
	Temp.find({playername: "migo"}).exec(function(err,docs){
	if(docs.length){
		Temp.find({playername: "migo"}).remove().exec();
		temp.save();
	}
	else
		temp.save();
	})
	return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
	
})
router.post('/store-temp-int',function(req,res, next){
	var temp = new Temp_int({playername: "migo-int", timing: req.body.timing, playeremail: "test@gmail.com"});
	Temp_int.find({playername: "migo-int"}).exec(function(err,docs){
	if(docs.length){
		Temp_int.find({playername: "migo-int"}).remove().exec();
		temp.save();
	}
	else
		temp.save();
	})
	return res.redirect('http://www.runpuppyrun.sg/game/leaderboard2.html');
	
})
router.post('/store-temp-event',function(req,res, next){
	var temp = new Temp_event({playername: "migo-event", timing: req.body.timing, playeremail: "test@gmail.com"});
	Temp_event.find({playername: "migo-event"}).exec(function(err,docs){
	if(docs.length){
		Temp_event.find({playername: "migo-event"}).remove().exec();
		temp.save();
	}
	else
		temp.save();
	})
	return res.redirect('http://www.runpuppyrun.sg/mycny/leaderboard2.html');
	
})
router.get('/get-temp', function(req, res, next){
	Temp.find({playername: "migo"}, function(err, temp){
		if(err) return next(err);

		if(!temp.length)
			res.send("null");
		else
			res.json(temp);
	})
})
router.get('/get-temp-int', function(req, res, next){
	Temp_int.find({playername: "migo-int"}, function(err, temp){
		if(err) return next(err);

		if(!temp.length)
			res.send("null");
		else
			res.json(temp);
	})
})
router.get('/get-temp-event', function(req, res, next){
	Temp_event.find({playername: "migo-event"}, function(err, temp){
		if(err) return next(err);

		if(!temp.length)
			res.send("null");
		else
			res.json(temp);
	})
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
router.post('/searchdelete', function(req,res,next){
	if(!req.body.playername.length)
		res.send('null');


	Player.find({playername: req.body.playername}).remove().exec();
	res.send('deleted');

})
router.get('/findplayer', function(req,res,next){

	Player.find({playername: req.body.playername}).exec(function(err,docs){res.json({"model": docs})});
	//res.send('deleted');

})
module.exports = router;
