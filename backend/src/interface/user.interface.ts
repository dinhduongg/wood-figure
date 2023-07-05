import { AuthorityRole, Gender, UserStatus } from './enum'

export interface Address {
  province: string
  district: string
  ward: string
  home_address: string
}

export interface Authentication {
  username: string
  password: string
  email?: string
  phone?: string
  gender?: Gender
  birthday?: Date
  fullname?: string
  authorities: AuthorityRole[]
  authority: AuthorityRole
  refreshToken?: string
  userStatus: UserStatus
}

export interface User extends Authentication {
  address: Address
  createdAt?: Date
  updatedAt?: Date
}
