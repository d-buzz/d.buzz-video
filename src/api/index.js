const express = require('express')
const uploadRouter = require('./routes/uploadRouter')
const api = express()

api.use('/video', uploadRouter)

module.exports = api