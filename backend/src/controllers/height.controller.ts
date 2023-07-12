import { Request, Response } from 'express'

import heightService from '@/services/height.service'

const heightController = {
  get: async (req: Request, res: Response) => {
    await heightService.get(req, res)
  },

  getOne: async (req: Request, res: Response) => {
    await heightService.getOne(req, res)
  },

  create: async (req: Request, res: Response) => {
    await heightService.create(req, res)
  },

  update: async (req: Request, res: Response) => {
    await heightService.update(req, res)
  },

  delete: async (req: Request, res: Response) => {
    await heightService.delete(req, res)
  },
}

export default heightController
