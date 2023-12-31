import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import userSchema from '@/models/user.model'
import { getErrorMessage } from '@/utilities/utils'
import { userTemplate } from '@/utilities/template'
import { Authentication } from '@/interface/user.interface'

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
        expiresIn: '7d',
      }
    )
  },

  login: async (req: Request, res: Response) => {
    try {
      const credentials = req.body as credentials

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

        const user = {
          username: payload.username,
          authorities: payload.authorities,
          authority: payload.authority,
          accessToken,
        }

        return res.status(200).send(user)
      } else {
        throw new Error('Mật khẩu không chính xác')
      }
    } catch (error) {
      throw error
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const credentials = req.body as credentials

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

      return res.status(200).send('Đăng ký thành công')
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  logOut: async (req: Request, res: Response) => {
    try {
      const credentials = req.body as credentials
      await userSchema.updateOne({ username: credentials.username }, { refreshToken: '' })
      return res.status(200).json({ message: 'Đăng xuất thành công' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  refreshAccess: async (req: Request, res: Response) => {
    try {
      const credentials = req.body as credentials

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

      return res.status(200).json({ accessToken })
    } catch (error) {
      throw error
    }
  },
}

export default authService
