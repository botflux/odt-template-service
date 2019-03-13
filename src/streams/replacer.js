const { Transform } = require('stream')

const makeReplacer = (context = {}, { openingTag = '{{', closingTag = '}}' } = {}) => {
    const regex = new RegExp(`${openingTag}(\\s)*(?<name>([a-z]|[A-Z]|[0-9])*)(\\s)*${closingTag}`, 'g')

    return new Transform ({
        transform (chunk, encoding, callback) {
            // console.log(chunk.toString(), encoding)

            // Convert the buffer into a string
            const str = chunk.toString()

            // Replace variables
            const result = 
                (str.match(regex) || [])
                .map(m => ({ 
                    varName: m.replace(new RegExp(openingTag, 'g'), '').replace(new RegExp(closingTag, 'g'), '').trim(),
                    varString: m
                }))
                .reduce((prev, { varName, varString }) => {

                    if (!(varName in context)) {
                        callback(`The variable ${varName} is not defined`)
                    }

                    return prev.replace(varString, context[varName])
                }, str)
                // .forEach(({ varName, varString }) => {
                //     console.log(varName, varString)
                // })
            
            // console.log(match, r.groups.name)

            this.push(Buffer.from(result), encoding)
        }
    })
}

module.exports = makeReplacer