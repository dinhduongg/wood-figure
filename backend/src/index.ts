import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import logger from '@/utilities/logger'
import authRoute from '@/routes/auth'

dotenv.config()
const app: Express = express()
const PORT = process.env.PORT || 4040

// using package
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10000mb' }))
app.use(express.json())

// routes
app.use('/api/auth', authRoute)

// connect to mongodb and run app
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    app.listen(PORT, () => {
      logger.info(
        `-------------------------------------- \n--- server is running in port ${PORT} --- \n--------------------------------------`
      )
    })
  })
  .catch((error) => {
    logger.error('Lỗi khi kết nối DB')
    // throw error
  })