import { Router } from 'express'

import billboardController from '@/controllers/billboard.controller'
import middleware from '@/middleware/middleware'
import { AuthorityRole } from '@/interface/enum'

const router: Router = Router()

router.get('/get', billboardController.get)

router.get('/get/:id', billboardController.getOne)

router.post(
  '/create',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  billboardController.create
)

router.patch(
  '/update/:id',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  billboardController.update
)

router.delete(
  '/delete/:id',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  billboardController.delete
)

export default router
