const Driver = require("../models/drivers")
const customError = require("../errors/customError")

const getAllDrivers = async (req, res) => {
	const drivers = await Driver.find({ createdBy: req.user.userId }).sort(
		"createdAt"
	)
	res.status(200).json({ drivers })
}

const getDriver = async (req, res) => {
	const { id } = req.params
	const driver = await Driver.find({ _id: id, createdBy: req.user.userId })

	if (!driver) {
		throw customError(`No driver with id ${id}`, 404)
	}

	res.status(200).json({ driver })
}

const createDriver = async (req, res) => {
	req.body.createdBy = req.user.userId
	const { firstName, lastName, phone } = req.body

	if ((!firstName, !lastName, !phone)) {
		throw customError("Please provide all required informations", 400)
	}

	const driver = await Driver.create(req.body)
	res.status(201).json({ driver })
}

const updateDriver = async (req, res) => {
	const { id } = req.params
	const { firstName, lastName, phone } = req.body

	if ((!firstName, !lastName, !phone)) {
		throw customError("Please provide all required informations", 400)
	}

	const driver = await Driver.findByIdAndUpdate(
		{ _id: id, createdBy: req.user.userId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	)

	if (!driver) {
		throw customError(`No driver with id ${id}`, 404)
	}

	res.status(200).json({ driver })
}

const deleteDriver = async (req, res) => {
	const { id } = req.params
	const driver = await Driver.findByIdAndDelete({
		_id: id,
		createdBy: req.user.userId,
	})

	if (!driver) {
		throw customError(`No driver with id ${id}`, 404)
	}

	res.status(200).send()
}

module.exports = {
	getAllDrivers,
	getDriver,
	createDriver,
	updateDriver,
	deleteDriver,
}
