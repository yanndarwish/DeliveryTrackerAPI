const Client = require("../models/clients")
const customError = require("../errors/customError")

const getAllClients = async (req, res) => {
	const clients = await Client.find({ createdBy: req.user.userId })

	res.status(200).json({ clients })
}

const getClient = async (req, res) => {
	const { id } = req.params
	const client = await Client.find({ _id: id, createdBy: req.user.userId })

	if (!client) {
		throw customError(`No client with id ${id}`, 404)
	}

	res.status(200).json({ client })
}

const createClient = async (req, res) => {
	req.body.createdBy = req.user.userId
	const { name, streetNumber, streetName, postalCode, city } = req.body

	if ((!name, !streetNumber, !streetName, !postalCode, !city)) {
		throw customError("Please provide all required informations", 400)
	}

	const client = await Client.create(req.body)
	res.status(201).json({ client })
}

const updateClient = async (req, res) => {
	const { id } = req.params
	const { name, streetNumber, streetName, postalCode, city } = req.body

	if (!name , !streetNumber , !streetName , !postalCode , !city) {
		throw customError("Please provide all required informations", 400)
	}

	const client = await Client.findOneAndUpdate(
		{ _id: id, createdBy: req.user.userId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	)

	if (!client) {
		throw customError(`No client with id ${id}`, 404)
	}

	res.status(200).json({ client })
}

const deleteClient = async (req, res) => {
	const { id } = req.params
	const client = await Client.findOneAndDelete({
		_id: id,
		createdBy: req.user.userId,
	})

	if (!client) {
		throw customError(`No client with id ${id}`, 404)
	}

	res.status(200).send()
}

module.exports = {
	getAllClients,
	getClient,
	createClient,
	updateClient,
	deleteClient,
}
