const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProviderSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Veuillez fournir un nom"],
		},
		wharehouse: {
			type: String,
		},
		headquarter: {
			type: String,
		},
		contactName: {
			type: String,
			required: [true, "Veuillez fournir un nom"],
		},
		contactPhone: {
			type: String,
			match: [
				/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
				"Veuillez fournir un numéro de téléphone valide",
			],
		},
		contactMail: {
			type: String,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Veuillez fournir un email valide",
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
			required: [true, "Veuillez fournir un utilisateur"],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Provider", ProviderSchema)
