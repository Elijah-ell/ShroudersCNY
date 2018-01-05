var mongoose = require('mongoose');

var ModelSchema = new mongoose.Schema({
	playername: String,
	playeremail: String,
	timing: String
});

mongoose.model("Temp", ModelSchema);