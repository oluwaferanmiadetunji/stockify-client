import config from './config'
import logger from './config/logger'
import server from './config/server'
import mongoose from 'mongoose'

require('dotenv').config()

const startServer = (): any => {
  mongoose.connect(config.dbUrl).then(() => {
    logger.info('Connected to MongoDB')
    server.listen(config.port, () => {
      logger.info(
        `Server running in ${config.env} and listening on port ${config.port}`,
      )
    })
  })
}

startServer()

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  logger.error(`Error: ${err}`)
  // Close server and exit process
  server.close(() => process.exit(1))
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: any) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})

export default server
