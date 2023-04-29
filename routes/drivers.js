const express = require("express")
const router = express.Router()

const {
	getAllDrivers,
	getDriver,
	createDriver,
	updateDriver,
	deleteDriver,
} = require("../controllers/drivers")

router.route("/").get(getAllDrivers).post(createDriver)
router.route("/:id").get(getDriver).patch(updateDriver).delete(deleteDriver)

module.exports = router
