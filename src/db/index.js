import mongoose, { mongo } from 'mongoose'
import config from '../config/index.js'
import { logger } from '../tools/basiclogs.js'

mongoose.set('debug', true)

export default {
  setConnection() {
    const connectionStr = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@walter.teqhkvg.mongodb.net/${config.DB_NAME}`

    logger.info('Connecting to DB')

    const db = mongoose.connection
    db.on('error', error => {
      logger.error('Connection.Error', error)
    })

    db.once('open', () => {
      logger.info('Database connected')
    })

    return mongoose
      .connect(connectionStr, {
        connectTimeoutMS: 5000,
        maxPoolSize: 100,
        writeConcern: {
          w: 'majority',
          j: true,
          wtimeout: 5000
        }
      })
      .catch(() => {
        console.log('error 💥')
      })
  }
}