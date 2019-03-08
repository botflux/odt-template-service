/**
 * Returns true if the mimetype match OpenDocument Text mimetype otherwise false
 * 
 * @param {String} mimetype The file mimetype
 */
const isODT = mimetype => mimetype === 'application/vnd.oasis.opendocument.text'

module.exports = isODT