import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { AuthorityRole } from '@/interface/enum'

interface CustomJwtPayload extends JwtPayload {
  username: string
  authorities: AuthorityRole[]
  authority: AuthorityRole
}

interface CustomRequest extends Request {
  user: CustomJwtPayload
}

const middleware = {
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token as string
    if (token) {
      const accessToken = token.split(' ')[1]

      try {
        const decoded = jwt.verify(
          accessToken,
          process.env.JWT_ACCESS_KEY as string
        ) as CustomJwtPayload

        ;(req as CustomRequest).user = decoded
        next()
      } catch (error) {
        return res.status(400).json({ message: error })
      }
    } else {
      return res.status(401).json({ message: 'you are not authenticated' })
    }
  },

  roleBase: (roles: AuthorityRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      middleware.verifyToken(req, res, () => {
        const role = (req as CustomRequest).user.authority
        if (roles.includes(role)) {
          next()
        } else {
          return res.status(401).json({ message: 'Bạn không có quyền' })
        }
      })
    }
  },
}

export default middleware
