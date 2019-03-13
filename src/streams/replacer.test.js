const replacerStream = require('./replacer')
const { Readable } = require('stream')

const makeReadableStream = (str) => {
    const r = new Readable()
    // r.push('A basic string without any variables to replace')
    r.push(str)
    r.push(null)

    return r
}

describe('#replacer', () => {
    it ('replace the variable named word', done => {
        const mockStream = makeReadableStream('{{ word }}')
        const replacer = replacerStream({
            word: 'A word',
        })

        mockStream
            .pipe(replacer)
            .once('data', (chunk, encoding) => {
                expect(chunk.toString()).toBe('A word')
                done()
            })
    })

    it ('replace the variable named sentence and the variable named firstName', done => {
        const mockStream = makeReadableStream('{{ sentence }} {{ firstName }}')
        const replacer = replacerStream({
            sentence: 'My name is',
            firstName: 'Jeff'
        })

        mockStream
            .pipe(replacer)
            .once('data', (chunk, encoding) => {
                expect(chunk.toString()).toBe('My name is Jeff')
                done()
            })
    })

    it ('replace the variable no matter how many white spaces are between the tags and the variable name', done => {
        const mockStream = makeReadableStream('{{      myVariable}}')
        const replacer = replacerStream({
            myVariable: 'A'
        })

        mockStream
            .pipe(replacer)
            .once('data', chunk => {
                expect(chunk.toString()).toBe('A')
                done()
            })
    })

    it ('replace the variable inside a sentence', done => {
        const mockStream = makeReadableStream("I'm {{age}} years old")
        const replacer = replacerStream({
            age: 20
        })

        mockStream
            .pipe(replacer)
            .once('data', chunk => {
                expect(chunk.toString()).toBe("I'm 20 years old")
                done()
            })
    })

    it ('does not change the string when there is nothing to replace', done => {
        const mockStream = makeReadableStream('There is nothing to replace inside this string } {}  {     ')
        const replacer = replacerStream({})

        mockStream
            .pipe(replacer)
            .once('data', chunk => {
                expect(chunk.toString()).toBe('There is nothing to replace inside this string } {}  {     ')
                done()
            })
    })

    it ('emits an error when the variable is defined is the text but not in the context', done => {
        const mockStream = makeReadableStream('{{ notDefinedVariable }}')
        const replacer = replacerStream()

        mockStream
            .pipe(replacer)
            .once('error', error => {
                expect(error).toBe('The variable notDefinedVariable is not defined')
                done()
            })
    })

    it ('replaces the variable when the configuration specify custom tags', done => {
        const mockStream = makeReadableStream('{# name #}')
        const replacer = replacerStream({
            name: 'Jeff'
        }, {
            openingTag: '{#',
            closingTag: '#}'
        })

        mockStream
            .pipe(replacer)
            .once('data', chunk => {
                expect(chunk.toString()).toBe('Jeff')
                done()
            })
    })
})