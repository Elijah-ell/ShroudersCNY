var mongoose = require('mongoose')

var ModelSchema = new mongoose.Schema({
	productName : String,
	productId : Number,
});

mongoose.model('Product', ModelSchema);