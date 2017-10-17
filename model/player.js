var mongoose = require('mongoose');

var ModelSchema = new mongoose.Schema({
	playername: String,
	timing: Number
});

mongoose.model("Player", ModelSchema);