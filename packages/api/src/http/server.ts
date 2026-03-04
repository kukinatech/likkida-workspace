import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from '../configs/index.js'
import bootstrap from './bootstrap.js'
import cookieParser from 'cookie-parser'
const app = express()
app.use(cors({
    origin: [config.FRONTEND_URL, 'http://localhost:4173'],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.json());
bootstrap(app)
app.listen(config.port, () => {
    console.log(`Running In Port ${config.port}`)
});