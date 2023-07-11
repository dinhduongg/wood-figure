import { model, Schema } from 'mongoose'

import { Preference } from '@/interface/preference.interface'

const preferenceSchema: Schema<Preference> = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    facebookURL: {
      type: String,
      required: true,
    },
    instagramURL: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: false }
)

export default model<Preference>('preferenceSchema', preferenceSchema, 'preferences')
