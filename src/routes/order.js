import { Router } from 'express'

import OrderController from '../controllers/order.js'
import authenticated from "../middlewares/authenticated.js";

const orderRouter = new Router()

orderRouter.post('/', authenticated, OrderController.create)
orderRouter.get('/:id', authenticated, OrderController.getById)
orderRouter.get('/', authenticated, OrderController.getAll)
orderRouter.put('/:id', authenticated, OrderController.updateById)
orderRouter.delete('/:id', authenticated, OrderController.deleteById)

export default orderRouter