import { Request, Response } from 'express'

import CategorySchema from '@/models/category.model'
import { getErrorMessage } from '@/utilities/utils'
import { Category as ICategory } from '@/interface/category.interface'

const categoryService = {
  get: async (req: Request, res: Response) => {
    try {
      const categories = await CategorySchema.find()
        .populate({ path: 'billboard', select: 'label imageUrl' })
        .exec()

      return res.status(200).json(categories)
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const category = await CategorySchema.findById(id)
        .populate({ path: 'billboard', select: 'label imageUrl' })
        .exec()

      return res.status(200).json(category)
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const dto = req.body
      await CategorySchema.create(dto)

      return res.status(200).json({ message: 'Category created' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { _id, ...rest } = req.body as ICategory

      await CategorySchema.updateOne({ _id: id }, { ...rest })
      return res.status(200).json({ message: 'Category updated' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await CategorySchema.findByIdAndRemove(id)
      return res.status(200).json({ message: 'Category deleted' })
    } catch (error) {
      return res.status(500).send(getErrorMessage('loi me mat' + error))
    }
  },
}

export default categoryService
