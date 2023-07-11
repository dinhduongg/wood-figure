import { Router } from 'express'

import { AuthorityRole } from '@/interface/enum'
import middleware from '@/middleware/middleware'
import categoryController from '@/controllers/category.controller'

const router: Router = Router()

router.get('/get', categoryController.get)

router.get('/get/:id', categoryController.getOne)

router.post(
  '/create',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  categoryController.create
)

router.patch(
  '/update/:id',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  categoryController.update
)

router.delete(
  '/delete/:id',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  categoryController.delete
)

export default router
