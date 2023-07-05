import { AuthorityRole, Gender, UserStatus } from '@/interface/enum'
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
