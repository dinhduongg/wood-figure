import { Request, Response } from 'express'

import billboardService from '@/services/billboard.service'

const billboardController = {
  getOne: async (req: Request, res: Response) => {
    await billboardService.getOne(req, res)
  },

  get: async (req: Request, res: Response) => {
    await billboardService.get(req, res)
  },

  create: async (req: Request, res: Response) => {
    await billboardService.create(req, res)
  },

  update: async (req: Request, res: Response) => {
    await billboardService.update(req, res)
  },

  delete: async (req: Request, res: Response) => {
    await billboardService.delete(req, res)
  },
}

export default billboardController
