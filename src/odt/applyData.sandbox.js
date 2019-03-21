const applyData = require('./applyData')
const admZip = require('adm-zip')
const { readFileSync } = require('fs')

const zip = new admZip(
    readFileSync('./test/files/header.odt')
)

const [style] = zip
    .getEntries()
    .filter(e => (e.entryName == 'styles.xml'))
