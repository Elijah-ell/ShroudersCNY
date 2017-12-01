var mongoose = require('mongoose');

var ModelSchema = new mongoose.Schema({
	playername: String,
	playeremail: String,
	timing: Number
});

mongoose.model("Temp", ModelSchema);