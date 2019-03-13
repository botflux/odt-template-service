const express = require('express')
const defaultRouter = require('./routes')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')

/* Routes dependencies */
 /* ! */

// Initialize the express app
const app = express()

/**
 * File are now under the property files of request
 */
app.use(fileupload({
    limit: '50mb'
}))

/**
 * Parse json bodies
 */
app.use(bodyParser.json())

/**
 * Parse urlencoded bodies
 */
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
}))

app.route('/')
    .get(defaultRouter.makeGetIndex())
    .post(defaultRouter.makePostIndex())

module.exports = app