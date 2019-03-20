const applyData = require('./applyData')
const fs = require('fs')

const content = fs.readFileSync('./test/files/content.xml', 'utf8')
const contentWithDataApplied = fs.readFileSync('./test/files/content-with-data-applied.xml', 'utf8')
const contentWithoutPlaceholderText = fs.readFileSync('./test/files/content-without-placeholder-text.xml', 'utf8')

const data = {
    message: 'Helloooooooooooo world'
} 

describe('#applyData', () => {
    it ('replaces the input text by the field associated', () => {
        expect(applyData(content, data)).toBe(contentWithDataApplied)
    })

    it ('adds the text node when there is no placeholder text', () => {
        expect(applyData(contentWithoutPlaceholderText, data)).toBe(contentWithDataApplied)
    })
})