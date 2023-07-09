import { Request, Response } from 'express'

import billboardService from '@/services/billboard.service'
import { getErrorMessage } from '@/utilities/utils'

const billboardController = {
  get: async (req: Request, res: Response) => {
    try {
      const billboards = await billboardService.get()

      return res.status(200).json(billboards)
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const dto = req.body
      await billboardService.create(dto)

      return res.status(200).json({ message: 'billboard created' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const dto = req.body
      await billboardService.update(dto)

      return res.status(200).json({ message: 'billboard updated' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },
}

export default billboardController