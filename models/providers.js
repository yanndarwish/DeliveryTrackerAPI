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
			required: [true, "Veuillez fournir l'adresse de l'entrepôt"],
		},
		headquarter: {
			type: String,
			required: [true, "Veuillez fournir l'adresse du siège social"],
		},
		contactName: {
			type: String,
			required: [true, "Veuillez fournir un nom"],
		},
		contactPhone: {
			type: String,
			required: [true, "Veuillez fournir un numéro de téléphone"],
			match: [
				/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
				"Veuillez fournir un numéro de téléphone valide",
			],
		},
		contactMail: {
			type: String,
			required: [true, "Veuillez fournir un email"],
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
