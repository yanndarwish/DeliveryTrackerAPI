const customError = (message, statusCode) => {
	const err = new Error()
	err.message = message
	err.statusCode = statusCode
	return err
}

module.exports = customError
