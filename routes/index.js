var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Player = mongoose.model('Player');
var nodemailer = require('nodemailer');

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
	Player.find({}).sort({timing: 'ascending'}).limit(5).exec(function(err, docs) { res.json({"model": docs}); });
	
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
	
	var player = new Player({playername: req.body.playername, timing: req.body.timing});
	Player.find({playername: req.body.playername}).exec(function(err,docs){
		if(docs.length){
			if(docs[0].timing > parseInt(req.body.timing)){
				res.send("edited");
				Player.find({playername: req.body.playername}).remove().exec();
				player.save();	
			}
			else{
				res.send("no edit");
			}
		}	
		else{
			player.save();
		}
	})
	//player.save();
	//res.send("success");
	

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
