import { model, Schema } from 'mongoose'

import { Height } from '@/interface/height.inteface'

const heightSchema: Schema<Height> = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    height: {
      type: String || Number,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
)

export default model<Height>('HeightSchema', heightSchema, 'heghts')
