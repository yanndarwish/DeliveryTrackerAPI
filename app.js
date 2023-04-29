require("dotenv").config()
const express = require("express")

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.get("/api/v1", (req, res) => {
	res.send("Hello")
})

app.listen(port, () => console.log(`Server is listening on port ${port}`))

// USERS /users ans /users/:id

// DRIVERS /drivers/ and /drivers/:id

// VEHICLES /vehicles/ and /vehicles/:id

// CLIENTS /clients/ and /clients/:id

// PROVIDERS /providers/ and /providers/:id

// DELIVERIES /deliveries/ => queries: year, month, driver, vehicle, client, provider  and /deliveries/:id 