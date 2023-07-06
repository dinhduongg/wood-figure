import { Router } from 'express'

import preferenceController from '@/controllers/preference'
import middleware from '@/middleware/middleware'
import { AuthorityRole } from '@/interface/enum'

const router: Router = Router()

router.post(
  '/create',
  middleware.roleBase([AuthorityRole.ADMIN]),
  preferenceController.createPreference
)

router.post(
  '/update',
  middleware.roleBase([AuthorityRole.ADMIN]),
  preferenceController.updatePreference
)

export default router
