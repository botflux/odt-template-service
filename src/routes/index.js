const isODT = require('../helpers/is-odt')
const isJSON = require('../helpers/is-json')
const bufferToStream = require('../streams/buffer-to-stream')
const odtTemplate = require('node-odt')

/**
 * Functions used to construct routes are using the pattern make[Method][RouteName].
 * Dependencies need to be passed by the dependency object of the route factory. 
 */

/**
 * Make the index route for the GET method.
 * 
 * @param {{}} dependencies The dependencies used by this route
 */
const makeGetIndex = ({} = {}) => (req, res) => {
    return res.send('Hello world')
}

/**
 * Make the index route for the POST method.
 * 
 * @param {{*}} dependencies The dependencies used by this route
 */
const makePostIndex = ({ } = {}) => (req, res) => {
    const { files = {} } = req
    // Even if we add a default value while destructuring, we need to add a fallback
    // because the value can be null.
    const { template } = files || {}
    
    // if template is undefined, null or false we return a response
    if (!template) {
        return res
            .status(400)
            .send('A template file must be sent')
    }

    const { data, ...rest } = template

    // Displays the sent template
    console.log(JSON.stringify(data, null, 4))

    if (!isODT(template.mimetype)) {
        return res
            .status(400)
            .send('The template file must use the OpenDocument Text format')
    }

    const { context } = req.body

    if (!context) {
        return res
            .status(400)
            .send('A context must be sent')
    }

    if (!isJSON(context)) {
        return res
            .status(400)
            .send('The passed context is not in JSON format')
    }

    const contextData = JSON.parse(context)

    const odtHandle = new odtTemplate(template.data)

    odtHandle.renderDoc(contextData, { type: 'stream' }).then(t => {
        t.pipe(res)
    })
        // .on('end', doc => {
        //     console.log('finished')
        //     res.writeHead(200, {
        //         'Content-Type': template.mimetype,
        //         'Content-Disposition': 'attachment;rendered.odt'+template.name,
        //         'Content-Length': doc.length
        //     })

        //     res.end(doc, 'binary')
        // })
        

    // return res.json({
    //     message: 'Hi'
    // })
}

module.exports = {
    makeGetIndex,
    makePostIndex
}