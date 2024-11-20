const express = require("express")
const cors = require('cors')

const app = express()
// Use middleware to from our contract for incoming json payloads ONLY!!
app.use(express.json())
// Use middleware for url encoding
app.use(express.urlencoded({extended: true}))
// Use middleware to handle cors policy
app.use(cors())

// Health point or actuator
// http://localhost:3000
app.get('/', (req, res, next) => {
    res.status(200).json({message: "Service is up"})
})

// Router

// Bad url or error we can handle
// With middleware
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json(
        {
            error: {
                message: error.message,
                status: error.status
            }
        }
    )
})

// Connect database here

module.exports = app