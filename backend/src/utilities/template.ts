import { AuthorityRole, Gender, UserStatus } from '@/interface/enum'
import { Preference } from '@/interface/preference.interface'
import { User } from '@/interface/user.interface'

export const userTemplate: User = {
  username: '',
  password: '',
  email: '',
  phone: '',
  gender: Gender.ORTHER,
  birthday: new Date(),
  fullname: '',
  authorities: [AuthorityRole.USER, AuthorityRole.ANONYMOUS],
  authority: AuthorityRole.USER,
  refreshToken: '',
  userStatus: UserStatus.active,
  address: {
    province: '',
    district: '',
    ward: '',
    home_address: '',
  },
}

export const preferenceTemplate: Preference = {
  _id: 'preference',
  email: 'duongnd1402@gmail.com',
  facebookURL: 'https://www.facebook.com/dinhduong1402',
  instagramURL: 'https://www.instagram.com/nddd_1402',
  phone: '0941356960',
  storeName: 'wood figure',
  logo: 'temp link',
}
