const customError = require("../errors/customError")
const User = require("../models/users")

const getAllUsers = async (req, res) => {
	const users = await User.find()
	return res.status(200).json({ users })
}

const getUser = async (req, res) => {
	const id = req.params.id
	const user = await User.findById(id)

	if (!user) {
		throw customError(`No user with id ${id}`, 404)
	}

	res.status(200).json({ user })
}

const createUser = async (req, res) => {
	const user = await User.create(req.body)
	res.status(201).json({ user })
}

const updateUser = async (req, res) => {
	const { id } = req.params
	const { name } = req.body

	if (!name) {
		throw customError("Please provide all required informations", 400)
	}

	const user = await User.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	})

	if (!user) {
		throw customError(`No user with id ${id}`, 404)
	}

	res.status(200).json({ user })
}

const deleteUser = async (req, res) => {
	const { id } = req.params
	const user = await User.findByIdAndDelete(id)

	if (!user) {
		throw customError(`No user with id ${id}`, 404)
	}

	res.status(200).send()
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser }
