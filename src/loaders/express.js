import userRouter from '../routes/user.js'
import orderRouter from '../routes/order.js'

export default (app) => {
    app.use('/api/users', userRouter)
    app.use('/api/orders', orderRouter)
}