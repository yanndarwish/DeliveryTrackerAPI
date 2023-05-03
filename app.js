require("dotenv").config()
require("express-async-errors")

// extra security packages
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

// app
const express = require("express")
const connectDB = require("./db/connect")
const app = express()

// routers
const userRouter = require("./routes/users")
const driverRouter = require("./routes/drivers")
const deliveryRouter = require("./routes/deliveries")
const vehicleRouter = require("./routes/vehicles")
const clientRouter = require("./routes/clients")
const providerRouter = require("./routes/providers")

// middlewares
const errorHandlerMiddleware = require("./middlewares/errorHandler")
const checkUser = require("./middlewares/user")

app.set("trust proxy", 1)
app.use(
	rateLimiter({
		windowMs: 5 * 60 * 1000, // 5 minutes
		max: 100, // limit each IP to 100 requests per windowMs
	})
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.get("/", (req, res) => {
	res.send("<h1>DeliveryTracker API</h1><a href='/api-docs'>API Documentation</a>")
})

// routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/drivers", checkUser, driverRouter)
app.use("/api/v1/deliveries", checkUser, deliveryRouter)
app.use("/api/v1/vehicles", checkUser, vehicleRouter)
app.use("/api/v1/clients", checkUser, clientRouter)
app.use("/api/v1/providers", checkUser, providerRouter)

// middlewares
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () => console.log(`Server is listening on port ${port}`))
	} catch (error) {
		console.log(error)
	}
}

start()

// USERS /users and /users/:id

// DRIVERS /drivers/ and /drivers/:id

// VEHICLES /vehicles/ and /vehicles/:id

// CLIENTS /clients/ and /clients/:id

// PROVIDERS /providers/ and /providers/:id

// DELIVERIES /deliveries/ => queries: year, month, driver, vehicle, client, provider  and /deliveries/:id
