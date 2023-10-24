import dotenv from 'dotenv';

dotenv.config();

const dev = {
  app: { port: process.env.PORT || 3001 },
  db: {
    connectionString: process.env.CONNECTION_STRING
  }
}

const pro = {}

const config = { dev, pro }
const env = process.env.NODE_ENV || 'dev'

export default config[env]