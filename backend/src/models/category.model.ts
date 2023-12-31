import { model, Schema } from 'mongoose'

import { Category } from '@/interface/category.interface'

const categorySchema: Schema<Category> = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    billboardId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
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

categorySchema.virtual('billboard', {
  ref: 'BillboardSchema',
  localField: 'billboardId',
  foreignField: '_id',
})

export default model<Category>('CategorySchema', categorySchema, 'categories')
