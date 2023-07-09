import { model, Schema } from 'mongoose'

import { Billboard } from '@/interface/billboard.interface'

const billboardSchema: Schema<Billboard> = new Schema(
  {
    label: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default model<Billboard>('billboard', billboardSchema)
