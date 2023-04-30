const mongoose = require("mongoose")
const Schema = mongoose.Schema

const VehicleSchema = new Schema(
	{
		brand: {
			type: String,
			required: [true, "Veuillez fournir une marque"],
			minLength: 3,
		},
		model: {
			type: String,
			required: [true, "Veuillez fournir un modèle"],
			minLength: 3,
		},
		immatriculation: {
			type: String,
			required: [true, "Veuillez fournir une immatriculation"],
			match: [
				/[A-HJ-NP-TV-Z]{2}[\s-]{0,1}[0-9]{3}[\s-]{0,1}[A-HJ-NP-TV-Z]{2}|[0-9]{2,4}[\s-]{0,1}[A-Z]{1,3}[\s-]{0,1}[0-9]{2}/gm,
				"Veuillez fournir une immatriculation valide",
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

module.exports = mongoose.model("Vehicle", VehicleSchema)
