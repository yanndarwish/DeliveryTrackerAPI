const express = require("express")
const router = express.Router()

const {
	getAllProviders,
	getProvider,
	createProvider,
	updateProvider,
	deleteProvider,
} = require("../controllers/providers")

router.route("/").get(getAllProviders).post(createProvider)
router
	.route("/:id")
	.get(getProvider)
	.patch(updateProvider)
	.delete(deleteProvider)

module.exports = router
