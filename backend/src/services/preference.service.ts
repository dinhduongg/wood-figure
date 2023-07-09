import preference from '@/models/preference.model'
import { preferenceTemplate } from '@/utilities/template'
import { Preference as IPreference } from '@/interface/preference.interface'

const preferenceService = {
  createPreference: async () => {
    try {
      await preference.create(preferenceTemplate)
    } catch (error) {
      throw error
    }
  },

  updatePreference: async (dto: IPreference) => {
    try {
      const _preference = await preference.findById(dto._id)

      if (!_preference) {
        throw new Error(`Preference với id: ${dto._id} không tồn tại`)
      }

      await preference.updateOne({ _id: dto._id }, { ...dto })
    } catch (error) {
      throw error
    }
  },

  getPreference: async () => {
    try {
      const _preference = await preference.find()

      return _preference
    } catch (error) {
      throw error
    }
  },
}

export default preferenceService