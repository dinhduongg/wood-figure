import { Router } from 'express'

import authController from '@/controllers/auth.controller'

const router: Router = Router()

router.post('/sign-up', authController.signUp)
router.post('/sign-in', authController.signIn)
router.post('/sign-out', authController.signOut)
router.post('/refresh-access', authController.refreshAccess)

export default router
