const { Readable, Transform } = require('stream')

const r = new Readable({
    
})
r.push('I love stream')
r.push(null)

const t = new Transform({
    transform (chunk, encoding, callback) {

        Array.from(chunk.toString()).forEach(c => {
            if (c === 'm') {
                callback('Hello')
            }
            
            this.push(Buffer.from(c), encoding)
        })

        // this.push(  
        //     Buffer.from(chunk.toString().toUpperCase()),
        //     encoding
        // )

        // callback(null, Buffer.from(chunk.toString().toUpperCase()))
    }
})

r
    .pipe(t)
    .on('data', (data, encoding, callback) => {
        console.log(data.toString(encoding))
    })
    .on('error', (e) => {
        console.log(e)
    })
