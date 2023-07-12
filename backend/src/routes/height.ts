import { Router } from 'express'

import { AuthorityRole } from '@/interface/enum'
import middleware from '@/middleware/middleware'
import heightController from '@/controllers/height.controller'

const router: Router = Router()

router.get('/get', heightController.get)

router.get('/get/:id', heightController.getOne)

router.post(
  '/create',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  heightController.create
)

router.patch(
  '/update/:id',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  heightController.update
)

router.delete(
  '/delete/:id',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  heightController.delete
)

export default router
