const errorHandlerMiddleware = (err, req, res, next) => {
	let customError = {
		statusCode: err.statusCode || 500,
		msg: err.message || "Somethign went wrong, try again later",
	}

	// specific error : validation error
	if (err.name === "ValidationError") {
		customError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(", ")
		customError.statusCode = 400
	}

	// specific error : cast error
	if (err.name === "CastError") {
		customError.msg = `No item found with id: ${err.value._id}`
		customError.statusCode = 400
	}

	// specific error for duplicate email
	if (err.code === 11000) {
		customError.msg = `Duplicate value, ${err.keyValue.email} already exists, please provide another one`
		customError.statusCode = 400
	}

	// return res.status(500).json({ err })
	return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
