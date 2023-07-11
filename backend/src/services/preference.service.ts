import { Request, Response } from 'express'

import preference from '@/models/preference.model'
import { getErrorMessage } from '@/utilities/utils'
import { preferenceTemplate } from '@/utilities/template'
import { Preference as IPreference } from '@/interface/preference.interface'

const preferenceService = {
  createPreference: async (req: Request, res: Response) => {
    try {
      await preference.create(preferenceTemplate)
      res.status(200).json({ message: 'Preference created' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  updatePreference: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { _id, ...other } = req.body as IPreference

      const _preference = await preference.findById(id)

      if (!_preference) {
        throw new Error(`Preference với id: ${id} không tồn tại`)
      }

      await preference.updateOne({ _id: id }, { ...other })
      return res.status(200).json({ message: 'Preference updated' })
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },

  getPreference: async (req: Request, res: Response) => {
    try {
      const _preference = await preference.find()

      return res.status(200).json(_preference)
    } catch (error) {
      return res.status(500).send(getErrorMessage(error))
    }
  },
}

export default preferenceService
