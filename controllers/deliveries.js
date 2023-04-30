const Delivery = require("../models/deliveries")
const customError = require("../errors/customError")

const getAllDeliveries = async (req, res) => {
	const { userId } = req.user
	const { driver, provider, client, vehicle, hotel, year, month, sort } =
		req.query

	const queryObject = {}
	queryObject.createdBy = userId

	if (driver) {
		queryObject.driver = driver
	}

	if (provider) {
		queryObject.provider = provider
	}

	if (client) {
		const field = "pickups.client"
		queryObject[field] = client
	}

	if (vehicle) {
		queryObject.vehicle = vehicle
	}

	if (hotel) {
		queryObject.hotel = { $gt: 0 }
	}

	// date
	const dateField = "pickups.date"
	let dateStart
	let dateEnd
	if (year || month) {
		if (year && month) {
			dateStart = new Date(year, month - 1, 1).toISOString().split("T")[0]
			dateEnd = new Date(year, month, 1).toISOString().split("T")[0]
		} else if (year && !month) {
			dateStart = new Date(year, 0, 1).toISOString().split("T")[0]
			dateEnd = new Date(Number(year) + 1, 0, 1).toISOString().split("T")[0]
		}
	} else {
		// default, return this months deliveries
		const date = new Date()
		const year = date.getFullYear()
		const month = date.getMonth()

		dateStart = new Date(year, month, 1).toISOString().split("T")[0]
		dateEnd = new Date(year, month + 1, 1).toISOString().split("T")[0]
	}
	queryObject[dateField] = {
		$gte: dateStart,
		$lt: dateEnd,
	}

	let result = Delivery.find(queryObject)

	if (sort) {
		const sortList = sort.split(",").join("")
		result = result.sort(sortList)
	} else {
		result.sort({ "pickups.date": 1 })
	}

	const deliveries = await result
	res.status(200).json({ deliveries })
}

const getDelivery = async (req, res) => {
	const { id } = req.params
	const delivery = await Delivery.find({ _id: id, createdBy: req.user.userId })

	if (!delivery) {
		throw customError(`No delivery with id ${id}`, 404)
	}

	res.status(200).json({ delivery })
}

const createDelivery = async (req, res) => {
	req.body.createdBy = req.user.userId
	const { provider, driver, vehicle, pickups, dropoffs } = req.body

	if (!provider || !driver || !vehicle || !pickups || !dropoffs) {
		throw customError("Please provide all required informations", 400)
	}

	const delivery = await Delivery.create(req.body)
	res.status(201).json({ delivery })
}

const updateDelivery = async (req, res) => {
	const { id } = req.params
	const { provider, driver, vehicle, pickups, dropoffs } = req.body

	if (!provider || !driver || !vehicle || !pickups || !dropoffs) {
		throw customError("Please provide all required informations", 400)
	}

	const delivery = await Delivery.findByIdAndUpdate(
		{ _id: id, createdBy: req.user.userId },
		req.body,
		{ new: true, runValidators: true }
	)

	if (!delivery) {
		throw customError(`No delivery with id ${id}`, 404)
	}

	res.status(200).json({ delivery })
}

const deleteDelivery = async (req, res) => {
	const { id } = req.params

	const delivery = await Delivery.findByIdAndDelete({
		_id: id,
		createdBy: req.user.userId,
	})

	if (!delivery) {
		throw customError(`No delivery with id ${id}`, 404)
	}

	res.status(200).send()
}

module.exports = {
	getAllDeliveries,
	getDelivery,
	createDelivery,
	updateDelivery,
	deleteDelivery,
}
