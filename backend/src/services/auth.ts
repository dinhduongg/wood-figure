import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request } from 'express'

import userSchema from '@/models/user'
import { Authentication } from '@/interface/user.interface'
import { userTemplate } from '@/utilities/template'

type credentials = Pick<Authentication, 'username' | 'password'>
type JwtPayload = Pick<Authentication, 'username' | 'authorities' | 'authority'>

const authService = {
  generateAccessToken: (user: JwtPayload) => {
    return jwt.sign(
      {
        username: user.username,
        authorities: user.authorities,
        authority: user.authority,
      },
      process.env.JWT_ACCESS_KEY as string,
      {
        expiresIn: '10m',
      }
    )
  },

  generateRefreshToken: (user: JwtPayload) => {
    return jwt.sign(
      {
        username: user.username,
        authorities: user.authorities,
        authority: user.authority,
      },
      process.env.JWT_REFRESH_KEY as string,
      {
        expiresIn: '5s',
      }
    )
  },

  login: async (credentials: credentials) => {
    try {
      const foundUser = await userSchema.findOne({ username: credentials.username })

      if (!foundUser) {
        throw new Error('Tên đăng nhập không chính xác')
      }

      const isMatch = bcrypt.compareSync(credentials.password, foundUser.password)

      const payload: JwtPayload = {
        username: foundUser.username,
        authorities: foundUser.authorities,
        authority: foundUser.authority,
      }

      if (isMatch) {
        const accessToken = authService.generateAccessToken(payload)
        const refreshToken = authService.generateRefreshToken(payload)

        await userSchema.updateOne({ username: payload.username }, { refreshToken: refreshToken })

        return {
          username: payload.username,
          authorities: payload.authorities,
          authority: payload.authority,
          accessToken,
        }
      } else {
        throw new Error('Mật khẩu không chính xác')
      }
    } catch (error) {
      throw error
    }
  },

  register: async (credentials: credentials) => {
    try {
      const user: Authentication = {
        ...userTemplate,
        username: credentials.username,
        password: credentials.password,
      }

      const foundUser = await userSchema.findOne({ username: credentials.username })

      if (foundUser) {
        throw new Error('Tên đăng nhập đã tồn tại')
      }

      await userSchema.create(user)
    } catch (error) {
      throw error
    }
  },

  logOUt: async (credentials: credentials) => {
    try {
      await userSchema.updateOne({ username: credentials.username }, { refreshToken: '' })
    } catch (error) {
      throw error
    }
  },

  refreshAccess: async (credentials: credentials) => {
    try {
      const foundUser = await userSchema.findOne({ username: credentials.username })

      if (!foundUser) {
        throw new Error('Tên đăng nhập không chính xác')
      }

      if (!foundUser.refreshToken) {
        throw new Error('Cần refreshToken')
      }

      jwt.verify(foundUser.refreshToken, process.env.JWT_REFRESH_KEY as string)

      const payload: JwtPayload = {
        username: foundUser.username,
        authorities: foundUser.authorities,
        authority: foundUser.authority,
      }

      const accessToken = authService.generateAccessToken(payload)
      const refreshToken = authService.generateRefreshToken(payload)

      await userSchema.updateOne({ username: payload.username }, { refreshToken: refreshToken })

      return { accessToken }
    } catch (error) {
      throw error
    }
  },
}

export default authService
