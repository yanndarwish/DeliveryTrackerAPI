require("dotenv").config()
require("express-async-errors")

// app
const express = require("express")
const connectDB = require("./db/connect")
const app = express()

// routers
const userRouter = require("./routes/users")
const driverRouter = require("./routes/drivers")

// middlewares
const errorHandlerMiddleware = require("./middlewares/errorHandler")
const checkUser = require("./middlewares/user")

app.use(express.json())

app.get("/api/v1", (req, res) => {
	res.send("Hello")
})

// routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/drivers", checkUser, driverRouter)

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
