import express  from "express"
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression";

const app = express();

//init middlerwares
app.use(morgan('dev'))
// app.use(morgan('combined'))
app.use(helmet())
app.use(compression())

//init db

//init routes
app.get('/', (req, res) => {
  return res.status(200).json('Welcome')
})

export default app