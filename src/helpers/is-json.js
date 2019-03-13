/**
 * Returns true if the given string can be parsed as a JSON otherwise false
 * 
 * @param {String} str String to check
 */
const isJSON = (str) => {
    try {
        JSON.parse(str)
    } catch {
        return false
    }

    return true
}

module.exports = isJSON