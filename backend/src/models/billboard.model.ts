import { model, Schema } from 'mongoose'

import { Billboard } from '@/interface/billboard.interface'

const billboardSchema: Schema<Billboard> = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: false }
)

export default model<Billboard>('billboard', billboardSchema)
