const express = require('express')
const defaultRouter = require('./routes')

// Initialize the express app
const app = express()

app.get('/', defaultRouter.makeGetIndex())

module.exports = app