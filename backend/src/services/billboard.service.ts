import billboard from '@/models/billboard.model'
import { Billboard as IBillboard } from '@/interface/billboard.interface'

const billboardService = {
  get: async () => {
    try {
      const billboards = await billboard.find()

      return billboards
    } catch (error) {
      throw error
    }
  },

  create: async (dto: IBillboard) => {
    try {
      await billboard.create(dto)
    } catch (error) {
      throw error
    }
  },

  update: async (dto: IBillboard) => {
    try {
      const { _id, ...rest } = dto

      await billboard.updateOne({ _id: _id }, { ...rest })
    } catch (error) {
      throw error
    }
  },
}

export default billboardService
