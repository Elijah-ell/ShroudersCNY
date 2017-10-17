
var mongoose = require('mongoose');

var ModelSchema = new mongoose.Schema({
	username: {type: String, lowercase: true},
	password: String
});

mongoose.model("User", ModelSchema);