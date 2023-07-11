import { Request, Response } from 'express'

import authService from '@/services/auth.service'

const authController = {
  signUp: async (req: Request, res: Response) => {
    await authService.register(req, res)
  },

  signIn: async (req: Request, res: Response) => {
    await authService.login(req, res)
  },

  signOut: async (req: Request, res: Response) => {
    await authService.logOut(req, res)
  },

  refreshAccess: async (req: Request, res: Response) => {
    await authService.refreshAccess(req, res)
  },
}

export default authController
