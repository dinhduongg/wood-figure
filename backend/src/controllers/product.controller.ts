import { Request, Response } from 'express'

import productService from '@/services/product.service'

const productController = {
  get: async (req: Request, res: Response) => {
    await productService.get(req, res)
  },

  getOne: async (req: Request, res: Response) => {
    await productService.getOne(req, res)
  },

  create: async (req: Request, res: Response) => {
    await productService.create(req, res)
  },

  update: async (req: Request, res: Response) => {
    await productService.update(req, res)
  },

  delete: async (req: Request, res: Response) => {
    await productService.delete(req, res)
  },
}

export default productController
