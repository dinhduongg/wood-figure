import { Router } from 'express'

import { AuthorityRole } from '@/interface/enum'
import middleware from '@/middleware/middleware'
import productController from '@/controllers/product.controller'

const router: Router = Router()

router.get('/get', productController.get)

router.get('/get/:id', productController.getOne)

router.post(
  '/create',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  productController.create
)

router.patch(
  '/update/:id',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  productController.update
)

router.delete(
  '/delete/:id',
  middleware.roleBase([AuthorityRole.ADMIN, AuthorityRole.MANAGER]),
  productController.delete
)

export default router
