import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'

import HeightSchema from '@/models/height.model'
import { getErrorMessage } from '@/utilities/utils'
import { Height as IHeight } from '@/interface/height.inteface'

const heightService = {
  get: async (req: Request, res: Response) => {
    try {
      const heights = await HeightSchema.find()

      return res.status(200).json(heights)
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const height = await HeightSchema.findById(id)

      return res.status(200).json({ height })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const dto = req.body
      dto._id = uuidv4()

      await HeightSchema.create(dto)

      return res.status(200).json({ message: 'Height created' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { _id, ...rest } = req.body as IHeight

      await HeightSchema.updateOne({ _id: id }, { ...rest })
      return res.status(200).json({ message: 'Height updated' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await HeightSchema.findByIdAndRemove(id)
      return res.status(200).json({ message: 'Height deleted' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },
}

export default heightService
