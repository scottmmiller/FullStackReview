var Mongoose = require("mongoose");
var Schema = Mongoose.Schema

var userSchema = new Schema({
	name: {type: String, required: true},
	googleId: {type: Number, required: true, unique: true},
	plusLink: {type: String, rquired: true, unique: true},
	picture: {type: String, required: true},
	gender: {type: String, enum: ["Male", "Female", "Undecided"], required: true},
	cart: [{type: String}],
	address: {
		line1: {type: String},
		line2: {type: String},
		city: {type: String},
		state: {type: String},
		country: {type: String},
		zip: {type: String},
	}
});

module.exports = Mongoose.model("User", userSchema);