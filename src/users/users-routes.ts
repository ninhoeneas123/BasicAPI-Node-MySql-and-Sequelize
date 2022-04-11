import { Router } from 'express'

import userController from './user-controller'
import authMiddleware from '../middlewares/auth-middleware'
import adminMiddleware from '../middlewares/admin-middleware'


const usersRouter = Router()

usersRouter.get('/users/find', userController.findAllUSers)
usersRouter.post('/users/register', userController.registerUser)
usersRouter.put('/users/redefine', userController.redefinePassword)
usersRouter.put('/users/recovery-password', userController.recoverPassword)
usersRouter.delete('/users/delete/:id', authMiddleware,adminMiddleware, userController.deleteUser)
usersRouter.put('/users/update/:id', authMiddleware, userController.updateUser)



export default usersRouter