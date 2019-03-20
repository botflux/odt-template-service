const { DOMParser, XMLSerializer } = require('xmldom')

const TEXT_INPUT_TAG_NAME = 'text:text-input'
const ATTRIBUTE_INPUT_NAME = 'text:description'

/**
 * Applies data to content. The content must be XML.
 * 
 * @param {String} content The content.xml file content as a string
 * @param {{}} data An object containing the data that you want to apply to the content
 */
const applyData = (content, data) => {
    // Parse the content as Document Object Model
    const doc = new DOMParser().parseFromString(content)

    // Get elements using the text input tag (e.g text:text-input)
    const elements = doc.getElementsByTagName(TEXT_INPUT_TAG_NAME)

    // Parse the elements count
    const elementsCount = Number.parseInt(elements['$$length'])

    // For each element
    for (let i = 0; i < elementsCount; i++) {
        const currentIndex = i.toString()

        // Get the name of the input that need to be replaced
        const varName = elements[currentIndex].getAttribute(ATTRIBUTE_INPUT_NAME)

        // if data contains a key with the name of varName's value
        if (varName in data) {
            // we replace the data of this input by the associated data
            // the childNodes['0'] is the text node that holds the data
            if (elements[currentIndex].childNodes.length > 0)
                elements[currentIndex].firstChild.data = data[varName]
            else
                elements[currentIndex].appendChild(doc.createTextNode(data[varName]))
        }
    }

    const result = new XMLSerializer().serializeToString(doc)

    return result
}

module.exports = applyData