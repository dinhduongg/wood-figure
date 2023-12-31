import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'

import BillboardSchema from '@/models/billboard.model'
import { getErrorMessage } from '@/utilities/utils'
import { Billboard as IBillboard } from '@/interface/billboard.interface'

const billboardService = {
  getOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const _billboard = await BillboardSchema.findById(id)

      return res.status(200).json({ billboard: _billboard })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const billboards = await BillboardSchema.find()
      return res.status(200).json(billboards)
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const dto = req.body
      dto._id = uuidv4()

      await BillboardSchema.create(dto)

      return res.status(200).json({ message: 'billboard created' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { _id, ...rest } = req.body as IBillboard

      await BillboardSchema.updateOne({ _id: id }, { ...rest })
      return res.status(200).json({ message: 'billboard updated' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await BillboardSchema.findByIdAndRemove(id)
      return res.status(200).json({ message: 'billboard deleted' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },
}

export default billboardService
