import billboard from '@/models/billboard.model'
import { Billboard as IBillboard } from '@/interface/billboard.interface'

const billboardService = {
  getOne: async (id: string) => {
    try {
      const _billboard = await billboard.findById(id)
      return _billboard
    } catch (error) {
      throw error
    }
  },

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

  delete: async (id: string) => {
    try {
      await billboard.findByIdAndRemove(id)
    } catch (error) {
      throw error
    }
  },
}

export default billboardService
