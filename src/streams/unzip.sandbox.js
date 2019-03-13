const AdmZip = require('adm-zip')

const zip = new AdmZip('test/files/odt-file.odt')

let zipEntries = zip.getEntries()

zipEntries.forEach(z => {
    if (z.entryName === 'content.xml') {
        console.log(z.getData().toString())
    }
})

