import { Billboard } from './billboard.interface'

export interface Category {
  _id: string
  name: string
  link: string
  billboardId: string
  billboard?: Billboard
}
