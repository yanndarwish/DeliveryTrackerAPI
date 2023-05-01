const Provider = require("../models/providers")
const customError = require("../errors/customError")

const getAllProviders = async (req, res) => {
	const providers = await Provider.find({ createdBy: req.user.userId })

	res.status(200).json({ providers })
}

const getProvider = async (req, res) => {
	const { id } = req.params
	const provider = await Provider.find({ _id: id, createdBy: req.user.userId })

	if (!provider) {
		throw customError(`No provider with id ${id}`, 404)
	}

	res.status(200).json({ provider })
}

const createProvider = async (req, res) => {
	req.body.createdBy = req.user.userId
	const {
		name,
		wharehouse,
		headquarter,
		contactName,
		contactPhone,
		contactMail,
	} = req.body

	if (
		(!name,
		!wharehouse,
		!headquarter,
		!contactName,
		!contactPhone,
		!contactMail)
	) {
		throw customError("Please provide all required informations", 400)
	}

	const provider = await Provider.create(req.body)
	res.status(201).json({ provider })
}

const updateProvider = async (req, res) => {
	const { id } = req.params
	const {
		name,
		wharehouse,
		headquarter,
		contactName,
		contactPhone,
		contactMail,
	} = req.body

	if (
		(!name,
		!wharehouse,
		!headquarter,
		!contactName,
		!contactPhone,
		!contactMail)
	) {
		throw customError("Please provide all required informations", 400)
	}

	const provider = await Provider.findOneAndUpdate(
		{ _id: id, createdBy: req.user.userId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	)

	if (!provider) {
		throw customError(`No provider with id ${id}`, 404)
	}

	res.status(200).json({ provider })
}

const deleteProvider = async (req, res) => {
	const { id } = req.params
	const provider = await Provider.findOneAndDelete({
		_id: id,
		createdBy: req.user.userId,
	})

	if (!provider) {
		throw customError(`No provider with id ${id}`, 404)
	}

	res.status(200).send()
}

module.exports = {
	getAllProviders,
	getProvider,
	createProvider,
	updateProvider,
	deleteProvider,
}
