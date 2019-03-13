const isJSON = require('./is-json')

const validJSON = '{ "valid": "json" }'

describe('#isJSON', () => {
    it ('returns true when the string can be parsed', () => {
        expect(isJSON(validJSON)).toBe(true)
    })

    it ('returns false when the string cannot be parsed', () => {
        expect(isJSON('')).toBe(false)
    })
})