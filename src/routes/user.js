import { Router } from 'express'
import UserController from '../controllers/user.js'

const userRouter = new Router()

userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)

export default userRouter