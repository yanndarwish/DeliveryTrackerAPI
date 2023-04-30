const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DeliverySchema = new Schema(
	{
		provider: {
			// type: mongoose.Types.ObjectId,
			// ref: "Provider",
			type: String,
			required: [true, "Veuillez fournir un commissionaire"],
		},
		driver: {
			type: mongoose.Types.ObjectId,
			ref: "Driver",
			required: [true, "Veuillez fournir un chauffeur"],
		},
		vehicle: {
			// type: mongoose.Types.ObjectId,
			// ref: "Vehicle",
			type: String,

			required: [true, "Veuillez fournir un véhicule"],
		},
		pickups: {
			type: Array,
			required: [true, "Veuillez fournir un enlèvement"],
		},
		dropoffs: {
			type: Array,
			required: [true, "Veuillez fournir une destination"],
		},
		hotel: {
			type: Number,
			default: 0,
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

module.exports = mongoose.model("Delivery", DeliverySchema)
