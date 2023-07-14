import { model, Schema } from 'mongoose'

import { Product } from '@/interface/product.interface'

const productSchema: Schema<Product> = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount_percent: {
      type: Number,
      required: true,
      default: 0,
    },
    discount_money: {
      type: Number,
      required: true,
      default: 0,
    },
    discounted_price: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
    isOutOfStock: {
      type: Boolean,
      required: true,
      default: false,
    },
    categoryId: {
      type: String,
      required: true,
    },
    heightId: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    _id: false,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
)

productSchema.virtual('category', {
  ref: 'CategorySchema',
  localField: 'categoryId',
  foreignField: '_id',
})

productSchema.virtual('heights', {
  ref: 'HeightSchema',
  localField: 'heightId',
  foreignField: '_id',
})

export default model<Product>('ProductSchema', productSchema, 'products')
