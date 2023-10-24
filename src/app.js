import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression";
import instanceMongodb from "./database/init.mongodb.js";
import { checkOverload } from "./helpers/check.connect.js";
import router from "./routers/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init middlerwares
app.use(morgan('dev'))
// app.use(morgan('combined'))
app.use(helmet())
app.use(compression())

//init db
instanceMongodb
// checkOverload()

//init routes
app.use('/', router)

//handling errors
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((error, req, res, next) => {
  const status = error.status || 500
  return res.status(status).json({
    status: 'error',
    code: status,
    message: error.message || 'Internal Server Error'
  })
})

export default app