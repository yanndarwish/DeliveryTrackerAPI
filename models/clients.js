const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClientSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Veuillez fournir un nom"],
		},
		streetNumber: {
			type: Number,
			required: [true, "Veuillez fournir un numéro de rue"],
		},
		streetName: {
			type: String,
			required: [true, "Veuillez fournir un nom de rue"],
		},
		postalCode: {
			type: String,
			required: [true, "Veuillez fournir un code postal"],
		},
		city: {
			type: String,
			required: [true, "Veuillez fournir une ville"],
		},
		country: {
			type: String,
			default: "France",
		},
		active: {
			type: Boolean,
			default: true,
		},
		createdBy: {
			// this is a Foreign Key referring to the user's id
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Veuillez fournir un utilisateur"],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Client", ClientSchema)
