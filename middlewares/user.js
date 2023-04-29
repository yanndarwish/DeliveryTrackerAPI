const customError = require("../errors/customError")

const checkUser = async (req, res, next) => {
	const userId = req.headers.x_api_user_id

	if (!userId) {
		throw customError("Absence of user", 401)
	}
    
	try {
		req.user = { userId: userId }
		next()
	} catch (error) {
		throw customError("Invalid user", 401)
	}
}

module.exports = checkUser
