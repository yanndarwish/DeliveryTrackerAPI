const mongoose = require("mongoose")
const Schema = mongoose.Schema

// users Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, "Veuillez fournir un nom"],
		minLength: 3,
	},
})

module.exports = mongoose.model("User", UserSchema)
