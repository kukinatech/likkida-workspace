import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from '../configs/index.js'
import bootstrap from './routes/routes.js'

const app = express()
app.use(cors({ origin: config.FRONTEND_URL }))
app.use(bodyParser.json());
bootstrap(app)
app.listen(config.port, () => {
    console.log(`Running In Port ${config.port}`)
});