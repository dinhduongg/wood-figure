import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import logger from '@/utilities/logger'
import authRoute from '@/routes/auth'
import preferenceRoute from '@/routes/preference'
import billboardRoute from '@/routes/billboard'
import categoryRoute from '@/routes/category'
import heightRoute from '@/routes/height'
import poductRoute from '@/routes/product'

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
app.use('/api/preference', preferenceRoute)
app.use('/api/billboard', billboardRoute)
app.use('/api/category', categoryRoute)
app.use('/api/height', heightRoute)
app.use('/api/product', poductRoute)

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
