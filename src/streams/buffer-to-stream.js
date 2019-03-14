const { Readable } = require('stream')

/**
 * Converts a buffer into a stream
 */
module.exports = buffer => {
    const r = new Readable()
    r.push(buffer)
    r.push(null)
    return r
}