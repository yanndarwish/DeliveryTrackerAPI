const express = require("express")
const router = express.Router()

const {
	getAllDeliveries,
	getDelivery,
	createDelivery,
	updateDelivery,
	deleteDelivery,
} = require("../controllers/deliveries")

router.route("/").get(getAllDeliveries).post(createDelivery)
router
	.route("/:id")
	.get(getDelivery)
	.patch(updateDelivery)
	.delete(deleteDelivery)

module.exports = router
