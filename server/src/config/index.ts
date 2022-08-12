import dotenv from 'dotenv'

dotenv.config()

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '8000', 10),
  dbUrl: process.env.URI || '',
}
