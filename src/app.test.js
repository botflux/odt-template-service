const request = require('supertest')
const app = require('./app')

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
    })
})