import { Request, Response } from 'express'

import authService from '@/services/auth.service'
import { getErrorMessage } from '@/utilities/utils'

const authController = {
  signUp: async (req: Request, res: Response) => {
    try {
      await authService.register(req.body)
      return res.status(200).send('Đăng ký thành công')
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  signIn: async (req: Request, res: Response) => {
    try {
      const foundUser = await authService.login(req.body)
      return res.status(200).send(foundUser)
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  signOut: async (req: Request, res: Response) => {
    try {
      await authService.logOUt(req.body)
      return res.status(200).json({ message: 'Đăng xuất thành công' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  refreshAccess: async (req: Request, res: Response) => {
    try {
      const accessToken = await authService.refreshAccess(req.body)
      return res.status(200).json(accessToken)
    } catch (error: any) {
      return res.status(500).send(getErrorMessage(error))
    }
  },
}

export default authController
