const isODT = require('./is-odt')

describe ('#isODT', () => {
    it ('returns true if the mimetype is ODT mimetype (happy path)', () => {
        expect(isODT('application/vnd.oasis.opendocument.text')).toBe(true)
    })

    it ('returns false if the mimetype is not ODT mimetype', () => {
        expect(isODT('application/json')).toBe(false)
    })
})