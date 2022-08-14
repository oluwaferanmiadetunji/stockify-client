import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import httpStatus from 'http-status'
import hpp from 'hpp'
import { errorHandler, successHandler } from './config/morgan'
import Middlewares from './middlewares'
import routes from './routes'
import limiter from './utils/limiter'
import ApiError from './utils/ApiError'

const app: Express = express()

app.use(successHandler)
app.use(errorHandler)

// Disable etag and x-powered-by to improve server performance
app.disable('etag').disable('x-powered-by')

// Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// It shows the real origin IP in the heroku or Cloudwatch logs
app.enable('trust proxy')

// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors())

// gzip compression
app.use(compression())

// Set security headers with helmet middleware
app.use(helmet())

app.use(limiter)

app.use(hpp())

// Transforms the raw string of req.body into json
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: false }))

app.get('/status', (req: Request, res: Response) => {
  res.status(httpStatus.OK).end()
})

app.head('/status', (req: Request, res: Response) => {
  res.status(httpStatus.OK).end()
})

app.use('/', Middlewares.rateLimiter)

app.use('/', routes)

// Index route
app.get('/', (req: Request, res: Response) =>
  res.status(httpStatus.OK).json({
    message: `${req.ip}: Welcome`,
  }),
)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

app.use(Middlewares.errorConverter)

app.use(Middlewares.ErrorHandler)

export default app
