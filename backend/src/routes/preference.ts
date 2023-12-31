import { Router } from 'express'

import preferenceController from '@/controllers/preference.controller'
import middleware from '@/middleware/middleware'
import { AuthorityRole } from '@/interface/enum'

const router: Router = Router()

router.post(
  '/create',
  middleware.roleBase([AuthorityRole.ADMIN]),
  preferenceController.createPreference
)

router.patch(
  '/update/:id',
  middleware.roleBase([AuthorityRole.ADMIN]),
  preferenceController.updatePreference
)

router.get('/get', preferenceController.getPreference)

export default router
