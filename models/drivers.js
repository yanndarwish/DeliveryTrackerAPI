const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DriverSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, "Veuillez fournir un prénom"],
			minLength: 3,
			maxLength: 30,
		},
		lastName: {
			type: String,
			required: [true, "Veuillez fournir un nom de famille"],
			minLength: 3,
			maxLength: 30,
		},
		email: {
			type: String,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Veuillez fournir un email valide",
			],
		},
		phone: {
			type: String,
			required: [true, "Veuillez fournir un numéro de téléphone"],
			match: [
				/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
				"Veuillez fournir un numéro de téléphone valide",
			],
		},
		active: {
			type: Boolean,
			default: true,
		},
		createdBy: {
			// this is a Foreign Key referring to the user's id
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide a user"],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Driver", DriverSchema)
