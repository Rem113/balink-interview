import express from 'express'
import bodyParser from 'body-parser'

import mongoLoader from './src/loaders/mongo.js'
import expressLoader from './src/loaders/express.js'

const app = express()

app.use(bodyParser.json())

const main = async () => {
    await mongoLoader(process.env.MONGO_URL)
    await expressLoader(app)
    app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
}

main()