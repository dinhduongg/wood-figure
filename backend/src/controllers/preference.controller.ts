import { Request, Response } from 'express'

import preferenceService from '@/services/preference.service'

const preferenceController = {
  createPreference: async (req: Request, res: Response) => {
    await preferenceService.createPreference(req, res)
  },

  updatePreference: async (req: Request, res: Response) => {
    await preferenceService.updatePreference(req, res)
  },

  getPreference: async (req: Request, res: Response) => {
    await preferenceService.getPreference(req, res)
  },
}

export default preferenceController
