import bcrypt from 'bcrypt'

import { User as IUser } from '@/interface/user.interface'
import { model, Schema } from 'mongoose'

const saltRounds = 10

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    fullname: {
      type: String,
    },
    authorities: {
      type: [String],
    },
    authority: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    useStatus: {
      type: String,
    },
    address: {
      province: {
        type: String,
      },
      district: {
        type: String,
      },
      ward: {
        type: String,
      },
      home_address: {
        type: String,
      },
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds)
  }
  next()
})

export default model<IUser>('userSchema', userSchema, 'users')
