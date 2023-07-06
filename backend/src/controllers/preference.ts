import { Request, Response } from 'express'

import { getErrorMessage } from '@/utilities/utils'
import preferenceService from '@/services/preference'
import { Preference as IPreference } from '@/interface/preference.interface'

const preferenceController = {
  createPreference: async (req: Request, res: Response) => {
    try {
      await preferenceService.createPreference()

      res.status(200).json({ message: 'Preference created' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  updatePreference: async (req: Request, res: Response) => {
    try {
      const dto = req.body as IPreference
      await preferenceService.updatePreference(dto)

      return res.status(200).json({ message: 'Preference updated' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  getPreference: async (req: Request, res: Response) => {
    try {
      const preference = await preferenceService.getPreference()

      return res.status(200).json(preference)
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },
}

export default preferenceController
