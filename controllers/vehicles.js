const Vehicle = require("../models/vehicles")
const customError = require("../errors/customError")

const getAllVehicles = async (req, res) => {
	const vehicles = await Vehicle.find({ createdBy: req.user.userId }).sort(
		"createdAt"
	)
	res.status(200).json({ vehicles })
}

const getVehicle = async (req, res) => {
	const { id } = req.params
	const vehicle = await Vehicle.find({ _id: id, createdBy: req.user.userId })

	if (!vehicle) {
		throw customError(`No vehicle with id ${id}`, 404)
	}

	res.status(200).json({ vehicle })
}

const createVehicle = async (req, res) => {
	req.body.createdBy = req.user.userId
	const { brand, model, immatriculation } = req.body

	if ((!brand, !model, !immatriculation)) {
		throw customError("Please provide all required informations", 400)
	}

	const vehicle = await Vehicle.create(req.body)
	res.status(201).json({ vehicle })
}

const updateVehicle = async (req, res) => {
	const { id } = req.params
	const { brand, model, immatriculation } = req.body

	if ((!brand, !model, !immatriculation)) {
		throw customError("Please provide all required informations", 400)
	}

	const vehicle = await Vehicle.findOneAndUpdate(
		{ _id: id, createdBy: req.user.userId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	)

	if (!vehicle) {
		throw customError(`No vehicle with id ${id}`, 404)
	}

	res.status(200).json({ vehicle })
}

const deleteVehicle = async (req, res) => {
	const { id } = req.params
	const vehicle = await Vehicle.findOneAndDelete({
		_id: id,
		createdBy: req.user.userId,
	})

	if (!vehicle) {
		throw customError(`No vehicle with id ${id}`, 404)
	}

	res.status(200).send()
}

module.exports = {
	getAllVehicles,
	getVehicle,
	createVehicle,
	updateVehicle,
	deleteVehicle,
}
