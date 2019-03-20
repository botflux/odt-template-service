const isODT = require('../helpers/is-odt')
const isJSON = require('../helpers/is-json')
const applyData = require('../odt/applyData')
const admZip = require('adm-zip')
const zlib = require('zlib')
const archiver = require('archiver')

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
    console.log(rest)

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

    // the new archive
    const archive = archiver('zip')

    // we pipe the archive to response, so the response will be streamed
    archive.pipe(res)

    // files of the template odt archive
    const entries = new admZip(template.data).getEntries()

    entries.forEach(e => {
        let o = { name: e.entryName }
        let content = e.getData()

        if (e.entryName === 'mimetype') o = { ...o, zlib: { level: zlib.Z_NO_COMPRESSION } } // the mimetype file must not be compressed
        else if (e.entryName === 'content.xml') content = applyData(content.toString(), contextData) // the content.xml file must be proccessed
        
        // add the current file to the new archive
        archive.append(content, o)
    })

    // tells the archive that there will be no more file to append
    archive.finalize()
}

module.exports = {
    makeGetIndex,
    makePostIndex
}