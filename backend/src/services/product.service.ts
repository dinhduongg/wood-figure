import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'

import ProductSchema from '@/models/product.model'
import { getErrorMessage } from '@/utilities/utils'
import { Product as IProduct, ProductUpdate } from '@/interface/product.interface'

const productService = {
  upadtePrice: (price: number, discount_percent: number, discount_money: number) => {
    const discounted_price = price - price * discount_percent - discount_money

    return discounted_price
  },

  get: async (req: Request, res: Response) => {
    try {
      const products = await ProductSchema.find()
        .populate({ path: 'category', select: 'name' })
        .populate({ path: 'heights', select: 'name' })
        .exec()

      return res.status(200).json(products)
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const product = await ProductSchema.findById(id)
        .populate({ path: 'category', select: 'name' })
        .populate({ path: 'heights', select: 'name' })
        .exec()

      return res.status(200).json({ product })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const dto = req.body as IProduct

      const discountedPrice = productService.upadtePrice(
        dto.price,
        dto.discount_percent,
        dto.discount_money
      )

      dto._id = uuidv4()
      dto.discounted_price = discountedPrice

      await ProductSchema.create(dto)

      return res.status(200).json({ message: 'Product created' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { _id, ...rest } = req.body as ProductUpdate

      await ProductSchema.updateOne({ _id: id }, { ...rest })
      return res.status(200).json({ message: 'Product updated' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await ProductSchema.findByIdAndRemove(id)
      return res.status(200).json({ message: 'Product deleted' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },
}

export default productService
