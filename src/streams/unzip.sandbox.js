const archiver = require('archiver')
const fs = require('fs')
const AdmZip = require('adm-zip')
const zlib = require('zlib')
const { DOMParser, XMLSerializer } = require('xmldom')

const archive = archiver ('zip')
const zip = new AdmZip(
    './test/files/test.odt'
)

const myData = {
    phone: '+33 698 765 432',
    message: 'Helloooooooooooo world'
}

archive.pipe(fs.createWriteStream('test/files/o.zip'))
zip.getEntries().forEach(e => {

    // console.log(e.entryName)
    let opt = {
        name: e.entryName,
    }

    let content = e.getData()

    if (e.entryName === 'mimetype') opt = {...opt, zlib: { level: zlib.Z_NO_COMPRESSION }}
    else if (e.entryName === 'content.xml') {
        const doc = new DOMParser().parseFromString (content.toString(), 'text/xml')

        const elements = doc.getElementsByTagName('text:text-input')
        // console.log(elements)

        for (let i = 0; i < Number.parseInt(elements['$$length']); i++) {
            const varName = elements[i.toString()].getAttribute('text:description')
            // console.log(elements[i.toString()])
            // console.log(varName)
            if (varName in myData) {
                elements[i.toString()].childNodes['0'].data = myData[varName]
                console.log(elements[i.toString()].childNodes['0'].data)
                // elements[i.toString()].data = myData[varName]
            }
        }


        content = new XMLSerializer().serializeToString(doc)
        console.log(content)
    }

    archive.append(content, opt)
})

// archive.append(fs.createReadStream('test/files/text-file.txt'), { name: 'text-file.txt' })
// archive.append('Hello world', { name: 'Hello' })
archive.finalize()
