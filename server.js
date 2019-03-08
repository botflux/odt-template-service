const app = require('./src/app')
const PORT = process.env.APPLICATION_PORT || 3000

app.listen(PORT, () => {
    console.log(
        `The application is now listening on port ${PORT} \n`,
        `Local adress: http://localhost:${PORT}`
    )
})