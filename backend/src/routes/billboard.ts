import { Router } from 'express'

import billboardController from '@/controllers/billboard.controller'
import middleware from '@/middleware/middleware'
import { AuthorityRole } from '@/interface/enum'

const router: Router = Router()

router.get('/get', billboardController.get)

router.post(
  '/create',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  billboardController.create
)

router.patch(
  '/update',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  billboardController.update
)

export default router
