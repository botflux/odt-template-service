const request = require('supertest')
const app = require('./app')
const fs = require('fs')

/** Route dependencies */

describe('testing app routes', () => {
    describe('app index', () => {
        it('get', () => {
            return request(app)
                .get('/')
                .then(response => {
                    expect(response.statusCode).toBe(200)
                    expect(response.text).toBe('Hello world')
                })
        })

        describe('post', () => {
            it('returns a 400 when no files sent', () => {
                return request(app)
                    .post('/')
                    .then(response => {
                        expect(response.statusCode).toBe(400)
                        expect(response.text).toBe('A template file must be sent')
                    })
            })

            it ('returns a 400 when the file is not a ODT', () => {
                return request(app)
                    .post('/')
                    .attach('template', 'test/files/text-file.txt')
                    .then(response => {
                        expect(response.statusCode).toBe(400)
                        expect(response.text).toBe('The template file must use the OpenDocument Text format')
                    })
            })

            it ('returns a 400 when context is not specified', () => {
                return request(app)
                    .post('/')
                    .attach('template', 'test/files/odt-file.odt')
                    .then(response => {
                        expect(response.statusCode).toBe(400)
                        expect(response.text).toBe('A context must be sent')
                    })
            })
        })
    })
})