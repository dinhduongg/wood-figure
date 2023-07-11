import { Request, Response } from 'express'

import categoryService from '@/services/category.service'

const categoryController = {
  get: async (req: Request, res: Response) => {
    await categoryService.get(req, res)
  },

  getOne: async (req: Request, res: Response) => {
    await categoryService.getOne(req, res)
  },

  create: async (req: Request, res: Response) => {
    await categoryService.create(req, res)
  },

  update: async (req: Request, res: Response) => {
    await categoryService.update(req, res)
  },

  delete: async (req: Request, res: Response) => {
    await categoryService.delete(req, res)
  },
}

export default categoryController
